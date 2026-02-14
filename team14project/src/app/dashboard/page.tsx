import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { sql } from '@/lib/db';

export default async function DashboardOverview() {
  const session = (await getServerSession(authOptions as any)) as any;

  if (!session || !session?.user?.role || session.user.role !== 'artisan') {
    redirect('/login');
  }

  const artisanId = session.user.id;

  // 1. Fetch Stats from DB
  const [productStats, orderStats, revenueStats, recentOrders] = await Promise.all([
    // Total Products
    sql`SELECT COUNT(*) as total FROM products WHERE artisan_id = ${artisanId}`,
    
    // Active Orders (Pending or Shipped)
    sql`SELECT COUNT(*) as total FROM orders o 
        JOIN order_items oi ON o.id = oi.order_id 
        JOIN products p ON oi.product_id = p.id
        WHERE p.artisan_id = ${artisanId} AND o.status IN ('Pending', 'Shipped')`,
    
    // Total Revenue (Sum of successful orders)
    sql`SELECT SUM(oi.price * oi.quantity) as total FROM order_items oi
        JOIN products p ON oi.product_id = p.id
        JOIN orders o ON oi.order_id = o.id
        WHERE p.artisan_id = ${artisanId} AND o.status = 'Completed'`,
    
    // Recent Orders List
    sql`SELECT DISTINCT o.id, o.customer_name, o.status, o.total_amount, o.created_at
        FROM orders o
        JOIN order_items oi ON o.id = oi.order_id
        JOIN products p ON oi.product_id = p.id
        WHERE p.artisan_id = ${artisanId}
        ORDER BY o.created_at DESC LIMIT 5`
  ]);

  const totalProducts = productStats[0].total;
  const activeOrders = orderStats[0].total;
  const revenueCents = revenueStats[0].total || 0;

  // Formatters
  const fmtPrice = (cents: number) => 
    new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(cents / 100);

  const formatDate = (date: Date) => 
    new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric', year: 'numeric' }).format(date);

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-serif font-bold text-stone-900">Dashboard</h1>
        <p className="text-stone-500 mb-2">Live stats for your artisan shop.</p>
        <Link href={`/artisans/${artisanId}`} className="text-stone-900 underline font-medium hover:text-stone-600 text-sm">
          View Public Gallery →
        </Link>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Total Revenue */}
        <div className="bg-white p-6 rounded-xl border border-stone-200 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-stone-500 text-sm font-medium uppercase tracking-wider">Total Revenue</h3>
            <span className="p-2 bg-green-100 text-green-700 rounded-full">
               <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            </span>
          </div>
          <p className="text-3xl font-bold text-stone-900">{fmtPrice(revenueCents)}</p>
          <p className="text-xs text-green-600 mt-2 font-bold italic">Earnings from completed sales</p>
        </div>

        {/* Active Orders */}
        <div className="bg-white p-6 rounded-xl border border-stone-200 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-stone-500 text-sm font-medium uppercase tracking-wider">Active Orders</h3>
            <span className="p-2 bg-rose-100 text-rose-700 rounded-full">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>
            </span>
          </div>
          <p className="text-3xl font-bold text-stone-900">{activeOrders}</p>
          <p className="text-xs text-stone-400 mt-2 italic">Items requiring your attention</p>
        </div>

        {/* Total Products */}
        <div className="bg-white p-6 rounded-xl border border-stone-200 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-stone-500 text-sm font-medium uppercase tracking-wider">Total Products</h3>
            <span className="p-2 bg-blue-100 text-blue-700 rounded-full">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" /></svg>
            </span>
          </div>
          <p className="text-3xl font-bold text-stone-900">{totalProducts}</p>
          <p className="text-xs text-stone-400 mt-2 italic">Active listings in shop</p>
        </div>
      </div>

      {/* Recent Orders Table */}
      <div className="bg-white rounded-xl border border-stone-200 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-stone-200 flex justify-between items-center bg-stone-50/50">
          <h3 className="font-serif font-bold text-stone-900">Recent Sales Activity</h3>
          <Link href="/dashboard/orders" className="text-xs text-rose-800 font-bold uppercase hover:underline">View All Orders</Link>
        </div>
        <div className="overflow-x-auto">
          {recentOrders.length > 0 ? (
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-stone-500 uppercase bg-stone-50">
                <tr>
                  <th className="px-6 py-3">Order ID</th>
                  <th className="px-6 py-3">Customer</th>
                  <th className="px-6 py-3">Status</th>
                  <th className="px-6 py-3">Total</th>
                  <th className="px-6 py-3">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {recentOrders.map((order: any) => (
                  <tr key={order.id} className="hover:bg-stone-50">
                    <td className="px-6 py-4 font-mono text-xs text-stone-500">#{order.id.slice(0,8)}</td>
                    <td className="px-6 py-4 font-medium">{order.customer_name}</td>
                    <td className="px-6 py-4">
                      <span className={`text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-tighter ${
                        order.status === 'Completed' ? 'bg-green-100 text-green-800' :
                        order.status === 'Shipped' ? 'bg-blue-100 text-blue-800' : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 font-bold">{fmtPrice(order.total_amount)}</td>
                    <td className="px-6 py-4 text-stone-500">{formatDate(order.created_at)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="py-20 text-center text-stone-400">
              No sales recorded yet.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}