// TODO: Add visual feedback for wishlist button when updating
// - Disable button temporarily using `disabled`
// - Add styles like opacity-50 and cursor-not-allowed
// - Maybe show a spinner while updating


import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom"
import { useCartStore } from '../stores/cartStore';
import { Heart} from "lucide-react";
import { useWishlistStore } from '../stores/wishlistStore';
import { doc, updateDoc ,setDoc ,getDoc ,arrayUnion, arrayRemove } from "firebase/firestore";
import { auth, db } from "../firebase";


const formatPrice = (num, currency = "KSh") => {
    if (typeof num !== "number") return "";
    return `${currency} ${num.toLocaleString()}`;
};

  export default function ProductCard({ product , oldPrice}) {
    const { id, name, price, category, images = [] } = product || {};

    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [updatingWishlist, setUpdatingWishlist] = useState(false);
    const [added, setAdded] = useState(false);
    const currentImage = images[currentImageIndex] || "/placeholder-product.png";

    const prevImage =() => {
        setCurrentImageIndex(
            (currentImageIndex - 1 + images.length) % images.length
        );
    };

    const handleAddToCart = async() => {
      await addToCart({
        ...product,
          images: product.images || []
      });
      setAdded(true);
       setTimeout(() => setAdded(false), 1500);
    };

    const nextImage = () => {
        setCurrentImageIndex(
            (currentImageIndex + 1) % images.length
        )
    }

    const handleImgError = (e) => {
        e.currentTarget.src = "/placeholder-product.png";
    };

        const addToCart = useCartStore((state) => state.addToCart);
        const wishlist = useWishlistStore((state) => state.wishlist);
        const addToWishlist = useWishlistStore((state) => state.addToWishlist);
        const removeFromWishlistFirestore = useWishlistStore((state) => state.removeFromWishlistFirestore);



        const inWishlist = wishlist.some((p) => p.id === id);

        const [isLiked, setIsLiked] = useState(inWishlist);

        useEffect(() => {
          setIsLiked(inWishlist);
        }, [inWishlist]);

        const toggleWishlist = async () => {
          const user = auth.currentUser;
          if (!user) return alert("Please log in to use wishlist");

          if (updatingWishlist) return;// prevent double clicks
          setUpdatingWishlist(true);

          //store new value after toggle
          const newLikedState = !isLiked;
          setIsLiked(newLikedState);

          const userRef = doc(db, "users", user.uid);
          try {
             const userSnap = await getDoc(userRef);
            if (!userSnap.exists()) {
      // Create a fresh user doc if not exists
       await setDoc(userRef, { favorites: [] }, { merge: true });
        }

       if (newLikedState) {
      addToWishlist(product);
      await updateDoc(userRef, {
        favorites: arrayUnion(product.id),
      });
            } else {
                removeFromWishlistFirestore(product.id);
                 await updateDoc(userRef, {
                  favorites: arrayRemove(product.id),
            });
            }
          } catch (err) {
            console.error("Failed to update wishlist:", err);
            alert("Error updating wishlist. Please try again.");
            // Revert local state if failed
            setIsLiked((prev) => !prev);
          } finally {
            setUpdatingWishlist(false);
          }
        };
        
    return (
        <div className="group overflow-hidden rounded-2xl bg-white text-black shadow-sm transition-transform transition-shadow duration-300 hover:-translate-y-2 hover:shadow-md">
  {/* Clickable Area (Image + Name + Price) */}
  <Link to={`/product/${product.id}`} className="block">
    <div className="relative aspect-[4/3] bg-gray-100">
      <img
        src={currentImage}
        alt={name}
        onError={handleImgError}
        className="h-full w-full object-cover"
        loading="lazy"
      />
      {category && (
        <span className="absolute left-2 top-2 rounded-full bg-black/70 px-2 py-1 text-xs text-white">
          {category}
        </span>
      )}
    </div>

    <div className="p-3 text-left">
      <h3 className="truncate text-sm font-medium" title={name}>
        {name}
      </h3>

      <div className='mt-1 flex items-center gap-2'>
        {oldPrice && (
          <span className='text-gray-500 line-through text-sm'>
            {formatPrice(oldPrice)}
          </span>
        )}
        <span className={`font-semibold ${oldPrice ? "text-red-600": ""}`}>
          {formatPrice(price)}
        </span>
        {product.ratings?.count > 0 && (
            <span className='text-yellow-500 text-sm ml-auto'>
               ⭐{(product.ratings.totalScore / product.ratings.count).toFixed(1)} 
            </span>
        )}
      </div>
    </div>
  </Link>

  {/* Independent Action Buttons (not part of the Link) */}
  <div className="px-3 pb-3 flex items-center gap-2">
   <button
  onClick={toggleWishlist}
  disabled={updatingWishlist}
  className={`rounded-full bg-white/80 p-1 shadow hover:bg-white transition-opacity ${
    updatingWishlist ? "opacity-50 cursor-not-allowed" : ""
  }`}
  title={inWishlist ? "Remove from wishlist" : "Add to wishlist"}
>
  {updatingWishlist ? (
    <div className="h-5 w-5 animate-spin border-2 border-gray-300 border-t-transparent rounded-full"></div>
  ) : (
    <Heart
      size={20}
      className={isLiked ? "text-red-500" : "text-gray-600"}
      fill={isLiked ? "currentColor" : "none"}
    />
  )}
</button>


    <button
      type="button"
      onClick={handleAddToCart}
      disabled={added}
      className={`rounded-xl border px-3 py-2 text-sm transition-colors ${
      added ? "bg-green-500 text-white" : "hover:bg-gray-50"
    }`}
      aria-label={`Add ${name} to cart`}
      title="Add to cart"
    >
      {added ? "Added!" :"🛒"}
    </button>
  </div>
</div>

    );
}
