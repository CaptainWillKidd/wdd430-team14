import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import sql from '@/lib/db';

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const role = url.searchParams.get('role');

    const session = (await getServerSession(authOptions as any)) as any;
    if (!session || !(session as any)?.user?.email) {
      // Not signed in — redirect to login
      return NextResponse.redirect(new URL('/login', url.origin));
    }

    // If role=artisan, promote current user to artisan
    if (role === 'artisan') {
      try {
        await sql`UPDATE users SET role = 'artisan' WHERE email = ${(session as any).user.email}`;
      } catch (e) {
        console.error('after-google promote error', e);
      }
      return NextResponse.redirect(new URL('/dashboard', url.origin));
    }

    // default redirect
    return NextResponse.redirect(new URL('/shop', url.origin));
  } catch (err) {
    console.error('after-google error', err);
    return NextResponse.redirect(new URL('/login', 'http://localhost:3000'));
  }
}
