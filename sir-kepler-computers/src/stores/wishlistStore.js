import { create } from "zustand";
import { persist } from "zustand/middleware"

export const useWishlistStore = create((set) => ({
    wishlist: [],
    addToWishlist: (product) =>
        set((state) => {
            if (!state.wishlist.find((p) => p.id === product.id)) {
                return { wishlist: [...state.wishlist, product] };
            }

            return state;
        }
        ),
        removeFromWishlist: (id) =>
            set((state) => ({
                wishlist: state.wishlist.filter((p) => p.id !== id),
            })),
            setWishlist: (products) => set({ wishlist: products }),
}));