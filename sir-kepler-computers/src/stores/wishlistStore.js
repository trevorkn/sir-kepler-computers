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
        const prodId = String(product.id);

        set((state) => ({
           wishlist: state.wishlist.find((p) => String(p.id) === prodId)
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

            await get().refreshWishlist();

        } catch (err) {
            console.error("Failed to add to Firestore:", err);
            //Rollback if firestore fails
            set({ wishlist: prevWishlist });
        }
    },

        removeFromWishlistFirestore: async (id) => {
            const prevWishlist = get().wishlist;
            const targetId = String(id);
            // Optimistic local update
            set({
              wishlist: prevWishlist.filter((p) => String(p.id) !== targetId),
            });

            try{
            const user = auth.currentUser;
            if (!user) throw new Error("No user logged in");

            const userRef = doc(db, "users", user.uid);
            await updateDoc(userRef, {
                favorites: arrayRemove(id),
            });
            await get().refreshWishlist();

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