import React from 'react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-stone-900 text-stone-400 py-12 border-t border-rose-900">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8 text-sm">
        <div>
          <h3 className="text-white text-lg font-serif font-bold mb-4">Handcrafted Haven</h3>
          <p className="mb-4">
            Connecting you with independent artisans to discover unique, one-of-a-kind pieces.
          </p>
        </div>
        <div>
          <h4 className="text-white font-bold mb-4 uppercase tracking-wider">Shop</h4>
          <ul className="space-y-2">
            <li><Link href="/shop" className="hover:text-rose-500">All Products</Link></li>
            <li><Link href="/shop?cat=Classical" className="hover:text-rose-500">Classical Arts</Link></li>
            <li><Link href="/shop?cat=Modern" className="hover:text-rose-500">Modern & Abstract</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-bold mb-4 uppercase tracking-wider">Support</h4>
          <ul className="space-y-2">
            <li><Link href="#" className="hover:text-rose-500">Help Center</Link></li>
            <li><Link href="#" className="hover:text-rose-500">Contact Us</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-bold mb-4 uppercase tracking-wider">Legal</h4>
          <ul className="space-y-2">
            <li><Link href="#" className="hover:text-rose-500">Privacy Policy</Link></li>
            <li><Link href="#" className="hover:text-rose-500">Terms of Service</Link></li>
          </ul>
        </div>
      </div>
      <div className="text-center mt-12 border-t border-stone-800 pt-8 text-xs">
        &copy; {new Date().getFullYear()} Handcrafted Haven. All rights reserved.
      </div>
    </footer>
  );
}