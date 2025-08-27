import { useState } from "react";
import products from "../data/products";
import { addReview, getAverageRating } from "../utils/ratingUtils";

export default function ProductDetails({ productId, loggedInUserId, onAddToCart }) {
  // Find product by ID (make sure ID is number)
  const product = products.find((p) => p.id === Number(productId));

  // Fallback if product not found
  if (!product) {
    return <p className="p-4 text-red-500">Product not found.</p>;
  }

  const [currentProduct, setCurrentProduct] = useState(product);
  const [newStars, setNewStars] = useState(0);
  const [newText, setNewText] = useState("");

  // Mock function: check if user bought this product
  // Replace with real logic or API call
  const userHasPurchased = product.purchasedBy?.includes(loggedInUserId);

  const handleSubmit = () => {
    if (newStars === 0 || newText.trim() === "" || !userHasPurchased) return;

    const updated = addReview(currentProduct, newStars, newText, `User-${loggedInUserId}`);
    setCurrentProduct(updated);
    setNewStars(0);
    setNewText("");
  };

  return (
    <div className="p-6 max-w-3xl mx-auto text-left">
      {/* Product Info */}
      <img
        src={currentProduct.image || "/placeholder-product.png"}
        alt={currentProduct.name}
        className="w-full h-64 object-cover rounded-lg"
      />
      <h1 className="text-2xl font-bold mt-4">{currentProduct.name}</h1>
      <p className="text-lg mt-1">KSh {currentProduct.price}</p>

      {/* Add to Cart */}
      <button
        onClick={() => onAddToCart(currentProduct)}
        className="mt-3 px-4 py-2 bg-blue-600 text-white rounded-lg"
      >
        Add to Cart
      </button>

      {/* Average Rating */}
      {currentProduct.ratings?.count > 0 && (
        <p className="mt-2">
          ⭐ Average: {getAverageRating(currentProduct)} / 5 ({currentProduct.ratings.count} ratings)
        </p>
      )}

      {/* Reviews */}
      <div className="mt-6">
        <h2 className="text-xl font-semibold">Reviews</h2>
        {currentProduct.reviews?.length > 0 ? (
          <ul className="mt-2 space-y-2">
            {currentProduct.reviews.map((r, i) => (
              <li key={i} className="border p-2 rounded">
                <p className="font-semibold">{r.user} ⭐ {r.stars}</p>
                <p>{r.text}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="mt-2 text-gray-500">No reviews yet.</p>
        )}
      </div>

      {/* Leave a Review (only if user purchased) */}
      {userHasPurchased && (
        <div className="mt-6">
          <h2 className="text-xl font-semibold">Leave a Review</h2>

          {/* Star Rating */}
          <div className="flex gap-2 mt-2">
            {[1,2,3,4,5].map((s) => (
              <button
                key={s}
                onClick={() => setNewStars(s)}
                className={`px-2 py-1 rounded ${newStars === s ? "bg-yellow-400" : "bg-gray-200"}`}
              >
                {s} ⭐
              </button>
            ))}
          </div>

          <textarea
            value={newText}
            onChange={(e) => setNewText(e.target.value)}
            placeholder="Write your review..."
            className="w-full border rounded p-2 mt-2"
          />

          <button
            onClick={handleSubmit}
            className="mt-2 px-4 py-2 bg-green-600 text-white rounded"
          >
            Submit Review
          </button>
        </div>
      )}

      {/* Message if user has not purchased */}
      {!userHasPurchased && (
        <p className="mt-4 text-red-500">You must purchase this product to leave a review.</p>
      )}
    </div>
  );
}
