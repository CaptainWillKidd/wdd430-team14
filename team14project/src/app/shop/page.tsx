'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

// --- Mock Data for the Shop ---
const allProducts = [
  { id: 1, name: 'Roman Bust Replica', category: 'Classical', price: 120, image: 'https://placehold.co/300x300/881337/white?text=Classical' },
  { id: 2, name: 'Abstract Cube', category: 'Modern', price: 250, image: 'https://placehold.co/300x300/881337/white?text=Modern' },
  { id: 3, name: 'Digital Print A1', category: 'Media Focus', price: 85, image: 'https://placehold.co/300x300/881337/white?text=Media' },
  { id: 4, name: 'Ceramic Vase', category: 'Decorative', price: 180, image: 'https://placehold.co/300x300/881337/white?text=Decorative' },
  { id: 5, name: 'Oil Painting', category: 'Classical', price: 450, image: 'https://placehold.co/300x300/881337/white?text=Oil+Paint' },
  { id: 6, name: 'Minimalist Lamp', category: 'Decorative', price: 95, image: 'https://placehold.co/300x300/881337/white?text=Lamp' },
  { id: 7, name: 'Bronze Figure', category: 'Modern', price: 310, image: 'https://placehold.co/300x300/881337/white?text=Bronze' },
  { id: 8, name: 'Handwoven Rug', category: 'Decorative', price: 210, image: 'https://placehold.co/300x300/881337/white?text=Rug' },
  { id: 9, name: 'Geometric Canvas', category: 'Modern', price: 150, image: 'https://placehold.co/300x300/881337/white?text=Canvas' },
];

const categories = ['All', 'Classical', 'Modern', 'Media Focus', 'Decorative'];

export default function ShopPage() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [priceRange, setPriceRange] = useState(500);

  // Filter Logic
  const filteredProducts = allProducts.filter((product) => {
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesPrice = product.price <= priceRange;

    return matchesCategory && matchesSearch && matchesPrice;
  });

  return (
    <div className="min-h-screen bg-stone-50 py-12">
      <div className="max-w-6xl mx-auto px-6">
        
        {/* Page Header */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-serif font-bold text-stone-900 mb-4">The Marketplace</h1>
          <p className="text-stone-600 max-w-2xl mx-auto">
            Browse our curated collection of unique, handcrafted items from independent artisans.
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          
          {/* SIDEBAR FILTERS  */}
          <aside className="w-full md:w-64 flex-shrink-0 space-y-8">
            
            {/* Search Filter */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-stone-200">
              <h3 className="font-bold text-stone-800 mb-4 uppercase text-sm tracking-wider">Search</h3>
              <input 
                type="text" 
                placeholder="Search products..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-3 py-2 border border-stone-300 rounded-md text-sm focus:outline-none focus:border-rose-800"
              />
            </div>

            {/* Category Filter */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-stone-200">
              <h3 className="font-bold text-stone-800 mb-4 uppercase text-sm tracking-wider">Categories</h3>
              <ul className="space-y-2">
                {categories.map((cat) => (
                  <li key={cat}>
                    <button 
                      onClick={() => setSelectedCategory(cat)}
                      className={`text-sm w-full text-left transition-colors ${
                        selectedCategory === cat 
                          ? 'text-rose-800 font-bold' 
                          : 'text-stone-600 hover:text-rose-800'
                      }`}
                    >
                      {cat}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Price Filter */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-stone-200">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold text-stone-800 uppercase text-sm tracking-wider">Max Price</h3>
                <span className="text-sm font-medium text-rose-800">${priceRange}</span>
              </div>
              <input 
                type="range" 
                min="0" 
                max="1000" 
                value={priceRange}
                onChange={(e) => setPriceRange(Number(e.target.value))}
                className="w-full h-2 bg-stone-200 rounded-lg appearance-none cursor-pointer accent-rose-800"
              />
            </div>
          </aside>

          {/* PRODUCT GRID  */}
          <div className="flex-1">
            
            {/* Results Count */}
            <div className="mb-6 flex justify-between items-center">
              <span className="text-sm text-stone-500">
                Showing {filteredProducts.length} results
              </span>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-stone-500">Sort by:</span>
                <select className="text-sm border-none bg-transparent font-medium text-stone-800 focus:ring-0 cursor-pointer">
                  <option>Recommended</option>
                  <option>Price: Low to High</option>
                  <option>Price: High to Low</option>
                </select>
              </div>
            </div>

            {/* Grid */}
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <Link href={`/shop/${product.id}`} key={product.id} className="group">
                    <div className="bg-white rounded-lg overflow-hidden border border-stone-200 shadow-sm hover:shadow-md transition duration-300">
                      <div className="relative aspect-square bg-stone-100">
                        <Image 
                          src={product.image} 
                          alt={product.name} 
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-105" 
                        />
                        {/* Quick Add Button */}
                        <button className="absolute bottom-4 right-4 bg-white text-rose-800 p-2 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-rose-800 hover:text-white">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                          </svg>
                        </button>
                      </div>
                      <div className="p-4">
                        <p className="text-xs text-stone-500 uppercase tracking-wide mb-1">{product.category}</p>
                        <h3 className="text-lg font-serif font-medium text-stone-800 mb-1 group-hover:text-rose-800 transition">{product.name}</h3>
                        <p className="font-bold text-rose-800">${product.price.toFixed(2)}</p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              // Empty State
              <div className="text-center py-24 bg-white rounded-lg border border-stone-200 border-dashed">
                <p className="text-stone-400 text-lg">No products found matching your criteria.</p>
                <button 
                  onClick={() => {setSelectedCategory('All'); setSearchQuery('');}}
                  className="mt-4 text-rose-800 font-bold hover:underline"
                >
                  Clear all filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}