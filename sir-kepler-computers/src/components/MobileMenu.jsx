import React, { useState } from 'react'
import { Link } from "react-router-dom"
import { useAuth } from '../contexts/AuthContext';
import RecenltyViewed from "../pages/RecentlyViewed";

const MobileMenu = ({ isOpen }) => {
  const { user } = useAuth();
    const [openCategory , setOpenCategory] = useState(null);

    if (!isOpen) return null;

    return (
        <div className=' bg-white border shadow-md absolute top-full left-0 w-full md:w-auto z-50'>
            <div className='flex flex-col p-4 space-y-2 text-sm'>

                {/* Categories */}
                <button
                  className="w-full text-left font-semibold md:hidden"
                onClick={() =>
                    setOpenCategory(openCategory === "categories" ? null: "categories")
                }
                >
                    Categories
                </button>


               
                    <div className={`${openCategory === "categories" ? 'block' : 'hidden'} md:block ml-4 space-y-1 text-gray-700 text-left`}>
                        <Link to="/store/laptops" className='block'>
                        • Laptops
                        </Link>
                        <Link to="/store/desktops" className='block'>
                        • Desktops
                        </Link>
                        <Link to="/store/printers" className='block'>
                        • Printers
                        </Link>
                        <Link to="/store/monitors" className='block'>
                        • Monitors
                        </Link>
                        <Link to="/store/accessories" className='block'>
                        </Link>
                        {!user &&(
                        <Link to="/recently-viewed" className='block'>
                        Recently Viewed
                        </Link>
                        
                        )}
                        
                    </div>

           
              <Link to="/report" className='block'>
                    Report a Problem
                    </Link>
              <Link to="/help" className='block'>
                     Help / FAQ
                    </Link>
              <Link to="/blogs" className="block">Blogs</Link>
              <Link to="/aboutUs" className='block'>
              About Us
              </Link>
            </div>
        </div>
    );
};

export default MobileMenu;