import { NextResponse } from 'next/server';
import sql from '@/lib/db';

export async function POST() {
  try {
    // check if table exists
    const [res] = await sql.query("SELECT to_regclass('public.users') AS present");
    if (res && res.present) {
      return NextResponse.json({ ok: true, message: 'users table already exists' });
    }

    const createSql = `
      CREATE EXTENSION IF NOT EXISTS pgcrypto;
      CREATE TABLE IF NOT EXISTS users (
        id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
        name text,
        email text UNIQUE NOT NULL,
        password_hash text,
        role text NOT NULL DEFAULT 'customer' CHECK (role IN ('customer','artisan')),
        created_at timestamptz DEFAULT now()
      );
    `;

    await sql.query(createSql);
    // If an initial artisan email is provided via env, insert it as the first artisan
    const initialEmail = process.env.INITIAL_ARTISAN_EMAIL;
    const initialName = process.env.INITIAL_ARTISAN_NAME ?? null;
    if (initialEmail) {
      await sql`INSERT INTO users (email, name, role)
        SELECT ${initialEmail}, ${initialName}, 'artisan'
        WHERE NOT EXISTS (SELECT 1 FROM users WHERE role = 'artisan' OR email = ${initialEmail})`;
    }
    return NextResponse.json({ ok: true, message: 'users table created' });
  } catch (err) {
    console.error('migrate error', err);
    return NextResponse.json({ ok: false, error: String(err) }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({ ok: true, info: 'Send POST to run migration' });
}
