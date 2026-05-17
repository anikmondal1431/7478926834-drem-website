"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, CheckCircle, XCircle, User, Phone, Navigation, Loader2, ShoppingBag, CreditCard, Banknote, Calendar, ShieldCheck } from 'lucide-react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/redux/store';
import { clearCart } from '@/redux/cartSlice';
import { getProductImage } from '@/utils/imageHelper';

export default function Checkout() {
  const cart = useSelector((state: RootState) => state.cart);
  const dispatch = useDispatch();
  const [pincode, setPincode] = useState("");
  const [pincodeStatus, setPincodeStatus] = useState<"idle" | "checking" | "available" | "unavailable">("idle");
  const [locationLoading, setLocationLoading] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderStatus, setOrderStatus] = useState<"idle" | "success">("idle");
  const [paymentMethod, setPaymentMethod] = useState<"COD" | "ONLINE">("COD");
  
  const [formData, setFormData] = useState({
    name: "",
    primaryPhone: "",
    secondaryPhone: "",
    houseNo: "",
    buildingName: "",
    streetName: "",
    landmark: "",
    village: "",
    pincode: "",
    exactLocation: "",
    liveLocation: null as { lat: number, lng: number } | null
  });

  // Load user data from session for auto-fill
  useEffect(() => {
    const sessionRaw = localStorage.getItem('chakdaha_user_session');
    if (sessionRaw) {
      try {
        const session = JSON.parse(sessionRaw);
        setFormData(prev => ({
          ...prev,
          name: session.name || "",
          primaryPhone: session.phone1 || "",
          secondaryPhone: session.phone2 || "",
          houseNo: session.houseNo || "",
          buildingName: session.buildingName || "",
          streetName: session.streetName || "",
          landmark: session.landmark || "",
          village: session.village || "",
          pincode: session.pincode || "",
          exactLocation: session.exactLocation || ""
        }));
        if (session.pincode) {
          setPincode(session.pincode);
          setPincodeStatus("available");
        }
      } catch (e) {}
    }
  }, []);

  const handlePlaceOrder = () => {
    setIsProcessing(true);
    setTimeout(() => {
      const fullAddressString = `${formData.houseNo}, ${formData.buildingName}, ${formData.streetName}, ${formData.village}, Landmark: ${formData.landmark}, Pincode: ${pincode}`;
      
      // Create Order Object
      const newOrder = {
        id: `ORD-${Date.now()}`,
        items: cart.items,
        total: cart.totalAmount,
        customer: {
          ...formData,
          address: fullAddressString
        },
        pincode,
        paymentMethod,
        status: "Pending",
        placedAt: new Date().toISOString()
      };

      // Save to localStorage for Admin
      const existingOrdersRaw = localStorage.getItem('chakdaha_orders');
      const orders = existingOrdersRaw ? JSON.parse(existingOrdersRaw) : [];
      localStorage.setItem('chakdaha_orders', JSON.stringify([...orders, newOrder]));

      // Clear Redux Cart
      dispatch(clearCart());
      
      setIsProcessing(false);
      setOrderStatus("success");
    }, 2000);
  };

  const availablePincodes = ["741222", "741223", "741248"];

  const handleCheckPincode = (e: React.FormEvent) => {
    e.preventDefault();
    if (!pincode || pincode.length !== 6) return;
    setPincodeStatus("checking");
    setTimeout(() => {
      if (availablePincodes.includes(pincode)) {
        setPincodeStatus("available");
      } else {
        setPincodeStatus("unavailable");
      }
    }, 800);
  };

  const getLiveLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser");
      return;
    }
    setLocationLoading(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setFormData(prev => ({
          ...prev,
          liveLocation: {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          }
        }));
        setLocationLoading(false);
      },
      () => {
        alert("Unable to retrieve your location");
        setLocationLoading(false);
      }
    );
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  if (cart.items.length === 0 && orderStatus !== "success") {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <div className="bg-gray-50 dark:bg-gray-900/50 rounded-3xl p-12 inline-block">
          <ShoppingBag size={64} className="mx-auto text-gray-300 mb-6" />
          <h2 className="text-2xl font-black mb-2">Your cart is empty</h2>
          <p className="text-gray-500 mb-8">Add some items from the store to continue</p>
          <button onClick={() => window.location.href = '/products'} className="bg-primary text-white px-8 py-3 rounded-xl font-bold">
            Browse Products
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* 1-day delivery banner */}
      <div className="bg-yellow-50 dark:bg-yellow-900/10 border border-yellow-200 dark:border-yellow-800 p-4 rounded-2xl mb-8 flex items-center gap-3">
        <div className="w-10 h-10 bg-yellow-400 rounded-full flex items-center justify-center text-white shrink-0">
          <Calendar size={20} />
        </div>
        <div>
          <p className="font-black text-yellow-800 dark:text-yellow-400">Order Now → Delivery Tomorrow!</p>
          <p className="text-sm text-yellow-700 dark:text-yellow-500">Fast next-day delivery guaranteed across all service areas.</p>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        <div className="flex-1 space-y-8">
          <h1 className="text-4xl font-black text-gray-900 dark:text-white mb-8">Checkout</h1>
          
          <section className="bg-white dark:bg-gray-900 p-8 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-800">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
              <div className="w-8 h-8 bg-primary/10 text-primary rounded-lg flex items-center justify-center">
                <MapPin size={18} />
              </div>
              Step 1: Check Availability
            </h2>
            
            <form onSubmit={handleCheckPincode} className="flex flex-col md:flex-row gap-4 mb-6">
              <input
                type="text"
                value={pincode}
                onChange={(e) => setPincode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                placeholder="Enter 6-digit Pincode"
                className="flex-1 px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-xl bg-gray-50 dark:bg-gray-800 focus:bg-white dark:focus:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-medium text-gray-900 dark:text-white"
              />
              <button 
                type="submit"
                disabled={pincode.length !== 6 || pincodeStatus === "checking"}
                className="bg-primary text-white px-8 py-3 rounded-xl font-bold hover:bg-primary-dark transition-colors disabled:opacity-50"
              >
                {pincodeStatus === "checking" ? <Loader2 className="animate-spin" /> : "Check"}
              </button>
            </form>

            <AnimatePresence mode="wait">
              {pincodeStatus === "available" && (
                <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 text-green-800 dark:text-green-300 p-4 rounded-xl flex items-center gap-3">
                  <CheckCircle className="text-green-500" />
                  <div>
                    <p className="font-bold text-sm">Delivery Available!</p>
                    <p className="text-xs">Next-day delivery available for your location.</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </section>

          {pincodeStatus === "available" && (
            <>
              <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white dark:bg-gray-900 p-8 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-800 space-y-6">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                  <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/30 text-blue-500 rounded-lg flex items-center justify-center">
                    <User size={18} />
                  </div>
                  Step 2: Delivery Details
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-black uppercase text-gray-500 tracking-wider">Full Name</label>
                    <div className="relative">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                      <input type="text" name="name" value={formData.name} onChange={handleInputChange} placeholder="Enter your name" className="w-full pl-12 pr-4 py-3 border border-gray-200 dark:border-gray-700 rounded-xl bg-gray-50 dark:bg-gray-800 focus:bg-white dark:focus:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-gray-900 dark:text-white" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-black uppercase text-gray-500 tracking-wider">Primary Phone</label>
                    <div className="relative">
                      <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                      <input type="tel" name="primaryPhone" value={formData.primaryPhone} onChange={handleInputChange} placeholder="WhatsApp number" className="w-full pl-12 pr-4 py-3 border border-gray-200 dark:border-gray-700 rounded-xl bg-gray-50 dark:bg-gray-800 focus:bg-white dark:focus:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-gray-900 dark:text-white" />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:col-span-2">
                    <div className="space-y-1.5">
                      <label className="text-xs font-black uppercase text-gray-500 tracking-wider">House / Flat No.</label>
                      <input 
                        required
                        type="text" 
                        name="houseNo" 
                        value={formData.houseNo} 
                        onChange={handleInputChange} 
                        placeholder="e.g. Flat 3B" 
                        className="w-full px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-xl bg-gray-50 dark:bg-gray-800 focus:bg-white dark:focus:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-gray-900 dark:text-white text-sm" 
                      />
                    </div>
                    
                    <div className="space-y-1.5">
                      <label className="text-xs font-black uppercase text-gray-500 tracking-wider">Building / Ulling Name</label>
                      <input 
                        required
                        type="text" 
                        name="buildingName" 
                        value={formData.buildingName} 
                        onChange={handleInputChange} 
                        placeholder="e.g. Landmark Apts" 
                        className="w-full px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-xl bg-gray-50 dark:bg-gray-800 focus:bg-white dark:focus:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-gray-900 dark:text-white text-sm" 
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5 md:col-span-2">
                    <label className="text-xs font-black uppercase text-gray-500 tracking-wider">Street / Lane Name</label>
                    <input 
                      required
                      type="text" 
                      name="streetName" 
                      value={formData.streetName} 
                      onChange={handleInputChange} 
                      placeholder="e.g. Netaji Subhash Road" 
                      className="w-full px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-xl bg-gray-50 dark:bg-gray-800 focus:bg-white dark:focus:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-gray-900 dark:text-white text-sm" 
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:col-span-2">
                    <div className="space-y-1.5">
                      <label className="text-xs font-black uppercase text-gray-500 tracking-wider">Landmark</label>
                      <input 
                        required
                        type="text" 
                        name="landmark" 
                        value={formData.landmark} 
                        onChange={handleInputChange} 
                        placeholder="e.g. Near Kali Mandir" 
                        className="w-full px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-xl bg-gray-50 dark:bg-gray-800 focus:bg-white dark:focus:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-gray-900 dark:text-white text-sm" 
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-black uppercase text-gray-500 tracking-wider">Village / Locality</label>
                      <input 
                        required
                        type="text" 
                        name="village" 
                        value={formData.village} 
                        onChange={handleInputChange} 
                        placeholder="e.g. Lalpur / Palpara" 
                        className="w-full px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-xl bg-gray-50 dark:bg-gray-800 focus:bg-white dark:focus:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-gray-900 dark:text-white text-sm" 
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5 md:col-span-2">
                    <div className="flex justify-between items-baseline mb-1">
                      <label className="text-xs font-black uppercase text-gray-500 tracking-wider">Exact Location Instructions</label>
                      <span className="text-[9px] text-primary font-black uppercase">Helps Delivery Driver</span>
                    </div>
                    <textarea 
                      name="exactLocation" 
                      value={formData.exactLocation} 
                      onChange={handleInputChange} 
                      placeholder="Describe your exact location here. E.g., Second yellow house on the left after crossing the tea shop, blue main gate." 
                      rows={2} 
                      className="w-full px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-xl bg-gray-50 dark:bg-gray-800 focus:bg-white dark:focus:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-gray-900 dark:text-white text-xs resize-none" 
                    />
                    <p className="text-[10px] text-gray-400 dark:text-gray-500 leading-normal mt-1">
                      * Providing specific visual indicators (gate color, notable shops, turns) ensures a seamless 1-day delivery experience.
                    </p>
                  </div>

                  <div className="md:col-span-2">
                    <button type="button" onClick={getLiveLocation} disabled={locationLoading} className={`w-full flex items-center justify-center gap-2 py-4 rounded-xl font-bold transition-all ${formData.liveLocation ? 'bg-green-100 text-green-700 border border-green-200' : 'bg-secondary/10 text-secondary-dark border border-secondary/20 hover:bg-secondary/20'}`}>
                      {locationLoading ? <Loader2 size={20} className="animate-spin" /> : formData.liveLocation ? <CheckCircle size={20} /> : <Navigation size={20} />}
                      {formData.liveLocation ? "Location Attached Successfully" : "Attach My Live Location for Faster Delivery"}
                    </button>
                  </div>
                </div>
              </motion.section>

              <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white dark:bg-gray-900 p-8 rounded-3xl shadow-sm border-2 border-primary/20 dark:border-primary/10 space-y-8 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl -z-10"></div>
                <h2 className="text-2xl font-black text-gray-900 dark:text-white flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary text-white rounded-xl flex items-center justify-center shadow-lg shadow-primary/20">
                    <Banknote size={22} />
                  </div>
                  Step 3: Select Payment Method
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <button onClick={() => setPaymentMethod("COD")} className={`p-8 rounded-[2.5rem] border-4 transition-all flex flex-col items-center gap-4 relative group ${paymentMethod === "COD" ? "border-primary bg-primary/5 scale-105 shadow-xl shadow-primary/10" : "border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-800 hover:border-primary/30"}`}>
                    {paymentMethod === "COD" && <div className="absolute top-4 right-4 bg-primary text-white p-1 rounded-full"><CheckCircle size={16} /></div>}
                    <div className={`w-20 h-20 rounded-3xl flex items-center justify-center transition-colors ${paymentMethod === "COD" ? "bg-primary text-white" : "bg-white dark:bg-gray-700 text-gray-400 group-hover:text-primary"}`}>
                      <Banknote size={40} />
                    </div>
                    <div className="text-center">
                      <p className="font-black text-xl text-gray-900 dark:text-white">Cash on Delivery</p>
                      <p className="text-sm text-gray-500 font-medium">Pay ₹{cart.totalAmount} at doorstep</p>
                    </div>
                  </button>

                  <div className="space-y-4">
                    <button onClick={() => setPaymentMethod("ONLINE")} className={`w-full p-6 rounded-[2rem] border-4 transition-all flex items-center gap-4 relative group ${paymentMethod === "ONLINE" ? "border-primary bg-primary/5 shadow-lg shadow-primary/5" : "border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-800 hover:border-primary/30"}`}>
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${paymentMethod === "ONLINE" ? "bg-primary text-white" : "bg-white dark:bg-gray-700 text-gray-400"}`}>
                        <CreditCard size={24} />
                      </div>
                      <div className="text-left flex-1">
                        <p className="font-bold text-gray-900 dark:text-white">UPI / PhonePe / GPay</p>
                        <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Instant Activation</p>
                      </div>
                      {paymentMethod === "ONLINE" && <CheckCircle size={20} className="text-primary" />}
                    </button>

                    <button onClick={() => setPaymentMethod("ONLINE")} className={`w-full p-6 rounded-[2rem] border-4 transition-all flex items-center gap-4 relative group ${paymentMethod === "ONLINE" ? "border-primary bg-primary/5 shadow-lg shadow-primary/5" : "border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-800 hover:border-primary/30"}`}>
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${paymentMethod === "ONLINE" ? "bg-primary text-white" : "bg-white dark:bg-gray-700 text-gray-400"}`}>
                        <CreditCard size={24} />
                      </div>
                      <div className="text-left flex-1">
                        <p className="font-bold text-gray-900 dark:text-white">Debit / Credit Card</p>
                        <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Secure Gateway</p>
                      </div>
                    </button>
                  </div>
                </div>

                <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-2xl flex items-center gap-3">
                  <ShieldCheck className="text-blue-500" size={20} />
                  <p className="text-xs font-bold text-blue-700 dark:text-blue-400 uppercase tracking-widest">Safe & Secure Transactions Guaranteed</p>
                </div>
              </motion.section>
            </>
          )}
        </div>

        <div className="lg:w-96">
          <div className="bg-white dark:bg-gray-900 p-8 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-800 sticky top-24">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Order Summary</h2>
            
            {orderStatus === "success" ? (
              <div className="text-center py-8">
                <CheckCircle className="mx-auto text-green-500 mb-4" size={64} />
                <h3 className="text-2xl font-black text-gray-900 dark:text-white">Order Confirmed!</h3>
                <p className="text-gray-500 mt-2">Check your WhatsApp for updates.</p>
                <button onClick={() => window.location.href = '/products'} className="mt-8 bg-primary text-white w-full py-4 rounded-2xl font-bold shadow-lg shadow-primary/20">Back to Shopping</button>
              </div>
            ) : (
              <>
                <div className="space-y-4 mb-6">
                  {cart.items.map((item) => (
                    <div key={item.id} className="flex justify-between items-center text-sm">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gray-50 dark:bg-gray-800 rounded-lg overflow-hidden flex-shrink-0 relative">
                           <img 
                             src={getProductImage(item.image, item.category)} 
                             alt={item.name} 
                             className="object-cover w-full h-full" 
                             onError={(e) => {
                               (e.target as HTMLImageElement).src = getProductImage(undefined, item.category);
                             }}
                           />
                        </div>
                        <div>
                          <p className="font-bold text-gray-800 dark:text-gray-200 line-clamp-1">{item.name}</p>
                          <p className="text-gray-400 text-[10px]">{item.weight} x {item.quantity}</p>
                        </div>
                      </div>
                      <p className="font-black">₹{item.price * item.quantity}</p>
                    </div>
                  ))}
                </div>

                <div className="border-t border-gray-100 dark:border-gray-800 pt-6 space-y-3">
                  <div className="flex justify-between text-gray-500 text-sm">
                    <span>Subtotal</span>
                    <span>₹{cart.totalAmount}</span>
                  </div>
                  <div className="flex justify-between text-gray-500 text-sm">
                    <span>Delivery Fee</span>
                    <span className="text-green-500 font-bold uppercase">Free</span>
                  </div>
                  <div className="flex justify-between text-xl font-black text-gray-900 dark:text-white pt-4 border-t border-dashed border-gray-100 dark:border-gray-800">
                    <span>Total</span>
                    <span>₹{cart.totalAmount}</span>
                  </div>
                </div>

                <button 
                  onClick={handlePlaceOrder}
                  disabled={pincodeStatus !== "available" || !formData.name || !formData.primaryPhone || !formData.houseNo || !formData.buildingName || !formData.streetName || !formData.landmark || !formData.village || isProcessing}
                  className="w-full bg-primary text-white py-4 rounded-2xl font-black text-lg mt-8 hover:bg-primary-dark transition-all shadow-xl hover:shadow-2xl disabled:opacity-50 disabled:grayscale disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isProcessing ? <Loader2 className="animate-spin" /> : `Place Order (₹${cart.totalAmount})`}
                </button>
                <div className="flex items-center justify-center gap-2 mt-4 text-gray-400 text-[10px] font-bold uppercase tracking-widest">
                  <ShieldCheck size={12} /> Secure Checkout
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
