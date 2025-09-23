import React, {useEffect, useState} from "react";
import ProductCard from "../components/ProductCard";
import { doc, getDoc } from "firebase/firestore"
import { db } from "../firebase";
import { useAuth } from "../contexts/AuthContext";
import { useWishlistStore } from "../stores/wishlistStore";

export default function RecentlyViewed({ limit }){
    const { user } = useAuth();
    const [products, setProducts] = useState([]);
    const wishlist = useWishlistStore((state) => state.wishlist);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!user) {
            setProducts([]);
            setLoading(false);
            return;
        }
        const fetchRecentlyViewed = async () => {
            try {
            const userRef = doc(db, "users", user.uid);
            const userSnap = await getDoc(userRef);
            const raw = userSnap.data()?.recentlyViewed || [];

            //Deduplicate by id (keep only the latest for each id)
            const map = new Map();
            raw.forEach((p) => {
                const id = p.id;
                const image = p.image || (p.images?.[0] ?? "/placeholder.png");
                if (!map.has(id)) {
                    map.set(id, { ...p, id, image });
                }
            })

            const uniqueProducts = Array.from(map.values()).slice(0, 20);
            
            //Normalize to always have an "image" array for product card
            const normalized = uniqueProducts.map((p) => ({
                ...p,
                images: Array.isArray(p.images) ? p.images : [p.image],
            }))

            setProducts(limit ? normalized.slice(0, limit) : normalized);
        } catch (error) {
            console.error("Error fetching recently viewed products:", error);
            setProducts([]);
        } finally {
            setLoading(false);
        }
        };

        fetchRecentlyViewed();

    }, [user, limit]);

    if (loading) return <p className="p-6">Loading...</p>;
    return(
        <div className="p-6">
           {!limit &&  <h2 className="text-xl font-semibold mb-4">Recently Viewed</h2>}
            {products.length === 0 ?(
                <p className="text-gray-500">You have no recenlty viewed products.</p>
            ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
                    {products.map((p) => (
                        <ProductCard key={p.id}
                         product={p} 
                         />
                    ))}
                    </div>
            )}
        </div>
    )
}