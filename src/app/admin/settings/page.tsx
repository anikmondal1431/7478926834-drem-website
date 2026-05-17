"use client";

import React, { useState } from 'react';
import { Save, Store, Phone, MapPin, Clock, Package, Bell, Shield, ChevronRight, CheckCircle } from 'lucide-react';

type SettingsSection = 'store' | 'delivery' | 'notifications' | 'security';

export default function SettingsPage() {
  const [activeSection, setActiveSection] = useState<SettingsSection>('store');
  const [saved, setSaved] = useState(false);

  // Store Info
  const [storeName, setStoreName] = useState('Chakdaha Bazar');
  const [storePhone, setStorePhone] = useState('+91 7478926834');
  const [storeEmail, setStoreEmail] = useState('support@chakdahabazar.in');
  const [storeAddress, setStoreAddress] = useState('Chakdaha, Nadia, West Bengal - 741222');
  const [whatsappNumber, setWhatsappNumber] = useState('7478926834');

  // Delivery Settings
  const [minOrderAmount, setMinOrderAmount] = useState('99');
  const [deliveryFee, setDeliveryFee] = useState('30');
  const [freeDeliveryAbove, setFreeDeliveryAbove] = useState('499');
  const [deliveryHoursFrom, setDeliveryHoursFrom] = useState('07:00');
  const [deliveryHoursTo, setDeliveryHoursTo] = useState('21:00');
  const [returnWindowHours, setReturnWindowHours] = useState('2');
  const [storeOpen, setStoreOpen] = useState(true);

  // Notifications
  const [newOrderAlert, setNewOrderAlert] = useState(true);
  const [lowStockAlert, setLowStockAlert] = useState(true);
  const [returnRequestAlert, setReturnRequestAlert] = useState(true);

  // Security
  const [adminPin, setAdminPin] = useState('');
  const [confirmPin, setConfirmPin] = useState('');
  const [pinError, setPinError] = useState('');

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (activeSection === 'security') {
      if (adminPin && adminPin.length < 4) { setPinError('PIN must be at least 4 digits.'); return; }
      if (adminPin && adminPin !== confirmPin) { setPinError('PINs do not match.'); return; }
      setPinError('');
    }
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const sections = [
    { key: 'store' as SettingsSection, label: 'Store Info', icon: Store },
    { key: 'delivery' as SettingsSection, label: 'Delivery & Orders', icon: Package },
    { key: 'notifications' as SettingsSection, label: 'Notifications', icon: Bell },
    { key: 'security' as SettingsSection, label: 'Security', icon: Shield },
  ];

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-black text-gray-900">Settings</h1>
          <p className="text-gray-400 text-sm mt-1">Configure your store preferences and options.</p>
        </div>
        {saved && (
          <div className="flex items-center gap-2 bg-green-50 text-green-700 border border-green-100 px-4 py-2 rounded-xl font-bold text-sm animate-fade-in">
            <CheckCircle size={18} /> Settings saved!
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Sidebar Navigation */}
        <div className="md:col-span-1">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            {sections.map(s => (
              <button
                key={s.key}
                onClick={() => setActiveSection(s.key)}
                className={`w-full flex items-center justify-between px-5 py-4 text-left font-bold text-sm transition-colors border-b border-gray-50 last:border-0 ${
                  activeSection === s.key
                    ? 'bg-primary/5 text-primary'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <s.icon size={18} className={activeSection === s.key ? 'text-primary' : 'text-gray-400'} />
                  {s.label}
                </div>
                <ChevronRight size={16} className={activeSection === s.key ? 'text-primary' : 'text-gray-300'} />
              </button>
            ))}
          </div>
        </div>

        {/* Settings Form */}
        <div className="md:col-span-3">
          <form onSubmit={handleSave}>
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 space-y-6">

              {/* === Store Info === */}
              {activeSection === 'store' && (
                <>
                  <div className="pb-4 border-b border-gray-100">
                    <h2 className="text-lg font-black text-gray-900 flex items-center gap-2"><Store size={20} className="text-primary" /> Store Information</h2>
                    <p className="text-sm text-gray-400 mt-1">Basic details about your store shown to customers.</p>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="md:col-span-2">
                      <label className="block text-sm font-bold text-gray-700 mb-1.5">Store Name</label>
                      <input value={storeName} onChange={e => setStoreName(e.target.value)} className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary" />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-1.5"><Phone size={14} className="inline mr-1" />Phone Number</label>
                      <input value={storePhone} onChange={e => setStorePhone(e.target.value)} className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary" />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-1.5">Support Email</label>
                      <input type="email" value={storeEmail} onChange={e => setStoreEmail(e.target.value)} className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary" />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-bold text-gray-700 mb-1.5"><MapPin size={14} className="inline mr-1" />Store Address</label>
                      <textarea value={storeAddress} onChange={e => setStoreAddress(e.target.value)} rows={2} className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary resize-none" />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-1.5">WhatsApp Number</label>
                      <div className="flex">
                        <span className="px-3 py-3 bg-green-50 border border-r-0 border-gray-200 rounded-l-xl text-sm text-green-700 font-bold">+91</span>
                        <input value={whatsappNumber} onChange={e => setWhatsappNumber(e.target.value)} maxLength={10} className="flex-1 px-4 py-3 border border-gray-200 rounded-r-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary" placeholder="10-digit number" />
                      </div>
                    </div>
                    <div className="flex items-center gap-4 bg-gray-50 p-4 rounded-xl">
                      <div className="flex-1">
                        <p className="text-sm font-bold text-gray-700">Store Status</p>
                        <p className="text-xs text-gray-400 mt-0.5">{storeOpen ? 'Accepting orders' : 'Temporarily closed'}</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => setStoreOpen(p => !p)}
                        className={`relative inline-flex h-7 w-14 items-center rounded-full transition-colors focus:outline-none ${storeOpen ? 'bg-green-500' : 'bg-gray-300'}`}
                      >
                        <span className={`inline-block h-5 w-5 transform rounded-full bg-white shadow-sm transition-transform ${storeOpen ? 'translate-x-8' : 'translate-x-1'}`} />
                      </button>
                    </div>
                  </div>
                </>
              )}

              {/* === Delivery & Orders === */}
              {activeSection === 'delivery' && (
                <>
                  <div className="pb-4 border-b border-gray-100">
                    <h2 className="text-lg font-black text-gray-900 flex items-center gap-2"><Package size={20} className="text-primary" /> Delivery & Order Settings</h2>
                    <p className="text-sm text-gray-400 mt-1">Control delivery fees, order limits, and policies.</p>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-1.5">Min. Order Amount (₹)</label>
                      <input type="number" min="0" value={minOrderAmount} onChange={e => setMinOrderAmount(e.target.value)} className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary" />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-1.5">Delivery Fee (₹)</label>
                      <input type="number" min="0" value={deliveryFee} onChange={e => setDeliveryFee(e.target.value)} className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary" />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-1.5">Free Delivery Above (₹)</label>
                      <input type="number" min="0" value={freeDeliveryAbove} onChange={e => setFreeDeliveryAbove(e.target.value)} className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary" />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-1.5"><Clock size={14} className="inline mr-1" />Return Window (hours)</label>
                      <input type="number" min="1" max="72" value={returnWindowHours} onChange={e => setReturnWindowHours(e.target.value)} className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary" />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-1.5">Delivery Hours From</label>
                      <input type="time" value={deliveryHoursFrom} onChange={e => setDeliveryHoursFrom(e.target.value)} className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary" />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-1.5">Delivery Hours To</label>
                      <input type="time" value={deliveryHoursTo} onChange={e => setDeliveryHoursTo(e.target.value)} className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary" />
                    </div>
                  </div>
                </>
              )}

              {/* === Notifications === */}
              {activeSection === 'notifications' && (
                <>
                  <div className="pb-4 border-b border-gray-100">
                    <h2 className="text-lg font-black text-gray-900 flex items-center gap-2"><Bell size={20} className="text-primary" /> Notification Preferences</h2>
                    <p className="text-sm text-gray-400 mt-1">Choose which events trigger admin alerts.</p>
                  </div>
                  <div className="space-y-4">
                    {[
                      { label: 'New Order Received', desc: 'Get notified whenever a customer places a new order.', state: newOrderAlert, setter: setNewOrderAlert },
                      { label: 'Low Stock Alert', desc: 'Alert when a product stock falls below 5 units.', state: lowStockAlert, setter: setLowStockAlert },
                      { label: 'Return/Cancellation Request', desc: 'Get notified when a customer requests a return or cancellation.', state: returnRequestAlert, setter: setReturnRequestAlert },
                    ].map(item => (
                      <div key={item.label} className="flex items-center justify-between bg-gray-50 p-5 rounded-2xl">
                        <div>
                          <p className="text-sm font-bold text-gray-800">{item.label}</p>
                          <p className="text-xs text-gray-400 mt-0.5">{item.desc}</p>
                        </div>
                        <button
                          type="button"
                          onClick={() => item.setter(p => !p)}
                          className={`relative inline-flex h-7 w-14 items-center rounded-full transition-colors focus:outline-none ${item.state ? 'bg-primary' : 'bg-gray-300'}`}
                        >
                          <span className={`inline-block h-5 w-5 transform rounded-full bg-white shadow-sm transition-transform ${item.state ? 'translate-x-8' : 'translate-x-1'}`} />
                        </button>
                      </div>
                    ))}
                  </div>
                </>
              )}

              {/* === Security === */}
              {activeSection === 'security' && (
                <>
                  <div className="pb-4 border-b border-gray-100">
                    <h2 className="text-lg font-black text-gray-900 flex items-center gap-2"><Shield size={20} className="text-primary" /> Security Settings</h2>
                    <p className="text-sm text-gray-400 mt-1">Update your admin access credentials.</p>
                  </div>
                  <div className="space-y-5">
                    <div className="bg-yellow-50 border border-yellow-100 p-4 rounded-xl text-sm text-yellow-800 font-semibold">
                      ⚠ Leave PIN fields blank if you don&apos;t want to change the admin PIN.
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-1.5">New Admin PIN</label>
                      <input
                        type="password"
                        value={adminPin}
                        onChange={e => setAdminPin(e.target.value)}
                        placeholder="Min 4 digits"
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-1.5">Confirm PIN</label>
                      <input
                        type="password"
                        value={confirmPin}
                        onChange={e => setConfirmPin(e.target.value)}
                        placeholder="Re-enter PIN"
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                      />
                    </div>
                    {pinError && (
                      <div className="text-red-600 text-sm font-semibold bg-red-50 px-4 py-3 rounded-xl border border-red-100">⚠ {pinError}</div>
                    )}
                  </div>
                </>
              )}

              {/* Save Button */}
              <div className="pt-4 border-t border-gray-100 flex justify-end">
                <button
                  type="submit"
                  className="bg-primary text-white px-8 py-3 rounded-xl font-black hover:bg-primary-dark transition-all flex items-center gap-2 shadow-lg shadow-primary/20"
                >
                  <Save size={18} />
                  Save Settings
                </button>
              </div>

            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
