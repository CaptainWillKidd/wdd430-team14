import { sql } from '@/lib/db';
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';

export async function POST(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // 1. Security Check: Ensure only logged-in artisans can ship
    const session = (await getServerSession(authOptions as any)) as any;
    
    if (!session || session.user.role !== 'artisan') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;

    // 2. Update the Order Status
    // We use a UUID cast to ensure the database handles the string ID correctly
    await sql`
      UPDATE orders 
      SET status = 'Shipped' 
      WHERE id = ${id}::uuid
    `;

    return NextResponse.json({ 
      success: true, 
      message: `Order ${id} marked as shipped.` 
    });

  } catch (error) {
    console.error('Shipment API Error:', error);
    return NextResponse.json(
      { error: 'Failed to update shipment status' }, 
      { status: 500 }
    );
  }
}