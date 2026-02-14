import { sql } from '@/lib/db';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import { redirect } from 'next/navigation';
import OrdersClient from './OrdersClient';

export const dynamic = 'force-dynamic';

export default async function OrdersPage() {
  const session = (await getServerSession(authOptions as any)) as any;
  
  if (!session || session.user.role !== 'artisan') {
    redirect('/login');
  }

  const artisanId = session.user.id;

  // Fetch real orders with shipping details
  const rawOrders = await sql`
    SELECT 
      o.id, 
      o.customer_name as customer, 
      o.customer_email,
      o.total_amount,
      o.status,
      o.created_at as date,
      -- Check if shipping_address exists, otherwise use a placeholder
      COALESCE(o.shipping_address, 'Address not provided') as shipping_address,
      string_agg(p.name || ' (x' || oi.quantity || ')', ', ') as items_summary
    FROM orders o
    JOIN order_items oi ON o.id = oi.order_id
    JOIN products p ON oi.product_id = p.id
    WHERE p.artisan_id = ${artisanId}
    GROUP BY o.id, o.customer_name, o.customer_email, o.total_amount, o.status, o.created_at, o.shipping_address
    ORDER BY o.created_at DESC
  `;

  // Format data for the client
  const orders = rawOrders.map(order => ({
    ...order,
    total: order.total_amount / 100, // Convert to dollars
    date: new Date(order.date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    })
  }));

  return (
    <div className="max-w-6xl mx-auto py-8 px-4">
      <OrdersClient initialOrders={orders} />
    </div>
  );
}