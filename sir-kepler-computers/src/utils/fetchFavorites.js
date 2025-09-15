import { collection, doc, getDoc, query, where, getDocs } from "firebase/firestore";
import { db, auth } from "../firebase";

export const fetchFavorites = async () => {
    const user = auth.currentUser;
    if (!user) return [];

    const userRef = doc(db, "users", user.uid);
    const userSnap = await getDoc(userRef);
    if(!userSnap.exists()) return [];
     
    const favorites = userSnap.data()?.favorites || [];
    if (favorites.length === 0) return [];

const productChunks = [];
const chunkSize = 10;
for (let i = 0; i < favorites.length; i+=chunkSize) {
    const chunk = favorites.slice(i, i + chunkSize);

    // logs
    console.log(`loop #${i / chunkSize +1}`);
    console.log(`i = ${i}`);
    console.log(`chunk items:`, chunk);

    if (chunk.length === 0) continue;
    const q = query(collection(db, "products"), where("id", "in", chunk));
    const snap = await getDocs(q);
    productChunks.push(...snap.docs.map((doc) => doc.data()));

}
    
return productChunks;
}