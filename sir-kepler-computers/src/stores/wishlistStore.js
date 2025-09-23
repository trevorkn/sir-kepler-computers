import { create } from "zustand";
import { persist } from "zustand/middleware"
import { fetchFavorites } from "../utils/fetchFavorites";
import { doc, updateDoc, arrayRemove, arrayUnion } from "firebase/firestore";
import {db, auth} from "../firebase";


export const useWishlistStore = create(
    persist(
    (set, get) => ({
    wishlist: [],
    loading: false,
    setWishlist: (items) => set({ wishlist: items }),

    clearWishlist: () => set({ wishlist: [] }),
    

    addToWishlistFirestore : async (product) => {
        const prevWishlist = get().wishlist;

        set((state) => ({
           wishlist: state.wishlist.find((p) => p.id === product.id)
           ? state.wishlist
           : [...state.wishlist, product],
        }));

        try {
            const user = auth.currentUser;
            if (!user) throw new Error("No user logged in");

            const userRef = doc(db, "users", user.uid);
            await updateDoc(userRef, {
                favorites: arrayUnion(product.id),
            });
        } catch (err) {
            console.error("Failed to add to Firestore:", err);
            //Rollback if firestore fails
            set({ wishlist: prevWishlist });
        }
    },

        removeFromWishlistFirestore: async (id) => {
            const prevWishlist = get().wishlist;
            // Optimistic local update

           {/* 
                Optimistic UI update disabled:
                This line would remove the item from the local wishlist immediately,
                before Firestore confirms the change. 
                Left commented out so we only rely on Firestore for truth 
                (updates will show after refresh or `refreshWishlist()` call).
                Uncomment to enable instant UI feedback.
                */}
            {/* set({
                wishlist: prevWishlist.filter((p) => p.id !== id),
            }); */}

            try{
            const user = auth.currentUser;
            if (!user) throw new Error("No user logged in");

            const userRef = doc(db, "users", user.uid);
            await updateDoc(userRef, {
                favorites: arrayRemove(id),
            });
             } catch (err) {
                console.error("Failed to remove from firestore:", err);
                // Rollback if firestore fails
                set({ wishlist: prevWishlist });
             }
        },

            refreshWishlist: async () => {
                set({ loading: true });
                const items = await fetchFavorites();
                set({ wishlist: items, loading: false });
            },
    }),
    {
        name: "wishlist-storage",
        getStorage: () => localStorage, 
    }
)
);