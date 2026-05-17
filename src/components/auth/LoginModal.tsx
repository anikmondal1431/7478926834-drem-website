"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, User, MapPin, ArrowRight, ShieldCheck, Loader2, X } from 'lucide-react';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (user: any) => void;
}

export default function LoginModal({ isOpen, onClose, onSuccess }: LoginModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    phone1: '',
    phone2: '',
    houseNo: '',
    buildingName: '',
    streetName: '',
    landmark: '',
    village: '',
    pincode: '',
    exactLocation: '',
    useLocation: false
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const allowedPincodes = ['741222', '741223', '741248'];
    if (!allowedPincodes.includes(formData.pincode)) {
      setError('Sorry, we only deliver to Chakdaha Pincodes: 741222, 741223, 741248.');
      setLoading(false);
      return;
    }

    setTimeout(() => {
      // 1. Check for duplicate phone number in "database"
      const existingCustomersRaw = localStorage.getItem('chakdaha_customers');
      let customers = [];
      try {
        customers = existingCustomersRaw ? JSON.parse(existingCustomersRaw) : [];
      } catch (e) { customers = []; }

      // In a real app, we'd check if they exist to log them in, 
      // but for this simple version, let's just create/get the user.
      let user = customers.find((c: any) => c.phone1 === formData.phone1);
      
      if (!user) {
        // Create new user if not exists
        user = {
          id: Date.now(),
          ...formData,
          joinedAt: new Date().toISOString(),
          totalOrders: 0
        };
        localStorage.setItem('chakdaha_customers', JSON.stringify([...customers, user]));
      }

      // Save Session
      localStorage.setItem('chakdaha_user_session', JSON.stringify(user));

      setLoading(false);
      onSuccess(user);
      onClose();
    }, 1500);
  };

  const handleLocationToggle = () => {
    if (!formData.useLocation) {
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition((position) => {
          setFormData(prev => ({ ...prev, useLocation: true }));
        }, (error) => {
          alert("Location access denied. Please enable it for live tracking.");
        });
      } else {
        alert("Geolocation is not supported by your browser.");
      }
    } else {
      setFormData(prev => ({ ...prev, useLocation: false }));
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-md bg-white dark:bg-gray-900 rounded-[2.5rem] shadow-2xl p-8 border border-gray-100 dark:border-gray-800 max-h-[90vh] overflow-y-auto no-scrollbar"
          >
            <button 
              onClick={onClose}
              className="absolute top-6 right-6 p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full text-gray-500 transition-colors"
            >
              <X size={24} />
            </button>

            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <User className="text-primary" size={32} />
              </div>
              <h2 className="text-2xl font-black text-gray-900 dark:text-white">Customer Login</h2>
              <p className="text-gray-500 dark:text-gray-400 mt-2">Log in to complete your order</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Customer Name</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                  <input 
                    required
                    type="text" 
                    placeholder="Enter your full name" 
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 dark:text-white focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Primary Phone Number</label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                  <input 
                    required
                    type="tel" 
                    pattern="[0-9]{10}"
                    title="Please enter 10 digit phone number"
                    placeholder="10-digit phone number" 
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 dark:text-white focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                    value={formData.phone1}
                    onChange={(e) => setFormData({...formData, phone1: e.target.value})}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Alternative Phone Number</label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                  <input 
                    required
                    type="tel" 
                    placeholder="Secondary phone number" 
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 dark:text-white focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                    value={formData.phone2}
                    onChange={(e) => setFormData({...formData, phone2: e.target.value})}
                  />
                </div>
              </div>

              <div className="border-t border-dashed border-gray-200 dark:border-gray-800 pt-5">
                <h3 className="text-xs font-black uppercase text-gray-400 tracking-widest mb-4">Delivery Address Details</h3>
                
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1.5">House / Flat No.</label>
                      <input 
                        required
                        type="text" 
                        placeholder="e.g. Flat 3B" 
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 dark:text-white focus:ring-2 focus:ring-primary/20 outline-none transition-all text-sm"
                        value={formData.houseNo}
                        onChange={(e) => setFormData({...formData, houseNo: e.target.value})}
                      />
                    </div>
                    
                    <div>
                      <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1.5">Building / Ulling Name</label>
                      <input 
                        required
                        type="text" 
                        placeholder="e.g. Landmark Apts" 
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 dark:text-white focus:ring-2 focus:ring-primary/20 outline-none transition-all text-sm"
                        value={formData.buildingName}
                        onChange={(e) => setFormData({...formData, buildingName: e.target.value})}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1.5">Street / Lane Name</label>
                    <input 
                      required
                      type="text" 
                      placeholder="e.g. Netaji Subhash Road" 
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 dark:text-white focus:ring-2 focus:ring-primary/20 outline-none transition-all text-sm"
                      value={formData.streetName}
                      onChange={(e) => setFormData({...formData, streetName: e.target.value})}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1.5">Landmark</label>
                      <input 
                        required
                        type="text" 
                        placeholder="e.g. Near Kali Mandir" 
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 dark:text-white focus:ring-2 focus:ring-primary/20 outline-none transition-all text-sm"
                        value={formData.landmark}
                        onChange={(e) => setFormData({...formData, landmark: e.target.value})}
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1.5">Village / Locality</label>
                      <input 
                        required
                        type="text" 
                        placeholder="e.g. Lalpur / Palpara" 
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 dark:text-white focus:ring-2 focus:ring-primary/20 outline-none transition-all text-sm"
                        value={formData.village}
                        onChange={(e) => setFormData({...formData, village: e.target.value})}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1.5">Pincode (Pincord)</label>
                    <input 
                      required
                      type="text" 
                      pattern="[0-9]{6}"
                      title="Please enter 6-digit pincode"
                      placeholder="e.g. 741222" 
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 dark:text-white focus:ring-2 focus:ring-primary/20 outline-none transition-all text-sm font-bold"
                      value={formData.pincode}
                      onChange={(e) => setFormData({...formData, pincode: e.target.value.replace(/\D/g, '')})}
                    />
                  </div>

                  <div>
                    <div className="flex justify-between items-baseline mb-1">
                      <label className="block text-xs font-bold text-gray-700 dark:text-gray-300">Exact Location Instructions</label>
                      <span className="text-[9px] text-primary font-black uppercase">Helps Delivery Driver</span>
                    </div>
                    <textarea 
                      placeholder="Describe your exact location here. E.g., Second yellow house on the left after crossing the tea shop, blue main gate."
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 dark:text-white focus:ring-2 focus:ring-primary/20 outline-none transition-all text-xs resize-none"
                      rows={2}
                      value={formData.exactLocation}
                      onChange={(e) => setFormData({...formData, exactLocation: e.target.value})}
                    />
                    <p className="text-[10px] text-gray-400 dark:text-gray-500 mt-1 leading-normal">
                      * Providing specific visual indicators (gate color, notable shops, turns) ensures a seamless 1-day delivery experience.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-2xl flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                    <MapPin className="text-blue-600" size={20} />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-gray-800 dark:text-white leading-tight">Live Tracking</p>
                    <p className="text-[10px] text-gray-500 dark:text-gray-400">Enable for faster delivery</p>
                  </div>
                </div>
                <button 
                  type="button"
                  onClick={handleLocationToggle}
                  className={`w-12 h-6 rounded-full transition-colors relative ${formData.useLocation ? 'bg-primary' : 'bg-gray-300 dark:bg-gray-600'}`}
                >
                  <div className={`absolute top-1 left-1 bg-white w-4 h-4 rounded-full transition-transform ${formData.useLocation ? 'translate-x-6' : ''}`}></div>
                </button>
              </div>

              {error && (
                <div className="bg-red-50 text-red-600 text-xs font-bold p-3 rounded-xl border border-red-100">
                  ⚠️ {error}
                </div>
              )}

              <button 
                type="submit" 
                disabled={loading}
                className="w-full bg-primary text-white py-4 rounded-2xl font-black text-lg shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 group disabled:opacity-70"
              >
                {loading ? <Loader2 className="animate-spin" /> : (
                  <>
                    Let's Shop <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>
            </form>

            <div className="mt-8 flex items-center justify-center gap-2 text-gray-400 text-xs">
              <ShieldCheck size={14} />
              <span>Secure checkout powered by Chakdaha Bazar</span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
