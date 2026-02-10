import { NextResponse } from 'next/server';
import { neon } from '@neondatabase/serverless';

const sql = neon(process.env.DATABASE_URL as string);

export async function GET() {
  try {
    const [row] = await sql`SELECT NOW() as now`;
    return NextResponse.json({ ok: true, now: row?.now ?? null });
  } catch (err) {
    return NextResponse.json({ ok: false, error: String(err) }, { status: 500 });
  }
}
