'use client';

import React, { useState } from 'react';
import { useCart } from '../../context/CartContext';
import Image from 'next/image';
import Link from 'next/link';

export default function ShopClient({ initialProducts, categories }: { initialProducts: any[], categories: string[] }) {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  // Set default to 500,000 so all products show by default
  const [priceRange, setPriceRange] = useState(500000); 
  const { addItem } = useCart();

  // Filter Logic using LIVE data from Neon
  const filteredProducts = initialProducts.filter((product) => {
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesPrice = Number(product.price) <= priceRange;

    return matchesCategory && matchesSearch && matchesPrice;
  });

  return (
    <div className="min-h-screen bg-stone-50 py-12">
      <div className="max-w-6xl mx-auto px-6">
        
        {/* Page Header */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-serif font-bold text-stone-900 mb-4">The Marketplace</h1>
          <p className="text-stone-600 max-w-2xl mx-auto font-medium">
            Browse our curated collection of unique, handcrafted items from independent artisans.
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          
          {/* SIDEBAR FILTERS */}
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
                <span className="text-sm font-medium text-rose-800">${priceRange.toLocaleString()}</span>
              </div>
              <input 
                type="range" 
                min="0" 
                max="500000" 
                step="1000"
                value={priceRange}
                onChange={(e) => setPriceRange(Number(e.target.value))}
                className="w-full h-2 bg-stone-200 rounded-lg appearance-none cursor-pointer accent-rose-800"
              />
              <div className="flex justify-between text-[10px] text-stone-400 mt-2 font-bold uppercase">
                <span>$0</span>
                <span>$500k</span>
              </div>
            </div>
          </aside>

          {/* PRODUCT GRID */}
          <div className="flex-1">
            
            {/* Results Count */}
            <div className="mb-6 flex justify-between items-center">
              <span className="text-sm text-stone-500 font-medium">
                Showing {filteredProducts.length} results
              </span>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-stone-500">Sort by:</span>
                <select className="text-sm border-none bg-transparent font-medium text-stone-800 focus:ring-0 cursor-pointer outline-none">
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
                  <div key={product.id} className="group">
                    {/* UPDATED: Path changed to /shop/[id] to match current routing */}
                    <Link href={`/shop/${product.id}`} className="block">
                      <div className="bg-white rounded-lg overflow-hidden border border-stone-200 shadow-sm hover:shadow-md transition duration-300">
                        <div className="relative aspect-square bg-stone-100">
                          <Image 
                            src={product.image_url || '/placeholder.jpg'} 
                            alt={product.name} 
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-105" 
                          />
                        </div>
                        <div className="p-4">
                          <p className="text-xs text-stone-500 uppercase tracking-wide mb-1">{product.category}</p>
                          <h3 className="text-lg font-serif font-medium text-stone-800 mb-1 group-hover:text-rose-800 transition line-clamp-1">
                            {product.name}
                          </h3>
                          <p className="font-bold text-rose-800">
                            ${Number(product.price).toLocaleString(undefined, { minimumFractionDigits: 2 })}
                          </p>
                        </div>
                      </div>
                    </Link>

                    {/* Quick Add Button */}
                    <div className="mt-2 flex justify-end">
                      <button 
                        onClick={(e) => { 
                            e.preventDefault(); 
                            e.stopPropagation(); 
                            addItem({ 
                                id: product.id, 
                                name: product.name, 
                                price: Math.round(Number(product.price) * 100), 
                                image: product.image_url 
                            }); 
                        }} 
                        className="bg-white text-rose-800 p-2 rounded-full shadow border border-stone-100 hover:bg-rose-800 hover:text-white transition"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              /* Empty State */
              <div className="text-center py-24 bg-white rounded-lg border border-stone-200 border-dashed">
                <p className="text-stone-400 text-lg italic">No products found matching your criteria.</p>
                <button 
                  onClick={() => {setSelectedCategory('All'); setSearchQuery(''); setPriceRange(500000);}}
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