"use client";

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Phone, ShoppingBag, CheckCircle2, Clock, Truck, Home, Star, X } from 'lucide-react';
import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function OrderTrackingPage({ params }: { params: { id: string } }) {
  const steps = [
    { title: "Order Placed", desc: "We have received your order", icon: ShoppingBag, status: "completed", time: "10:30 AM" },
    { title: "Order Confirmed", desc: "Seller has confirmed your order", icon: CheckCircle2, status: "completed", time: "10:35 AM" },
    { title: "On the Way", desc: "Rider is heading to your location", icon: Truck, status: "current", time: "10:45 AM" },
    { title: "Delivered", desc: "Order delivered to your doorstep", icon: Home, status: "completed", time: "11:00 AM" },
  ];

  const [showReviewModal, setShowReviewModal] = useState(false);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [customerName, setCustomerName] = useState('');

  useEffect(() => {
    const user = localStorage.getItem('chakdaha_user');
    if (user) {
      try {
        const parsed = JSON.parse(user);
        setCustomerName(parsed.name || '');
      } catch {}
    }
  }, []);

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newReview = {
      id: `REV-${Date.now()}`,
      productId: "1", // Hardcoded for dummy tracking
      productName: "Fresh Local Rohu Fish (Cut)",
      customerName: customerName || 'Anonymous Customer',
      rating,
      comment,
      date: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
    };

    const existingReviews = JSON.parse(localStorage.getItem('chakdaha_reviews') || '[]');
    localStorage.setItem('chakdaha_reviews', JSON.stringify([newReview, ...existingReviews]));

    setShowReviewModal(false);
    setComment('');
    setRating(5);
    alert('Review submitted successfully!');
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-10">
        <div>
          <Link href="/orders" className="text-primary font-bold text-sm hover:underline mb-2 block">← Back to Orders</Link>
          <h1 className="text-3xl font-black text-gray-900 dark:text-white">Track Order {params.id}</h1>
        </div>
        <div className="flex flex-wrap gap-3">
          <div className="bg-green-500 text-white px-4 py-2 rounded-xl font-bold text-sm flex items-center gap-2">
            <CheckCircle2 size={16} /> Order Delivered
          </div>
          <button 
            onClick={() => setShowReviewModal(true)}
            className="bg-primary text-white px-4 py-2 rounded-xl font-bold text-sm flex items-center gap-2 hover:bg-primary-dark transition-all"
          >
            <Star size={16} /> Rate Experience
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Tracking Timeline */}
        <div className="lg:col-span-2 space-y-8 bg-white dark:bg-gray-900 p-8 rounded-[2.5rem] border border-gray-100 dark:border-gray-800 shadow-sm">
          {steps.map((step, idx) => (
            <div key={idx} className="relative flex gap-6">
              {idx !== steps.length - 1 && (
                <div className={`absolute left-6 top-12 w-0.5 h-12 ${step.status === 'completed' ? 'bg-primary' : 'bg-gray-100 dark:bg-gray-800'}`}></div>
              )}
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 z-10 transition-colors ${
                step.status === 'completed' ? 'bg-primary text-white' : 
                step.status === 'current' ? 'bg-primary/10 text-primary ring-4 ring-primary/10' : 
                'bg-gray-50 dark:bg-gray-800 text-gray-400'
              }`}>
                <step.icon size={22} />
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <h3 className={`font-black ${step.status === 'pending' ? 'text-gray-400' : 'text-gray-900 dark:text-white'}`}>
                    {step.title}
                  </h3>
                  <span className="text-xs font-bold text-gray-400">{step.time}</span>
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Rider Info & Delivery Address */}
        <div className="space-y-6">
          <div className="bg-white dark:bg-gray-900 p-6 rounded-[2rem] border border-gray-100 dark:border-gray-800 shadow-sm">
            <h3 className="font-black text-gray-900 dark:text-white mb-4">Delivery Partner</h3>
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-gray-100 rounded-2xl flex items-center justify-center text-2xl">
                👤
              </div>
              <div>
                <p className="font-bold text-gray-900 dark:text-white">Biswajit Das</p>
                <div className="flex items-center gap-1 text-xs text-primary font-bold">
                  ⭐ 4.9 (120+ Deliveries)
                </div>
              </div>
            </div>
            <button className="w-full mt-4 bg-primary text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-primary-dark transition-all">
              <Phone size={18} /> Call Rider
            </button>
          </div>

          <div className="bg-white dark:bg-gray-900 p-6 rounded-[2rem] border border-gray-100 dark:border-gray-800 shadow-sm">
            <h3 className="font-black text-gray-900 dark:text-white mb-4">Delivery Address</h3>
            <div className="flex gap-3">
              <MapPin className="text-gray-400 shrink-0" size={20} />
              <p className="text-sm text-gray-600 dark:text-gray-400">
                House No. 45, Palpara Station Road, Chakdaha, Nadia - 741222
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Review Modal */}
      <AnimatePresence>
        {showReviewModal && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }} 
            className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4"
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }} 
              animate={{ scale: 1, opacity: 1, y: 0 }} 
              exit={{ scale: 0.9, opacity: 0, y: 20 }} 
              className="bg-white dark:bg-gray-900 rounded-[2.5rem] w-full max-w-md p-8 shadow-2xl relative"
            >
              <button 
                onClick={() => setShowReviewModal(false)} 
                className="absolute top-6 right-6 p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full text-gray-500"
              >
                <X size={24} />
              </button>

              <h2 className="text-2xl font-black text-gray-900 dark:text-white mb-2">How was your order?</h2>
              <p className="text-gray-500 dark:text-gray-400 mb-6 font-medium">Rate your experience with Chakdaha Bazar</p>

              <form onSubmit={handleReviewSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-black text-gray-400 uppercase tracking-widest mb-3">Rating</label>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setRating(star)}
                        className={`transition-all ${rating >= star ? 'text-yellow-400' : 'text-gray-200 dark:text-gray-700'}`}
                      >
                        <Star size={32} fill={rating >= star ? 'currentColor' : 'none'} />
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-black text-gray-400 uppercase tracking-widest mb-3">Your Name</label>
                  <input
                    type="text"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="Enter your name"
                    className="w-full px-5 py-4 bg-gray-50 dark:bg-gray-800 border-none rounded-2xl focus:ring-4 focus:ring-primary/10 outline-none text-gray-900 dark:text-white font-bold"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-black text-gray-400 uppercase tracking-widest mb-3">Comment</label>
                  <textarea
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Tell us what you liked..."
                    rows={4}
                    className="w-full px-5 py-4 bg-gray-50 dark:bg-gray-800 border-none rounded-2xl focus:ring-4 focus:ring-primary/10 outline-none text-gray-900 dark:text-white font-medium"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-primary text-white py-5 rounded-[2rem] font-black text-lg shadow-xl shadow-primary/20 hover:scale-[1.02] transition-all"
                >
                  Submit Feedback
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
