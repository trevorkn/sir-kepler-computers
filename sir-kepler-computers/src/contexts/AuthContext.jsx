import { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../firebase";
import { useWishlistStore } from "../stores/wishlistStore";
import { useCartStore } from "../stores/cartStore";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const refreshWishlist = useWishlistStore((state) => state.refreshWishlist);
    const clearWishlist = useWishlistStore((state) => state.clearWishlist);
    const fetchCart = useCartStore((state) => state.fetchCart);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        //Track user login state
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            setUser(currentUser);
            setLoading(false);

            if (currentUser) {
                await refreshWishlist();
                await fetchCart();
            } else {
                clearWishlist();
            }
        });

        return () => unsubscribe();
        }, [refreshWishlist, fetchCart]);

        const logout = async () => {
            await signOut(auth);
        };

        return(
            <AuthContext.Provider value={{ user, loading, logout}}>
                {children}
            </AuthContext.Provider>
        ); 
};

export const useAuth = () => useContext(AuthContext);