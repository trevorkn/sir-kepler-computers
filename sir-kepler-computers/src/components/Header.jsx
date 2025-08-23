import { Link, useNavigate } from 'react-router-dom';
import React, {useState} from 'react';
import { useSearchStore } from '../stores/searchStore';
import { useCartStore } from '../stores/cartStore';




const Header = () => {
    const { searchTerm, setSearchTerm, addSearchHistory, searchHistory } = useSearchStore();
    const navigate = useNavigate();

        const [isDropdownOpen, setIsDropdownOpen] = useState(false);

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
        <header className='bg-blue-900 text-white shadow-md'>
            {/* Top part*/}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center p-4 md:px-8 md:px-4">
                <div className= "flex items-center space-x-2 mb-2 md:mb-0">
                    <img src="/sirkeplogo.jpg" width="50" height="40" alt="" />
                    <Link to="/" aria-label="Home" className='font-bold text-xl'>Sir Kepler Computers</Link>
                </div>
                
                <div className="relative w-full md:w-1/3 mb-2 md:mb-0 overflow-hidden">
                <input 
                type="text" 
                value={searchTerm}
                placeholder="Search computers" 
                className="w-full px-4 py-2 rounded-l-md text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
                aria-label="Search products"
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={handleKeyDown}
                onFocus={() => setIsDropdownOpen(true)}
                onBlur={() => setTimeout(() => setIsDropdownOpen(false), 150)}
                
                 />
                 <button
                  onClick={handleSearchSubmit}
                  className='absolute right-0 top-0 h-full bg-black hover:bg-gray-800 text-white px-4 rounded-r-md'
                  >
                    Search</button>

                  {/* Dropdown */}
                  {isDropdownOpen && lastFourSearches.length > 0 && (
                    <ul
                    className="absolute left-0 right-0 mt-1 bg-white text-black rounded-md shadow-lg z-10 w-full">
                    {lastFourSearches.map((term, index) => (
                        <li 
                        key={index}
                        onMouseDown={() => handleDropdownClick(term)}
                        className="px-3 py-2 hover:bg-gray-200 cursor-pointer"
                        >
                            {term}
                            </li>
                    ))}

                    </ul>
                  )}
                  </div>
              

                <div className="flex items-center space-x-4">
                <div className="cursor-pointer" aria-label="Cart">🛒Cart: {cart.length}</div>
                <div className="cursor-pointer">Login</div>
                <div className="cursor-pointer" aria-label="Menu">☰</div>
                </div>
               </div>
                {/*Bottom part- navigation links*/}
                <nav className='bg-blue-800'>
                    <div className='container mx-auto px-4 flex justify-center space-x-6 py-2'>
                    <Link to="/" className='hover:text-gray-300 transition-colors duration-200'>Home</Link>
                    <Link to="/flash-sale" className='hover:text-gray-300 transition-colors duration-200'>Flash-Sale</Link>
                    <Link to="/featured" className='hover:text-gray-300 transition-colors duration-200'>Featured</Link>
                    <Link to="/contact-us" className='hover:text-gray-300 transition-colors duration-200'>Contact-Us</Link>
                    <Link to="/services-repair" className='hover:text-gray-300 transition-colors duration-200'>Services / Repair</Link>
                    <Link to="/blogs" className='hover:text-gray-300'>Blogs</Link>
                    </div>
                </nav>
        </header>
    )
}

export default Header;