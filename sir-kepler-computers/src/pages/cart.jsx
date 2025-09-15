import React, { useEffect, useState } from "react";
import { collection, doc, getDoc, getDocs, where, query } from "firebase/firestore";
import { db, auth} from "firebase";
import ProductCard from "../components/ProductCard";
import { useCartStore } from "../stores/cartStore";


export default function cart() {
    const products = useCartStore((state) => state.cart);
    const setCart = useCartStore((state) => state.setCart)
    const [Loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCart = async() => {
            setLoading(true);
            try {
                const user = auth.currentUser;
                if (!user) {
                    setCart([]);
                    setLoading(false);
                    return;
                }

              // 1. get user Document
              const userRef = doc(db, "users", user.uid);
              const userSnap = await getDoc(userRef);
              if (!userSnap.exists()) {
                console.warn("User document not found!")
                setCart([]);
                setLoading(false)
                return;
              }
              
            }
        }
    })
}
