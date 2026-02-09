import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center bg-stone-50 px-6 text-center">
      
      {/* Visual Icon */}
      <div className="relative w-64 h-64 mb-8 opacity-80">
        <Image 
          src="https://placehold.co/600x600/e7e5e4/a8a29e?text=Empty+Easel" 
          alt="404 Illustration" 
          fill 
          className="object-contain"
        />
      </div>

      {/* Text Content */}
      <h1 className="text-6xl font-serif font-bold text-rose-900 mb-2">404</h1>
      <h2 className="text-2xl font-serif font-bold text-stone-800 mb-4">
        This piece hasn't been created yet.
      </h2>
      <p className="text-stone-500 max-w-md mx-auto mb-8">
        The page you are looking for seems to have gone missing from our workshop. It might have been moved, deleted, or never existed.
      </p>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4">
        <Link 
          href="/" 
          className="bg-stone-900 text-white px-8 py-3 rounded-xl font-bold hover:bg-stone-800 transition shadow-lg"
        >
          Return Home
        </Link>
        <Link 
          href="/shop" 
          className="bg-white border border-stone-300 text-stone-700 px-8 py-3 rounded-xl font-bold hover:bg-stone-100 transition"
        >
          Browse Shop
        </Link>
      </div>

    </div>
  );
}