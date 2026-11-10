"use client";

interface RazorpayOptions {
  key: string;
  amount: number;
  currency: string;
  name: string;
  description: string;
  order_id: string;
  handler: (response: RazorpayResponse) => Promise<void>;
  prefill: RazorpayPrefill;
  theme: RazorpayTheme;
}

declare global {
  interface Window {
    Razorpay: {
      new(options: RazorpayOptions): RazorpayInstance;
    };
  }
}

interface RazorpayInstance {
  open: () => void;
}

interface RazorpayResponse {
  razorpay_order_id: string;
}

interface RazorpayPrefill {
  name: string;
  email: string;
}

interface RazorpayTheme {
  color: string;
}

import { Session } from "next-auth";
import { useEffect, useState } from "react";
import axios from "axios";
import { addItemToCart, deleteItemFromCart, OrderItem } from "@/app/config";
import { CartItem } from "@/app/components/ui/CartItem";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import Loader2 from "@/app/components/ui/Loader2";
import Link from "next/link";

export default function Cart({ session }: { session: Session }) {
  const [items, setItems] = useState<OrderItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [totalQuantity, setTotalQuantity] = useState<number>(0);
  const [error, setError] = useState<boolean>(false);
  const [checkoutLoading, setCheckoutLoading] = useState<boolean>(false);

  useEffect(() => {
    async function fetchItems() {
      try {
        const response = await axios.get("/api/orders");
        const data2 = response.data;
        if (Array.isArray(data2)) {
          const pendingOrder = data2.find((item: { status: string }) => item.status === "pending");
          setItems(pendingOrder?.items || []);
        } else {
          setItems([]);
        }
        setLoading(false);
      } catch (e) {
        setError(true);
        setLoading(false);
        console.error("Cart fetch error:", e);
      }
    }
    fetchItems();
  }, []);

  useEffect(() => {
    setTotalPrice(getTotalPrice());
    setTotalQuantity(getTotalQuantity());
  }, [items]);

  function getTotalPrice() {
    let total = 0;
    items.forEach((item) => (total += item.menuItem.price * item.quantity));
    return total;
  }

  function getTotalQuantity() {
    let total = 0;
    items.forEach((item) => (total += item.quantity));
    return total;
  }

  function handleQuantityChange(itemId: string, newQuantity: number) {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.menuItemId === itemId ? { ...item, quantity: newQuantity } : item
      )
    );
  }

  function handleRemoveItem(itemId: string) {
    setItems((prevItems) =>
      prevItems.filter((item) => item.menuItemId !== itemId)
    );
  }

  function handle() {
    toast.promise(handleCheckout(), {
      loading: <b>Processing checkout...</b>,
      success: <b>Order confirmed!</b>,
      error: <b>Could not checkout. Please try again.</b>,
    }, {
      success: {
        duration: 1500
      }
    });
  }

  async function handleCheckout() {
    if (items.length === 0) {
      toast.error("Your cart is empty! Add items from menu first.");
      throw new Error("Empty cart");
    }

    setCheckoutLoading(true);
    try {
      const response = await axios.post("/api/payment/createOrder", {
        amount: totalPrice,
        currency: "INR",
      });
      const order = response.data;

      // If Razorpay public key is not set or mock order returned, do direct order confirmation
      if (order?.mock || !process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID) {
        setLoading(true);
        await axios.post("/api/orders/saveOrder", {
          orderId: order?.id || `order_demo_${Date.now()}`,
          totalAmount: totalPrice,
        });

        setItems([]);
        setLoading(false);
        setCheckoutLoading(false);
        return response;
      }

      const options: RazorpayOptions = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID!,
        amount: order.amount,
        currency: order.currency,
        name: "Foodiez",
        description: "Food Delivery Order",
        order_id: order.id,
        handler: async function (response: RazorpayResponse) {
          setLoading(true);
          await axios.post("/api/orders/saveOrder", {
            orderId: response.razorpay_order_id,
            totalAmount: totalPrice,
          });

          toast.success("Order placed successfully!", {
            duration: 1000,
          });
          setItems([]);
          setLoading(false);
        },
        prefill: {
          name: session?.user?.name || session?.user?.username || "Guest",
          email: session?.user?.email || "customer@foodiez.com",
        },
        theme: {
          color: "#f59e0b",
        },
      };

      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => {
        const rzp = new (window as any).Razorpay(options);
        rzp.open();
      };
      script.onerror = () => {
        console.error("Failed to load Razorpay script");
      };
      document.body.appendChild(script);

      return response;
    } catch (error) {
      console.error("Error during checkout:", error);
      throw error;
    } finally {
      setCheckoutLoading(false);
      setLoading(false);
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col lg:justify-left justify-center h-full w-full lg:px-32 md:px-16 px-4 lg:gap-8 md:gap-6 gap-4 items-center lg:mt-10 md:mt-6 mt-3 font-dmsans">
      
      <div className="text-center space-y-1">
        <h1 className="lg:text-4xl md:text-3xl text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-amber-400 via-amber-200 to-white font-fredoka">
          Your Food Cart
        </h1>
        <p className="text-gray-400 text-xs md:text-sm">
          Review your items, customize quantities, and proceed to checkout.
        </p>
      </div>

      {loading ? (
        <div className="py-20">
          <Loader2 />
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="flex lg:flex-row flex-col lg:justify-center md:gap-16 gap-10 w-full items-center lg:items-start lg:gap-16 h-full pb-16">
          
          {/* Cart Items List */}
          <div className="flex flex-col lg:gap-4 md:gap-4 gap-3 w-full justify-center items-center">
            {items.length > 0 ? (
              items.map((item: OrderItem) => (
                <CartItem
                  key={item.id}
                  id={item.menuItemId}
                  imageUrl={item.menuItem.imageUrl}
                  title={item.menuItem.name}
                  type={item.menuItem.typeName}
                  price={item.menuItem.price}
                  quantity={item.quantity}
                  onDeleteItem={handleRemoveItem}
                  onQuantityChange={handleQuantityChange}
                  addItem={() => {
                    addItemToCart(item.menuItemId, session.user);
                  }}
                  deleteItem={() => {
                    deleteItemFromCart(item.menuItemId);
                  }}
                />
              ))
            ) : (
              <div className="flex flex-col items-center justify-center p-12 bg-slate-900/80 border border-slate-800 rounded-2xl w-full max-w-lg text-center space-y-4">
                <span className="text-5xl">&#127829;</span>
                <div className="space-y-1">
                  <h3 className="text-xl font-bold text-white font-fredoka">Your cart is empty</h3>
                  <p className="text-gray-400 text-sm">Add some mouthwatering dishes from our menu!</p>
                </div>
                <Link
                  href="/dashboard#menu-section"
                  className="px-6 py-2.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-black font-semibold rounded-xl text-sm transition-all shadow-md"
                >
                  Browse Menu &rarr;
                </Link>
              </div>
            )}
          </div>

          {/* Checkout / Summary Box */}
          {items.length > 0 && (
            <div className="flex flex-col bg-slate-900/95 border border-slate-700/80 shadow-2xl lg:w-[420px] md:w-[400px] max-w-[420px] w-full h-fit rounded-2xl overflow-hidden backdrop-blur-md">
              <div className="w-full bg-gradient-to-r from-amber-600 via-amber-500 to-amber-600 py-3.5 px-6 flex justify-between items-center shadow-md">
                <h2 className="text-lg md:text-xl font-bold text-black font-fredoka tracking-wide">
                  Order Summary
                </h2>
                <span className="text-xs bg-black/20 text-black px-2.5 py-1 rounded-full font-semibold">
                  {totalQuantity} {totalQuantity === 1 ? "Item" : "Items"}
                </span>
              </div>

              <div className="flex flex-col gap-3.5 w-full p-6 text-sm">
                <div className="flex justify-between items-center text-gray-300">
                  <span>Total Quantity</span>
                  <span className="text-white font-semibold">{totalQuantity}</span>
                </div>

                <div className="flex justify-between items-center text-gray-300">
                  <span>Delivery Fee</span>
                  <span className="text-emerald-400 font-semibold flex items-center gap-1">
                    <span className="line-through text-gray-500 text-xs">&#8377;40</span> FREE
                  </span>
                </div>

                <div className="flex justify-between items-center text-gray-300">
                  <span>Restaurant Packaging</span>
                  <span className="text-emerald-400 font-semibold">FREE</span>
                </div>

                <div className="flex justify-between items-center text-gray-400 text-xs">
                  <span>Taxes &amp; GST</span>
                  <span>Included</span>
                </div>

                <hr className="border-slate-800 my-1" />

                <div className="flex justify-between items-center pt-1">
                  <span className="text-white font-bold text-base md:text-lg">Grand Total</span>
                  <span className="text-amber-400 font-bold font-mono text-xl md:text-2xl flex items-center gap-0.5">
                    &#8377;{totalPrice}
                  </span>
                </div>
              </div>

              <button
                disabled={checkoutLoading || items.length === 0}
                className="w-full py-4 px-6 bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white font-bold text-base md:text-lg shadow-lg shadow-emerald-900/40 transition-all cursor-pointer flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
                onClick={handle}
              >
                {checkoutLoading ? (
                  <>
                    <svg
                      className="animate-spin h-5 w-5 mr-2 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 00-8 8H4z"
                      ></path>
                    </svg>
                    Processing Order...
                  </>
                ) : (
                  <>
                    <span>Proceed to Checkout</span>
                    <span className="text-xl">&rarr;</span>
                  </>
                )}
              </button>
            </div>
          )}
        </motion.div>
      )}
    </motion.div>
  );
}
