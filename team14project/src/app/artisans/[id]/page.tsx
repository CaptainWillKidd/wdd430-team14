'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function ArtisanProfilePage() {
  // Mock Data
  const artisan = {
    name: 'Marcus Stone',
    location: 'Rome, Italy',
    specialty: 'Classical Sculpture',
    bio: 'Sculpting modern history from Italian marble. My work explores the intersection of Renaissance techniques and contemporary minimalism.',
    image: 'https://placehold.co/400x400/333/white?text=MS',
    followers: '2.4k',
    rating: 4.9,
  };

  const products = [
    { id: 1, name: 'Roman Bust', price: 120, image: 'https://placehold.co/600x600/881337/white?text=Bust' },
    { id: 2, name: 'Oil Painting', price: 450, image: 'https://placehold.co/600x600/881337/white?text=Painting' },
    { id: 3, name: 'Marble Bookends', price: 85, image: 'https://placehold.co/600x600/881337/white?text=Bookends' },
    { id: 4, name: 'Clay Vase', price: 65, image: 'https://placehold.co/600x600/881337/white?text=Vase' },
    { id: 5, name: 'Sketch No. 5', price: 45, image: 'https://placehold.co/600x600/881337/white?text=Sketch' },
    { id: 6, name: 'Bronze Figure', price: 320, image: 'https://placehold.co/600x600/881337/white?text=Bronze' },
    { id: 7, name: 'Abstract Clay', price: 90, image: 'https://placehold.co/600x600/881337/white?text=Abstract' },
    { id: 8, name: 'Charcoal Study', price: 55, image: 'https://placehold.co/600x600/881337/white?text=Charcoal' },
    { id: 9, name: 'Limestone Block', price: 150, image: 'https://placehold.co/600x600/881337/white?text=Stone' },
  ];

  return (
    <div className="min-h-screen bg-white pt-12">
      
      {/* 1. PROFILE HEADER */}
      <div className="max-w-2xl mx-auto px-6 text-center mb-20">
        
        {/* Avatar */}
        <div className="mb-6 inline-block">
          <div className="w-32 h-32 rounded-full overflow-hidden border border-stone-100 mx-auto shadow-sm">
            <Image src={artisan.image} alt={artisan.name} width={128} height={128} className="object-cover" />
          </div>
        </div>

        {/* Info */}
        <h1 className="text-4xl font-serif font-bold text-stone-900 mb-2">{artisan.name}</h1>
        <p className="text-rose-800 text-sm font-bold tracking-widest uppercase mb-4">{artisan.specialty}</p>
        
        <p className="text-stone-600 leading-relaxed mb-8 max-w-lg mx-auto">
          {artisan.bio}
        </p>

        {/* Stats Row */}
        <div className="flex justify-center space-x-12 mb-8 border-t border-b border-stone-100 py-4">
          <div className="text-center">
            <span className="font-bold text-stone-900 block text-lg">{products.length}</span>
            <span className="text-xs text-stone-400 uppercase tracking-wider">Works</span>
          </div>
          <div className="text-center">
            <span className="font-bold text-stone-900 block text-lg">{artisan.followers}</span>
            <span className="text-xs text-stone-400 uppercase tracking-wider">Followers</span>
          </div>
          <div className="text-center">
            <span className="font-bold text-stone-900 block text-lg">{artisan.rating} ★</span>
            <span className="text-xs text-stone-400 uppercase tracking-wider">Rating</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-center gap-4">
          <button className="bg-stone-900 text-white px-8 py-3 rounded-xl font-bold hover:bg-stone-800 transition shadow-lg shadow-stone-200 w-full md:w-auto">
            Follow
          </button>
          <button className="border border-stone-300 text-stone-700 px-8 py-3 rounded-xl font-bold hover:bg-stone-50 transition w-full md:w-auto">
            Contact
          </button>
        </div>
      </div>

      {/* 2. GALLERY GRID */}
      <div className="max-w-6xl mx-auto px-6 pb-24"> {/* Added pb-24 for footer spacing */}
        <h2 className="text-xl font-serif font-bold text-stone-900 mb-8">Latest Works</h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8"> {/* Changed gap-1 to gap-8 */}
          {products.map((product) => (
            <Link href={`/shop/${product.id}`} key={product.id} className="group block">
              <div className="relative aspect-[4/5] bg-stone-50 overflow-hidden rounded-xl shadow-sm hover:shadow-xl transition-all duration-300">
                <Image 
                  src={product.image} 
                  alt={product.name} 
                  fill 
                  className="object-cover transition-transform duration-700 group-hover:scale-105" 
                />
                
                {/* Minimal Overlay on Hover */}
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </div>
              
              <div className="mt-4 flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-serif font-medium text-stone-900 group-hover:text-rose-800 transition">{product.name}</h3>
                  <p className="text-sm text-stone-500">Available Now</p>
                </div>
                <span className="text-lg font-bold text-stone-900">${product.price}</span>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </div>
  );
}