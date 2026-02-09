'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export default function OrdersPage() {
  const [filter, setFilter] = useState('All');

  // Mock Orders Data
  const orders = [
    { 
      id: 'ORD-7782', 
      customer: 'Sarah Jenkins', 
      date: 'Feb 24, 2026', 
      total: 120.00, 
      status: 'Pending',
      items: 'Roman Bust Replica (x1)'
    },
    { 
      id: 'ORD-7781', 
      customer: 'Michael Ross', 
      date: 'Feb 23, 2026', 
      total: 85.00, 
      status: 'Shipped',
      items: 'Digital Print A1 (x1)'
    },
    { 
      id: 'ORD-7780', 
      customer: 'Amara K.', 
      date: 'Feb 21, 2026', 
      total: 450.00, 
      status: 'Delivered',
      items: 'Oil Painting (x1)'
    },
    { 
      id: 'ORD-7779', 
      customer: 'David Chen', 
      date: 'Feb 20, 2026', 
      total: 250.00, 
      status: 'Pending',
      items: 'Abstract Cube (x1)'
    },
  ];

  // Filter Logic
  const filteredOrders = filter === 'All' 
    ? orders 
    : orders.filter(order => order.status === filter);

  // Status Badge Helper
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Shipped': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Delivered': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-stone-100 text-stone-800';
    }
  };

  return (
    <div>
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-serif font-bold text-stone-900">Orders</h1>
          <p className="text-stone-500 text-sm">Manage and track your customer shipments.</p>
        </div>
        
        {/* Export Button (Visual only) */}
        <button className="mt-4 md:mt-0 bg-white border border-stone-300 text-stone-600 px-4 py-2 rounded-lg text-sm font-medium hover:bg-stone-50 transition shadow-sm">
          Download Report
        </button>
      </div>

      {/* Tabs / Filters */}
      <div className="flex space-x-1 bg-stone-100 p-1 rounded-lg inline-flex mb-6">
        {['All', 'Pending', 'Shipped', 'Delivered'].map((tab) => (
          <button
            key={tab}
            onClick={() => setFilter(tab)}
            className={`px-4 py-2 text-sm font-medium rounded-md transition ${
              filter === tab 
                ? 'bg-white text-rose-800 shadow-sm' 
                : 'text-stone-500 hover:text-stone-700'
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
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Total</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {filteredOrders.length > 0 ? (
                filteredOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-stone-50 transition">
                    <td className="px-6 py-4 font-medium text-stone-900">
                      {order.id}
                      <div className="text-xs text-stone-400 font-normal mt-1">{order.items}</div>
                    </td>
                    <td className="px-6 py-4">{order.customer}</td>
                    <td className="px-6 py-4 text-stone-500">{order.date}</td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold border ${getStatusColor(order.status)}`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 font-medium text-stone-900">${order.total.toFixed(2)}</td>
                    <td className="px-6 py-4 text-right">
                      <button className="text-stone-400 hover:text-rose-800 font-medium transition mr-4">Details</button>
                      {order.status === 'Pending' && (
                        <button className="text-rose-800 font-bold hover:underline text-xs">Ship Now</button>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-stone-500">
                    No orders found in this category.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}