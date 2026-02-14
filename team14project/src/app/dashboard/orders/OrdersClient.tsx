'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function OrdersClient({ initialOrders }: { initialOrders: any[] }) {
  const [filter, setFilter] = useState('All');
  const [selectedOrder, setSelectedOrder] = useState<any>(null);
  const [orders, setOrders] = useState(initialOrders);
  const router = useRouter();

  const filteredOrders = filter === 'All' 
    ? orders 
    : orders.filter(order => order.status === filter);

  // Function to trigger the CSV download
  const handleDownload = () => {
    window.location.href = '/api/dashboard/export-orders';
  };

  const handleShipNow = async (orderId: string) => {
    try {
      const response = await fetch(`/api/orders/${orderId}/ship`, { method: 'POST' });
      if (response.ok) {
        setOrders(orders.map(o => o.id === orderId ? { ...o, status: 'Shipped' } : o));
        setSelectedOrder(null);
        router.refresh();
      }
    } catch (error) {
      console.error("Failed to update shipping status", error);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Shipped': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Completed': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-stone-100 text-stone-800';
    }
  };

  return (
    <div>
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-serif font-bold text-stone-900">Order Management</h1>
          <p className="text-stone-500 text-sm">Review customer details and fulfill shipments.</p>
        </div>
        
        {/* Updated Download Button */}
        <button 
          onClick={handleDownload}
          className="mt-4 md:mt-0 bg-white border border-stone-300 text-stone-600 px-4 py-2 rounded-lg text-sm font-medium hover:bg-stone-50 transition shadow-sm flex items-center"
        >
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
          Download Shipping Log
        </button>
      </div>

      {/* Tabs / Filters */}
      <div className="flex space-x-1 bg-stone-100 p-1 rounded-lg inline-flex mb-6">
        {['All', 'Pending', 'Shipped', 'Completed'].map((tab) => (
          <button
            key={tab}
            onClick={() => setFilter(tab)}
            className={`px-4 py-2 text-sm font-medium rounded-md transition ${
              filter === tab ? 'bg-white text-rose-800 shadow-sm' : 'text-stone-500 hover:text-stone-700'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Orders Table */}
      <div className="bg-white border border-stone-200 rounded-xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-stone-500 uppercase bg-stone-50 border-b border-stone-100">
              <tr>
                <th className="px-6 py-4">Order ID</th>
                <th className="px-6 py-4">Customer</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Total</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {filteredOrders.length > 0 ? (
                filteredOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-stone-50 transition">
                    <td className="px-6 py-4 font-mono text-xs text-stone-500">
                      #{order.id.slice(0, 8)}
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-bold text-stone-900">{order.customer}</div>
                      <div className="text-xs text-stone-400">{order.date}</div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-[10px] font-bold border ${getStatusColor(order.status)}`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 font-bold text-stone-900">
                      ${order.total.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button 
                        onClick={() => setSelectedOrder(order)}
                        className="bg-stone-900 text-white px-4 py-2 rounded-lg text-xs font-bold hover:bg-stone-700 transition"
                      >
                        View Details
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-stone-400 italic">
                    No orders found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* DETAIL MODAL */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-stone-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full shadow-2xl animate-in fade-in zoom-in duration-200">
            <div className="p-6 border-b border-stone-100 flex justify-between items-center">
              <h2 className="text-xl font-serif font-bold text-stone-900">Fulfillment Detail</h2>
              <button onClick={() => setSelectedOrder(null)} className="text-stone-400 hover:text-stone-600">✕</button>
            </div>
            
            <div className="p-8 space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <h4 className="text-[10px] uppercase tracking-widest text-stone-400 font-bold mb-1">Customer</h4>
                  <p className="text-sm font-bold text-stone-900">{selectedOrder.customer}</p>
                  <p className="text-xs text-stone-500">{selectedOrder.customer_email}</p>
                </div>
                <div>
                  <h4 className="text-[10px] uppercase tracking-widest text-stone-400 font-bold mb-1">Ship To</h4>
                  <p className="text-sm text-stone-700 leading-relaxed italic">
                    {selectedOrder.shipping_address}
                  </p>
                </div>
              </div>

              <div className="bg-stone-50 p-4 rounded-xl border border-stone-100">
                <h4 className="text-[10px] uppercase tracking-widest text-stone-400 font-bold mb-2">Order Contents</h4>
                <p className="text-sm text-stone-800 font-medium">{selectedOrder.items_summary}</p>
              </div>

              <div className="pt-4 flex flex-col space-y-3">
                {selectedOrder.status === 'Pending' ? (
                  <button 
                    onClick={() => handleShipNow(selectedOrder.id)}
                    className="w-full bg-rose-800 text-white py-4 rounded-xl font-bold hover:bg-rose-900 shadow-lg shadow-rose-900/20 transition"
                  >
                    Mark as Shipped
                  </button>
                ) : (
                  <div className="text-center py-3 bg-stone-100 text-stone-500 rounded-xl text-xs font-bold uppercase tracking-widest">
                    This order is {selectedOrder.status}
                  </div>
                )}
                <button 
                  onClick={() => setSelectedOrder(null)}
                  className="w-full py-2 text-stone-400 text-xs font-bold hover:text-stone-600"
                >
                  Close Window
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}