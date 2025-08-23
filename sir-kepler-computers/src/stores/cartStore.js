import { create } from "zustand";

export const useCartStore = create ((set) => ({
    cart: [],
    
    //Add product (increase quantity if it already exists)
    addToCart: (product) =>
        set((state) => {
            const existing = state.cart.find((p) => p.id === product.id);
            if (existing) {
                return {
                    cart: state.cart.map((p) => 
                    p.id === product.id ? {...p, quantity: p.quantity + 1 } : p
                ),
                };
            }
        return {cart: [...state.cart, { ...product, quantity: 1}] };
        
    }),

    //remove product by id (or remove quantity)
    removeFromCart: (id) =>
        set((state) => {
            const existing = state.cart.find((p) => p.id === id);
            if (existing?.quantity > 1) {
                return {
                    cart: state.cart.map((p) => 
                    p.id === id ? { ...p, quantity: p.quantity - 1 } : p
                ),
                };
            }
            return { cart: state.cart.filter((p) => p.id !== id) };
        }),

        //clear cart
        clearCart: () => set({ cart: [] }),
}));