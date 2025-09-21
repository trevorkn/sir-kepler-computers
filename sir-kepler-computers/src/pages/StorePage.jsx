import React, { useEffect, useState, useRef } from "react";
import { db } from "../firebase";
import {
  collection,
  query,
  orderBy,
  where,
  getDocs,
  limit,
} from "firebase/firestore";
import ProductCard from "../components/ProductCard";
import { Funnel, X } from "lucide-react";

export default function StorePage() {
  const [products, setProducts] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [visibleCount, setVisibleCount] = useState(0);
  const [loading, setLoading] = useState(true);

  // 🔽 Filter states
  const [showFilter, setShowFilter] = useState(false);
  const [priceRange, setPriceRange] = useState([1, 100000]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedConditions, setSelectedConditions] = useState([]);
  const [featuredOnly, setFeaturedOnly] = useState(false);

  const filterRef = useRef(null);
  const PRODUCTS_PER_RENDER = window.innerWidth < 768 ? 10 : 20;

  // Fetch random products
  useEffect(() => {
    const fetchRandomProducts = async () => {
      setLoading(true);
      try {
        const randomValue = Math.random();
        const colRef = collection(db, "products");
        let q = query(
          colRef,
          where("rand", ">=", randomValue),
          orderBy("rand"),
          limit(50)
        );
        let snapshot = await getDocs(q);
        let fetched = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        if (fetched.length < PRODUCTS_PER_RENDER) {
          const q2 = query(
            colRef,
            where("rand", "<", randomValue),
            orderBy("rand"),
            limit(50)
          );
          const snapshot2 = await getDocs(q2);
          fetched = [
            ...fetched,
            ...snapshot2.docs.map((doc) => ({ id: doc.id, ...doc.data() })),
          ];
        }

        const shuffled = fetched.sort(() => 0.5 - Math.random());
        setProducts(shuffled);
        setAllProducts(shuffled);
        setVisibleCount(PRODUCTS_PER_RENDER);
      } catch (error) {
        console.error("Error fetching random products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRandomProducts();
  }, []);

  // Close filter when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (filterRef.current && !filterRef.current.contains(e.target)) {
        setShowFilter(false);
      }
    };
    if (showFilter) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showFilter]);

  const handlePriceChange = (e, index) => {
    const newRange = [...priceRange];
    newRange[index] = Number(e.target.value);
    if (newRange[0] > newRange[1]) {
      newRange.sort((a, b) => a - b);
    }
    setPriceRange(newRange);
  };

  const toggleSelection = (value, setState, current) => {
    setState(
      current.includes(value)
        ? current.filter((item) => item !== value)
        : [...current, value]
    );
  };

  const applyFilters = () => {
    let filtered = allProducts.filter(
      (p) =>
        p.price >= priceRange[0] &&
        p.price <= priceRange[1] &&
        (selectedCategories.length === 0 ||
          selectedCategories.includes(p.category)) &&
        (selectedBrands.length === 0 ||
          selectedBrands.includes(p.brand || p.name.split(" ")[0])) &&
        (selectedConditions.length === 0 ||
          selectedConditions.includes(p.condition)) &&
        (!featuredOnly || p.featured === true)
    );
    setProducts(filtered);
    setVisibleCount(PRODUCTS_PER_RENDER);
    setShowFilter(false);
  };

  const resetFilters = () => {
    setPriceRange([1, 100000]);
    setSelectedCategories([]);
    setSelectedBrands([]);
    setSelectedConditions([]);
    setFeaturedOnly(false);
    setProducts(allProducts);
    setVisibleCount(PRODUCTS_PER_RENDER);
    setShowFilter(false);
  };

  if (loading) return <p className="text-center p-6">Loading...</p>;

  return (
    <div className="container mx-auto p-4 relative">
      {/* 🔽 Funnel Icon */}
      <button
        className="fixed bottom-6 right-6 p-3 rounded-full bg-blue-600 text-white shadow-lg hover:bg-blue-700 transition z-30"
        onClick={() => setShowFilter((prev) => !prev)}
      >
        <Funnel className="w-6 h-6" />
      </button>

      {/* 🔽 Filter Panel */}
      {showFilter && (
        <div
          ref={filterRef}
          className="fixed top-0 right-0 w-full md:w-[400px] h-full bg-white shadow-2xl p-6 z-40 rounded-l-2xl animate-slide-in overflow-y-auto"
        >
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold">Filters</h2>
            <button
              onClick={() => setShowFilter(false)}
              className="p-2 hover:bg-gray-100 rounded-full"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Price Range */}
          <div className="mb-8">
            <p className="font-semibold mb-3">Price</p>
            <div className="relative w-full flex flex-col items-center">
              <div className="w-full h-[3px] bg-gray-300 absolute top-1/2 transform -translate-y-1/2 rounded" />
              <input
                type="range"
                min="1"
                max="100000"
                value={priceRange[0]}
                onChange={(e) => handlePriceChange(e, 0)}
                className="w-full appearance-none bg-transparent relative z-10"
              />
              <input
                type="range"
                min="2"
                max="100000"
                value={priceRange[1]}
                onChange={(e) => handlePriceChange(e, 1)}
                className="w-full appearance-none bg-transparent relative z-10 -mt-6"
              />
              <span className="mt-8 text-sm font-medium">
                {priceRange[0].toLocaleString()} - {priceRange[1].toLocaleString()}
              </span>
            </div>
          </div>

          {/* Category */}
          <div className="mb-8">
            <p className="font-semibold mb-3">Category</p>
            <div className="flex flex-wrap gap-2">
              {["laptops", "accessories", "monitors", "desktops"].map((cat) => (
                <button
                  key={cat}
                  onClick={() =>
                    toggleSelection(cat, setSelectedCategories, selectedCategories)
                  }
                  className={`px-3 py-1 rounded-full text-sm transition ${
                    selectedCategories.includes(cat)
                      ? "bg-blue-600 text-white shadow"
                      : "bg-gray-200 hover:bg-gray-300"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Brand */}
          <div className="mb-8">
            <p className="font-semibold mb-3">Brand</p>
            <div className="flex flex-wrap gap-2">
              {["HP", "Dell", "Macbook", "Lenovo"].map((brand) => (
                <button
                  key={brand}
                  onClick={() =>
                    toggleSelection(brand, setSelectedBrands, selectedBrands)
                  }
                  className={`px-3 py-1 rounded-full text-sm transition ${
                    selectedBrands.includes(brand)
                      ? "bg-blue-600 text-white shadow"
                      : "bg-gray-200 hover:bg-gray-300"
                  }`}
                >
                  {brand}
                </button>
              ))}
            </div>
          </div>

          {/* Condition */}
          <div className="mb-8">
            <p className="font-semibold mb-3">Condition</p>
            <div className="flex flex-wrap gap-2">
              {["New", "Refurbished"].map((cond) => (
                <button
                  key={cond}
                  onClick={() =>
                    toggleSelection(cond, setSelectedConditions, selectedConditions)
                  }
                  className={`px-3 py-1 rounded-full text-sm transition ${
                    selectedConditions.includes(cond)
                      ? "bg-blue-600 text-white shadow"
                      : "bg-gray-200 hover:bg-gray-300"
                  }`}
                >
                  {cond}
                </button>
              ))}
            </div>
          </div>

          {/* Featured */}
          <div className="mb-8">
            <p className="font-semibold mb-3">Featured</p>
            <button
              onClick={() => setFeaturedOnly((prev) => !prev)}
              className={`px-4 py-2 rounded-lg text-sm transition ${
                featuredOnly
                  ? "bg-blue-600 text-white shadow"
                  : "bg-gray-200 hover:bg-gray-300"
              }`}
            >
              {featuredOnly ? "✔ Featured Only" : "Show Featured Only"}
            </button>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 mt-10">
            <button
              onClick={applyFilters}
              className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              Apply
            </button>
            <button
              onClick={resetFilters}
              className="flex-1 px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition"
            >
              Reset
            </button>
          </div>
        </div>
      )}

      <h1 className="text-2xl font-bold mb-6 mt-12">Happy Shopping!!</h1>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {products.slice(0, visibleCount).map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {/* Load More Button */}
      {visibleCount < products.length && (
        <div className="text-center mt-6">
          <button
            onClick={() =>
              setVisibleCount((prev) =>
                Math.min(prev + PRODUCTS_PER_RENDER, products.length)
              )
            }
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Load More
          </button>
        </div>
      )}

      {visibleCount >= products.length && products.length > 0 && (
        <p className="text-center py-6 text-gray-500">No more products</p>
      )}
    </div>
  );
}
