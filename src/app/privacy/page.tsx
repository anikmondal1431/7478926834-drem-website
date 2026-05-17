"use client";

import React from 'react';
import Link from 'next/link';

export default function GenericInfoPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-20 text-center">
      <h1 className="text-4xl font-black text-gray-900 mb-6">Privacy Policy</h1>
      <p className="text-lg text-gray-600 mb-8">
        Your privacy is important to us. This policy explains how we handle your data.
      </p>
      <Link href="/" className="bg-primary text-white px-8 py-3 rounded-xl font-bold hover:bg-primary-dark transition-colors">
        Back to Home
      </Link>
    </div>
  );
}
