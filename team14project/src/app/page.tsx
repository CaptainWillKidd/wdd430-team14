'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

// --- Types ---
interface Product {
  id: number;
  name: string;
  category: string;
  price: string;
  image: string;
}

// --- Mock Data ---
const products: Product[] = [
  { id: 1, name: 'Roman Bust Replica', category: 'Classical', price: '$120.00', image: 'https://placehold.co/300x300/881337/white?text=Classical' },
  { id: 2, name: 'Abstract Cube', category: 'Modern', price: '$250.00', image: 'https://placehold.co/300x300/881337/white?text=Modern' },
  { id: 3, name: 'Digital Print A1', category: 'Media Focus', price: '$85.00', image: 'https://placehold.co/300x300/881337/white?text=Media' },
  { id: 4, name: 'Ceramic Vase', category: 'Decorative', price: '$180.00', image: 'https://placehold.co/300x300/881337/white?text=Decorative' },
  { id: 5, name: 'Oil Painting', category: 'Classical', price: '$450.00', image: 'https://placehold.co/300x300/881337/white?text=Oil+Paint' },
  { id: 6, name: 'Minimalist Lamp', category: 'Decorative', price: '$95.00', image: 'https://placehold.co/300x300/881337/white?text=Lamp' },
  { id: 7, name: 'Bronze Figure', category: 'Modern', price: '$310.00', image: 'https://placehold.co/300x300/881337/white?text=Bronze' },
  { id: 8, name: 'Handwoven Rug', category: 'Decorative', price: '$210.00', image: 'https://placehold.co/300x300/881337/white?text=Rug' },
];

// --- Components ---

const Navbar = () => (
  <nav className="w-full bg-white border-b border-stone-200 sticky top-0 z-50">
    <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
      {/* Brand */}
      <div className="flex items-center">
        <h1 className="text-2xl font-serif font-bold text-stone-800 tracking-tight">
          Handcrafted Haven
        </h1>
      </div>

      {/* Desktop Links */}
      <div className="hidden md:flex space-x-8 text-sm font-medium text-stone-600">
        <Link href="/" className="hover:text-rose-700 transition">Home</Link>
        <Link href="/shop" className="hover:text-rose-700 transition">Shop</Link>
        <Link href="/about" className="hover:text-rose-700 transition">About</Link>
        <Link href="/artisans" className="hover:text-rose-700 transition">Artisans</Link>
      </div>

      {/* Icons & Login */}
      <div className="flex items-center space-x-6">
        {/* Search */}
        <div className="hidden md:block relative">
          <input 
            type="text" 
            placeholder="Search..." 
            className="pl-3 pr-8 py-1 rounded-full border border-stone-300 text-sm focus:border-rose-700 focus:outline-none"
          />
        </div>

        {/* Login Link (Requested in Doc) */}
        <Link href="/login" className="text-sm font-bold text-rose-800 hover:text-rose-900">
          Login
        </Link>

        {/* Cart Icon (Requested in Doc) */}
        <button className="relative text-stone-600 hover:text-rose-700">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
          </svg>
          <span className="absolute -top-2 -right-2 bg-rose-700 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
            0
          </span>
        </button>
      </div>
    </div>
  </nav>
);

const Footer = () => (
  <footer className="bg-stone-900 text-stone-400 py-12 border-t border-rose-900">
    <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8 text-sm">
      {/* Column 1: Brand */}
      <div>
        <h3 className="text-white text-lg font-serif font-bold mb-4">Handcrafted Haven</h3>
        <p className="mb-4">
          Connecting you with independent artisans to discover unique, one-of-a-kind pieces.
        </p>
        <div className="flex space-x-4">
          {/* Social Placeholders */}
          <div className="w-8 h-8 bg-stone-700 rounded-full flex items-center justify-center hover:bg-rose-800 cursor-pointer">FB</div>
          <div className="w-8 h-8 bg-stone-700 rounded-full flex items-center justify-center hover:bg-rose-800 cursor-pointer">IG</div>
          <div className="w-8 h-8 bg-stone-700 rounded-full flex items-center justify-center hover:bg-rose-800 cursor-pointer">X</div>
        </div>
      </div>

      {/* Column 2: Shop */}
      <div>
        <h4 className="text-white font-bold mb-4 uppercase tracking-wider">Shop</h4>
        <ul className="space-y-2">
          <li><Link href="#" className="hover:text-rose-500">All Products</Link></li>
          <li><Link href="#" className="hover:text-rose-500">Classical Arts</Link></li>
          <li><Link href="#" className="hover:text-rose-500">Modern & Abstract</Link></li>
          <li><Link href="#" className="hover:text-rose-500">Home Decor</Link></li>
        </ul>
      </div>

      {/* Column 3: Support */}
      <div>
        <h4 className="text-white font-bold mb-4 uppercase tracking-wider">Support</h4>
        <ul className="space-y-2">
          <li><Link href="#" className="hover:text-rose-500">Help Center</Link></li>
          <li><Link href="#" className="hover:text-rose-500">Shipping & Returns</Link></li>
          <li><Link href="#" className="hover:text-rose-500">Order Status</Link></li>
          <li><Link href="#" className="hover:text-rose-500">Contact Us</Link></li>
        </ul>
      </div>

      {/* Column 4: Legal */}
      <div>
        <h4 className="text-white font-bold mb-4 uppercase tracking-wider">Legal</h4>
        <ul className="space-y-2">
          <li><Link href="#" className="hover:text-rose-500">Privacy Policy</Link></li>
          <li><Link href="#" className="hover:text-rose-500">Terms of Service</Link></li>
          <li><Link href="#" className="hover:text-rose-500">Cookie Policy</Link></li>
        </ul>
      </div>
    </div>
    <div className="text-center mt-12 border-t border-stone-800 pt-8 text-xs">
      &copy; {new Date().getFullYear()} Handcrafted Haven. All rights reserved.
    </div>
  </footer>
);

const HeroSection = () => (
  <div className="bg-stone-50 py-16 md:py-24">
    <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between">
      <div className="md:w-1/2 space-y-6 mb-8 md:mb-0">
        <span className="text-rose-700 font-bold text-sm tracking-widest uppercase">Support Artisans</span>
        <h1 className="text-5xl md:text-6xl font-serif text-stone-900 leading-tight">
          Curated. Collectible. <br/> Yours.
        </h1>
        <p className="text-lg text-stone-600">
          Explore a virtual marketplace dedicated to handcrafted excellence.
        </p>
        <Link href="/shop" className="inline-block bg-rose-800 text-white py-3 px-8 rounded-md font-medium hover:bg-rose-900 transition shadow-lg shadow-rose-900/20">
          Explore the Market
        </Link>
      </div>
      <div className="md:w-1/2 relative flex justify-center">
        <div className="rounded-full bg-rose-100 w-[300px] h-[300px] md:w-[450px] md:h-[450px] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-0"></div>
        <Image 
          src="https://placehold.co/500x600/881337/white?text=Hero+Art" 
          alt="Hero Art" 
          width={500} 
          height={600} 
          style={{ objectFit: "contain" }} 
          className="relative z-10 drop-shadow-xl" 
        />
      </div>
    </div>
  </div>
);

const CategoryPreview = ({ title, categoryFilter }: { title: string, categoryFilter: string[] }) => (
  <div className="max-w-6xl mx-auto px-6 py-16">
    <div className="flex justify-between items-end mb-8">
      <div>
        <h2 className="text-3xl font-serif text-stone-900">{title}</h2>
        <div className="h-1 w-20 bg-rose-800 mt-2"></div>
      </div>
      <Link href="/shop" className="text-rose-800 font-bold hover:underline text-sm">View All</Link>
    </div>
    
    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
      {products.filter(p => categoryFilter.includes(p.category)).slice(0, 4).map((product) => (
        <div key={product.id} className="group cursor-pointer">
          <div className="bg-stone-100 rounded-lg overflow-hidden relative border border-stone-200 aspect-square">
            <Image 
              src={product.image} 
              alt={product.name} 
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105" 
            />
            {product.category === 'Classical' && (
              <span className="absolute top-2 left-2 bg-rose-800 text-white px-2 py-1 text-xs font-bold uppercase tracking-wider rounded-sm">
                Bestseller
              </span>
            )}
          </div>
          <div className="mt-4">
            <p className="text-xs text-stone-500 uppercase tracking-wide">{product.category}</p>
            <h3 className="text-lg font-medium text-stone-800 group-hover:text-rose-700 transition">{product.name}</h3>
            <p className="text-rose-700 font-bold mt-1">{product.price}</p>
          </div>
        </div>
      ))}
    </div>
  </div>
);

// --- Main Layout ---
export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <HeroSection />

        {/* Categories: Classical & Modern */}
        <section className="bg-white">
          <CategoryPreview 
            title="Classical & Modern" 
            categoryFilter={['Classical', 'Modern']} 
          />
        </section>

        {/* Categories: Decorative & Media */}
        <section className="bg-stone-50">
          <CategoryPreview 
            title="Decorative & Media Arts" 
            categoryFilter={['Decorative', 'Media Focus']} 
          />
        </section>

        {/* Call to Action for Artisans */}
        <section className="bg-rose-900 py-16 text-center text-white">
          <div className="max-w-2xl mx-auto px-6">
            <h2 className="text-3xl font-serif font-bold mb-4">Are you an Artisan?</h2>
            <p className="mb-8 text-rose-100">
              Join Handcrafted Haven to showcase your unique creations to a global audience.
              Create your shop profile today.
            </p>
            <Link href="/register" className="inline-block bg-white text-rose-900 py-3 px-8 rounded-md font-bold hover:bg-stone-100 transition">
              Start Selling
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}