import { doc, updateDoc, arrayUnion, getDoc, setDoc } from "firebase/firestore";
import { db } from "../firebase";

export async function saveRecentlyViewed(user, product) {
    if (!user) return;

    const userRef = doc(db, "users", user.uid);
    const userSnap = await getDoc(userRef);
    const current = userSnap.data()?.recentlyViewed || [];

    //Remove any previous entry of the same product
    const filtered = current.filter((p) => p.id !==product.id);

    const updated = [{
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.images?.[0] || "",
            viewedAt: new Date(),
        }, ...filtered].slice(0, 20); //keep last 20
   await setDoc(userRef,{recentlyViewed: updated }, { merge: true });
}