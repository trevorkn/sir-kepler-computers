import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { doc, setDoc, updateDoc, serverTimestamp, getDoc } from "firebase/firestore";
import { auth, db } from "../firebase";
import { User } from "lucide-react";

export const ensureUserDocument = async (user, extra = {}) => {
    if (!user?.uid)return;
    const ref = doc(db, "users", user.uid);
    
    try{
    const snap = await getDoc(ref);
    //create doc if not exitst
    if(!snap.exists()) {
        await setDoc(ref, {
            uid: user.uid,
            email: user.email || "",
            role: "customer",
            status: "active",
            createdAt: serverTimestamp(),
            lastLogin: serverTimestamp(),
            purchasedProducts: [],
            reviews: [],
            ...extra,
        });
    } else {
        // keep lastLogin fresh
        await updateDoc(ref, { lastLogin: serverTimestamp() });
    }
    }catch (err) {
        console.error("Firestore ensureUserDocument error:", err)
    }
    return ref;
};

export const signUpUser = async ({email, password, displayName, avatarFile}) => {
    const cred = await createUserWithEmailAndPassword(auth, email, password);
    const user = cred.user;
    await ensureUserDocument(user, { displayName, avatarFile });
    return user;
};

 export const loginUser = async (email, password) => {
    const cred = await signInWithEmailAndPassword(auth, email, password);
    const user = cred.user;
    await ensureUserDocument(user);
    return user;
 };

 export const logoutUser = () => signOut(auth);
