// src/components/UserAvatar.jsx
import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { User, Heart, Package, LogOut } from "lucide-react";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { useWishlistStore } from "../stores/wishlistStore";

export default function UserAvatar({ user }) {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  const initial = user?.displayName
    ? user.displayName.charAt(0).toUpperCase()
    : "?";

  const wishlist = useWishlistStore((state) => state.wishlist);

  // Close menu on outside click
  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Avatar button */}
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="flex items-center gap-2 focus:outline-none"
        aria-expanded={open}
        aria-controls="user-menu"
      >
        {user?.photoURL ? (
          <img
            src={user.photoURL}
            alt="avatar"
            className="w-10 h-10 rounded-full object-cover border-2 border-blue-600"
          />
        ) : (
          <div className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-600 text-white font-bold">
            {initial}
          </div>
        )}
        <span className="hidden md:inline text-sm font-medium text-gray-800 truncate max-w-[100px]">
          {user?.displayName || "Guest"}
        </span>
      </button>

      {/* Dropdown menu */}
      {open && (
        <div
          id="user-menu"
          className="absolute right-0 mt-3 w-48 bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden z-50"
        >
          <Link
            to="/profile"
            className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-100"
          >
            <User size={18} /> Profile
          </Link>

          <Link
            to="/favorites"
            className="flex items-center relative gap-2 px-4 py-2 text-gray-700 hover:bg-gray-100"
          >
            <div className="flex items-center gap-2 relative w-full">
              <Heart size={18} />
              <span>Favorites</span>
              {wishlist.length > 0 && (
                <span className="absolute -top-2 -right-2 rounded-full bg-red-500 text-white text-xs px-2 py-0.5">
                  {wishlist.length}
                </span>
              )}
            </div>
          </Link>

          <Link
            to="/orders"
            className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-100"
          >
            <Package size={18} /> Orders
          </Link>

          <button
            onClick={handleLogout}
            className="flex items-center gap-2 w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100"
          >
            <LogOut size={18} /> Logout
          </button>
        </div>
      )}
    </div>
  );
}
