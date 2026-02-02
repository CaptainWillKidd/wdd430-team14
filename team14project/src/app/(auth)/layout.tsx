import React from 'react';
import Link from 'next/link';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-[calc(100vh-80px)] bg-stone-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-lg overflow-hidden flex max-w-4xl w-full border border-stone-200">
        
        {/* SHARED LEFT SIDE - Branding & Info */}
        <div className="hidden md:flex md:w-1/2 bg-rose-900 p-12 flex-col justify-between relative overflow-hidden">
          <div className="relative z-10 text-white">
            <h2 className="text-4xl font-serif font-bold mb-4">Handcrafted Haven</h2>
            <p className="text-rose-100 font-light leading-relaxed">
              Join our community of artisans and art lovers. Discover unique stories behind every piece.
            </p>
          </div>
          
          {/* Decorative Circles */}
          <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-rose-800 rounded-full opacity-50"></div>
          <div className="absolute top-12 right-12 w-32 h-32 bg-rose-800 rounded-full opacity-50"></div>
          
          <div className="relative z-10 mt-12 text-rose-200 text-sm">
            &copy; {new Date().getFullYear()} Handcrafted Haven
          </div>
        </div>

        {/* RIGHT SIDE - This is where Login/Register pages will appear */}
        <div className="w-full md:w-1/2 p-8 md:p-12">
          {children}
        </div>

      </div>
    </div>
  );
}