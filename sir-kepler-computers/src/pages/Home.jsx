import React, { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import { Link } from "react-router-dom";
import Hero from "../components/Hero";
import FlashSale from "../components/FlashSale";
import FeaturedProducts from "../components/FeaturedProducts";
import LatestArrivals from "../components/LatestArrivals";
import RandomProducts from "../components/RandomProducts";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";

    
export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
            
  // Limit the number of products on display on landing page
            const MAX_PER_SMALL_CATEGORY = 5;
            const MAX_PER_LAPTOP_BRAND = 5;

  useEffect(() => {
    async function fetchProducts() {
      try {
        setLoading(true);
        const snapshot = await getDocs(collection(db, "products"));
        const fetched = snapshot.docs.map((doc) => ({
          ...doc.data(),
        }));
        setProducts(fetched);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, []);

  // Group products by category
  const grouped = products.reduce((acc, product) => {
    const normalizedCategory = product.category?.toLowerCase() || "uncategorized";
    if (!acc[normalizedCategory]) acc[normalizedCategory] = [];
      acc[normalizedCategory].push(product);
      return acc;
  }, {});

  const handleAddToCart = (product) => {
    console.log("Added to cart:", product.name);
  };

  if (loading) return <p className="p-6 text-center">Loading Products...</p>;

    const featured = products.filter((p) => p.featured)
  return (
    <div className="container mx-auto p-4 ">
      <Hero />
      <div className="py-6">
      <FlashSale />
      </div>
      <FeaturedProducts products={featured} onAddToCart={handleAddToCart} />
      <LatestArrivals products={products} onAddToCart={handleAddToCart} />
      <RandomProducts onAddToCart={handleAddToCart} count={10} />
      <h1 className="mb-6 text-2xl pt-4 font-bold text-left">Shop by category</h1>
      
      {/* Small categories */}
      {Object.keys(grouped).map((category) => {
        if (category.toLowerCase() === "laptops") return null; // handled separately

        const items = grouped[category];
        const shuffled = [...items].sort(() => Math.random() - 0.5);
        const sample = shuffled.slice(0, MAX_PER_SMALL_CATEGORY);

        return (
            <div key={category}
            className="mb-10  rounded-2xl p-6 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] bg-gray-100 bg-opacity-80">
                {/* Section title with view all */}
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-1xl font-semibold capitalize">{category}</h2>
                    <Link
                    to={`/store/${category.toLowerCase()}`}
                    className="text-blue-500 hover:underline"
                    >
                        view All
                    </Link>
                </div>

                {/* Product grid with horizontal scroll
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 overflow-x-auto snap-x snap-mandatory">
                    {sample.map((product) => (
                        <div key={product.id} className="w-full max-w-[200px]">
                            <ProductCard
                            product={product}
                            onAddToCart={handleAddToCart}
                            />
                            </div>
                    ))}
                </div>
                 */}
                 {/* Product grid centered */}
                 <div className="flex justify-center">
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                    {sample.map((product) => (
                      <div key={product.id} className="w-full max-w-[200px]">
                        <ProductCard
                           product={product}
                           onAddToCart={handleAddToCart}
                           />
                      </div>
                    ))}
                    </div>
                  </div>
                </div>
        );
      })
      }

      {/* Laptops grouped by Brand */}
      {(() => {
        const laptops = grouped ["laptops"] || [];
        const laptopsByBrand = laptops.reduce((acc, laptop) => {
            const brand = laptop.name.split(" ")[0].toLowerCase(); //crude brand extranction
            if (!acc[brand]) acc[brand] = [];
            acc [brand].push(laptop);
            return acc;
        }, {});

        return Object.keys(laptopsByBrand).map((brand) => {
            const items = laptopsByBrand[brand];
            const shuffled = [...items].sort(() => Math.random() - 0.5);
            const sample = shuffled.slice(0, MAX_PER_LAPTOP_BRAND);

            return (
                <div key={brand} className="mb-10  rounded-2xl p-6 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] bg-gray-100 bg-opacity-80">
                    {/* Brand Selection */}
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-1xl font-semibold">Laptops - {brand}</h2>
                        <Link 
                        to={`/store/laptops/${brand.toLowerCase()}`}
                        className="text-blue-500 hover:underline"
                        >
                            View All
                        </Link>
                    </div>
                    
      <div className="flex justify-center">
  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
    {sample.map((product) => (
      <div key={product.id} className="w-full max-w-[200px]">
        <ProductCard
           product={product}
           onAddToCart={handleAddToCart}
         />
      </div>
    ))}
  </div>
</div>

    </div>
  );
});
      })()}
      </div>
  );
}