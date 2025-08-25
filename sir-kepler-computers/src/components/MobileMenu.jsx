import React, { useState } from 'react'
import { Link } from "react-router-dom"

const MobileMenu = ({ isOpen }) => {
    const [openCategory , setOpenCategory] = useState(null);

    if (!isOpen) return null;

    return (
        <div className=' bg-white border shadow-md absolute top-full left-0 w-full md:w-auto'>
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


               
                    <div className={`${openCategory === "categories" ? 'block' : 'hidden'} md:block ml-4 space-y-1 text-gray-700`}>
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
                    </div>
                
            <Link to="/flash-sale" className="block">
            Flash Sale
            </Link>
            <Link to="/favorites" className='block'>
            Favorites
            </Link>

            {/* Utilities */}
            <button
              onClick={() =>
                setOpenCategory(openCategory === "utilities" ? null : "utilities")
              }
              className='w-full text-left font-semibold'
              >
                Utilities
              </button>

              {openCategory === "utilities" && (
                <div className={`${openCategory === "utilities" ? 'block' : 'hidden'} ml-4 mt-2 space-y-1 text-gray-700`}>
                    <Link to="/settings" className='block'>
                    • Settings
                    </Link>
                    <Link to="/report" className='block'>
                    • Report a Problem
                    </Link>
                    <Link to="/help" className='block'>
                    • Help / FAQ
                    </Link>
                </div>
              )}

              <Link to="/blogs" className="block">Blogs</Link>
              <Link to="/about-us" className='block'>
              About Us
              </Link>
            </div>
        </div>
    );
};

export default MobileMenu;