import React from 'react';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth'; // Using our new fixed auth!
import { sql } from '@/lib/db'; // Using the database connection
import Image from 'next/image';
import Link from 'next/link';
import { redirect } from 'next/navigation';

export default async function ProductsPage() {
  const session = (await getServerSession(authOptions)) as any;

  // Security Check: Kick them out if they aren't an artisan
  if (!session || !session.user || session.user.role !== 'artisan') {
    redirect('/login');
  }

  const artisanId = session.user.id;
  let products: any[] = [];

  try {
    // FETCH REAL DATA: Get products that belong to this specific artisan
    products = await sql`
      SELECT id, name, price, stock, category, status, image_url 
      FROM products 
      WHERE artisan_id = ${artisanId}
      ORDER BY created_at DESC
    `;
  } catch (error) {
    console.error("Database Error:", error);
    // You might want to show a user-friendly error message here in a real app
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-stone-900">My Inventory</h1>
        <Link 
          href="/dashboard/products/add" 
          className="bg-stone-900 text-white px-4 py-2 rounded-lg font-bold hover:bg-stone-800 transition"
        >
          + Add New Product
        </Link>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-stone-200 overflow-hidden">
        {products.length === 0 ? (
          <div className="p-12 text-center text-stone-500">
            <p className="mb-4">You haven't added any products yet.</p>
            <Link 
              href="/dashboard/products/add"
              className="text-stone-900 underline font-medium hover:text-stone-700"
            >
              Add your first product
            </Link>
          </div>
        ) : (
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-stone-50 border-b border-stone-200 text-sm text-stone-500 uppercase">
                <th className="p-4 font-medium">Product</th>
                <th className="p-4 font-medium">Category</th>
                <th className="p-4 font-medium">Price</th>
                <th className="p-4 font-medium">Stock</th>
                <th className="p-4 font-medium">Status</th>
                <th className="p-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {products.map((product: any) => (
                <tr key={product.id} className="hover:bg-stone-50 transition">
                  <td className="p-4 flex items-center gap-3">
                    <div className="w-10 h-10 rounded bg-stone-100 relative overflow-hidden shrink-0">
                      {/* Using a placeholder if no image exists yet */}
                      <Image 
                        src={product.image_url || 'https://placehold.co/100x100/e7e5e4/a8a29e?text=No+Img'} 
                        alt={product.name} 
                        fill 
                        className="object-cover" 
                      />
                    </div>
                    <span className="font-medium text-stone-900">{product.name}</span>
                  </td>
                  <td className="p-4 text-stone-600">{product.category}</td>
                  <td className="p-4 text-stone-900 font-medium">${Number(product.price).toFixed(2)}</td>
                  <td className="p-4 text-stone-600">{product.stock}</td>
                  <td className="p-4">
                    <span className={`px-2 py-1 rounded text-xs font-bold ${
                      product.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-stone-100 text-stone-600'
                    }`}>
                      {product.status || 'Active'}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <button className="text-stone-400 hover:text-rose-600 font-medium transition">
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}