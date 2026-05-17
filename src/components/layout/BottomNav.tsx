"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, ShoppingBag, ShoppingCart, Heart, PackageSearch } from 'lucide-react';
import { motion } from 'framer-motion';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';

export default function BottomNav() {
  const pathname = usePathname();
  const cartQuantity = useSelector((state: RootState) => state.cart.totalQuantity);
  const wishlistCount = useSelector((state: RootState) => state.wishlist.items.length);

  // Hide bottom nav on admin pages
  if (pathname.startsWith('/admin')) return null;

  const navItems = [
    { name: 'Home', icon: Home, path: '/' },
    { name: 'Products', icon: ShoppingBag, path: '/products' },
    { name: 'Wishlist', icon: Heart, path: '/wishlist', count: wishlistCount },
    { name: 'Track', icon: PackageSearch, path: '/orders' },
    { name: 'Cart', icon: ShoppingCart, path: '/cart', count: cartQuantity },
  ];

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800 px-2 pb-safe-area-inset-bottom shadow-[0_-4px_10px_rgba(0,0,0,0.06)]">
      <div className="flex justify-around items-center h-16">
        {navItems.map((item) => {
          const isActive = pathname === item.path || (item.path !== '/' && pathname.startsWith(item.path));
          return (
            <Link key={item.name} href={item.path} className="relative flex flex-col items-center justify-center w-full h-full">
              <div className={`flex flex-col items-center gap-1 transition-colors duration-200 ${isActive ? 'text-primary' : 'text-gray-400 dark:text-gray-500'}`}>
                <div className="relative">
                  <item.icon
                    size={22}
                    className={isActive ? 'fill-primary/10' : ''}
                  />
                  {item.count !== undefined && item.count > 0 && (
                    <span className="absolute -top-2 -right-2 bg-primary text-white text-[9px] font-black w-4 h-4 rounded-full flex items-center justify-center border-2 border-white dark:border-gray-900">
                      {item.count > 9 ? '9+' : item.count}
                    </span>
                  )}
                </div>
                <span className="text-[10px] font-bold tracking-wide uppercase">{item.name}</span>
                {isActive && (
                  <motion.div
                    layoutId="bottom-nav-indicator"
                    className="absolute -bottom-1 w-1 h-1 bg-primary rounded-full"
                  />
                )}
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
