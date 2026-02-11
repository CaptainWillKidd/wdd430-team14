import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import sql from '@/lib/db';

export async function GET() {
  try {
    const session = (await getServerSession(authOptions as any)) as any;
    if (!session || !(session as any)?.user?.role || (session as any).user.role !== 'artisan') {
      return NextResponse.json({ ok: false, error: 'Unauthorized' }, { status: 401 });
    }

    const rows = await sql`SELECT id, name, email, role, created_at FROM users ORDER BY created_at DESC`;
    return NextResponse.json({ ok: true, users: rows });
  } catch (err) {
    console.error('admin users GET error', err);
    return NextResponse.json({ ok: false, error: String(err) }, { status: 500 });
  }
}
