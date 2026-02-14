'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useCart } from '../../../context/CartContext';

export default function ProductDetailClient({ product }: { product: any }) {
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'desc' | 'reviews' | 'artisan'>('desc');
  const { addItem } = useCart();

  return (
    <div className="contents">
      {/* RIGHT COLUMN: Info */}
      <div className="p-8 md:p-12">
        <span className="text-rose-800 font-bold text-xs uppercase tracking-widest mb-2 block">
          {product.category}
        </span>
        <h1 className="text-3xl font-serif font-bold text-stone-900 mb-4">{product.name}</h1>
        
        <div className="flex items-center mb-6">
          <div className="w-8 h-8 rounded-full bg-stone-800 flex items-center justify-center text-[10px] text-white mr-3 font-bold">
             {product.artisan_name?.charAt(0) || 'A'}
          </div>
          <p className="text-sm text-stone-600">
            Crafted by <Link href={`/artisans/${product.artisan_id}`} className="font-bold text-stone-800 hover:text-rose-800 transition">{product.artisan_name || 'Verified Artisan'}</Link>
          </p>
        </div>

        <div className="text-2xl font-bold text-rose-800 mb-8">
          {product.displayPrice}
        </div>

        <p className="text-stone-600 leading-relaxed mb-8">
          {product.description}
        </p>

        <div className="flex items-center space-x-4 mb-8">
          <div className="flex items-center border border-stone-300 rounded-lg bg-white">
            <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="px-4 py-2">-</button>
            <span className="px-4 font-bold">{quantity}</span>
            <button onClick={() => setQuantity(quantity + 1)} className="px-4 py-2">+</button>
          </div>
          <button 
            onClick={() => addItem({ 
              id: product.id, 
              name: product.name, 
              price: Math.round(Number(product.price) * 100), 
              image: product.image_url 
            }, quantity)} 
            className="flex-1 bg-rose-800 text-white font-bold py-3 px-8 rounded-lg hover:bg-rose-900 transition shadow-lg"
          >
            Add to Cart
          </button>
        </div>
      </div>

      {/* TABS SECTION */}
      <div className="col-span-1 md:col-span-2 border-t border-stone-200">
        <div className="flex border-b border-stone-200 overflow-x-auto bg-white">
          {['desc', 'artisan', 'reviews'].map((t) => (
            <button 
              key={t}
              onClick={() => setActiveTab(t as any)}
              className={`px-8 py-4 text-xs font-bold uppercase tracking-wider transition ${activeTab === t ? 'border-b-2 border-rose-800 text-rose-800' : 'text-stone-500'}`}
            >
              {t === 'desc' ? 'Description' : t === 'artisan' ? 'Artisan' : 'Reviews'}
            </button>
          ))}
        </div>
        <div className="p-8 md:p-12 bg-stone-50 min-h-[200px]">
          {activeTab === 'desc' && <p className="text-stone-600 leading-relaxed">{product.description}</p>}
          {activeTab === 'artisan' && (
            <p className="text-stone-600">Handcrafted by <strong>{product.artisan_name}</strong>. Support local craft.</p>
          )}
          {activeTab === 'reviews' && <p className="text-stone-400 italic">No reviews yet.</p>}
        </div>
      </div>
    </div>
  );
}