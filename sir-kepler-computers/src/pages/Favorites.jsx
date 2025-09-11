import React, { useEffect, useState } from "react";
import { collection, doc, getDoc, query, where, getDocs } from "firebase/firestore";
import { db, auth } from "../firebase";
import ProductCard from "../components/ProductCard";
import { useWishlistStore } from "../stores/wishlistStore";

export default function Favorites() {
  const products = useWishlistStore((state) => state.wishlist); // reactive subscription
  const setWishlist = useWishlistStore((state) => state.setWishlist);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFavorites = async () => {
      setLoading(true);
      try {
        const user = auth.currentUser;
        if (!user) {
          setWishlist([]); // clear wishlist if no user
          setLoading(false);
          return;
        }

        // 1. Get user document
        const userRef = doc(db, "users", user.uid);
        const userSnap = await getDoc(userRef);
        if (!userSnap.exists()) {
          console.warn("User document not found");
          setWishlist([]);
          setLoading(false);
          return;
        }

        // 2. Get favorites array
        const favorites = userSnap.data()?.favorites || [];
        if (favorites.length === 0) {
          setWishlist([]);
          setLoading(false);
          return;
        }

        // 3. Fetch products in chunks (max 10 per Firestore query)
        const productChunks = [];
        const chunkSize = 10;
        for (let i = 0; i < favorites.length; i += chunkSize) {
          const chunk = favorites.slice(i, i + chunkSize);
          if (chunk.length === 0) continue;
          const q = query(collection(db, "products"), where("id", "in", chunk));
          const snap = await getDocs(q);
          productChunks.push(...snap.docs.map((doc) => doc.data()));
        }

        // 4. Sync Zustand store
        setWishlist(productChunks);
      } catch (err) {
        console.error("Error fetching favorites:", err);
        setWishlist([]);
      } finally {
        setLoading(false);
      }
    };

    fetchFavorites();
  }, [setWishlist]);

  return (
    <div className="p-6">
      <h2 className="mb-4 text-xl font-semibold">My Favorites ❤️</h2>

      {loading ? (
        <p>Loading favorites...</p>
      ) : products.length === 0 ? (
        <p>No Favorites yet.</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </div>
  );
}
