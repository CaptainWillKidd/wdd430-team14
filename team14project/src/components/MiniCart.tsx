"use client";

import React from "react";
import { useCart } from "../context/CartContext";
import Link from "next/link";

export default function MiniCart({ onClose }: { onClose?: () => void }) {
  const { items, updateQuantity, removeItem, subtotal } = useCart();

  const fmt = (cents: number) => {
    return `$${(cents / 100).toFixed(2)}`;
  };

  return (
    <div className="w-80 bg-white border border-stone-200 shadow-xl rounded-md p-4">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-bold text-stone-800">Your Cart</h3>
        <button onClick={onClose} className="text-stone-700 hover:text-stone-900">Close</button>
      </div>

      {items.length === 0 ? (
        <div className="text-sm text-stone-700 py-8 text-center">Your cart is empty</div>
      ) : (
        <div className="space-y-3">
          {items.map((it) => (
            <div key={it.id} className="flex items-center">
              <img src={it.image ?? `https://placehold.co/80x80/881337/fff?text=Img`} alt={it.name} className="w-16 h-16 object-cover rounded-md mr-3 border" />
              <div className="flex-1">
                <div className="text-sm font-medium text-stone-800">{it.name}</div>
                <div className="text-xs text-stone-700">{fmt(it.price)}</div>
                <div className="mt-2 flex items-center space-x-2">
                  <input type="number" min={1} value={it.quantity} onChange={(e) => updateQuantity(it.id, Number(e.target.value))} className="w-16 border rounded px-2 py-1 text-sm text-stone-800" />
                  <button onClick={() => removeItem(it.id)} className="text-xs text-rose-700">Remove</button>
                </div>
              </div>
            </div>
          ))}

          <div className="border-t pt-3 flex items-center justify-between">
            <div className="text-sm text-stone-700">Subtotal</div>
            <div className="font-bold text-stone-800">{fmt(subtotal)}</div>
          </div>

          <div className="mt-3 grid grid-cols-2 gap-2">
            <Link href="/cart" className="text-center py-2 px-3 border rounded-md text-sm text-stone-700">View Cart</Link>
            <button className="bg-rose-800 text-white py-2 rounded-md text-sm">Checkout</button>
          </div>
        </div>
      )}
    </div>
  );
}
