import { sql } from '@/lib/db';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import { NextResponse } from 'next/server';

export async function GET() {
  const session = (await getServerSession(authOptions as any)) as any;
  if (!session || session.user.role !== 'artisan') {
    return new NextResponse('Unauthorized', { status: 401 });
  }

  // 1. Fetch all orders for this artisan
  const orders = await sql`
    SELECT 
      o.id, o.customer_name, o.customer_email, o.status, o.total_amount, o.created_at,
      string_agg(p.name || ' (x' || oi.quantity || ')', '; ') as items
    FROM orders o
    JOIN order_items oi ON o.id = oi.order_id
    JOIN products p ON oi.product_id = p.id
    WHERE p.artisan_id = ${session.user.id}
    GROUP BY o.id ORDER BY o.created_at DESC
  `;

  // 2. Create CSV Header
  let csvContent = "Order ID,Date,Customer,Email,Items,Total (USD),Status\n";

  // 3. Add Rows
  orders.forEach((row: any) => {
    const date = new Date(row.created_at).toLocaleDateString();
    const total = (row.total_amount / 100).toFixed(2);
    // We wrap fields in quotes to prevent commas in names/items from breaking the columns
    csvContent += `"${row.id}","${date}","${row.customer_name}","${row.customer_email}","${row.items}","${total}","${row.status}"\n`;
  });

  // 4. Return as a downloadable file
  return new NextResponse(csvContent, {
    headers: {
      'Content-Type': 'text/csv',
      'Content-Disposition': `attachment; filename="shipping-log-${new Date().toISOString().split('t')[0]}.csv"`,
    },
  });
}