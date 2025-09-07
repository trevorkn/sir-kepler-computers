import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import { collection, query, where, orderBy, limit, getDocs } from "firebase/firestore";
import { db } from "../firebase";

export default function RandomProducts({ onAddToCart, count = 10 }) {
  const [randomProducts, setRandomProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRandomProducts = async () => {
      setLoading(true);
      try {
        const randValue = Math.random(); // pivot for randomness

        // Make sure the collection name matches exactly
        const productsCollection = collection(db, "products"); // lowercase

        // First query: rand >= randValue
        const q1 = query(
          productsCollection,
          where("rand", ">=", randValue),
          orderBy("rand"),
          limit(count)
        );
        const snapshot1 = await getDocs(q1);
        let products = snapshot1.docs.map(doc => ({ id: doc.id, ...doc.data() }));

        // Second query if not enough products
        if (products.length < count) {
          const q2 = query(
            productsCollection,
            where("rand", "<", randValue),
            orderBy("rand"),
            limit(count - products.length)
          );
          const snapshot2 = await getDocs(q2);
          products = [...products, ...snapshot2.docs.map(doc => ({ id: doc.id, ...doc.data() }))];
        }

        setRandomProducts(products);
      } catch (error) {
        console.error("Error fetching random products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRandomProducts();
  }, [count]);

  if (loading) {
    return (
      <div className="mb-10 rounded-2xl p-6 bg-gray-50 shadow-md">
        <h2 className="text-xl font-semibold mb-4">Discover More</h2>
        <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-4 lg:grid lg:grid-cols-5 lg:gap-6 lg:overflow-visible">
          {Array.from({ length: count }).map((_, i) => (
            <div key={i} className="flex-none w-40 md:w-48 lg:w-auto snap-start animate-pulse bg-gray-200 rounded-lg h-60" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="mb-10 rounded-2xl p-6 bg-gray-50 shadow-md">
      <h2 className="text-xl font-semibold mb-4">Discover More</h2>
      <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-4 lg:grid lg:grid-cols-5 lg:gap-6 lg:overflow-visible">
        {randomProducts.map((product) => (
          <div key={product.id} className="flex-none w-40 md:w-48 lg:w-auto snap-start">
            <ProductCard product={product} onAddToCart={onAddToCart} />
          </div>
        ))}
      </div>
    </div>
  );
}
