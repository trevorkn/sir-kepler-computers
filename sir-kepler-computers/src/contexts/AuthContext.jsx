import { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../firebase";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        //Track user login state
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false);
        });

        return () => unsubscribe();
        }, []);

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