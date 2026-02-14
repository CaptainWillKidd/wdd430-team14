"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '../context/CartContext';

// --- Types ---
interface Product {
  id: string;        // UUIDs are strings
  name: string;
  category: string;
  price: number;     // Price as a number for calculation
  image_url: string; // Database column name
}

const HeroSection = () => (
  <div className="bg-stone-50 py-16 md:py-24 overflow-hidden">
    <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between">
      {/* Left Text Content */}
      <div className="md:w-1/2 space-y-6 mb-12 md:mb-0 z-30">
        <span className="text-rose-700 font-bold text-sm tracking-widest uppercase">Support Artisans</span>
        <h1 className="text-5xl md:text-6xl font-serif text-stone-900 leading-tight">
          Curated. Collectible. <br/> Yours.
        </h1>
        <p className="text-lg text-stone-700 font-medium leading-relaxed">
          Explore a virtual marketplace dedicated to handcrafted excellence and unique artistic expression.
        </p>
        <Link href="/shop" className="inline-block bg-rose-800 text-white py-4 px-10 rounded-md font-bold hover:bg-rose-900 transition shadow-lg shadow-rose-900/20">
          Explore the Market
        </Link>
      </div>

      {/* Right Image Section with Artistic Layering */}
      <div className="md:w-1/2 relative flex justify-center items-center">
        
        {/* THE GLOWING CIRCLE - Positioned ABOVE the image with transparency and blur */}
        <div className="rounded-full bg-rose-200/40 w-[300px] h-[300px] md:w-[480px] md:h-[480px] absolute z-20 blur-3xl transform translate-x-10 -translate-y-10 animate-pulse"></div>
        
        {/* DECORATIVE BACKGROUND CIRCLE */}
        <div className="rounded-full border border-rose-100 w-[320px] h-[320px] md:w-[500px] md:h-[500px] absolute z-0 transform -translate-x-5 translate-y-5"></div>

        {/* THE MAIN HERO IMAGE */}
        <div className="relative z-10 w-[300px] h-[350px] md:w-[450px] md:h-[550px]">
            <Image 
              src="/hero-art.jpg" 
              alt="Handcrafted Haven Hero Art" 
              fill
              priority
              style={{ objectFit: "contain" }} 
              className="drop-shadow-2xl brightness-105" 
            />
        </div>
      </div>
    </div>
  </div>
);

const CategoryPreview = ({ 
  title, 
  categoryFilter, 
  products 
}: { 
  title: string, 
  categoryFilter: string[], 
  products: Product[] 
}) => {
  const { addItem } = useCart();
  
  const sectionProducts = products
    .filter(p => categoryFilter.includes(p.category))
    .slice(0, 4);

  if (sectionProducts.length === 0) return null;

  return (
    <div className="max-w-6xl mx-auto px-6 py-20">
      <div className="flex justify-between items-end mb-10">
        <div>
          <h2 className="text-3xl font-serif font-bold text-stone-900">{title}</h2>
          <div className="h-1.5 w-16 bg-rose-800 mt-3 rounded-full"></div>
        </div>
        <Link href="/shop" className="text-rose-800 font-bold hover:underline text-sm uppercase tracking-widest">View All</Link>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
        {sectionProducts.map((product) => (
          <div key={product.id} className="group">
            {/* UPDATED: href now points to /shop/[id] to match your folder structure */}
            <Link href={`/shop/${product.id}`}>
                <div className="bg-stone-100 rounded-2xl overflow-hidden relative border border-stone-200 aspect-square shadow-sm">
                <Image 
                    src={product.image_url || 'https://placehold.co/400x400?text=No+Image'} 
                    alt={product.name} 
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110" 
                />
                {product.category === 'Classical' && (
                    <span className="absolute top-3 left-3 bg-stone-900 text-white px-3 py-1 text-[9px] font-bold uppercase tracking-[0.2em] rounded-full">
                      Bestseller
                    </span>
                )}
                </div>
            </Link>
            <div className="mt-5">
              <p className="text-[10px] text-stone-400 uppercase tracking-widest font-bold mb-1">{product.category}</p>
              <h3 className="text-lg font-bold text-stone-900 group-hover:text-rose-800 transition truncate">{product.name}</h3>
              <p className="text-rose-800 font-bold text-xl mt-1">${product.price.toLocaleString()}</p>
              <div className="mt-4">
                <button 
                  onClick={() => {
                    addItem({ 
                        id: product.id, 
                        name: product.name, 
                        price: Math.round(product.price * 100), 
                        image: product.image_url 
                    });
                  }} 
                  className="w-full bg-white border-2 border-rose-800 text-rose-800 px-4 py-2 rounded-lg text-xs font-bold hover:bg-rose-800 hover:text-white transition-all shadow-md shadow-rose-800/5"
                >
                  Add to cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default function LandingClient({ initialProducts }: { initialProducts: Product[] }) {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <main className="flex-grow">
        <HeroSection />

        <section className="bg-white border-t border-stone-100">
          <CategoryPreview 
            title="Classical & Modern" 
            categoryFilter={['Classical', 'Modern']} 
            products={initialProducts}
          />
        </section>

        <section className="bg-stone-50 border-y border-stone-100">
          <CategoryPreview 
            title="Decorative & Media Arts" 
            categoryFilter={['Decorative', 'Media Focus']} 
            products={initialProducts}
          />
        </section>

        <section className="bg-rose-900 py-24 text-center text-white relative overflow-hidden">
          <div className="max-w-2xl mx-auto px-6 relative z-10">
            <h2 className="text-4xl font-serif font-bold mb-4">Are you an Artisan?</h2>
            <p className="mb-8 text-rose-100 text-lg">
              Join Handcrafted Haven to showcase your unique creations to a global audience.
            </p>
            <Link href="/register" className="inline-block bg-white text-rose-900 py-4 px-12 rounded-full font-bold hover:bg-stone-100 transition shadow-2xl hover:scale-105">
              Start Selling
            </Link>
          </div>
          <div className="absolute top-0 right-0 w-64 h-64 bg-rose-800 rounded-full blur-3xl opacity-50 -mr-32 -mt-32"></div>
        </section>
      </main>
    </div>
  );
}