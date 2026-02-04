"use client";

import React from "react";
import { useCart } from "../../context/CartContext";

export default function CartPage() {
  const { items, updateQuantity, removeItem, subtotal, clearCart } = useCart();

  const fmt = (cents: number) => `$${(cents / 100).toFixed(2)}`;

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-6xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold mb-6 text-stone-800">Shopping Cart</h1>

      {items.length === 0 ? (
        <div className="text-stone-700">Your cart is empty.</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-4">
            {items.map((it) => (
              <div key={it.id} className="flex items-center border rounded p-3">
                <img src={it.image ?? `https://placehold.co/120x120/881337/fff?text=Img`} alt={it.name} className="w-24 h-24 object-cover rounded mr-4" />
                <div className="flex-1">
                  <div className="font-medium text-stone-800">{it.name}</div>
                  <div className="text-sm text-stone-700">Unit: {fmt(it.price)}</div>
                  <div className="mt-2 flex items-center space-x-3">
                    <input type="number" min={1} value={it.quantity} onChange={(e) => updateQuantity(it.id, Number(e.target.value))} className="w-20 border rounded px-2 py-1 text-stone-800" />
                    <button onClick={() => removeItem(it.id)} className="text-rose-700 text-sm">Remove</button>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-stone-800">{fmt(it.price * it.quantity)}</div>
                </div>
              </div>
            ))}
          </div>

          <aside className="border rounded p-4 h-fit">
            <div className="flex items-center justify-between mb-3">
              <div className="text-sm text-stone-700">Subtotal</div>
              <div className="font-bold text-stone-800">{fmt(subtotal)}</div>
            </div>
            <button className="w-full bg-rose-800 text-white py-2 rounded mb-2">Checkout</button>
            <button onClick={() => clearCart()} className="w-full border rounded py-2 text-stone-700">Clear Cart</button>
          </aside>
        </div>
      )}
      </div>
    </div>
  );
}
