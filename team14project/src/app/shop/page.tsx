import { sql } from '@/lib/db';
import ShopClient from './ShopClient';

export const dynamic = 'force-dynamic';

export default async function ShopPage() {
  // Fetch real products from Neon
  const products = await sql`
    SELECT 
      p.*, 
      u.name as artisan_name 
    FROM products p
    LEFT JOIN users u ON p.artisan_id = u.id
    ORDER BY p.created_at DESC
  `;

  // Hardcoded categories to match your exact UI requirements
  const categories = ['All', 'Classical', 'Modern', 'Media Focus', 'Decorative'];

  return (
    <ShopClient 
      initialProducts={products.map(p => ({
        ...p,
        price: Number(p.price) 
      }))} 
      categories={categories}
    />
  );
}