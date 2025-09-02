import { useState } from "react";
import { Link } from "react-router-dom";
import products from "../data/products";
import { getAverageRating } from "../utils/ratingUtils";

export default function ProductDetails({ productId, onAddToCart }) {
  const product = products.find((p) => p.id === Number(productId));

  if (!product) {
    return <p className="p-4 text-red-500">Product not found.</p>;
  }

  // Use state so you can update product info dynamically in the future
  const [currentProduct, setCurrentProduct] = useState(product);
  const [mainImage, setMainImage] = useState(product.images[0]);
  const [added, setAdded] = useState(false);

  const handleAddToCart = () => {
    onAddToCart(currentProduct);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">

      {/* Product Images */}
      <div className="flex flex-col lg:flex-row gap-6">
      <div className="flex-1">
      <img
        src={mainImage}
        alt={currentProduct.name}
        className="w-80 h-80 object-cover rounded-lg"
      />
      {currentProduct.images.length > 1 && (
        <div className="flex gap-2 mt-2 overflow-x-auto">
          {currentProduct.images.map((img, idx) => (
            <img
              key={idx}
              src={img}
              alt={`${currentProduct.name} ${idx + 1}`}
              className="w-20 h-20 object-cover rounded cursor-pointer border"
              onClick={() => setMainImage(img)}
            />
          ))}
        </div>
      )}
     </div>
     
      {/* Product Info */}
      <div className="flex-1 text-left">
      <h1 className="text-2xl font-bold mt-4">{currentProduct.name}</h1>
      <p className="text-lg mt-1">KSh {currentProduct.price}</p>
      <p className={`mt-2 font-semibold ${currentProduct.inStock ? "text-green-600" : "text-red-600"}`}>
        {currentProduct.inStock ? "in Stock" : "Out of Stock"}
      </p>

      {/* Add to Cart */}
      <button
        onClick={handleAddToCart}
        disabled={added || !currentProduct.inStock}
        className={`mt-3 px-4 py-2 rounded-lg text-white ${
          !currentProduct.inStock
          ? "bg-gray-400 cursor-not-allowed"
          : added
          ? "bg-green-500" : "bg-blue-600 hover:bg-blue-700"
        }`}
      >
        {currentProduct.inStock ? (added ? "Added!" : "Add to Cart") : "Out of Stock"}
      </button>

      {/* Average Rating */}
      {currentProduct.ratings?.count > 0 && (
        <p className="mt-2">
          ⭐ Average: {getAverageRating(currentProduct)} / 5 (
          {currentProduct.ratings.count} ratings)
        </p>
      )}
        </div>
        <div></div>
        </div>

        {/* Features Section */}
        {currentProduct.features?.length > 0 && (
          <div className="mt-6 flex justify-start">
            <div className="ml-4 max-w-md">
            <h2 className="text-lg font-semibold mb-2">Features:</h2>
            <ul className="list-disc list-inside space-y-1">
              {currentProduct.features.map((feature, idx) => (
                <li key={idx}>{feature}</li>
              ))}
            </ul>
              </div>
            </div>
        )}
      {/* Reviews Preview */}
      <div className="mt-6">
        <h2 className="text-xl font-semibold">Reviews</h2>
        {currentProduct.reviews?.length > 0 ? (
          <>
            <ul className="mt-2 space-y-2">
              {currentProduct.reviews.slice(0, 3).map((r, i) => (
                <li key={i} className="border p-2 rounded">
                  <p className="font-semibold">{r.user} ⭐ {r.stars}</p>
                  <p>{r.text}</p>
                </li>
              ))}
            </ul>

            {currentProduct.reviews.length > 3 && (
              <Link
                to={`/product/${currentProduct.id}/reviews`}
                className="mt-3 inline-block px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-800"
              >
                See All Reviews
              </Link>
            )}
          </>
        ) : (
          <p className="mt-2 text-gray-500">No reviews yet.</p>
        )}
      </div>
    </div>
  );
}
