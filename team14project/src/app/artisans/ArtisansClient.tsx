'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function ArtisansClient({ initialArtisans }: { initialArtisans: any[] }) {
  return (
    <div className="max-w-6xl mx-auto px-6">
      <div className="text-center mb-16">
        <span className="text-rose-800 font-bold text-sm tracking-widest uppercase block mb-2">
          The Creators
        </span>
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-stone-900 mb-6">
          Meet Our Artisans
        </h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {initialArtisans.map((artisan) => {
          // Generate a consistent avatar based on their name
          const avatarUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(artisan.name)}&background=881337&color=fff&size=128`;
          
          return (
            <Link href={`/artisans/${artisan.id}`} key={artisan.id} className="group block">
              <div className="bg-white rounded-3xl overflow-hidden shadow-sm border border-stone-200 hover:shadow-xl transition-all duration-500">
                
                {/* Cover Image Placeholder */}
                <div className="h-40 bg-stone-800 relative">
                  <div className="absolute inset-0 opacity-40 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-900 to-transparent"></div>
                </div>

                <div className="px-8 pb-8 relative">
                  {/* Avatar using the initials API */}
                  <div className="-mt-12 mb-4 relative">
                    <div className="w-24 h-24 rounded-2xl border-4 border-white overflow-hidden shadow-xl inline-block bg-stone-100">
                      <img 
                        src={avatarUrl} 
                        alt={artisan.name} 
                        className="object-cover h-full w-full"
                      />
                    </div>
                  </div>

                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-2xl font-serif font-bold text-stone-900 mb-1 group-hover:text-rose-800 transition">
                        {artisan.name}
                      </h3>
                      <p className="text-rose-700 font-bold text-[10px] uppercase tracking-[0.2em] mb-3">
                        Professional Artisan
                      </p>
                      <p className="text-stone-400 text-xs font-medium uppercase tracking-tighter">
                        {artisan.email}
                      </p>
                    </div>
                    
                    <div className="text-right bg-stone-50 px-4 py-2 rounded-xl border border-stone-100">
                      <span className="block text-xl font-black text-stone-900 leading-none">
                        {artisan.product_count}
                      </span>
                      <span className="text-[10px] font-bold text-stone-400 uppercase tracking-tighter">
                        Items
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}