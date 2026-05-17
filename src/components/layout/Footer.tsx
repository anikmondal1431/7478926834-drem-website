import React from 'react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 pt-16 pb-8 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-1">
            <Link href="/" className="flex items-center mb-4">
              <span className="text-2xl font-black text-white">Chakdaha Bazar</span>
            </Link>
            <p className="text-sm text-gray-400 mb-6">
              Chakdaha's fastest and most reliable quick-commerce grocery delivery platform. Freshness delivered to your doorstep.
            </p>
          </div>
          
          <div>
            <h4 className="text-white font-bold mb-4 uppercase tracking-wider text-sm">Categories</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/category/vegetables" className="hover:text-primary-light transition-colors">Fresh Vegetables</Link></li>
              <li><Link href="/category/fruits" className="hover:text-primary-light transition-colors">Fresh Fruits</Link></li>
              <li><Link href="/category/fish" className="hover:text-primary-light transition-colors">Fresh Fish</Link></li>
              <li><Link href="/category/meat" className="hover:text-primary-light transition-colors">Halal Meat</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-4 uppercase tracking-wider text-sm">Useful Links</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/about" className="hover:text-primary-light transition-colors">About Us</Link></li>
              <li><Link href="/contact" className="hover:text-primary-light transition-colors">Contact Support</Link></li>
              <li><Link href="/privacy" className="hover:text-primary-light transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-primary-light transition-colors">Terms of Service</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-4 uppercase tracking-wider text-sm">Contact Us</h4>
            <ul className="space-y-2 text-sm">
              <li>Chakdaha, Nadia, West Bengal - 741222</li>
              <li>Email: support@chakdahabazar.in</li>
              <li>Phone: +91 7478926834</li>
              <li className="mt-4">
                <a href="https://wa.me/917478926834" className="inline-block bg-[#25D366] text-white px-4 py-2 rounded-lg font-medium hover:bg-[#20bd5a] transition-colors">
                  WhatsApp Support
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-gray-800 text-sm text-center text-gray-500">
          <p>&copy; {new Date().getFullYear()} Chakdaha Bazar. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
