"use client";

import React, { useState, useEffect } from 'react';
import { 
  Search, ShoppingBag, User, Phone, MapPin, Calendar, 
  Clock, CheckCircle2, XCircle, ChevronRight, Eye, Trash2, Download, Printer 
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { getProductImage } from '@/utils/imageHelper';

export default function OrdersPage() {
  const [orders, setOrders] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedOrder, setSelectedOrder] = useState<any>(null);

  useEffect(() => {
    const load = () => {
      const saved = localStorage.getItem('chakdaha_orders');
      if (saved) {
        try { setOrders(JSON.parse(saved).reverse()); } catch {}
      }
    };
    load();
    const interval = setInterval(load, 3000);
    return () => clearInterval(interval);
  }, []);

  const filtered = orders.filter(o => 
    o.id.toLowerCase().includes(searchQuery.toLowerCase()) || 
    o.customer.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const updateStatus = (id: string, newStatus: string) => {
    const updated = orders.map(o => o.id === id ? { ...o, status: newStatus } : o);
    setOrders(updated);
    localStorage.setItem('chakdaha_orders', JSON.stringify(updated.reverse()));
  };

  const deleteOrder = (id: string) => {
    if (confirm("Delete this order?")) {
      const updated = orders.filter(o => o.id !== id);
      setOrders(updated);
      localStorage.setItem('chakdaha_orders', JSON.stringify(updated.reverse()));
    }
  };

  const handleDownloadReceipt = (order: any) => {
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;

    const itemsHtml = order.items.map((item: any) => `
      <tr style="border-bottom: 1px solid #eee;">
        <td style="padding: 10px 0;">${item.name} (${item.weight})</td>
        <td style="padding: 10px 0; text-align: center;">${item.quantity}</td>
        <td style="padding: 10px 0; text-align: right;">₹${item.price * item.quantity}</td>
      </tr>
    `).join('');

    printWindow.document.write(`
      <html>
        <head>
          <title>Receipt - ${order.id}</title>
          <style>
            body { font-family: sans-serif; padding: 40px; color: #333; }
            .header { text-align: center; margin-bottom: 40px; }
            .details { margin-bottom: 30px; display: flex; justify-content: space-between; }
            table { width: 100%; border-collapse: collapse; margin-bottom: 30px; }
            .total { text-align: right; font-size: 20px; font-weight: bold; }
            .footer { margin-top: 50px; text-align: center; font-size: 12px; color: #888; }
          </style>
        </head>
        <body>
          <div class="header">
            <h1 style="margin:0; color:#ff4f00;">CHAKDAHA BAZAR</h1>
            <p>Freshness Delivered to Your Doorstep</p>
          </div>
          <div class="details">
            <div>
              <h3>Customer Details:</h3>
              <p><strong>${order.customer.name}</strong></p>
              <p>${order.customer.primaryPhone}</p>
              <p>${order.customer.address}</p>
              <p>Pincode: ${order.pincode}</p>
            </div>
            <div style="text-align: right;">
              <h3>Order Info:</h3>
              <p>ID: ${order.id}</p>
              <p>Date: ${new Date(order.placedAt).toLocaleDateString()}</p>
              <p>Status: ${order.status}</p>
              <p>Payment: ${order.paymentMethod}</p>
            </div>
          </div>
          <table>
            <thead>
              <tr style="border-bottom: 2px solid #333;">
                <th style="text-align: left; padding: 10px 0;">Item</th>
                <th style="text-align: center; padding: 10px 0;">Qty</th>
                <th style="text-align: right; padding: 10px 0;">Price</th>
              </tr>
            </thead>
            <tbody>${itemsHtml}</tbody>
          </table>
          <div class="total">Total: ₹${order.total}</div>
          <div class="footer">
            <p>Thank you for shopping with Chakdaha Bazar!</p>
            <p>Contact: +91 7478926834 | Website: chakdahabazar.in</p>
          </div>
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.print();
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-black text-gray-900">Recent Orders</h1>
          <p className="text-gray-400 text-sm mt-1">Manage and track customer purchases.</p>
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
              placeholder="Search by Order ID or Name..." 
              className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-2xl text-sm focus:outline-none focus:ring-4 focus:ring-primary/5 transition-all"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-50/50 text-xs text-gray-400 font-black uppercase tracking-widest">
                <th className="px-8 py-5">Order ID</th>
                <th className="px-8 py-5">Customer</th>
                <th className="px-8 py-5">Amount</th>
                <th className="px-8 py-5">Status</th>
                <th className="px-8 py-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-24 text-center text-gray-400">
                    <ShoppingBag size={48} className="mx-auto mb-4 opacity-10" />
                    <p className="font-bold">No orders found</p>
                  </td>
                </tr>
              ) : (
                filtered.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-8 py-6">
                      <div className="font-bold text-gray-900">{order.id}</div>
                      <div className="text-[10px] text-gray-400 font-mono">{new Date(order.placedAt).toLocaleString()}</div>
                    </td>
                    <td className="px-8 py-6">
                      <div className="font-bold text-gray-800">{order.customer.name}</div>
                      <div className="text-xs text-gray-500">{order.customer.primaryPhone}</div>
                    </td>
                    <td className="px-8 py-6">
                      <div className="font-black text-gray-900">₹{order.total}</div>
                      <div className="text-[10px] text-primary font-bold uppercase">{order.paymentMethod}</div>
                    </td>
                    <td className="px-8 py-6">
                      <select 
                        value={order.status}
                        onChange={(e) => updateStatus(order.id, e.target.value)}
                        className={`text-[10px] font-black uppercase px-3 py-1.5 rounded-full outline-none appearance-none cursor-pointer ${
                          order.status === 'Pending' ? 'bg-yellow-100 text-yellow-700' :
                          order.status === 'Delivered' ? 'bg-green-100 text-green-700' :
                          'bg-gray-100 text-gray-600'
                        }`}
                      >
                        <option value="Pending">Pending</option>
                        <option value="Processing">Processing</option>
                        <option value="Shipped">Shipped</option>
                        <option value="Delivered">Delivered</option>
                        <option value="Cancelled">Cancelled</option>
                      </select>
                    </td>
                    <td className="px-8 py-6 text-right">
                      <div className="flex justify-end gap-2">
                        <button onClick={() => setSelectedOrder(order)} className="text-blue-500 hover:bg-blue-50 p-2 rounded-xl"><Eye size={18} /></button>
                        <button onClick={() => deleteOrder(order.id)} className="text-red-400 hover:bg-red-50 p-2 rounded-xl"><Trash2 size={18} /></button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Order Details Modal */}
      <AnimatePresence>
        {selectedOrder && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4" onClick={() => setSelectedOrder(null)}>
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="bg-white rounded-[2rem] w-full max-w-2xl max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
              <div className="p-8 space-y-6">
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-2xl font-black text-gray-900">Order Details</h2>
                    <p className="text-gray-400 font-mono text-sm">{selectedOrder.id}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button onClick={() => handleDownloadReceipt(selectedOrder)} className="bg-primary/10 text-primary p-2 rounded-xl flex items-center gap-2 font-bold text-sm hover:bg-primary/20 transition-all px-4">
                      <Printer size={18} /> Print Receipt
                    </button>
                    <button onClick={() => setSelectedOrder(null)} className="p-2 hover:bg-gray-100 rounded-full"><XCircle size={24} /></button>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-8 py-6 border-y border-gray-100">
                  <div className="space-y-4">
                    <h3 className="text-xs font-black uppercase text-gray-400 tracking-widest">Customer</h3>
                    <div className="space-y-2">
                      <p className="font-bold flex items-center gap-2"><User size={16} className="text-primary" /> {selectedOrder.customer.name}</p>
                      <p className="text-sm flex items-center gap-2"><Phone size={16} className="text-gray-400" /> {selectedOrder.customer.primaryPhone}</p>
                      <p className="text-sm flex items-center gap-2"><MapPin size={16} className="text-gray-400" /> {selectedOrder.customer.address}, {selectedOrder.pincode}</p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <h3 className="text-xs font-black uppercase text-gray-400 tracking-widest">Payment & Status</h3>
                    <div className="space-y-2">
                      <p className="text-sm">Method: <span className="font-black text-primary">{selectedOrder.paymentMethod}</span></p>
                      <p className="text-sm">Total: <span className="font-black text-xl">₹{selectedOrder.total}</span></p>
                      <p className="text-sm">Status: <span className="font-bold">{selectedOrder.status}</span></p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-xs font-black uppercase text-gray-400 tracking-widest">Items</h3>
                  <div className="space-y-3">
                    {selectedOrder.items.map((item: any) => (
                      <div key={item.id} className="flex justify-between items-center bg-gray-50 p-4 rounded-2xl">
                        <div className="flex items-center gap-4">
                          <img 
                             src={getProductImage(item.image, item.category)} 
                             className="w-12 h-12 object-cover rounded-xl" 
                             onError={(e) => {
                               (e.target as HTMLImageElement).src = getProductImage(undefined, item.category);
                             }}
                           />
                          <div>
                            <p className="font-bold text-gray-900">{item.name}</p>
                            <p className="text-xs text-gray-500">{item.weight} x {item.quantity}</p>
                          </div>
                        </div>
                        <p className="font-black">₹{item.price * item.quantity}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
