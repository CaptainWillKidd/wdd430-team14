import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { redirect } from 'next/navigation';

export default async function DashboardOverview() {
  const session = (await getServerSession(authOptions as any)) as any;
  if (!session || !(session as any)?.user?.role || (session as any).user.role !== 'artisan') {
    redirect('/login');
  }
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-serif font-bold text-stone-900">Dashboard</h1>
        <p className="text-stone-500">Welcome back! Here's what's happening with your shop today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Card 1: Sales */}
        <div className="bg-white p-6 rounded-xl border border-stone-200 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-stone-500 text-sm font-medium uppercase tracking-wider">Total Revenue</h3>
            <span className="p-2 bg-green-100 text-green-700 rounded-full">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </span>
          </div>
          <p className="text-3xl font-bold text-stone-900">$1,240.00</p>
          <p className="text-sm text-green-600 mt-2 flex items-center">
            <span className="font-bold mr-1">↑ 12%</span> from last month
          </p>
        </div>

        {/* Card 2: Orders */}
        <div className="bg-white p-6 rounded-xl border border-stone-200 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-stone-500 text-sm font-medium uppercase tracking-wider">Active Orders</h3>
            <span className="p-2 bg-rose-100 text-rose-700 rounded-full">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
            </span>
          </div>
          <p className="text-3xl font-bold text-stone-900">3</p>
          <p className="text-sm text-stone-400 mt-2">2 pending shipment</p>
        </div>

        {/* Card 3: Products */}
        <div className="bg-white p-6 rounded-xl border border-stone-200 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-stone-500 text-sm font-medium uppercase tracking-wider">Total Products</h3>
            <span className="p-2 bg-blue-100 text-blue-700 rounded-full">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
            </span>
          </div>
          <p className="text-3xl font-bold text-stone-900">12</p>
          <p className="text-sm text-stone-400 mt-2">1 out of stock</p>
        </div>
      </div>

      {/* Recent Activity Table */}
      <div className="bg-white rounded-xl border border-stone-200 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-stone-200 flex justify-between items-center">
          <h3 className="font-serif font-bold text-stone-900">Recent Orders</h3>
          <button className="text-sm text-rose-800 font-bold hover:underline">View All</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-stone-500 uppercase bg-stone-50">
              <tr>
                <th className="px-6 py-3">Order ID</th>
                <th className="px-6 py-3">Customer</th>
                <th className="px-6 py-3">Status</th>
                <th className="px-6 py-3">Amount</th>
                <th className="px-6 py-3">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              <tr className="bg-white hover:bg-stone-50 transition">
                <td className="px-6 py-4 font-medium text-stone-900">#ORD-001</td>
                <td className="px-6 py-4">Sarah Johnson</td>
                <td className="px-6 py-4">
                  <span className="bg-green-100 text-green-800 text-xs font-bold px-2 py-1 rounded-full">Completed</span>
                </td>
                <td className="px-6 py-4">$120.00</td>
                <td className="px-6 py-4 text-stone-500">Feb 22, 2026</td>
              </tr>
              <tr className="bg-white hover:bg-stone-50 transition">
                <td className="px-6 py-4 font-medium text-stone-900">#ORD-002</td>
                <td className="px-6 py-4">Michael Chen</td>
                <td className="px-6 py-4">
                  <span className="bg-yellow-100 text-yellow-800 text-xs font-bold px-2 py-1 rounded-full">Pending</span>
                </td>
                <td className="px-6 py-4">$85.00</td>
                <td className="px-6 py-4 text-stone-500">Feb 21, 2026</td>
              </tr>
              <tr className="bg-white hover:bg-stone-50 transition">
                <td className="px-6 py-4 font-medium text-stone-900">#ORD-003</td>
                <td className="px-6 py-4">Jessica Williams</td>
                <td className="px-6 py-4">
                  <span className="bg-blue-100 text-blue-800 text-xs font-bold px-2 py-1 rounded-full">Shipped</span>
                </td>
                <td className="px-6 py-4">$250.00</td>
                <td className="px-6 py-4 text-stone-500">Feb 20, 2026</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}