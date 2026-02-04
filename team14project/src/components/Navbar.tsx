'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const pathname = usePathname();

  // Helper to highlight active links
  const isActive = (path: string) => pathname === path ? "text-rose-800 font-bold" : "text-stone-600 hover:text-rose-700";

  return (
    <nav className="w-full bg-white border-b border-stone-200 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Brand */}
        <Link href="/" className="flex items-center">
          <h1 className="text-2xl font-serif font-bold text-stone-800 tracking-tight">
            Handcrafted Haven
          </h1>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex space-x-8 text-sm font-medium">
          <Link href="/" className={`${isActive('/')} transition`}>Home</Link>
          <Link href="/shop" className={`${isActive('/shop')} transition`}>Shop</Link>
          <Link href="/about" className={`${isActive('/about')} transition`}>About</Link>
          <Link href="/artisans" className={`${isActive('/artisans')} transition`}>Artisans</Link>
        </div>

        {/* Icons & Login */}
        <div className="flex items-center space-x-6">
          <div className="hidden md:block relative">
            <input 
              type="text" 
              placeholder="Search..." 
              className="pl-3 pr-8 py-1 rounded-full border border-stone-300 text-sm focus:border-rose-700 focus:outline-none"
            />
          </div>

          <Link href="/login" className="text-sm font-bold text-rose-800 hover:text-rose-900">
            Login
          </Link>

          <button className="relative text-stone-600 hover:text-rose-700">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            <span className="absolute -top-2 -right-2 bg-rose-700 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
              0
            </span>
          </button>
        </div>
      </div>
    </nav>
  );
}