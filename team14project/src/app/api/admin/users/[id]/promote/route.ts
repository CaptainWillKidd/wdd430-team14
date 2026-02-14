import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
// import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { authOptions } from '@/lib/auth';
import sql from '@/lib/db';

export async function POST(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    
    const session = await getServerSession(authOptions as any);
    if (!session || (session as any)?.user?.role !== 'artisan') {
      return NextResponse.json({ ok: false, error: 'Unauthorized' }, { status: 401 });
    }

    if (!id) return NextResponse.json({ ok: false, error: 'Missing id' }, { status: 400 });

    await sql`UPDATE users SET role = 'artisan' WHERE id = ${id}`;
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('promote error', err);
    return NextResponse.json({ ok: false, error: String(err) }, { status: 500 });
  }
}
