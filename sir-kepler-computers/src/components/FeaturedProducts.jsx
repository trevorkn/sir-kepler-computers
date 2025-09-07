import React from "react";
import ProductCard from "./ProductCard";

export default function FeaturedProducts({ products = [], onAddToCart }) {
    const FEATURED_ROWS = 2;
    const FEATURED_PER_ROW = 5;

    //split products into rows
const rows = [];
for (let i = 0; i < FEATURED_ROWS; i++) {
    rows.push(products.slice(i * FEATURED_PER_ROW, (i + 1) * FEATURED_PER_ROW));
}

return (
    <div className="mb-10 rounded-2xl p-6 bg-gradient-to-r from-blue-100 via-white to-blue-100 shadow-sm">
        <h2 className="text-xl font-semibold mb-4">Featured Products</h2>

        {rows.map((row, rowIndex) => (
            <div
              key={rowIndex}
                className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-4 lg:grid lg:grid-cols-5 lg:gap-6 lg:overflow-visible"
                >
                    {row.map((product) => (
                        <div
                          key={product.id}
                          className="flex-none w-40 md:w-48 lg:w-auto snap-start"
                          >
                            <ProductCard product={product} onAddToCart={onAddToCart} />
                            </div>
                    ))}
                    </div>
        ))}
    </div>
);
}