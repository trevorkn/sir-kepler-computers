import { useState } from 'react'
import './App.css'
import Header from './components/Header'
import SearchResults from './components/SearchResults';
import Home from './pages/Home';
import { Routes, Route, useParams, Outlet, Navigate } from 'react-router-dom';
import CategoryPage from './pages/CategoryPage';
import ProductDetails from './pages/ProductDetails';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage'
import Footer from './components/Footer';
import StorePage from './pages/StorePage';
import Favorites from './pages/Favorites';
import CartPage from "./pages/CartPage";
import RecentlyViewed from './pages/RecentlyViewed';
import { useAuth } from './contexts/AuthContext';
import ProfilePage from "./pages/ProfilePage"
import ContactUs from "./pages/ContactUs"
import AboutUs from './pages/AboutUs';
import Report from "./pages/Report.jsx";


const ProductDetailsWrapper = ({ loggedInUserId, onAddToCart}) => {
  const  { productId } = useParams();
  return (
    <ProductDetails
         productId={productId}
         loggedInUserId={loggedInUserId}
         onAddToCart={onAddToCart}
         />
  );
};

//Layout for pages with header
const LayoutWIthHeader = () => (
  <div className='w-full m-0 p-0 text-center'>
   <Header />
   <Outlet /> {/* This renders the nested route content */}
  
  </div>
)
const App = () => {
  const { user } = useAuth();
   const loggedInUserId = 1;
   const handleAddToCart = (product) => {
    console.log("Added to cart:", product.name);
   };

 

  return (
  <div className='flex flex-col min-h-screen'>
  <div className='flex-grow'>
    <Routes>
      {/* Landing Page */}
      <Route path="/" element={<LandingPage />} />
       {/* Login page */}
        <Route path='/login' element={!user ? <LoginPage /> : <Navigate to="/store" />} />

        {/* Register page */}
        <Route path="/register" element={!user ? <RegisterPage />: <Navigate to="/store" />} />


                {/* Pages with Header */}
        <Route element={< LayoutWIthHeader />}>

        {/* filter */}
        <Route path="/home" element={<Home />} />
        <Route path="/store" element={<StorePage />} />
        <Route path="/store/:category" element={<CategoryPage onAddToCart={handleAddToCart} />} />
        <Route path="/store/:category/:brand" element={<CategoryPage onAddToCart={handleAddToCart} />} />

        

      {/* Homepage with Hero + FlashSale + Products 
      <Route path="/store" element={<Home />} />*/}


 {/* Search results */}
   <Route path="/search-results" element={<SearchResults />} />
  
   {/* Product details */}
   <Route path="/product/:productId"
   element={
     <ProductDetailsWrapper
     loggedInUserId={loggedInUserId}
     onAddToCart={handleAddToCart}
     />
   }
   />
   <Route path='/favorites' element={<Favorites />} />
   <Route path="/cart" element={<CartPage />} />
   <Route path='/recently-viewed' element={<RecentlyViewed />} />
   <Route path='/profile' element={<ProfilePage user={user} />} />
   <Route path='/contactUs' element={<ContactUs />} />
   <Route path='/aboutUs' element={<AboutUs />} />

   <Route path='/report' element={<Report />} />
   </Route>
   
   </Routes>
   </div>

   <Footer />
</div>
  );
};

export default App
