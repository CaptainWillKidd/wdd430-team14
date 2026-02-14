import { sql } from '@/lib/db';
import LandingClient from './LandingClient';

export const dynamic = 'force-dynamic';

export default async function LandingPage() {
  // 1. Fetch real products from Neon
  const products = await sql`
    SELECT id, name, category, price, image_url 
    FROM products 
    ORDER BY created_at DESC
  `;

  // 2. Format products to match the Client's expected Interface exactly
  const formattedProducts = products.map(p => ({
    id: String(p.id),
    name: String(p.name),
    category: String(p.category || 'Uncategorized'),
    price: Number(p.price),
    image_url: String(p.image_url || '')
  }));

  return <LandingClient initialProducts={formattedProducts} />;
}