"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Search, MapPin, Sun, Moon, ShoppingCart, Heart, PackageSearch, ClipboardList, Home, User, LogOut } from 'lucide-react';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';

export default function Navbar() {
  const [mounted, setMounted] = useState(false);
  const [pincode] = useState("741222");
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const cartQuantity = useSelector((state: RootState) => state.cart.totalQuantity);
  const wishlistCount = useSelector((state: RootState) => state.wishlist.items.length);
  const [user, setUser] = useState<any>(null);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Initialize theme from localStorage or system preference
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
      setIsDarkMode(true);
      document.documentElement.classList.add('dark');
    } else {
      setIsDarkMode(false);
      document.documentElement.classList.remove('dark');
    }

    // Load user session
    const session = localStorage.getItem('chakdaha_user_session');
    if (session) {
      try { setUser(JSON.parse(session)); } catch {}
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('chakdaha_user_session');
    setUser(null);
    setShowProfileDropdown(false);
    window.location.reload();
  };

  const toggleTheme = () => {
    if (isDarkMode) {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
      setIsDarkMode(false);
    } else {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
      setIsDarkMode(true);
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-40 bg-white/90 dark:bg-gray-900/90 backdrop-blur-md border-b border-gray-100 dark:border-gray-800 shadow-sm transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 gap-4">

          {/* Logo & Location */}
          <div className="flex items-center gap-4 shrink-0">
            <Link href="/" className="flex items-center">
              <span className="text-xl md:text-2xl font-black bg-gradient-to-r from-primary to-primary-light bg-clip-text text-transparent whitespace-nowrap">
                Chakdaha Bazar
              </span>
            </Link>
            <div className="hidden lg:flex flex-col cursor-pointer group">
              <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Delivery to</span>
              <div className="flex items-center text-sm font-semibold text-primary">
                <MapPin size={14} className="mr-1" />
                <span>{pincode}</span>
              </div>
            </div>
          </div>

          {/* Search Bar */}
          <div className="flex flex-1 max-w-md">
            <div className="relative w-full">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search size={16} className="text-gray-400" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for essentials..."
                className="w-full pl-9 pr-4 py-2 border border-gray-200 dark:border-gray-700 rounded-xl bg-gray-50 dark:bg-gray-800 dark:text-white focus:bg-white dark:focus:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200 text-sm"
              />
            </div>
          </div>

          {/* Desktop Right Actions */}
          <div className="hidden md:flex items-center gap-1">
            
            {/* Home Link */}
            <Link
              href="/"
              className="flex flex-col items-center px-3 py-1.5 rounded-xl text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-primary transition-all group"
            >
              <Home size={20} className="group-hover:scale-110 transition-transform" />
              <span className="text-[10px] font-bold mt-0.5 whitespace-nowrap">Home</span>
            </Link>

            {/* Track Order */}
            <Link
              href="/orders"
              className="flex flex-col items-center px-3 py-1.5 rounded-xl text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-primary transition-all group"
            >
              <PackageSearch size={20} className="group-hover:scale-110 transition-transform" />
              <span className="text-[10px] font-bold mt-0.5 whitespace-nowrap">Track</span>
            </Link>

            {/* My Orders */}
            <Link
              href="/orders"
              className="flex flex-col items-center px-3 py-1.5 rounded-xl text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-primary transition-all group"
            >
              <ClipboardList size={20} className="group-hover:scale-110 transition-transform" />
              <span className="text-[10px] font-bold mt-0.5 whitespace-nowrap">Orders</span>
            </Link>

            {/* Wishlist */}
            <Link
              href="/wishlist"
              className="relative flex flex-col items-center px-3 py-1.5 rounded-xl text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-primary transition-all group"
            >
              <div className="relative">
                <Heart size={20} className="group-hover:scale-110 transition-transform" />
                {mounted && wishlistCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[9px] font-black w-4 h-4 rounded-full flex items-center justify-center border-2 border-white dark:border-gray-900">
                    {wishlistCount}
                  </span>
                )}
              </div>
              <span className="text-[10px] font-bold mt-0.5">Wishlist</span>
            </Link>

            {/* Divider */}
            <div className="w-px h-8 bg-gray-200 dark:bg-gray-700 mx-1" />

            {/* Cart */}
            <Link
              href="/cart"
              className="relative flex flex-col items-center px-3 py-1.5 rounded-xl text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-primary transition-all group"
            >
              <div className="relative">
                <ShoppingCart size={20} className="group-hover:scale-110 transition-transform" />
                {mounted && cartQuantity > 0 && (
                  <span className="absolute -top-2 -right-2 bg-primary text-white text-[9px] font-black w-4 h-4 rounded-full flex items-center justify-center border-2 border-white dark:border-gray-900">
                    {cartQuantity}
                  </span>
                )}
              </div>
              <span className="text-[10px] font-bold mt-0.5">Cart</span>
            </Link>

            {/* Profile Section */}
            <div className="relative ml-2">
              {user ? (
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setShowProfileDropdown(!showProfileDropdown)}
                    className="flex flex-col items-center px-3 py-1.5 rounded-xl text-primary bg-primary/5 hover:bg-primary/10 transition-all group"
                  >
                    <User size={20} className="group-hover:scale-110 transition-transform" />
                    <span className="text-[10px] font-bold mt-0.5 whitespace-nowrap max-w-[60px] truncate">{user.name.split(' ')[0]}</span>
                  </button>
                  
                  {showProfileDropdown && (
                    <div className="absolute top-full right-0 mt-2 w-48 bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-gray-100 dark:border-gray-800 p-2 z-50">
                      <div className="px-4 py-3 border-b border-gray-50 dark:border-gray-800">
                        <p className="text-xs font-black text-gray-400 uppercase tracking-widest">Signed in as</p>
                        <p className="text-sm font-bold text-gray-900 dark:text-white truncate">{user.name}</p>
                      </div>
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-4 py-3 text-sm font-bold text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10 rounded-xl transition-colors mt-1"
                      >
                        <LogOut size={16} /> Logout
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  href="/auth"
                  className="flex flex-col items-center px-3 py-1.5 rounded-xl text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-primary transition-all group"
                >
                  <User size={20} className="group-hover:scale-110 transition-transform" />
                  <span className="text-[10px] font-bold mt-0.5">Login</span>
                </Link>
              )}
            </div>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl transition-colors ml-1"
              aria-label="Toggle Theme"
            >
              {!mounted ? null : isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </div>

          {/* Mobile Actions */}
          <div className="flex md:hidden items-center gap-1">
            <Link href="/cart" className="relative p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl transition-colors">
              <ShoppingCart size={22} />
              {mounted && cartQuantity > 0 && (
                <span className="absolute top-0 right-0 bg-primary text-white text-[9px] font-black w-4 h-4 rounded-full flex items-center justify-center border-2 border-white dark:border-gray-900">
                  {cartQuantity}
                </span>
              )}
            </Link>
            
            {user ? (
              <button onClick={() => setShowProfileDropdown(!showProfileDropdown)} className="relative p-2 text-primary bg-primary/10 rounded-xl transition-colors">
                <User size={22} />
              </button>
            ) : (
              <Link href="/auth" className="p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl transition-colors">
                <User size={22} />
              </Link>
            )}
            <button
              onClick={toggleTheme}
              className="p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl transition-colors"
            >
              {!mounted ? null : isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </div>

        </div>
      </div>
    </nav>
  );
}
