"use client";

import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/redux/store';
import { toggleWishlist } from '@/redux/wishlistSlice';
import { addItemToCart } from '@/redux/cartSlice';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, ShoppingCart, Trash2, ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function WishlistPage() {
  const wishlistItems = useSelector((state: RootState) => state.wishlist.items);
  const dispatch = useDispatch();

  if (wishlistItems.length === 0) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center px-4">
        <div className="w-24 h-24 bg-red-50 dark:bg-red-900/20 rounded-full flex items-center justify-center mb-6">
          <Heart className="text-red-400" size={48} />
        </div>
        <h1 className="text-2xl font-black text-gray-900 dark:text-white mb-2">Your wishlist is empty</h1>
        <p className="text-gray-500 dark:text-gray-400 mb-8 text-center max-w-xs">Save items you love and they will appear here.</p>
        <Link href="/products" className="bg-primary text-white px-8 py-4 rounded-2xl font-bold flex items-center gap-2 hover:bg-primary-dark transition-all">
          Explore Products <ArrowRight size={20} />
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-black text-gray-900 dark:text-white mb-8">My Wishlist ({wishlistItems.length})</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence>
          {wishlistItems.map((item) => (
            <motion.div 
              key={item.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-white dark:bg-gray-900 p-4 rounded-3xl border border-gray-100 dark:border-gray-800 flex items-center gap-4 group"
            >
              <div className="relative w-24 h-24 rounded-2xl overflow-hidden shrink-0">
                <Image src={item.image} alt={item.name} fill className="object-cover" />
              </div>
              
              <div className="flex-1">
                <h3 className="font-bold text-gray-900 dark:text-white line-clamp-1">{item.name}</h3>
                <p className="font-black text-primary text-lg mt-1">₹{item.price}</p>
                
                <div className="flex gap-2 mt-3">
                  <button 
                    onClick={() => dispatch(addItemToCart({ ...item, weight: 'Default' }))}
                    className="flex-1 bg-primary/10 text-primary hover:bg-primary hover:text-white py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1"
                  >
                    <ShoppingCart size={14} /> Add
                  </button>
                  <button 
                    onClick={() => dispatch(toggleWishlist(item))}
                    className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl transition-colors"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
