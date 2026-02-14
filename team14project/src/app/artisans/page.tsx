import { sql } from '@/lib/db';
import ArtisansClient from './ArtisansClient';

export const dynamic = 'force-dynamic';

export default async function ArtisansPage() {
  // Removed u.image_url since it doesn't exist in your schema yet
  const artisans = await sql`
    SELECT 
      u.id, 
      u.name, 
      u.email,
      COUNT(p.id) as product_count
    FROM users u
    LEFT JOIN products p ON u.id = p.artisan_id
    WHERE u.role = 'artisan'
    GROUP BY u.id, u.name, u.email
    ORDER BY u.name ASC
  `;

  return (
    <div className="min-h-screen bg-stone-50 py-12">
      <ArtisansClient initialArtisans={artisans} />
    </div>
  );
}