import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import { collection, query, where, getDocs } from "firebase/firestore";
import { useCartStore } from "../stores/cartStore"; 
import { db } from "../firebase"

export default function CategoryPage({ onAddToCart }) {
    const { category, brand } = useParams();
    const addToCart = useCartStore((state) => state.addToCart);

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchProducts() {
            try {
                setLoading(true);

                const normalizedCategory = category?.toLowerCase();
                let q = query(
                    collection(db, "products"),
                    where("category", "==", normalizedCategory)
                );

                let querySnapshot = await getDocs(q);
                let fetchedProducts = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));


                // Fallback: if no products found, fetch all products
                if (fetchedProducts.length === 0) {
                    console.log("No products found for this category. Fetching all products...");
                    querySnapshot = await getDocs(collection(db, "products"));
                    fetchedProducts = querySnapshot.docs.map(doc => ({
                        id: doc.id,
                        ...doc.data()
                    }));
                }

                // Filter by brand if applicable
                if (brand) {
                    fetchedProducts = fetchedProducts.filter(p =>
                        p.name.toLowerCase().includes(brand.toLowerCase())
                    );
                }

                setProducts(fetchedProducts);
            } catch (error) {
                console.error("Error fetching Products:", error);
            } finally {
                setLoading(false);
            }
        }

        fetchProducts();
    }, [category, brand]);

    return (
        <div className='container mx-auto p-4'>
            <h1 className='mb-6 text-2xl font-bold text-left capitalize'>
                {brand ? `${brand} ${category}` : category}
            </h1>

            {loading ? (
                <p>Loading products...</p>
            ) : products.length === 0 ? (
                <p>No products found.</p>
            ) : (
                <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6'>
                    {products.map(product => (
                        <ProductCard
                            key={product.id}
                            product={product}
                            onAddToCart={() => addToCart(product)}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}
