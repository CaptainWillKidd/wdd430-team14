'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function AddProductPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      router.push('/dashboard/products');
    }, 1500);
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <Link href="/dashboard/products" className="text-sm text-stone-500 hover:text-rose-800 mb-2 inline-block">
          ← Back to Products
        </Link>
        <h1 className="text-3xl font-serif font-bold text-stone-900">Add New Product</h1>
        <p className="text-stone-500">Share your latest creation with the world.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        
        {/* SECTION 1: Basic Info */}
        <div className="bg-white p-6 rounded-xl border border-stone-200 shadow-sm">
          <h2 className="text-lg font-bold text-stone-800 mb-4 border-b border-stone-100 pb-2">Basic Information</h2>
          <div className="grid grid-cols-1 gap-6">
            <div>
              <label className="block text-sm font-medium text-stone-700 mb-1">Product Name</label>
              <input 
                type="text" 
                required
                placeholder="e.g. Hand-carved Walnut Bowl"
                className="w-full px-4 py-2 rounded-lg border border-stone-300 focus:ring-2 focus:ring-rose-800 focus:border-transparent outline-none transition"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-1">Category</label>
                <select className="w-full px-4 py-2 rounded-lg border border-stone-300 focus:ring-2 focus:ring-rose-800 focus:border-transparent outline-none transition bg-white">
                  <option value="">Select a category...</option>
                  <option value="Classical">Classical Arts</option>
                  <option value="Modern">Modern & Abstract</option>
                  <option value="Media Focus">Media Focus</option>
                  <option value="Decorative">Decorative Arts</option>
                </select>
              </div>
              
              {/* Moved Price Here for better flow */}
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-1">Price ($)</label>
                <input 
                  type="number" 
                  min="0"
                  step="0.01"
                  placeholder="0.00"
                  className="w-full px-4 py-2 rounded-lg border border-stone-300 focus:ring-2 focus:ring-rose-800 focus:border-transparent outline-none transition"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-stone-700 mb-1">Description</label>
              <textarea 
                rows={4}
                placeholder="Describe the materials, process, and story behind this piece..."
                className="w-full px-4 py-2 rounded-lg border border-stone-300 focus:ring-2 focus:ring-rose-800 focus:border-transparent outline-none transition"
              ></textarea>
            </div>
          </div>
        </div>

        {/* SECTION 2: Media & Stock (Combined for compactness) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Image Upload - COMPACT VERSION */}
          <div className="md:col-span-2 bg-white p-6 rounded-xl border border-stone-200 shadow-sm">
            <h2 className="text-lg font-bold text-stone-800 mb-4 border-b border-stone-100 pb-2">Product Image</h2>
            
            <div className="border-2 border-dashed border-stone-300 rounded-lg p-6 text-center hover:border-rose-800 transition cursor-pointer bg-stone-50 flex flex-col items-center justify-center min-h-[160px]">
              <svg className="w-10 h-10 text-stone-400 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <p className="text-sm text-stone-600 font-medium">Click to upload image</p>
              <p className="text-xs text-stone-400 mt-1">Max file size: 5MB</p>
            </div>
          </div>

          {/* Inventory Sidebar */}
          <div className="bg-white p-6 rounded-xl border border-stone-200 shadow-sm h-full">
            <h2 className="text-lg font-bold text-stone-800 mb-4 border-b border-stone-100 pb-2">Inventory</h2>
            <div>
              <label className="block text-sm font-medium text-stone-700 mb-1">Stock Quantity</label>
              <input 
                type="number" 
                min="1"
                placeholder="1"
                className="w-full px-4 py-2 rounded-lg border border-stone-300 focus:ring-2 focus:ring-rose-800 focus:border-transparent outline-none transition"
              />
              <p className="text-xs text-stone-400 mt-2">
                Set to 0 to mark as "Out of Stock".
              </p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end space-x-4 pt-4 border-t border-stone-200">
          <Link 
            href="/dashboard/products"
            className="px-6 py-3 rounded-lg border border-stone-300 text-stone-700 font-medium hover:bg-stone-50 transition"
          >
            Cancel
          </Link>
          <button 
            type="submit" 
            disabled={isSubmitting}
            className={`px-8 py-3 rounded-lg bg-rose-800 text-white font-bold hover:bg-rose-900 transition shadow-lg shadow-rose-900/20 flex items-center ${isSubmitting ? 'opacity-75 cursor-not-allowed' : ''}`}
          >
            {isSubmitting ? 'Publishing...' : 'Publish Product'}
          </button>
        </div>

      </form>
    </div>
  );
}