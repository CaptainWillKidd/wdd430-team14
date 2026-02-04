'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useCart } from '../../../context/CartContext';

// --- Mock Data (Extended for Detail View) ---
const allProducts = [
  { 
    id: 1, 
    name: 'Roman Bust Replica', 
    category: 'Classical', 
    price: 120, 
    image: 'https://placehold.co/600x600/881337/white?text=Roman+Bust',
    description: 'A stunning handcrafted replica of a classical Roman bust. Made from high-quality plaster and finished with a weather-resistant coating, this piece brings a touch of ancient history to your modern home.',
    artisan: 'Marcus Stone',
    artisanImg: 'https://placehold.co/100x100/333/white?text=MS',
    rating: 4.8,
    reviews: 12
  },
  { 
    id: 2, 
    name: 'Abstract Cube', 
    category: 'Modern', 
    price: 250, 
    image: 'https://placehold.co/600x600/881337/white?text=Abstract+Cube',
    description: 'This geometric abstract sculpture explores the relationship between space and form. Carved from reclaimed wood and sealed with a matte varnish.',
    artisan: 'Elena V.',
    artisanImg: 'https://placehold.co/100x100/333/white?text=EV',
    rating: 5.0,
    reviews: 4
  },
  // ... (You would add the rest of your products here)
  { id: 3, name: 'Digital Print A1', category: 'Media Focus', price: 85, image: 'https://placehold.co/600x600/881337/white?text=Media' },
  { id: 4, name: 'Ceramic Vase', category: 'Decorative', price: 180, image: 'https://placehold.co/600x600/881337/white?text=Decorative' },
  { id: 5, name: 'Oil Painting', category: 'Classical', price: 450, image: 'https://placehold.co/600x600/881337/white?text=Oil+Paint' },
  { id: 6, name: 'Minimalist Lamp', category: 'Decorative', price: 95, image: 'https://placehold.co/600x600/881337/white?text=Lamp' },
  { id: 7, name: 'Bronze Figure', category: 'Modern', price: 310, image: 'https://placehold.co/600x600/881337/white?text=Bronze' },
  { id: 8, name: 'Handwoven Rug', category: 'Decorative', price: 210, image: 'https://placehold.co/600x600/881337/white?text=Rug' },
];

export default function ProductDetailPage() {
  const params = useParams();
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'desc' | 'reviews' | 'artisan'>('desc');
  const { addItem } = useCart();

  // 1. Find the product that matches the URL ID
  // (We use a fallback if the product isn't found in our small list)
  const productId = Number(params.id);
  const product = allProducts.find((p) => p.id === productId) || allProducts[0];

  return (
    <div className="min-h-screen bg-stone-50 py-12">
      <div className="max-w-6xl mx-auto px-6">
        
        {/* Breadcrumbs */}
        <nav className="text-sm text-stone-500 mb-8">
          <Link href="/" className="hover:text-rose-800">Home</Link>
          <span className="mx-2">/</span>
          <Link href="/shop" className="hover:text-rose-800">Shop</Link>
          <span className="mx-2">/</span>
          <span className="text-stone-800 font-medium">{product.name}</span>
        </nav>

        <div className="bg-white rounded-xl shadow-sm border border-stone-200 overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2">
            
            {/* LEFT COLUMN: Gallery */}
            <div className="p-8 bg-stone-50 flex items-center justify-center border-b md:border-b-0 md:border-r border-stone-200">
              <div className="relative w-full aspect-square max-w-[500px]">
                <Image 
                  src={product.image} 
                  alt={product.name}
                  fill
                  className="object-contain drop-shadow-xl"
                />
              </div>
            </div>

            {/* RIGHT COLUMN: Product Info */}
            <div className="p-8 md:p-12">
              <span className="text-rose-800 font-bold text-xs uppercase tracking-widest mb-2 block">
                {product.category}
              </span>
              <h1 className="text-3xl font-serif font-bold text-stone-900 mb-4">{product.name}</h1>
              
              {/* Artisan Info  */}
              <div className="flex items-center mb-6">
                <div className="w-8 h-8 rounded-full bg-stone-200 overflow-hidden mr-3">
                  <Image src={product.artisanImg || 'https://placehold.co/100x100/333/white?text=A'} alt="Artisan" width={32} height={32} />
                </div>
                <p className="text-sm text-stone-600">
                  Crafted by <span className="font-bold text-stone-800">{product.artisan || 'Unknown Artisan'}</span>
                </p>
                <div className="mx-4 h-4 w-px bg-stone-300"></div>
                <div className="flex text-yellow-500 text-sm">
                  {'★'.repeat(Math.round(product.rating || 5))}
                  <span className="text-stone-400 ml-2">({product.reviews || 0} reviews)</span>
                </div>
              </div>

              <div className="text-2xl font-bold text-rose-800 mb-8">
                ${product.price.toFixed(2)}
              </div>

              <p className="text-stone-600 leading-relaxed mb-8">
                {product.description || 'This unique piece is handcrafted with care and attention to detail. Perfect for collectors and art enthusiasts alike.'}
              </p>

              {/* Add to Cart Section  */}
              <div className="flex items-center space-x-4 mb-8">
                <div className="flex items-center border border-stone-300 rounded-lg">
                  <button 
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-4 py-2 text-stone-600 hover:bg-stone-100 transition"
                  >
                    -
                  </button>
                  <span className="px-4 font-bold text-stone-800">{quantity}</span>
                  <button 
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-4 py-2 text-stone-600 hover:bg-stone-100 transition"
                  >
                    +
                  </button>
                </div>
                <button onClick={() => addItem({ id: product.id, name: product.name, price: Math.round(product.price * 100), image: product.image }, quantity)} className="flex-1 bg-rose-800 text-white font-bold py-3 px-8 rounded-lg hover:bg-rose-900 transition shadow-lg shadow-rose-900/20">
                  Add to Cart
                </button>
              </div>

              {/* Meta Info */}
              <div className="border-t border-stone-100 pt-6 space-y-2 text-sm text-stone-500">
                <p>SKU: HH-{product.id}00</p>
                <p>Category: {product.category}</p>
                <p>Availability: <span className="text-green-600 font-medium">In Stock</span></p>
              </div>
            </div>
          </div>

          {/* TABS SECTION: Reviews & Details  */}
          <div className="border-t border-stone-200">
            <div className="flex border-b border-stone-200">
              <button 
                onClick={() => setActiveTab('desc')}
                className={`px-8 py-4 text-sm font-bold uppercase tracking-wider transition ${activeTab === 'desc' ? 'border-b-2 border-rose-800 text-rose-800' : 'text-stone-500 hover:text-stone-800'}`}
              >
                Description
              </button>
              <button 
                onClick={() => setActiveTab('artisan')}
                className={`px-8 py-4 text-sm font-bold uppercase tracking-wider transition ${activeTab === 'artisan' ? 'border-b-2 border-rose-800 text-rose-800' : 'text-stone-500 hover:text-stone-800'}`}
              >
                About the Artisan
              </button>
              <button 
                onClick={() => setActiveTab('reviews')}
                className={`px-8 py-4 text-sm font-bold uppercase tracking-wider transition ${activeTab === 'reviews' ? 'border-b-2 border-rose-800 text-rose-800' : 'text-stone-500 hover:text-stone-800'}`}
              >
                Reviews
              </button>
            </div>
            
            <div className="p-8 md:p-12 bg-stone-50 min-h-[200px]">
              {activeTab === 'desc' && (
                <div className="max-w-2xl">
                  <h3 className="text-lg font-bold text-stone-800 mb-4">Product Details</h3>
                  <p className="text-stone-600 mb-4">
                    Every curve and contour of the {product.name} has been meticulously shaped by hand. 
                    Using traditional techniques passed down through generations, this piece represents 
                    the pinnacle of the {product.category} style.
                  </p>
                  <ul className="list-disc pl-5 text-stone-600 space-y-1">
                    <li>Handcrafted in the artisan's private studio</li>
                    <li>Made from sustainable, locally sourced materials</li>
                    <li>Includes a certificate of authenticity</li>
                  </ul>
                </div>
              )}
              
              {activeTab === 'artisan' && (
                <div className="flex items-start">
                   <div className="w-16 h-16 rounded-full bg-stone-300 overflow-hidden mr-6 flex-shrink-0">
                    <Image src={product.artisanImg || 'https://placehold.co/100x100/333/white?text=A'} alt="Artisan" width={64} height={64} />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-stone-800 mb-2">{product.artisan || 'The Artisan'}</h3>
                    <p className="text-stone-600">
                      Based in the creative heart of the city, {product.artisan} has been working with {product.category.toLowerCase()} materials for over 10 years. 
                      Their work focuses on the intersection of traditional craftsmanship and modern aesthetics.
                    </p>
                  </div>
                </div>
              )}

              {activeTab === 'reviews' && (
                <div>
                  <h3 className="text-lg font-bold text-stone-800 mb-6">Customer Reviews</h3>
                  {/* Reviews Placeholder  */}
                  <div className="space-y-6">
                    <div className="bg-white p-6 rounded-lg shadow-sm">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-bold text-stone-800">Sarah J.</span>
                        <span className="text-yellow-500">★★★★★</span>
                      </div>
                      <p className="text-stone-600 text-sm">Absolutely beautiful! It looks even better in person than in the photos.</p>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-sm">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-bold text-stone-800">Michael T.</span>
                        <span className="text-yellow-500">★★★★☆</span>
                      </div>
                      <p className="text-stone-600 text-sm">Great quality and fast shipping. The packaging was very secure.</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}