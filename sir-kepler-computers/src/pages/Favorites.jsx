import React from "react";
import ProductCard from "../components/ProductCard";
import { useWishlistStore } from "../stores/wishlistStore";

export default function Favorites() {
  const products = useWishlistStore((state) => state.wishlist); // reactive subscription
  const loading = useWishlistStore((state) => state.loading);
  
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
