import React, {useEffect, useState } from "react";
import {Trash2, Plus, Minus } from "lucide-react";
import { Link,useNavigate } from "react-router-dom";
import { useCartStore } from "../stores/cartStore";
import { doc,getDoc } from "firebase/firestore";
import {db } from "../firebase";
import { onAuthStateChanged, getAuth } from "firebase/auth";
import toast from "react-hot-toast";

export default function CartPage() {
    const cart = useCartStore((state) => state.cart);
    const updateQuantity = useCartStore((state) => state.updateQuantity);
    const removeFromCart = useCartStore((state) => state.removeFromCart);
    const getTotal = useCartStore((state) => state.getTotal);
    const getCount = useCartStore((state) => state.getCount);
    const [isVerified, setIsVerified] = useState(null);

    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
            const auth = getAuth();
            
            
            const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (!user) {
                setIsVerified(false);
                return;
            }
            try {
            const docRef = doc(db, "users", user.uid);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                setIsVerified(docSnap.data().isMobileVerified);
            } else {
                setIsVerified(false);
            }
        } catch (error) {
            console.error("Error checking verification:", error);
            setIsVerified(false);
        }
    });

        return () => unsubscribe(); //cleanup listener
}, []);

    if (cart.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center h-[70vh] text-center">
                <h2 className="text-2xl font-semibold mb-4">🛒 Your cart is empty</h2>
                <Link to="/Store" className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                Continue Shopping
                </Link>
            </div>
        );
    }

    const handleCheckout = () => {
        if (!isVerified) {
            toast.error("Please verify your mobile number before proceeding to checkout.", {
                duration: 4000,
                style: {
                    background: "#fef3c7",
                    color: "#b45309",
                    border: "1px solid #facc15",
                },
                icon: "📱"
            });
            return;
        }
        navigate("/checkout");
        toast.success("redirecting to checkout...")
    };

    return (
        <div className="max-w-4xl mx-auto p-6">
            <h1 className="text-2xl font-bold mb-6">My cart</h1>

            <div className="space-y-4">
            {cart.map((item) => (
              <div key={item.id} className="flex items-center justify-between bg-white shadow p-4 rounded-xl">
                    <div className="flex items-center gap-4">
                        <img src={item.imageURL} alt={item.name} className="w-20 h-20 object-cover rounded-lg" />
                          <div>
                          <h3 className="font-semibold">{item.name}</h3>
                          <p className="text-gray-600">
                            Kes{item.price.toLocaleString("en-KE","en-KE",{ minimumFractionDigits: 2})}
                            </p>
                          <div className="flex items-center gap-2 mt-2">
                            <button
                              className="p-1 bg-gray-200 rounded-full"
                              onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                              >
                                <Minus size={16} />
                              </button>
                              <span className="px-3">{item.quantity}</span>
                              <button
                               className="p-1 bg-gray-200 rounded-full"
                               onClick={() => updateQuantity(item.id, item.quantity + 1)}
                               >
                                <Plus size={16} />
                               </button>
                        </div>
                    </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <p className="font-semibold">
                            Kes{(item.price * item.quantity).toLocaleString("en-KE", { minimumFractionDigits: 2})}
                            </p>
                        <button 
                        onClick={() => removeFromCart(item.id)}
                        className="text-red-500 hover:text-red-700"
                        >
                            <Trash2 />
                        </button>
                        </div>
                        </div>
            ))}
        </div>

        {/* Cart Summary */}
        <div className="mt-6 bg-gray-50 p-4 rounded-xl shadow">
            <div className="flex justify-between text-lg font-medium">
                <span>Total Items:</span>
                <span>{getCount()}</span>
            </div>
            <div className="flex justify-between text-xl font-bold mt-2">
                <span>Total cost:</span>
                <span>Kes{getTotal().toLocaleString("en-KE", { minimumFractionDigits: 2})}</span>
            </div>
            <button
             onClick={handleCheckout}
             disabled={cart.length === 0}
             className={`block mt-4 w-full text-center py-3 rounded-xl font-semibold text-white ${
            cart.length === 0
                 ? "bg-gray-400 cursor-not-allowed" 
                 : isVerified === false
                 ?"bg-yellow-500 hover:bg-yellow-600"
                 : "bg-green-600 hover:bg-green-700"
        }`}
        >
          {isVerified === false
          ? "verify your account to checkout"
            : "Proceed to checkout"}
            </button>
        </div>
        </div>
    );
}
