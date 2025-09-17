import { useState, useEffect, useRef } from "react";
import { Link, useParams } from "react-router-dom";
import { db } from "../firebase";
import { getAverageRating } from "../utils/ratingUtils";
import { useCartStore } from "../stores/cartStore";
import { saveRecentlyViewed } from "../utils/recentlyViewed";
import { useAuth } from "../contexts/AuthContext";
import { useWishlistStore } from "../stores/wishlistStore";
import { Heart } from "lucide-react"
import RecentlyViewed from "./RecentlyViewed";
import Favorites from "./Favorites";
import { doc, getDocs, collection, where, query, getDoc, updateDoc, setDoc, arrayUnion, arrayRemove} from "firebase/firestore"

export default function ProductDetails({ onAddToCart }) {
  const { user } = useAuth();
  const { productId } = useParams(); // gets product id from url
  const [currentProduct, setCurrentProduct] = useState(null);
  const [mainImage, setMainImage] = useState("");
  const [loading, setLoading] = useState(true);
  const [added, setAdded] = useState(false);
  const [guestRecentlyViewed, setGuestRecentlyViewed] = useState([]);

    // wishlist state
  const wishlist = useWishlistStore((state) => state.wishlist);
  const addToWishlist = useWishlistStore((state) => state.addToWishlist);
  const removeFromWishlistFirestore = useWishlistStore((state) => state.removeFromWishlistFirestore);
  const [updatingWishlist, setUpdatingWishlist] = useState(false);
  const inWishlist = wishlist.some((p) => p.id === currentProduct?.id);
  const [isLiked, setIsLiked] = useState(inWishlist);

  const addToCart = useCartStore((state) => state.addToCart);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    setIsLiked(inWishlist);
  }, [inWishlist]);

useEffect(() => {
  async function fetchProduct() {
    try {
      setLoading(true);

      // Convert productId from URL (string) to number
      const numericId = Number(productId);

      // Query Firestore where "id" matches the numeric value
      const q = query(
        collection(db, "products"),
        where("id", "==", numericId)
      );

      const querySnapshot = await getDocs(q);

      if (querySnapshot.docs.length > 0) {
        const docSnap = querySnapshot.docs[0];
        const data = docSnap.data();
        const product = { id: docSnap.id, ...data };
        setCurrentProduct(product);
        setMainImage(data.images?.[0] || "");
        //recently viewed logic
        if (user) {
          // logged-in user: save to firestore
          saveRecentlyViewed(user, product).catch(console.error);
        } else {
          //Guest: update local session state
          setGuestRecentlyViewed((prev) =>{
            const filtered = prev.filter((p) => p.id !== product.id);
            return [product, ...filtered].slice(0, 20); //keep max 20
          });
        }
      } else {
        setCurrentProduct(null);
      }
    } catch (error) {
      console.error("Error fetching product:", error);
      setCurrentProduct(null);
    } finally {
      setLoading(false);
    }
  }

  if (productId) fetchProduct();
}, [productId]);


  const handleAddToCart =async () => {
    if(!currentProduct) return;
    await addToCart(currentProduct, quantity);
    setAdded(true);
    setQuantity(1);
    setTimeout(() => setAdded(false), 1500);
  };

  const toggleWishlist = async () => {
    if (!user) return alert("Please log in to use wishlist")

      if (updatingWishlist) return;
      setUpdatingWishlist(true);

      const newLikedState = !isLiked;
      setIsLiked(newLikedState);

      const userRef = doc(db, "users", user.uid);
      try {
        const userSnap = await getDoc(userRef);
        if (!userSnap.exists()) {
          await setDoc(userRef, { favorites: []}, { merge: true });
        }
        if (newLikedState) {
          addToWishlist(currentProduct);
          await updateDoc(userRef, {
            favorites: arrayUnion(currentProduct.id)

           });
        } else {
          //remove from wishlist
          removeFromWishlistFirestore(currentProduct.id);
          await updateDoc(userRef, {
            favorites: arrayRemove(currentProduct.id),
          });
        }
      } catch (err) {
        console.error("Failed to update wishlist:", err);
        alert("Error updating wishlist. Please try again.")
        setIsLiked((prev) => !prev);
      } finally {
        setUpdatingWishlist(false);
      }
  }

  if (loading) {
    return <p className="p-4 text-center">Loading product details...</p>
  }
  if(!currentProduct) {
    return <p className="p-4 text-red-500">Product not found</p>
  }

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
      {currentProduct.images?.length > 1 && (
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

      {/* Quantity selector */}
      {currentProduct.inStock && (
        <div className="mt-3 flex items-center gap-2">
          <button
           className="px-3 py-1 border rounded"
           onClick={() => setQuantity((q) => Math.max(1, q - 1))}
           >
            -
           </button>
           <span className="px-2">{quantity}</span>
           <button
            className="px-3 py-1 border rounded"
            onClick={() => setQuantity((q) => q + 1)}
            >
              +
            </button>
            </div>
      )}
      {/* Add to Cart + wishlist Row */}
      <div className="flex items-center gap-3 mt-3">
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

      {/* ❤️ Wishlist Button */}
      <button
       onClick={toggleWishlist}
       disabled={updatingWishlist}
       className={`p-2 rounded-full border ${
        updatingWishlist ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-100"
       }`}
       title={isLiked ? "Remove from wishlist" : "Add to wishlist"}
       >
        {updatingWishlist ? (
          <div className="h-5 w-5 animate-spin border-2 border-gray-300 border-t-transparent rounded-full"></div>
            ) : (
              <Heart size={20} className={isLiked ? "text-red-500 fill-red-500" : "text-gray-600"}
              fill={isLiked ? "currentColor" : "none"} />
            )}
             </button>
             </div>
          </div>
      
      {/* Average Rating */}
      {currentProduct.ratings?.count > 0 && (
        <p className="mt-2">
          ⭐ Average: {getAverageRating(currentProduct)} / 5 (
          {currentProduct.ratings.count} ratings)
        </p>
      )}
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
      <div className="p-6 max-w-5xl mx-auto">
        <h2 className="text-2xl font-bold mb-4">Recenlty Viewed</h2>
        <RecentlyViewed limit={5} />
      </div>
    </div>
  );
}
