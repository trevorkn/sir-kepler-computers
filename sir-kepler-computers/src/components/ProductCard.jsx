import React, { useState } from 'react';
import { Link } from "react-router-dom"
import { useCartStore } from '../stores/cartStore';
import { Heart} from "lucide-react";
import { useWishlistStore } from '../stores/wishlistStore';


const formatPrice = (num, currency = "KSh") => {
    if (typeof num !== "number") return "";
    return `${currency} ${num.toLocaleString()}`;
};

  export default function ProductCard({ product , oldPrice}) {
    const { id, name, price, category, images = [] } = product || {};

    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const currentImage = images[currentImageIndex] || "/placeholder-product.png";

    const prevImage =() => {
        setCurrentImageIndex(
            (currentImageIndex - 1 + images.length) % images.length
        );
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
        const removeFromWishlist = useWishlistStore((state) => state.removeFromWishlist);



        const inWishlist = wishlist.some((p) => p.id === id);

        const toggleWishlist = () => {
            if (inWishlist) {
                removeFromWishlist(id);
            } else {
                addToWishlist(product);
            }
        };
        
    return (
        <div className="group overflow-hidden rounded-2xl bg-white text-black shadow-sm transition-transform transition-shadow duration-300 hover:-translate-y-2 hover:shadow-md">
  {/* Clickable Area (Image + Name + Price) */}
  <Link to={`/product/${id}`} className="block">
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
      </div>
    </div>
  </Link>

  {/* Independent Action Buttons (not part of the Link) */}
  <div className="px-3 pb-3 flex items-center gap-2">
    <button
      onClick={toggleWishlist}
      className="rounded-full bg-white/80 p-1 shadow hover:bg-white"
      title={inWishlist ? "Remove from wishlist" : "Add to wishlist"}
    >
      <Heart
        size={20}
        className={inWishlist ? "text-red-500" : "text-gray-600"}
        fill={inWishlist ? "currentColor" : "none"}
      />
    </button>

    <button
      type="button"
      onClick={() => addToCart(product)}
      className="rounded-xl border px-3 py-2 text-sm hover:bg-gray-50"
      aria-label={`Add ${name} to cart`}
      title="Add to cart"
    >
      🛒
    </button>
  </div>
</div>

    );
}
