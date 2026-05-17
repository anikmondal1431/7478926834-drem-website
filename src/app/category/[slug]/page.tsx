"use client";

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function CategoryRedirect({ params }: { params: { slug: string } }) {
  const router = useRouter();
  
  useEffect(() => {
    // Redirect to products page with category filter
    const category = params.slug.charAt(0).toUpperCase() + params.slug.slice(1);
    router.push(`/products?category=${category}`);
  }, [params.slug, router]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
    </div>
  );
}
