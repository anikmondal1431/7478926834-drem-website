"use client";

import React from 'react';

export default function Terms() {
  return (
    <div className="bg-surface dark:bg-gray-950 min-h-screen py-20">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-4xl font-black text-gray-900 dark:text-white mb-10">Terms of Service</h1>
        
        <div className="bg-white dark:bg-gray-900 p-8 md:p-12 rounded-[3rem] shadow-xl border border-gray-100 dark:border-gray-800 space-y-8 text-gray-600 dark:text-gray-400">
          <section>
            <h2 className="text-xl font-black text-gray-900 dark:text-white mb-4">1. Acceptance of Terms</h2>
            <p>By accessing and using Chakdaha Bazar, you agree to be bound by these Terms and Conditions. If you do not agree, please do not use our services.</p>
          </section>

          <section>
            <h2 className="text-xl font-black text-gray-900 dark:text-white mb-4">2. Delivery Policy</h2>
            <p>We aim to deliver groceries within 15-30 minutes in Chakdaha Nadia. However, delivery times may vary based on weather, traffic, and order volume. We currently serve only specific pincodes mentioned on our checkout page.</p>
          </section>

          <section>
            <h2 className="text-xl font-black text-gray-900 dark:text-white mb-4">3. Returns & Refunds</h2>
            <p>Due to the perishable nature of our products (vegetables, fish, meat), returns are only accepted at the time of delivery if the quality is not satisfactory. Once the order is accepted, no returns will be processed unless the product is damaged or incorrect.</p>
          </section>

          <section>
            <h2 className="text-xl font-black text-gray-900 dark:text-white mb-4">4. Pricing & Payments</h2>
            <p>All prices are in INR and include applicable taxes. We reserve the right to change prices without prior notice. Payments can be made via UPI, Credit/Debit Cards, or Cash on Delivery.</p>
          </section>

          <section>
            <h2 className="text-xl font-black text-gray-900 dark:text-white mb-4">5. User Accounts</h2>
            <p>Users are responsible for maintaining the confidentiality of their account information. Any activity under your account is your responsibility.</p>
          </section>

          <div className="pt-8 border-t border-gray-100 dark:border-gray-800 text-sm italic">
            Last updated: May 15, 2026
          </div>
        </div>
      </div>
    </div>
  );
}
