import { create } from "zustand";
import {auth, db } from "../firebase";
import { doc, updateDoc, setDoc, getDoc } from "firebase/firestore";

export const useCartStore = create((set, get) => ({
    cart: [],
    
    //Add product (increase quantity if it already exists)
    addToCart: async(product, quantity = 1) => {
        if (quantity < 1) quantity = 1;

        const currentCart = get().cart;
        const existingIndex = currentCart.findIndex((p) => p.id === product.id);
        
        const imageURL = 
           product.images?.[0] ||
           product.imageURL ||
           "/placeholder-product.png";
           
            let newCart;
            if (existingIndex >=0) {
                //if product exists, update it's quantity
                newCart = [...currentCart];
                newCart[existingIndex] = {
                    ...newCart[existingIndex],
                    quantity: newCart[existingIndex].quantity + quantity,
                };
            } else {
                // otherwise, add new product with initial quantity
                newCart = [
                    ...currentCart,
                     { 
                        id: product.id,
                        name: product.name,
                        price: product.price,
                        quantity,
                        imageURL,
                    },
                ];

            }
                console.log("🛒 New cart before updating Firestore:", newCart);
                set({ cart: newCart })

        //update Firestore
        const user = auth.currentUser;
        if (user) {
            try {
            const userRef = doc(db, "users", user.uid);
            console.log("🔗 Writing to Firestore for UID:", user.uid);
            await updateDoc(userRef, { cart: newCart });
            console.log("✅ Firestore updated successfully!");
        } catch(err) {
                console.error("❌ Firestore update failed:", err);
                console.log("No user found, creating new one...");
                const userRef = doc(db, "users", user.uid);
                await setDoc(userRef, {cart: newCart }, { merge: true });
            };
        }
    },

    // fetch user's cart form Firestore
    fetchCart: async () => {
        const user = auth.currentUser;
        if (!user) return;

        const userRef = doc(db, "users", user.uid);
        const snap = await getDoc(userRef);
        if (snap.exists()) {
            const data = snap.data();
            set({ cart: data.cart || [] }); //restores saved cart
        }
    },

    //update quantity
    updateQuantity: async(productId, quantity) => {
            const newCart = get().cart.map((p) =>
            p.id === productId ? {...p, quantity } : p
        );
        set({ cart: newCart });

        // Sync firestore
        const user = auth.currentUser;
        if (user) {
            await updateDoc(doc(db, "users", user.uid), {cart: newCart });
        }
    },

    //remove product by id (or remove quantity)
    removeFromCart: async (productId) =>{
        const newCart = get().cart.filter((p) =>p.id !== productId);
            set({ cart: newCart });

            const user = auth.currentUser;
            if (user) {
                await updateDoc(doc(db, "users", user.uid), { cart: newCart });
            }
        },

        //clear cart
        clearCart: async() => {set({ cart: [] });

        const user = auth.currentUser;
        if (user) {
            await updateDoc(doc(db, "users", user.uid), {cart: [] });
        }
           },

        //Get computed total price
        getTotal: () => {
            return get().cart.reduce((sum, p) => sum + p.price * p.quantity, 0);
        },

        //Get total item count
        getCount: () => {
            return get().cart.reduce((sum, p) => sum + p.quantity, 0)
        },
}));