import { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../firebase";
import { useWishlistStore } from "../stores/wishlistStore";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const refreshWishlist = useWishlistStore((state) => state.refreshWishlist);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        //Track user login state
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            setUser(currentUser);
            setLoading(false);

            if (currentUser) {
                await refreshWishlist();
            }
        });

        return () => unsubscribe();
        }, [refreshWishlist]);

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