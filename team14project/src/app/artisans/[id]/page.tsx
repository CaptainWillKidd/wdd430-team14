import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { sql } from '@/lib/db';
import { notFound } from 'next/navigation';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function ArtisanProfilePage({ 
  params 
}: { 
  params: Promise<{ id: string }> 
}) {
  const resolvedParams = await params;
  const artisanId = resolvedParams?.id?.trim();

  if (!artisanId) notFound();

  // 1. FIXED QUERY: Removed 'image_url' from the SELECT statement
  const results = await sql`
    SELECT id, name, email, role, created_at
    FROM users 
    WHERE id = ${artisanId}::uuid
  `;
  const artisan = results[0];

  if (!artisan || artisan.role !== 'artisan') {
    notFound();
  }

  // 2. Fetch Real Products (This table DOES have image_url, so this query is fine)
  const products = await sql`
    SELECT id, name, price, image_url, category, description
    FROM products 
    WHERE artisan_id = ${artisanId}::uuid
    ORDER BY created_at DESC
  `;

  // Use a high-quality initials-based avatar since there is no image_url in the users table
  const profileImage = `https://ui-avatars.com/api/?name=${encodeURIComponent(artisan.name)}&background=881337&color=fff&size=200`;

  return (
    <div className="min-h-screen bg-white pt-12">
      
      {/* 1. PROFILE HEADER */}
      <div className="max-w-2xl mx-auto px-6 text-center mb-20">
        <div className="mb-6 inline-block">
          <div className="w-32 h-32 rounded-3xl overflow-hidden border-4 border-stone-50 mx-auto shadow-xl bg-stone-100 flex items-center justify-center">
            {/* Using a standard img tag for the external API avatar */}
            <img 
              src={profileImage} 
              alt={artisan.name} 
              className="object-cover h-full w-full" 
            />
          </div>
        </div>

        <h1 className="text-4xl font-serif font-bold text-stone-900 mb-2">{artisan.name}</h1>
        <p className="text-rose-800 text-sm font-bold tracking-widest uppercase mb-4">Verified Artisan</p>
        
        <p className="text-stone-600 leading-relaxed mb-8 max-w-lg mx-auto italic font-serif">
          "Sharing my creative journey and handcrafted masterpieces with the world."
          <br />
          <span className="not-italic text-xs text-stone-400 mt-2 block uppercase tracking-tighter">
            Member since {new Date(artisan.created_at).getFullYear()}
          </span>
        </p>

        {/* Stats Row */}
        <div className="flex justify-center space-x-12 mb-8 border-t border-b border-stone-100 py-6">
          <div className="text-center">
            <span className="font-bold text-stone-900 block text-xl">{products.length}</span>
            <span className="text-[10px] text-stone-400 uppercase tracking-widest font-bold">Works</span>
          </div>
          <div className="text-center">
            <span className="font-bold text-stone-900 block text-xl">100%</span>
            <span className="text-[10px] text-stone-400 uppercase tracking-widest font-bold">Original</span>
          </div>
          <div className="text-center">
            <span className="font-bold text-stone-900 block text-xl">5.0 ★</span>
            <span className="text-[10px] text-stone-400 uppercase tracking-widest font-bold">Rating</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-center gap-4">
          <button className="bg-stone-900 text-white px-8 py-3 rounded-xl font-bold hover:bg-stone-700 transition shadow-lg shadow-stone-200 w-full md:w-auto">
            Follow Artisan
          </button>
          <a 
            href={`mailto:${artisan.email}`}
            className="border-2 border-stone-100 text-stone-700 px-8 py-3 rounded-xl font-bold hover:bg-stone-50 transition w-full md:w-auto text-center"
          >
            Inquiry
          </a>
        </div>
      </div>

      {/* 2. GALLERY GRID */}
      <div className="max-w-6xl mx-auto px-6 pb-24">
        <div className="flex items-center justify-between mb-10">
            <h2 className="text-2xl font-serif font-bold text-stone-900 underline decoration-rose-800 decoration-4 underline-offset-8">The Collection</h2>
            <p className="text-xs text-stone-400 font-bold uppercase tracking-widest">{products.length} Pieces available</p>
        </div>
        
        {products.length === 0 ? (
          <div className="text-center py-24 bg-stone-50 rounded-3xl border-2 border-dashed border-stone-200">
            <p className="text-stone-400 font-serif italic text-lg">This artisan has not published any works yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-12">
            {products.map((product: any) => (
              <Link href={`/shop/${product.id}`} key={product.id} className="group block">
                <div className="relative aspect-[4/5] bg-stone-100 overflow-hidden rounded-2xl shadow-sm transition-all duration-500 group-hover:shadow-2xl group-hover:-translate-y-2">
                  {product.image_url ? (
                    <Image 
                      src={product.image_url} 
                      alt={product.name} 
                      fill 
                      className="object-cover transition-transform duration-1000 group-hover:scale-110" 
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full text-stone-300 italic">No Image</div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </div>
                
                <div className="mt-6 flex justify-between items-start">
                  <div>
                    <h3 className="text-xl font-serif font-bold text-stone-900 group-hover:text-rose-800 transition">
                      {product.name}
                    </h3>
                    <p className="text-xs text-stone-400 font-bold uppercase tracking-widest mt-1">
                      {product.category}
                    </p>
                  </div>
                  <span className="text-xl font-bold text-stone-900 bg-stone-50 px-3 py-1 rounded-lg border border-stone-100">
                    ${Number(product.price).toLocaleString()}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}