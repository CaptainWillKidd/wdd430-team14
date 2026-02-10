'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

// Mock Data: List of Artisans
const artisans = [
  { 
    id: 'marcus-stone', 
    name: 'Marcus Stone', 
    specialty: 'Classical Sculpture', 
    location: 'Rome, Italy',
    image: 'https://placehold.co/400x400/333/white?text=MS',
    bg: 'https://placehold.co/800x400/881337/white?text=Studio+1',
    productCount: 12
  },
  { 
    id: 'elena-v', 
    name: 'Elena V.', 
    specialty: 'Modern Ceramics', 
    location: 'Berlin, Germany',
    image: 'https://placehold.co/400x400/333/white?text=EV',
    bg: 'https://placehold.co/800x400/881337/white?text=Studio+2',
    productCount: 8
  },
  { 
    id: 'sarah-j', 
    name: 'Sarah Jenkins', 
    specialty: 'Textile Arts', 
    location: 'London, UK',
    image: 'https://placehold.co/400x400/333/white?text=SJ',
    bg: 'https://placehold.co/800x400/881337/white?text=Studio+3',
    productCount: 24
  },
  { 
    id: 'hiro-t', 
    name: 'Hiro Tanaka', 
    specialty: 'Woodworking', 
    location: 'Kyoto, Japan',
    image: 'https://placehold.co/400x400/333/white?text=HT',
    bg: 'https://placehold.co/800x400/881337/white?text=Studio+4',
    productCount: 15
  },
];

export default function ArtisansPage() {
  return (
    <div className="min-h-screen bg-stone-50 py-12">
      <div className="max-w-6xl mx-auto px-6">
        
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-rose-800 font-bold text-sm tracking-widest uppercase block mb-2">The Creators</span>
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-stone-900 mb-6">Meet Our Artisans</h1>
          <p className="text-lg text-stone-600 max-w-2xl mx-auto">
            Behind every handcrafted piece is a story. Discover the talented individuals shaping the future of modern craftsmanship.
          </p>
        </div>

        {/* Artisan Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {artisans.map((artisan) => (
            <Link href={`/artisans/${artisan.id}`} key={artisan.id} className="group block">
              <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-stone-200 hover:shadow-xl transition duration-300">
                
                {/* Cover Image */}
                <div className="h-48 bg-stone-200 relative">
                  <Image src={artisan.bg} alt="Studio" fill className="object-cover group-hover:scale-105 transition duration-700" />
                  <div className="absolute inset-0 bg-black bg-opacity-20 group-hover:bg-opacity-10 transition"></div>
                </div>

                {/* Profile Info */}
                <div className="px-8 pb-8 relative">
                  {/* Avatar (Overlapping) */}
                  <div className="-mt-12 mb-4 relative">
                    <div className="w-24 h-24 rounded-full border-4 border-white overflow-hidden shadow-lg inline-block bg-white">
                      <Image src={artisan.image} alt={artisan.name} width={96} height={96} />
                    </div>
                  </div>

                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-2xl font-serif font-bold text-stone-900 mb-1 group-hover:text-rose-800 transition">{artisan.name}</h3>
                      <p className="text-rose-700 font-medium text-sm uppercase tracking-wide mb-2">{artisan.specialty}</p>
                      <div className="flex items-center text-stone-500 text-sm">
                        <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        {artisan.location}
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <span className="block text-2xl font-bold text-stone-800">{artisan.productCount}</span>
                      <span className="text-xs text-stone-500 uppercase">Items</span>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}