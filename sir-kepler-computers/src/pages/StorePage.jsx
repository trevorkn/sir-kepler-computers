import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import ProductCard from "../components/ProductCard";

export default function StorePage() {
    const { category } = useParams();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            try {
                   const formattedCategory =
          category.charAt(0).toUpperCase() + category.slice(1);

        console.log("Fetching products for:", formattedCategory);

                const productsRef = collection(db, "products");
                const q = query(productsRef, where("category", "==", formattedCategory));
                const querySnapshot = await getDocs(q);
                const items = querySnapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                setProducts(items);
            } catch (error) {
                console.error("Error fetching products:", error);
            }
            setLoading(false);
        };
        fetchProducts();
    }, [category]);

    if (loading) return <p className="p-4">Loading {category}...</p>;

    return (
        <div className="p-4">
            <h1 className="text-xl font-bold mb-4 capitalize">{category}</h1>
            {products.length === 0 ? (
                <p>No products found in {category}</p>
            ) : (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
                </div>
            )}
        </div>
    );
}