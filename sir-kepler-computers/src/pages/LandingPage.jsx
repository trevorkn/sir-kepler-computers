import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import shoppingCart from '../assets/landingPagepics/shopping.json'
import Lottie from 'lottie-react';
import HoverLottie from '../assets/HoverLottie';
import { useAuth } from '../contexts/AuthContext';
import UserAvator from '../components/UserAvator';

export default function LandingPage() {
    const { user } = useAuth();


return (
    <div>
       <div className='flex justify-between items-center w-full p-3'> 
    <div className=''>
 <img
    src="/sirkeplogo.jpg"
        className='h-20 pl-20'
        ></img>
  </div>
  <div>
        {/* Top Navigation */}
     <header className='flex justify-end space-x-6 w-full p-6  text-sm pr-20'>
        <Link to="/Store" className=" text-1xl font-medium ">Visit Store</Link>
    
    {/* Show UserAvator if logged in, otherwise show login link */}
    {user ? (
        <UserAvator user={user} />
    ) : (
    <Link to="/login" className='text-1xl'>Login</Link>    
    
    )}
     </header>
  
   </div>
  </div> 

{/*  Welcome Section */}
            {/* Line */}
  <div className="w-3/4 border-t-2 border-gray-400 flex items-center mx-auto"></div>
  

     {/* My version */}
     <div className='flex items-center px-20 mt-10'>
        <div className=''>
            <h1 className=' pl-20 text-4xl font-sofia flex tracking-wide'>Welcome to</h1>
            <h1 className='pl-20 font-extrabold text-6xl  py-4 font-sofia tracking-wider' style={{color: '#00027B'}}>Sir Kepler</h1>
            <h1 className='pl-20 text-2xl font-sofia'>Computers</h1>
        </div>
        <div>
            <Lottie
            animationData={shoppingCart}
            loop={true}
            autoplay={true}
            style={{ width: 300, height: 300}}
            />
        
     </div>
     <div className='flex justify-end pr-80 w-full'>
        <img 
        src="/sir-kepler-bannar.jpg"
        alt="sir kepler bannar"
        className='h-60 rounded-full object-cover'

        ></img>
     </div>
</div>
  <p className='font-imperial text-7xl item-center flex justify-center p-10'>Empowering Innovation</p>
  <div className='flex'>
  <div className='pl-40 pt-16'>
    <p className='text-2xl flex justify-center pb-5'> your one stop shop</p>
    
        <div className='flex gap-3 '>
        <span className="text-green-600">Laptops</span>
          <span className="text-red-600">Desktops</span>
          <span className="text-green-600">PC’s</span>
          <span className="text-red-600">Accessories</span>
          <span className="text-green-600 whitespace-nowrap">custom pc’s</span>
          </div>
          <div className='flex  gap-3 pt-2'>
          <span className="text-red-600">Sales</span>
          <span className="text-green-600">Repairs</span>
          <span className="text-red-600">Software solutions</span>
          <span className="text-green-600">Upgrades</span>
          </div>
  
  </div>
  <div className='justify-center flex'>
    <p className='pt-16 w-2/6 text-3xl text-center font-bold font-sofia font-solitero'>
        Your reliable tech partner, serving Pwani University, the coastal region, and Kenya at large. We deliver 
        top-quality gadgets and services right to your doorstep, wherever you are!
    </p>
    
    </div>
  </div>
  <div className='flex justify-center'>
   <p className="mt-6 font-medium text-gray-700 flex justify-center text-4xl py-16">
        delivery to you doorstep available!
      </p>
    <HoverLottie />
    </div>
   <div className="overflow-hidden w-full">
  <div className="flex gap-40 animate-scroll-left whitespace-nowrap py-20">
    {/* Acer */}
    <div className="h-20 w-32 overflow-hidden rounded-md">
      <img
        src='/compLogoImages/AcerLogo.webp'
        className='h-full w-full object-cover scale-110'
      />
    </div>

    {/* Apple */}
    <div className="h-20 w-32 overflow-hidden rounded-md">
      <img
        src='/compLogoImages/appleLogo.webp'
        className='h-full w-full object-cover scale-110'
      />
    </div>

    {/* Dell */}
    <div className="h-20 w-32 overflow-hidden rounded-full">
      <img
        src='/compLogoImages/Dell-Logo.webp'
        className='h-full w-full object-cover scale-110'
      />
    </div>

    {/* HP */}
    <div className="h-20 w-32 overflow-hidden rounded-full">
      <img
        src='/compLogoImages/HPLogoBlack.webp'
        className='h-full w-full object-cover scale-110'
      />
    </div>

    {/* Lenovo */}
    <div className="h-20 w-32 overflow-hidden">
      <img
        src='/compLogoImages/LenovoLogo.webp'
        className='h-full w-full object-cover scale-125'
      />
    </div>

    {/* Samsung */}
    <div className="h-20 w-32 overflow-hidden">
      <img
        src='/compLogoImages/samsung-logo.webp'
        className='h-full w-full object-cover scale-125'
      />
    </div>

    {/* Duplicate logos for seamless scrolling */}
    {/* Repeat the same structure here for smooth looping */}
  </div>
</div>
<div
className='flex justify-center'
>
    <p 
    className='text-2xl font-sofia w-2/3  text-center py-20'
    >
✨ Get the best deals, expert service, and reliable solutions all in one place. 👉 Shop now and power up your tech today!
</p>
</div>
{/* Call-to-action button */}
<div className="flex justify-center pb-20">
  <Link 
    to="/register" 
    className="bg-blue-700 hover:bg-blue-900 text-white font-bold py-3 px-8 rounded-full shadow-lg transition duration-300 ease-in-out transform hover:scale-105"
  >
    Create Account
  </Link>
</div>
    </div>


   
)
}