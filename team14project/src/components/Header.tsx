"use client";

import React, { useState } from "react";
import Link from "next/link";
import MiniCart from "./MiniCart";
import { useCart } from "../context/CartContext";
import { useSession, signOut } from 'next-auth/react';

export default function Header() {
  const [open, setOpen] = useState(false);
  const { totalItems } = useCart();
  const { data: session } = useSession();

  return (
    <header className="w-full bg-white border-b border-stone-200 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-2 py-4 flex justify-between items-center">
        <div className="flex items-center">
          <Link href="/" className="text-2xl font-serif font-bold text-stone-800 tracking-tight">Handcrafted Haven</Link>
        </div>

        <nav className="hidden md:flex space-x-7 text-sm font-medium text-stone-700">
          <Link href="/" className="hover:text-rose-700 transition">Home</Link>
          <Link href="/shop" className="hover:text-rose-700 transition">Shop</Link>
          <Link href="/about" className="hover:text-rose-700 transition">About</Link>
          <Link href="/artisans" className="hover:text-rose-700 transition">Artisans</Link>
          {(session?.user as any)?.role === 'artisan' && (
            <Link href="/dashboard" className="hover:text-rose-700 transition font-bold">Dashboard</Link>
          )}
          {((session?.user as any)?.role === 'artisan' || (session?.user as any)?.role === 'customer') && (
             <Link href="/product_order" className="hover:text-rose-700 transition font-bold">My Order</Link>
          )}
        </nav>

        <div className="flex items-center space-x-6">
          <div className="hidden md:block relative">
            <input type="text" placeholder="Search..." className="pl-3 pr-8 py-1 rounded-full border border-stone-300 text-sm focus:border-rose-700 focus:outline-none" />
          </div>

          {!session?.user ? (
            <Link href="/login" className="text-sm font-bold text-rose-800 hover:text-rose-900">Login</Link>
          ) : (
            <div className="flex items-center gap-4">
              <span className="text-sm text-stone-700">{(session.user as any)?.name ?? (session.user as any)?.email}</span>
              <button onClick={() => signOut({ callbackUrl: '/' })} className="text-sm text-rose-700">Sign out</button>
            </div>
          )}

          <div className="relative">
            <button onClick={() => setOpen((s) => !s)} className="relative text-stone-700 hover:text-rose-700">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              <span className="absolute -top-2 -right-2 bg-rose-700 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">{totalItems}</span>
            </button>

            {open && (
              <div className="absolute right-0 mt-2">
                <MiniCart onClose={() => setOpen(false)} />
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
