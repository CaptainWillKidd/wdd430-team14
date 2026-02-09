'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function MyProductsPage() {
  // Mock Data for the Artisan's products
  const myProducts = [
    { id: 1, name: 'Roman Bust Replica', price: 120.00, stock: 4, status: 'Active', image: 'https://placehold.co/100x100/881337/white?text=Bust' },
    { id: 5, name: 'Oil Painting', price: 450.00, stock: 1, status: 'Active', image: 'https://placehold.co/100x100/881337/white?text=Painting' },
    { id: 7, name: 'Bronze Figure', price: 310.00, stock: 0, status: 'Out of Stock', image: 'https://placehold.co/100x100/881337/white?text=Bronze' },
  ];

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-serif font-bold text-stone-900">My Products</h1>
          <p className="text-stone-500 text-sm">Manage your inventory and pricing.</p>
        </div>
        <Link 
          href="/dashboard/products/add" 
          className="bg-rose-800 text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-rose-900 transition flex items-center shadow-lg shadow-rose-900/20"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Add New Product
        </Link>
      </div>

      <div className="bg-white border border-stone-200 rounded-xl overflow-hidden shadow-sm">
        <table className="w-full text-sm text-left">
          <thead className="text-xs text-stone-500 uppercase bg-stone-50 border-b border-stone-100">
            <tr>
              <th className="px-6 py-4">Product</th>
              <th className="px-6 py-4">Price</th>
              <th className="px-6 py-4">Stock</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-100">
            {myProducts.map((product) => (
              <tr key={product.id} className="hover:bg-stone-50 transition group">
                <td className="px-6 py-4">
                  <div className="flex items-center">
                    <div className="h-10 w-10 flex-shrink-0 relative rounded-md overflow-hidden border border-stone-200">
                      <Image src={product.image} alt={product.name} fill className="object-cover" />
                    </div>
                    <div className="ml-4 font-medium text-stone-900">{product.name}</div>
                  </div>
                </td>
                <td className="px-6 py-4">${product.price.toFixed(2)}</td>
                <td className="px-6 py-4">{product.stock} units</td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                    product.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-stone-200 text-stone-600'
                  }`}>
                    {product.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <button className="text-stone-400 hover:text-rose-800 font-medium transition">Edit</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
        {myProducts.length === 0 && (
          <div className="p-12 text-center text-stone-500">
            You haven't added any products yet.
          </div>
        )}
      </div>
    </div>
  );
}