import { create } from "zustand";
import { persist } from "zustand/middleware"
import { fetchFavorites } from "../utils/fetchFavorites";
import { doc, updateDoc, arrayRemove } from "firebase/firestore";
import {db, auth} from "../firebase";


export const useWishlistStore = create(
    persist(
    (set) => ({
    wishlist: [],
    loading: false,
    setWishlist: (items) => set({ wishlist: items }),

    addToWishlist: (product) =>
        set((state) => ({
           wishlist: state.wishlist.find((p) => p.id === product.id)
           ? state.wishlist
           : [...state.wishlist, product],
        })),

        //Firestore only, does not remove immediately
        removeFromWishlistFirestore: async (id) => {
            const user = auth.currentUser;
            if (!user) return;

            const userRef = doc(db, "users", user.uid);
            await updateDoc(userRef, {
                favorites: arrayRemove(id),
            });
             //No local update, item remains visible until next refresh
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