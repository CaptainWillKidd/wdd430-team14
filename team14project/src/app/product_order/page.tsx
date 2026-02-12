'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';


// import { Button } from '@/app/ui/button';
import {createOrder, State} from '@/app/lib/actions';

import { useActionState } from 'react';



type OrderItem = {
    id: string;
    name: string;
    quantity: number;
    price: number;
    image: string;
}

type OrderField= {
    orderNumber: string;
    date: string;
    total: number;
    status: 'completed' | 'pending' | 'shipped';
    items: OrderItem[];
}


 

export default function Form({orders}: {orders: OrderField[]}) {
      const initialState: State = { message: null, errors: {} }; 
       const [State, formAction] = useActionState(createOrder, initialState);
        const [activeTab, setActiveTab] = useState<'confirmation' | 'history' | 'processing'>('confirmation');

    // Sample confirmation order
    const currentOrder: OrderField = {
        orderNumber: 'SAM-2024-001234',
        date: new Date().toLocaleDateString(),
        items: [
            { id: '1', name: 'Premium Rose Pillow', quantity: 1, price: 49.99, image: '🌹' },
            { id: '2', name: 'Elegant Bedsheet', quantity: 2, price: 79.99, image: '🛏️' },
        ],
        total: 0,
        status: 'completed',
    };
    
    

    // Sample order history
    const orderHistory: OrderField[] = [
        {
            orderNumber: 'ORD-2024-001233',
            date: '2024-01-15',
            total: 159.99,
            status: 'shipped',
            items: [{ id: '3', name: 'Rose Soft Blanket', quantity: 1, price: 159.99, image: '🧵' }],
        },
        {
            orderNumber: 'ORD-2024-001232',
            date: '2024-01-10',
            total: 89.99,
            status: 'completed',
            items: [{ id: '4', name: 'White Pillow Set', quantity: 3, price: 29.99, image: '🛏️' }],
        },
    ];

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'completed':
                return 'bg-rose-800 text-rose-100';
            case 'shipped':
                return 'bg-blue-100 text-blue-800';
            case 'pending':
                return 'bg-yellow-100 text-yellow-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    return (
        <div className="min-h-screen bg-white">
            {/* Header */}
            <div className="bg-gradient-to-r from-rose-800 to-rose-800 text-white py-8">
                <h1 className="text-4xl font-bold text-center">Orders</h1>
            </div>

            {/* Processing Orders Section */}
            <div className="max-w-4xl mx-auto px-4 my-8">
                <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
                    <p className="text-blue-800 font-semibold">📦 Processing Orders</p>
                    <p className="text-blue-700 text-sm">Your orders are being prepared for shipment</p>
                </div>
            </div>

            {/* Tabs */}
            <div className="flex justify-center gap-4 my-8 px-4">
                <button
                    onClick={() => setActiveTab('processing')}
                    className={`px-6 py-2 rounded-lg font-semibold transition ${
                        activeTab === 'processing'
                            ? 'bg-rose-800 text-white'
                            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                >
                    Processing Orders
                </button>
                <button
                    onClick={() => setActiveTab('confirmation')}
                    className={`px-6 py-2 rounded-lg font-semibold transition ${
                        activeTab === 'confirmation'
                            ? 'bg-rose-800 text-white'
                            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                >
                    Order Confirmation
                </button>
                <button
                    onClick={() => setActiveTab('history')}
                    className={`px-6 py-2 rounded-lg font-semibold transition ${
                        activeTab === 'history'
                            ? 'bg-rose-800 text-white'
                            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                >
                    Order History
                </button>
            </div>

            {/* Content */}
            <div className="max-w-4xl mx-auto px-4 pb-12">
                {activeTab === 'processing' && (
                    <form action={formAction}>
                    <div className="bg-white border-2 border-rose-800 rounded-lg p-8 shadow-lg">
                        <h2 className="text-3xl font-bold text-rose-800 mb-4">📦 Processing Orders</h2>
                        <p className="text-gray-600 mb-6">Your orders are being prepared for shipment</p>

                        <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded mb-6">
                            <p className="text-blue-800 font-semibold">Status: Preparing for Shipment</p>
                            <p className="text-blue-700 text-sm">Expected delivery in 3-5 business days</p>
                        </div>

                        <div className="bg-rose-800 text-white border border-rose-800 rounded-lg p-6 mb-6">
                            <p className="text-sm opacity-90">Order Number</p>
                            <input id="orderNumber" name="orderNumber" className="text-2xl font-bold" value={currentOrder.orderNumber} readOnly/>
                            <p className="text-sm opacity-90 mt-2">Order Date: {currentOrder.date}</p>
                        </div>

                        <div className="border-t-2 border-rose-800 pt-6">
                            <h3 className="text-xl font-bold text-gray-800 mb-4">Order Items</h3>
                            {currentOrder.items.map((item) => (
                                <div key={item.id} className="flex justify-between items-center py-3 border-b border-gray-200">
                                    <div className="flex items-center gap-4">
                                        <span className="text-3xl">
                                            <input id={`image-${item.id}`} name={`image-${item.id}`} className="w-16 h-16" value={item.image} readOnly />
                                        </span>
                                        <div>
                                            <input id={`name-${item.id}`} name="items" className="font-semibold text-gray-800" value={item.name} readOnly />
                                            <input id={`quantity-${item.id}`} name="itemQuantity" className="text-sm text-gray-500" value={item.quantity} readOnly />
                                        </div>
                                    </div>
                                    <input id="price" name="price" className="font-semibold text-gray-800" value={item.price.toFixed(2)} readOnly/>
                                </div>
                            ))}

                            <div className="flex justify-between items-center py-4 mt-4 bg-rose-800 text-white px-4 rounded-lg">
                                <p className="text-xl font-bold">Total</p>
                                <input id="total" name="total" className="text-2xl font-bold" value={`${currentOrder.items.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2)}`} readOnly />
                            </div>

                                <div className="flex gap-8 mt-6">
                                    <Link href="/shop"
                                     className="flex-1 px-6 py-3 text-center bg-gray-800 text-white rounded-lg font-semibold hover:bg-gray-900 transition">
                                        Continue Shopping
                                    </Link>

                                    <button type="submit" className="flex-1 px-6 py-3 bg-rose-800 text-white rounded-lg font-semibold hover:bg-rose-900 transition">
                                        Process Order
                                    </button>
                                </div>
                        </div>
                    </div>
                    </form>
                )}

                {activeTab === 'confirmation' && (
                    <div className="bg-white border-2 border-rose-800 rounded-lg p-8 shadow-lg">
                        <h2 className="text-3xl font-bold text-rose-800 mb-4">✓ Order Confirmed</h2>
                        <p className="text-gray-600 mb-6">Thank you for your purchase!</p>

                        <div className="bg-rose-800 text-white border border-rose-800 rounded-lg p-6 mb-6">
                            <p className="text-sm opacity-90">Order Number</p>
                            <p className="text-2xl font-bold">{currentOrder.orderNumber}</p>
                            <p className="text-sm opacity-90 mt-2">Order Date: {currentOrder.date}</p>
                        </div>

                        <div className="border-t-2 border-rose-800 pt-6">
                            <h3 className="text-xl font-bold text-gray-800 mb-4">Order Items</h3>
                            {currentOrder.items.map((item) => (
                                <div key={item.id} className="flex justify-between items-center py-3 border-b border-gray-200">
                                    <div className="flex items-center gap-4">
                                        <span className="text-3xl">{item.image}</span>
                                        <div>
                                            <p className="font-semibold text-gray-800">{item.name}</p>
                                            <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                                        </div>
                                    </div>
                                    <p className="font-semibold text-gray-800">${item.price.toFixed(2)}</p>
                                </div>
                            ))}

                            <div className="flex justify-between items-center py-4 mt-4 bg-rose-800 text-white px-4 rounded-lg">
                                <p className="text-xl font-bold">Total</p>
                                <p className="text-2xl font-bold">${currentOrder.total.toFixed(2)}</p>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'history' && (
                    <div className="space-y-4">
                        <h2 className="text-2xl font-bold text-gray-800 mb-6">Order History</h2>
                        {orderHistory.map((order) => (
                            <div key={order.orderNumber} className="bg-white border-2 border-rose-800 rounded-lg p-6 shadow-md hover:shadow-lg transition">
                                <div className="flex justify-between items-start mb-4">
                                    <div>
                                        <p className="text-sm text-gray-600">Order Number</p>
                                        <p className="text-lg font-bold text-gray-800">{order.orderNumber}</p>
                                    </div>
                                    <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(order.status)}`}>
                                        {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                                    </span>
                                </div>

                                <p className="text-sm text-gray-600 mb-3">Order Date: {order.date}</p>

                                <div className="bg-gray-50 rounded-lg p-3 mb-4">
                                    {order.items.map((item) => (
                                        <p key={item.id} className="text-sm text-gray-700">
                                            {item.name} (Qty: {item.quantity})
                                        </p>
                                    ))}
                                </div>

                                <div className="flex justify-between items-center pt-3 border-t border-rose-800">
                                    <p className="font-semibold text-gray-800">Total</p>
                                    <p className="text-lg font-bold text-rose-800">${order.total.toFixed(2)}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}