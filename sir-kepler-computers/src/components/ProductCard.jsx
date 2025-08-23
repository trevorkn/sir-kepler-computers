import React, { useState } from 'react';
import { Link } from "react-router-dom"
import { useCartStore } from '../stores/cartStore';



const formatPrice = (num, currency = "KSh") => {
    if (typeof num !== "number") return "";
    return `${currency} ${num.toLocaleString()}`;
};

  export default function ProductCard({ product }) {
    const { id, name, price, category, images = [] } = product || {};
    const imgSrc = images[0] || "/placeholder-product.png";

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

    return (
        <div className="group overflow-hidden rounded-2xl bg-white text-black shadow-sm transition-shadow hover:shadow-md">
            {/* Image Section */}
            
            <div className="relative aspect-[4/3] bg-gray-100">
                <img
                    src={currentImage}
                    alt={name}
                    onError={handleImgError}
                    className="h-full w-full object-cover"
                    loading="lazy"
                />

                {images.length > 1 && (
                    <>
                      <button 
                      onClick={prevImage}
                      className='absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-black/50 px-2 py-1 text-white hover:bg-black/70'
                      >
                        &#8249;
                      </button>
                      <button
                         onClick={nextImage}
                         className='absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-black/50 px-2 py-1 text-white hover:bg-black/70'
                         >
                            &#8250;
                         </button>
                    </>
                )}
                {category && (
                    <span className="absolute left-2 top-2 rounded-full bg-black/70 px-2 py-1 text-xs text-white">
                        {category}
                    </span>
                )}
        </div>
        {/*body*/}
        <div className="p-3 text-left">
            <h3 className="truncate text-sm font-medium" title={name}>
                {name}
            </h3>
            <p className="mt-1 text-base font-semibold" >{formatPrice(price)}</p>

            <div className="mt-3 flex gap-2">
                <Link
                    to={`/product/${id}`}
                    className="flex-1 rounded-md bg-blue-600 px-3 py-2 text-center text-sm font-medium text-white hover:bg-blue-700"
                    >
                        view details
                    </Link>
        <button
        type="button"
        onClick={() => addToCart(product)}
        className="rounded-xl border px-3 py-2 text-sm text-sm hover:bg-gray-50"
        aria-label={`Add ${name} to cart`}
        title="Add to cart"
        >
            🛒
        </button>
        </div>
        </div>
        </div>
    );
}
