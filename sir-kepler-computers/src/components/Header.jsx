import { Link, useNavigate } from 'react-router-dom';
import React, {useState} from 'react';
import { useSearchStore } from '../stores/searchStore';
import { useCartStore } from '../stores/cartStore';
import MobileMenu from './MobileMenu'
import { useAuth } from '../contexts/AuthContext';
import UserAvator from './UserAvator';




const Header = () => {
    const { searchTerm, setSearchTerm, addSearchHistory, searchHistory } = useSearchStore();
    const navigate = useNavigate();
    const { user } = useAuth();

        const [isDropdownOpen, setIsDropdownOpen] = useState(false);
        const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const handleSearchSubmit = () => {
        if (searchTerm.trim() !== "") {
            addSearchHistory(searchTerm);
            navigate('/search-results');
            setIsDropdownOpen(false);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter") handleSearchSubmit();
    };

    const lastFourSearches = searchHistory.slice(-4).reverse();

    const handleDropdownClick = (term) => {
        setSearchTerm(term);
        handleSearchSubmit();
    };

    const cart = useCartStore((state) => state.cart);
    return (
        <header className='relative bg-white text-black shadow-md mt-8'>
            {/* Top part*/}
            <div className="flex justify-between items-center px-4 md:px-6 py-3 border-b">
                <div className= "flex items-center space-x-2 flex-shrink">
                    <img src="/sirkeplogo.jpg" className='w-10 h-8 md:w-12 md:h-10' alt="" />
                    <Link to="/" aria-label="Home" className='font-bold text-lg sm:text-xl md:text-2xl'>Sir Kepler Computers</Link>
                </div>

                {/* Search Box */}
                <div className="flex flex-1 relative max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg mx-2">
                <input 
                type="text" 
                value={searchTerm}
                placeholder="Search ..." 
                className="flex-1 px-3 py-2 border border-gray-300 rounded-l-md text-black focus:outline-none focus:ring-2 focus:ring-gray-500 text-sm sm:text-base"
                aria-label="Search products"
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={handleKeyDown}
                onFocus={() => setIsDropdownOpen(true)}
                onBlur={() => setTimeout(() => setIsDropdownOpen(false), 150)}
                
                 />
                 <button
                  onClick={handleSearchSubmit}
                  className='px-3 sm:px-4 py-2 bg-gray-200 hover:bg-gray-300 text-sm border border-gray-300 rounded-r-md whitespace-nowrap'
                  >
                    Search</button>

                  {/* Dropdown */}
                  {isDropdownOpen && lastFourSearches.length > 0 && (
                    <ul
                    className="absolute left-0 right-0 mt-1 bg-white text-black border rounded-md shadow-md z-10">
                    {lastFourSearches.map((term, index) => (
                        <li 
                        key={index}
                        onMouseDown={() => handleDropdownClick(term)}
                        className="px-3 py-2 hover:bg-gray-200 cursor-pointer text-sm"
                        >
                            {term}
                            </li>
                    ))}

                    </ul>
                  )}
                  </div>
              
                    {/* Right Side: login*/}
                    {/* Show UserAvatar if logged in, otherwise show Login link */}
                    {user ? (
                        <UserAvator user={user} />
                    ) : (
                        <Link to="/login" className='text-1xl hover:underline cursor-pointer'>Login</Link>
                    )
                }
                
                
               </div>
               
                {/*Bottom part- navigation links*/}
                <nav className='flex items-center justify-between px-6 py-2 border-b text-sm cursor-pointer'>
                    {/* Left: hamburger placeholder (for symmetry on desktop) */}
                    <button className='w-6'
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    >☰</button>

                    {/* Center Links */}
                    <div className='flex space-x-10'>
                        <Link to="/" className='hover:underline'>Home</Link>
                        <Link to="/store" className='hover:underline'>Store</Link>
                        <Link to="/blogs" className='hover:underline'>Blogs</Link>
                        <Link to="/contact-us" className='hover:underline'>Contact Us</Link>
                    </div>

                    {/* Right: cart */}
                    <Link to="/cart" aria-label='cart' className='relative'>
                    🛒
                    {cart.length > 0 && (
                        <span className="absolute -top-2 -right-2 text-xs bg-red-600 text-white px-1 rounded-full">
                            {cart.length}
                        </span>
                    )}
                    </Link>
                </nav>

                    <MobileMenu isOpen={isMobileMenuOpen} />
        </header>
    );
};

export default Header;