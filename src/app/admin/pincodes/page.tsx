"use client";

import React, { useState } from 'react';
import { Search, MapPin, Plus, Trash2, CheckCircle2, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const DEFAULT_PINCODES = ["741222", "741223", "741248"];

export default function PincodesPage() {
  const [pincodes, setPincodes] = useState<string[]>([]);
  const [newPincode, setNewPincode] = useState('');
  const [error, setError] = useState('');

  React.useEffect(() => {
    const saved = localStorage.getItem('chakdaha_pincodes');
    if (saved) {
      try { setPincodes(JSON.parse(saved)); } catch { setPincodes(DEFAULT_PINCODES); }
    } else {
      setPincodes(DEFAULT_PINCODES);
    }
  }, []);

  const addPincode = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (newPincode.length !== 6 || isNaN(Number(newPincode))) {
      setError('Enter a valid 6-digit pincode');
      return;
    }
    if (pincodes.includes(newPincode)) {
      setError('Pincode already exists');
      return;
    }
    const updated = [...pincodes, newPincode];
    setPincodes(updated);
    localStorage.setItem('chakdaha_pincodes', JSON.stringify(updated));
    setNewPincode('');
  };

  const removePincode = (code: string) => {
    const updated = pincodes.filter(p => p !== code);
    setPincodes(updated);
    localStorage.setItem('chakdaha_pincodes', JSON.stringify(updated));
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-black text-gray-900">Service Areas</h1>
          <p className="text-gray-400 text-sm mt-1">Manage pincodes where you offer delivery.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-1">
          <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100">
            <h3 className="font-bold text-gray-900 mb-6 flex items-center gap-2">
              <Plus size={20} className="text-primary" /> Add New Area
            </h3>
            <form onSubmit={addPincode} className="space-y-4">
              <div>
                <label className="text-xs font-black uppercase text-gray-400 tracking-widest mb-2 block">Pincode</label>
                <input 
                  type="text" 
                  maxLength={6}
                  value={newPincode}
                  onChange={(e) => setNewPincode(e.target.value.replace(/\D/g, ''))}
                  placeholder="e.g. 741222"
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-4 focus:ring-primary/5 transition-all"
                />
              </div>
              {error && <p className="text-red-500 text-xs font-bold flex items-center gap-1"><AlertCircle size={14} /> {error}</p>}
              <button type="submit" className="w-full bg-primary text-white py-4 rounded-2xl font-black shadow-lg shadow-primary/20 hover:bg-primary-dark transition-all">
                Enable Delivery
              </button>
            </form>
          </div>
        </div>

        <div className="md:col-span-2">
          <div className="bg-white rounded-[2.5rem] shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-8 border-b border-gray-100 flex justify-between items-center">
              <h3 className="font-black text-gray-900 text-lg">Active Pincodes</h3>
              <span className="bg-green-50 text-green-600 px-4 py-1.5 rounded-full text-xs font-black uppercase">{pincodes.length} Service Areas</span>
            </div>
            <div className="p-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <AnimatePresence>
                {pincodes.map((code) => (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    key={code} 
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl border border-gray-100 group hover:border-primary/30 transition-all"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-primary/10 text-primary rounded-xl flex items-center justify-center font-black">
                        <MapPin size={18} />
                      </div>
                      <div>
                        <p className="font-black text-gray-900">{code}</p>
                        <p className="text-[10px] text-gray-400 font-bold uppercase">Chakdaha, Nadia</p>
                      </div>
                    </div>
                    <button onClick={() => removePincode(code)} className="text-gray-300 hover:text-red-500 transition-colors">
                      <Trash2 size={18} />
                    </button>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
