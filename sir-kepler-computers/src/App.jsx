import { useState } from 'react'
import './App.css'
import Header from './components/Header'
import SearchResults from './components/SearchResults';
import Home from './pages/Home';
import { Routes, Route } from 'react-router-dom';
import CategoryPage from './pages/CategoryPage';
import Hero from './components/Hero'
import FlashSale from './components/FlashSale'

const App = () => {

   const handleAddToCart = (product) => {
    console.log("Added to cart:", product.name);
   };

  return (
    <div className="w-full m-0 p-0 text-center">
      
   <Header />
   <Hero />
   <FlashSale />
   <Routes>
   <Route path="/" element={<Home />} />
   <Route path="/search-results" element={<SearchResults />} />
   <Route path="/category/:category" element={<CategoryPage onAddToCart={handleAddToCart} />} />
   <Route path="/category/:category/:brand" element={<CategoryPage onAddToCart={handleAddToCart} />} />
   </Routes>
   </div>
  );
};

export default App
