"use client";

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trash2, Plus, Minus, ArrowRight, ShieldCheck, ShoppingCart, Loader2 } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/redux/store';
import { addItemToCart, removeItemFromCart, clearCart } from '@/redux/cartSlice';
import { getProductImage } from '@/utils/imageHelper';

export default function CartPage() {
  const dispatch = useDispatch();
  const router = useRouter();
  const [isRedirecting, setIsRedirecting] = React.useState(false);
  const { items: cartItems, totalAmount, totalQuantity } = useSelector((state: RootState) => state.cart);

  const handleCheckout = () => {
    setIsRedirecting(true);
    router.push('/checkout');
  };

  const deliveryCharge = totalQuantity > 0 ? 15 : 0;
  const grandTotal = totalAmount + deliveryCharge;

  if (cartItems.length === 0) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center py-12 px-4">
        <div className="w-48 h-48 bg-gray-50 dark:bg-gray-900 rounded-full flex items-center justify-center mb-6">
          <ShoppingCart className="text-gray-200 dark:text-gray-800" size={80} />
        </div>
        <h2 className="text-2xl font-black text-gray-900 dark:text-white mb-2">Your cart is empty</h2>
        <p className="text-gray-500 dark:text-gray-400 mb-8 text-center max-w-sm">Looks like you haven't added anything to your cart yet.</p>
        <Link href="/products" className="bg-primary text-white px-10 py-4 rounded-2xl font-black hover:bg-primary-dark transition-all shadow-xl shadow-primary/20">
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-surface dark:bg-gray-950 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="flex justify-between items-end mb-8">
          <div>
            <h1 className="text-4xl font-black text-gray-900 dark:text-white">Checkout Cart</h1>
            <p className="text-gray-500 dark:text-gray-400 mt-1">{totalQuantity} items in your bag</p>
          </div>
          <button 
            onClick={() => dispatch(clearCart())}
            className="text-red-500 font-bold text-sm hover:underline"
          >
            Clear All
          </button>
        </div>

        <div className="flex flex-col lg:flex-row gap-10">
          <div className="lg:w-2/3 space-y-4">
            <AnimatePresence mode="popLayout">
              {cartItems.map((item) => (
                <motion.div 
                  layout
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  key={`${item.id}-${item.weight}`} 
                  className="bg-white dark:bg-gray-900 p-5 rounded-[2rem] shadow-sm border border-gray-100 dark:border-gray-800 flex items-center gap-6 relative group"
                >
                  <div className="relative w-24 h-24 rounded-2xl overflow-hidden shrink-0 bg-gray-50 dark:bg-gray-800">
                    <img 
                      src={getProductImage(item.image, item.category)} 
                      alt={item.name} 
                      className="object-cover w-full h-full" 
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = getProductImage(undefined, item.category);
                      }}
                    />
                  </div>
                  
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-900 dark:text-white text-lg leading-tight line-clamp-1">{item.name}</h3>
                    <p className="text-xs font-bold text-primary mt-1 uppercase tracking-wider">{item.weight}</p>
                    <div className="font-black text-xl text-gray-900 dark:text-white mt-2">₹{item.price}</div>
                  </div>

                  <div className="flex flex-col items-end justify-between self-stretch">
                    <button 
                      onClick={() => dispatch(removeItemFromCart(item.id))}
                      className="text-gray-300 hover:text-red-500 transition-colors"
                    >
                      <Trash2 size={20} />
                    </button>
                    
                    <div className="flex items-center gap-4 bg-gray-50 dark:bg-gray-800 p-1.5 rounded-xl border border-gray-100 dark:border-gray-700">
                      <button 
                        onClick={() => dispatch(removeItemFromCart(item.id))}
                        className="w-8 h-8 flex items-center justify-center bg-white dark:bg-gray-900 text-gray-900 dark:text-white rounded-lg shadow-sm font-black hover:bg-primary hover:text-white transition-all"
                      >
                        <Minus size={16} />
                      </button>
                      <span className="font-black text-gray-900 dark:text-white w-4 text-center">{item.quantity}</span>
                      <button 
                        onClick={() => dispatch(addItemToCart(item))}
                        className="w-8 h-8 flex items-center justify-center bg-white dark:bg-gray-900 text-gray-900 dark:text-white rounded-lg shadow-sm font-black hover:bg-primary hover:text-white transition-all"
                      >
                        <Plus size={16} />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            <div className="bg-blue-50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-900/30 p-6 rounded-[2rem] flex items-start gap-4 mt-8">
              <div className="p-3 bg-white dark:bg-gray-900 rounded-2xl shadow-sm">
                <ShieldCheck className="text-blue-500" size={24} />
              </div>
              <div>
                <h4 className="font-black text-blue-900 dark:text-blue-300">Safe & Hygienic Delivery</h4>
                <p className="text-sm text-blue-700 dark:text-blue-400/80 mt-1">Our delivery partners follow strict safety protocols and local guidelines for Nadia region.</p>
              </div>
            </div>
          </div>

          <div className="lg:w-1/3">
            <div className="bg-white dark:bg-gray-900 p-8 rounded-[2.5rem] shadow-xl border border-gray-100 dark:border-gray-800 sticky top-24">
              <h3 className="font-black text-gray-900 dark:text-white text-xl mb-8">Bill Summary</h3>
              
              <div className="space-y-5 mb-8">
                <div className="flex justify-between items-center">
                  <span className="text-gray-500 dark:text-gray-400 font-bold text-sm">Item Total</span>
                  <span className="font-black text-gray-900 dark:text-white">₹{totalAmount}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-500 dark:text-gray-400 font-bold text-sm">Delivery Fee</span>
                  <div className="text-right">
                    <span className="font-black text-gray-900 dark:text-white">₹{deliveryCharge}</span>
                    <p className="text-[10px] text-primary font-black uppercase tracking-tighter">Fast Delivery</p>
                  </div>
                </div>
                <div className="flex justify-between items-center pt-2">
                  <span className="text-green-500 font-black text-sm uppercase">Handling Fee</span>
                  <span className="text-green-500 font-black">FREE</span>
                </div>
              </div>

              <div className="border-t-2 border-dashed border-gray-100 dark:border-gray-800 pt-6 mb-8 flex justify-between items-center">
                <span className="font-black text-gray-900 dark:text-white text-lg">Grand Total</span>
                <span className="font-black text-3xl text-primary">₹{grandTotal}</span>
              </div>

              <button 
                onClick={handleCheckout}
                disabled={isRedirecting}
                className="w-full bg-primary text-white py-5 rounded-[1.5rem] font-black text-xl hover:bg-primary-dark transition-all shadow-xl shadow-primary/30 flex justify-center items-center gap-3 group disabled:opacity-50"
              >
                {isRedirecting ? <Loader2 className="animate-spin" /> : "Place Order"}
                {!isRedirecting && <ArrowRight size={24} className="group-hover:translate-x-2 transition-transform" />}
              </button>
              
              <p className="text-center text-[10px] text-gray-400 mt-6 font-bold uppercase tracking-widest">
                Secure 256-bit SSL Encryption
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
