"use client";

import React, { useState, useEffect } from 'react';
import { Search, User, Phone, MapPin, Calendar, ShoppingBag, Trash2, ShieldCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function CustomersPage() {
  const [customers, setCustomers] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const load = () => {
      const saved = localStorage.getItem('chakdaha_customers');
      if (saved) {
        try { setCustomers(JSON.parse(saved)); } catch {}
      }
    };
    load();
    const interval = setInterval(load, 3000);
    return () => clearInterval(interval);
  }, []);

  const filtered = customers.filter(c => 
    c.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    c.phone1.includes(searchQuery)
  );

  const deleteCustomer = (id: number) => {
    if (confirm("Delete this customer record?")) {
      const updated = customers.filter(c => c.id !== id);
      setCustomers(updated);
      localStorage.setItem('chakdaha_customers', JSON.stringify(updated));
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-black text-gray-900">Registered Customers</h1>
          <p className="text-gray-400 text-sm mt-1">Manage and view your store's customer base.</p>
        </div>
        <div className="bg-primary/10 text-primary px-4 py-2 rounded-xl font-bold text-sm flex items-center gap-2">
          <ShieldCheck size={18} /> {customers.length} Total Users
        </div>
      </div>

      <div className="bg-white rounded-[2.5rem] shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-100">
          <div className="relative w-full md:w-80">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="text" 
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search by name or phone..." 
              className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-2xl text-sm focus:outline-none focus:ring-4 focus:ring-primary/5 transition-all"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-50/50 text-xs text-gray-400 font-black uppercase tracking-widest">
                <th className="px-8 py-5">Customer</th>
                <th className="px-8 py-5">Phone Numbers</th>
                <th className="px-8 py-5">Live Tracking</th>
                <th className="px-8 py-5">Joined At</th>
                <th className="px-8 py-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-24 text-center">
                    <div className="flex flex-col items-center gap-4">
                      <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center">
                        <User size={32} className="text-gray-200" />
                      </div>
                      <p className="text-gray-400 font-bold">No customers found</p>
                    </div>
                  </td>
                </tr>
              ) : (
                filtered.map((customer) => (
                  <tr key={customer.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-primary/10 text-primary rounded-full flex items-center justify-center font-black">
                          {customer.name.charAt(0)}
                        </div>
                        <div>
                          <p className="font-bold text-gray-900">{customer.name}</p>
                          <p className="text-[10px] text-gray-400 uppercase tracking-tighter">ID: {customer.id}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-6 space-y-1">
                      <div className="flex items-center gap-2 text-sm text-gray-700">
                        <Phone size={12} className="text-gray-400" /> {customer.phone1}
                      </div>
                      {customer.phone2 && (
                        <div className="flex items-center gap-2 text-xs text-gray-400">
                          <Phone size={12} /> {customer.phone2}
                        </div>
                      )}
                    </td>
                    <td className="px-8 py-6">
                      <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase ${customer.useLocation ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                        {customer.useLocation ? 'Enabled' : 'Disabled'}
                      </span>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Calendar size={14} className="text-gray-400" />
                        {new Date(customer.joinedAt).toLocaleDateString()}
                      </div>
                    </td>
                    <td className="px-8 py-6 text-right">
                      <button onClick={() => deleteCustomer(customer.id)} className="text-red-400 hover:text-red-600 p-2 hover:bg-red-50 rounded-xl transition-colors">
                        <Trash2 size={18} />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
