"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X } from 'lucide-react';

export default function WhatsAppButton() {
  const [isOpen, setIsOpen] = useState(false);
  const whatsappNumber = "917478926834";
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=Hi%20Chakdaha%20Bazar,%20I%20need%20help%20with%20my%20order.`;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="mb-4 bg-white rounded-2xl shadow-2xl p-4 w-64 glass-panel border border-gray-100"
          >
            <div className="flex justify-between items-center mb-3">
              <h3 className="font-bold text-gray-800">Need Help?</h3>
              <button onClick={() => setIsOpen(false)} className="text-gray-500 hover:text-gray-700">
                <X size={18} />
              </button>
            </div>
            <p className="text-sm text-gray-600 mb-4">Chat with our support team on WhatsApp for quick assistance.</p>
            <a 
              href={whatsappUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="block w-full text-center bg-[#25D366] hover:bg-[#20bd5a] text-white font-medium py-2 rounded-xl transition-colors duration-200"
            >
              Start Chat
            </a>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className="bg-[#25D366] text-white p-4 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 flex items-center justify-center relative group"
      >
        <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-25 group-hover:opacity-40"></span>
        <MessageCircle size={28} />
      </motion.button>
    </div>
  );
}
