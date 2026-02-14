"use client";

import React from "react";
import { useCart } from "../../context/CartContext";

export default function CartPage() {
  const { items, updateQuantity, removeItem, subtotal, clearCart } = useCart();

  // Updated formatter: This adds the commas and proper USD currency styling
  const fmt = (cents: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(cents / 100);
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <h1 className="text-3xl font-serif font-bold mb-6 text-stone-800">Shopping Cart</h1>

        {items.length === 0 ? (
          <div className="text-stone-700 font-serif italic py-12 border-t border-stone-100">
            Your cart is empty.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* List of Items */}
            <div className="md:col-span-2 space-y-4">
              {items.map((it) => (
                <div key={it.id} className="flex items-center border border-stone-100 rounded-xl p-4 shadow-sm">
                  <img 
                    src={it.image ?? `https://placehold.co/120x120/881337/fff?text=Img`} 
                    alt={it.name} 
                    className="w-24 h-24 object-cover rounded-lg mr-6" 
                  />
                  <div className="flex-1">
                    <div className="font-serif font-bold text-lg text-stone-900">{it.name}</div>
                    <div className="text-sm text-stone-500 mt-1">Unit Price: {fmt(it.price)}</div>
                    <div className="mt-4 flex items-center space-x-4">
                      <div className="flex items-center border border-stone-200 rounded-lg overflow-hidden">
                        <input 
                          type="number" 
                          min={1} 
                          value={it.quantity} 
                          onChange={(e) => updateQuantity(it.id, Math.max(1, Number(e.target.value)))} 
                          className="w-16 px-3 py-1 text-stone-800 focus:outline-none" 
                        />
                      </div>
                      <button 
                        onClick={() => removeItem(it.id)} 
                        className="text-rose-800 text-xs font-bold uppercase tracking-widest hover:underline"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-stone-900 text-lg">
                      {fmt(it.price * it.quantity)}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <aside className="bg-stone-50 rounded-2xl p-6 h-fit border border-stone-100 shadow-sm">
              <h2 className="text-xl font-serif font-bold text-stone-900 mb-6 border-b border-stone-200 pb-4">
                Summary
              </h2>
              <div className="flex items-center justify-between mb-6">
                <div className="text-stone-600">Subtotal</div>
                <div className="text-xl font-bold text-stone-900">{fmt(subtotal)}</div>
              </div>
              
              <div className="space-y-3">
                <button className="w-full bg-stone-900 text-white font-bold py-4 rounded-xl shadow-lg hover:bg-stone-800 transition transform active:scale-[0.98]">
                  Proceed to Checkout
                </button>
                <button 
                  onClick={() => clearCart()} 
                  className="w-full border border-stone-300 py-3 rounded-xl text-stone-600 text-sm font-medium hover:bg-white transition"
                >
                  Clear Cart
                </button>
              </div>
              
              <p className="text-[10px] text-stone-400 mt-6 text-center uppercase tracking-widest">
                Shipping and taxes calculated at checkout
              </p>
            </aside>
          </div>
        )}
      </div>
    </div>
  );
}