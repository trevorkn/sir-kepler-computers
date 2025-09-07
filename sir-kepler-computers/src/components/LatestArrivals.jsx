import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import { collection, query, orderBy, limit, getDocs } from "firebase/firestore";
import { db } from "../firebase"

export default function LatestArrivals ({ onAddToCart }) {
    const [latestProducts, setLatestProducts] = useState([]);

    useEffect(() => {
        const fetchLatest = async () => {
            const q = query(
                collection(db, "products"),
                orderBy("createdAt", "desc"),
                limit(10)
            );
            const snapshot = await getDocs(q);
            const products = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setLatestProducts(products);
        };
        fetchLatest();
    }, []);

      return (
       /* <div className="mb-10 rounded-2xl p-6 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] bg-gray-100 bg-opacity-80"> */
           <div className="mb-10 rounded-2xl p-6 bg-gray-700 text-white shadow-lg">

            <h2 className="text-2xl font-bold text-white-400 mb-6 tracking-wide">Latest Arrivals</h2>
            <div className="flex lg:grid lg:grid-cols-5 gap-4 overflow-x-auto snap-x snap-mandatory pb-4 lg:overflow-visible">
                {latestProducts.map((product) => (
                    <div
                     key={product.id}
                     className="flex-none w-40 md:w-48 lg:w-auto snap-start"
                     >
                        <ProductCard product={product} onAddToCart={onAddToCart} />
                        </div>
                ))}
            </div>
        </div>
      );
}