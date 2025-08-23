import React from "react";
import ProductCard from "../components/ProductCard";
import products from "../data/products";
import { Link } from "react-router-dom"

    
export default function Home() {
            
  // Limit the number of products on display on landing page
            const MAX_PER_SMALL_CATEGORY = 5;
            const MAX_PER_LAPTOP_BRAND = 3;

    // 1.Group products by category
    const grouped = products.reduce((acc, product) =>{
        if (!acc[product.category]) acc[product.category] = [];
            acc[product.category].push(product);
            return acc;
    },{});

  
  const handleAddToCart = (product) => {
    console.log("Added to cart:", product.name);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="mb-6 text-2xl font-bold text-left">Featured Products</h1>
      
      {/* Small categories */}
      {Object.keys(grouped).map((category) => {
        if (category === "Laptops") return null; // handled separately

        const items = grouped[category];
        const shuffled = [...items].sort(() => Math.random() - 0.5);
        const sample = shuffled.slice(0, MAX_PER_SMALL_CATEGORY);

        return (
            <div key={category} className="mb-10">
                {/* Section title with view all */}
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold">{category}</h2>
                    <Link
                    to={`/category/${category.toLowerCase()}`}
                    className="text-blue-500 hover:underline"
                    >
                        view All
                    </Link>
                </div>

                {/* Product grid with horizontal scroll */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 overflow-x-auto snap-x snap-mandatory">
                    {sample.map((product) => (
                        <div key={product.id} className="min-W-[200px] snap-start">
                            <ProductCard
                            product={product}
                            onAddToCart={handleAddToCart}
                            />
                            </div>
                    ))}
                </div>
                </div>
        );
      })}

      {/* Laptops grouped by Brand */}
      {(() => {
        const laptops = grouped ["Laptops"] || [];
        const laptopsByBrand = laptops.reduce((acc, laptop) => {
            const brand = laptop.name.split(" ") [0]; //crude brand extranction
            if (!acc[brand]) acc[brand] = [];
            acc [brand].push(laptop);
            return acc;
        }, {});

        return Object.keys(laptopsByBrand).map((brand) => {
            const items = laptopsByBrand[brand];
            const shuffled = [...items].sort(() => Math.random() - 0.5);
            const sample = shuffled.slice(0, MAX_PER_LAPTOP_BRAND);

            return (
                <div key={brand} className="mb-10">
                    {/* Brand Selection */}
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-semibold">Laptops - {brand}</h2>
                        <Link 
                        to={`/category/laptops/${brand.toLowerCase()}`}
                        className="text-blue-500 hover:underline"
                        >
                            View All
                        </Link>
                    </div>
                    
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 overflow-x-auto snap-x snap-mandatory">
        {sample.map((product) => (
            <div key={product.id} className="min-w-[200px] snap-start">
          <ProductCard
            product={product}
            onAddToCart={handleAddToCart}
          />
          </div>
        ))}
      </div>
    </div>
  );
});
      })()}
      </div>
  );
}