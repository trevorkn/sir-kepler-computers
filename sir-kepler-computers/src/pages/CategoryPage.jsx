import React from 'react';
import { useParams } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import products from '../data/products';
import { useCartStore } from "../stores/cartStore"; 

export default function CategoryPage ({ onAddToCart}) {
    const { category, brand } = useParams(); // category and brand from URL
    const addToCart = useCartStore((state) => state.addToCart);

    //filtered products based on category (brand for laptops)
    let filtered = products.filter(p =>
        p.category.toLowerCase() === category.toLowerCase()
    );

     //Further filter by brand if brand exist in URL
if (brand) {
    filtered = filtered.filter(p => 
        p.name.toLowerCase().startsWith(brand.toLowerCase())
    );
}

return (
    <div className='container mx-auto p-4'>
        <h1 className='mb-6 text-2xl font-bold text-left'>
            {brand ? `${brand} ${category}` : category}
            </h1>

            {filtered.length === 0 ? (
                <p>No productsfound in this category.</p>
            ) : (

            <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6'>
                {filtered.map(product => (
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