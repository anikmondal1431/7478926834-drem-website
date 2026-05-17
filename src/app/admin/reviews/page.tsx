"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, Trash2, Star, MessageSquare, 
  Calendar, User, Package, AlertCircle 
} from 'lucide-react';

type Review = {
  id: string;
  productId: string;
  productName: string;
  customerName: string;
  rating: number;
  comment: string;
  date: string;
};

export default function ReviewManagement() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterRating, setFilterRating] = useState('All');

  useEffect(() => {
    const loadReviews = () => {
      const saved = localStorage.getItem('chakdaha_reviews');
      if (saved) {
        try {
          setReviews(JSON.parse(saved));
        } catch {}
      }
    };
    loadReviews();
  }, []);

  const deleteReview = (id: string) => {
    if (confirm('Are you sure you want to delete this review?')) {
      const updated = reviews.filter(r => r.id !== id);
      setReviews(updated);
      localStorage.setItem('chakdaha_reviews', JSON.stringify(updated));
    }
  };

  const filteredReviews = reviews.filter(review => {
    const matchSearch = review.productName.toLowerCase().includes(searchQuery.toLowerCase()) || 
                       review.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                       review.comment.toLowerCase().includes(searchQuery.toLowerCase());
    const matchRating = filterRating === 'All' || review.rating === parseInt(filterRating);
    return matchSearch && matchRating;
  });

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-black text-gray-900 dark:text-white">Customer Reviews</h1>
          <p className="text-gray-400 text-sm mt-1">Manage and moderate product reviews.</p>
        </div>
        <div className="flex items-center gap-3 bg-white dark:bg-gray-900 p-2 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm">
          <div className="px-4 py-2 bg-primary/10 rounded-xl">
            <span className="text-primary font-black text-xl">{reviews.length}</span>
            <span className="text-primary/60 text-xs font-bold uppercase ml-2">Total</span>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white dark:bg-gray-900 p-6 rounded-[2.5rem] shadow-sm border border-gray-100 dark:border-gray-800 flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          <input 
            type="text" 
            placeholder="Search reviews, products or customers..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-4 bg-gray-50 dark:bg-gray-800 border-none rounded-2xl focus:ring-4 focus:ring-primary/10 outline-none text-gray-900 dark:text-white font-medium transition-all"
          />
        </div>
        <select 
          value={filterRating}
          onChange={(e) => setFilterRating(e.target.value)}
          className="px-6 py-4 bg-gray-50 dark:bg-gray-800 border-none rounded-2xl focus:ring-4 focus:ring-primary/10 outline-none text-gray-900 dark:text-white font-bold transition-all appearance-none"
        >
          <option value="All">All Ratings</option>
          <option value="5">5 Stars</option>
          <option value="4">4 Stars</option>
          <option value="3">3 Stars</option>
          <option value="2">2 Stars</option>
          <option value="1">1 Star</option>
        </select>
      </div>

      {/* Reviews Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <AnimatePresence mode="popLayout">
          {filteredReviews.length === 0 ? (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="col-span-full py-20 text-center bg-white dark:bg-gray-900 rounded-[3rem] border-2 border-dashed border-gray-100 dark:border-gray-800"
            >
              <div className="flex flex-col items-center gap-4">
                <div className="w-20 h-20 bg-gray-50 dark:bg-gray-800 rounded-full flex items-center justify-center">
                  <MessageSquare size={32} className="text-gray-300" />
                </div>
                <div>
                  <p className="text-gray-400 font-bold text-lg">No reviews found</p>
                  <p className="text-gray-300 text-sm">Try adjusting your filters or search.</p>
                </div>
              </div>
            </motion.div>
          ) : (
            filteredReviews.map((review) => (
              <motion.div
                key={review.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="bg-white dark:bg-gray-900 p-8 rounded-[2.5rem] border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-md transition-shadow group relative overflow-hidden"
              >
                <div className="flex justify-between items-start mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gray-100 dark:bg-gray-800 rounded-2xl flex items-center justify-center text-xl">
                      👤
                    </div>
                    <div>
                      <h3 className="font-black text-gray-900 dark:text-white leading-tight">{review.customerName}</h3>
                      <div className="flex gap-0.5 mt-1">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} size={12} className={i < review.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-200 dark:text-gray-700"} />
                        ))}
                      </div>
                    </div>
                  </div>
                  <button 
                    onClick={() => deleteReview(review.id)}
                    className="p-3 text-red-400 hover:bg-red-50 dark:hover:bg-red-900/10 rounded-2xl transition-all"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-primary font-bold text-sm bg-primary/5 dark:bg-primary/10 px-4 py-2 rounded-xl w-fit">
                    <Package size={16} /> {review.productName}
                  </div>
                  
                  <p className="text-gray-600 dark:text-gray-400 font-medium leading-relaxed italic">
                    "{review.comment}"
                  </p>

                  <div className="flex items-center gap-4 pt-4 border-t border-gray-50 dark:border-gray-800 text-xs text-gray-400 font-bold uppercase tracking-widest">
                    <div className="flex items-center gap-1.5">
                      <Calendar size={14} /> {review.date}
                    </div>
                    <div className="flex items-center gap-1.5">
                      <AlertCircle size={14} /> ID: {review.id}
                    </div>
                  </div>
                </div>

                {/* Decorative element */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl -z-10 group-hover:bg-primary/10 transition-colors"></div>
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
