import { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth, db } from "../firebase";
import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";
import { ensureUserDocument } from "../services/auth";


const AuthContext = createContext(null);



export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            if (currentUser) {
                try {
                //Ensure Firestore doc exists and update last login
                await ensureUserDocument(currentUser);

                //Fetch Firestore user data
                const userDoc = await getDoc(doc(db, "users", currentUser.uid));
                setUser({ ...currentUser, ...(userDoc.data() || {}) });
            } catch (error) {
                console.error("Firestore user fetch error:", err);
                setUser({...currentUser });
            }
            } else {
                setUser(null);
            }
            setLoading(false);
        });
        return() => unsubscribe();
    }, []);

    const logout = async () => {
        await signOut(auth);
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, loading, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);