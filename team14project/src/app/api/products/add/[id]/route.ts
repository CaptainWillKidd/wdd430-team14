import { NextResponse } from 'next/server';
import { sql } from '@/lib/db';

export async function GET(
  request: Request, 
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    
    // Log exactly what is being sent to the DB
    console.log("--- ATTEMPTING FETCH ---");
    console.log("ID from params:", id);

    // Simplest possible query. Postgres usually auto-casts strings to UUIDs.
    const results = await sql`
      SELECT p.*, u.name as artisan_name, u.id as artisan_id
      FROM products p
      LEFT JOIN users u ON p.artisan_id = u.id
      WHERE p.id = ${id}
    `;

    if (results.length === 0) {
      console.log("❌ DB returned nothing for:", id);
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    console.log("✅ DB found:", results[0].name);
    return NextResponse.json(results[0]);
  } catch (error) {
    console.error("API CRASHED:", error);
    return NextResponse.json({ error: 'Server Error' }, { status: 500 });
  }
}