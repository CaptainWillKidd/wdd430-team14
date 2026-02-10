import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import sql from '@/lib/db';
import { randomUUID } from 'crypto';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, password, role } = body;
    if (!email || !password) return NextResponse.json({ ok: false, error: 'Missing fields' }, { status: 400 });

    // check existing
    const [existing] = await sql`SELECT id FROM users WHERE email = ${email}`;
    if (existing) return NextResponse.json({ ok: false, error: 'User already exists' }, { status: 409 });

    const hash = await bcrypt.hash(password, 10);
    const id = randomUUID();
    await sql`INSERT INTO users (id, name, email, password_hash, role, created_at) VALUES (${id}, ${name}, ${email}, ${hash}, ${role ?? 'customer'}, now())`;
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('register error', err);
    return NextResponse.json({ ok: false, error: String(err) }, { status: 500 });
  }
}