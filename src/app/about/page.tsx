"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Target, Heart, Zap, ShieldCheck } from 'lucide-react';

export default function About() {
  return (
    <div className="bg-surface dark:bg-gray-950 pb-20">
      {/* Hero */}
      <section className="bg-primary text-white py-24 text-center">
        <div className="max-w-4xl mx-auto px-4">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-black mb-6"
          >
            Our Mission is <span className="text-secondary">Freshness</span>
          </motion.h1>
          <p className="text-xl text-primary-100 max-w-2xl mx-auto leading-relaxed">
            Chakdaha Bazar was born from a simple idea: everyone in Chakdaha deserves access to fresh, high-quality groceries delivered in minutes.
          </p>
        </div>
      </section>

      {/* Values */}
      <section className="max-w-7xl mx-auto px-4 -mt-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[
            { icon: Target, title: "Fast", desc: "15-30 minute delivery across Nadia.", color: "bg-blue-500" },
            { icon: Heart, title: "Local", desc: "Sourced directly from local farmers.", color: "bg-red-500" },
            { icon: Zap, title: "Fresh", desc: "Handpicked vegetables and fish.", color: "bg-amber-500" },
            { icon: ShieldCheck, title: "Secure", desc: "Trustworthy and safe transactions.", color: "bg-green-500" }
          ].map((item, idx) => (
            <motion.div 
              key={idx}
              whileHover={{ y: -10 }}
              className="bg-white dark:bg-gray-900 p-8 rounded-[2.5rem] shadow-xl border border-gray-100 dark:border-gray-800 text-center"
            >
              <div className={`${item.color} text-white w-12 h-12 rounded-2xl flex items-center justify-center mx-auto mb-6`}>
                <item.icon size={24} />
              </div>
              <h3 className="text-xl font-black mb-2 dark:text-white">{item.title}</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Story */}
      <section className="max-w-4xl mx-auto px-4 py-24">
        <div className="space-y-12">
          <div className="prose dark:prose-invert max-w-none">
            <h2 className="text-3xl font-black text-gray-900 dark:text-white mb-6">Our Story</h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
              Starting as a small initiative in the heart of Chakdaha, we noticed the struggle of local residents in finding fresh, chemical-free vegetables and quality fish without spending hours in crowded markets.
            </p>
            <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed mt-4">
              We decided to bridge this gap by creating a platform that connects local markets directly to your doorstep. Today, we serve thousands of families across the city, ensuring that the essence of our local bazaar remains accessible to everyone.
            </p>
          </div>

          <div className="bg-secondary rounded-[3rem] p-12 text-secondary-dark flex flex-col md:flex-row items-center gap-8 shadow-2xl">
            <div className="flex-1">
              <h2 className="text-3xl font-black mb-4">Join our Journey</h2>
              <p className="text-lg font-medium opacity-80">
                We are constantly expanding our range and improving our delivery network to serve you better.
              </p>
            </div>
            <button className="bg-secondary-dark text-white px-10 py-4 rounded-2xl font-black text-lg hover:bg-black transition-all">
              Start Shopping
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
