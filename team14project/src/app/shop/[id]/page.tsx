import { sql } from '@/lib/db';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import ProductDetailClient from './ProductDetailClient';

export const dynamic = 'force-dynamic';

export default async function ProductDetailPage({ 
  params 
}: { 
  params: Promise<{ id: string }> 
}) {
  const { id } = await params;

  // 1. Fetch real product data + Artisan info from DB
  const results = await sql`
    SELECT p.*, u.name as artisan_name, u.id as artisan_id
    FROM products p
    LEFT JOIN users u ON p.artisan_id = u.id
    WHERE p.id = ${id}::uuid
  `;

  const product = results[0];

  if (!product) {
    notFound();
  }

  // 2. Helper to format price beautifully (e.g., $30,000.00)
  const formattedPrice = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(Number(product.price));

  return (
    <div className="min-h-screen bg-stone-50 py-12">
      <div className="max-w-6xl mx-auto px-6">
        
        {/* Breadcrumbs */}
        <nav className="text-sm text-stone-500 mb-8">
          <Link href="/" className="hover:text-rose-800 transition">Home</Link>
          <span className="mx-2">/</span>
          <Link href="/shop" className="hover:text-rose-800 transition">Shop</Link>
          <span className="mx-2">/</span>
          <span className="text-stone-800 font-medium">{product.name}</span>
        </nav>

        <div className="bg-white rounded-xl shadow-sm border border-stone-200 overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2">
            
            {/* LEFT COLUMN: Gallery */}
            <div className="p-8 bg-stone-50 flex items-center justify-center border-b md:border-b-0 md:border-r border-stone-200">
              <div className="relative w-full aspect-square max-w-[500px]">
                <Image 
                  src={product.image_url || 'https://placehold.co/600x600/stone/white?text=No+Image'} 
                  alt={product.name} 
                  fill
                  className="object-contain drop-shadow-xl"
                  priority
                />
              </div>
            </div>

            {/* RIGHT COLUMN: Interactive Client Component */}
            {/* We pass the DB product data AND the formatted price into your UI */}
            <ProductDetailClient 
              product={{
                ...product,
                displayPrice: formattedPrice // Adding the pretty price here
              }} 
            />
            
          </div>
        </div>
      </div>
    </div>
  );
}