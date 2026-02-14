import { NextResponse } from 'next/server';
import { sql } from '@/lib/db';

export async function GET() {
  // This will show us the name of the database and all tables
  const dbName = await sql`SELECT current_database()`;
  const tables = await sql`SELECT table_name FROM information_schema.tables WHERE table_schema = 'public'`;
  const productCount = await sql`SELECT COUNT(*) FROM products`;
  
  return NextResponse.json({
    database: dbName[0],
    tables: tables.map(t => t.table_name),
    totalProducts: productCount[0].count
  });
}