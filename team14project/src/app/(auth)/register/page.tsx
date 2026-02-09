'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function RegisterPage() {
  const router = useRouter();
  const [userType, setUserType] = useState<'customer' | 'artisan'>('customer');

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (userType === 'artisan') {
      router.push('/dashboard');
    } else {
      router.push('/shop');
    }
  };

  return (
    <>
      <h3 className="text-2xl font-bold text-stone-800 mb-2">Create Account</h3>
      <p className="text-stone-500 mb-8">It's free and easy to set up.</p>

      {/* User Type Toggle */}
      <div className="flex bg-stone-100 p-1 rounded-lg mb-6">
        <button
          type="button"
          onClick={() => setUserType('customer')}
          className={`flex-1 py-2 text-sm font-medium rounded-md transition ${
            userType === 'customer' 
              ? 'bg-white text-rose-800 shadow-sm' 
              : 'text-stone-500 hover:text-stone-700'
          }`}
        >
          I want to Buy
        </button>
        <button
          type="button"
          onClick={() => setUserType('artisan')}
          className={`flex-1 py-2 text-sm font-medium rounded-md transition ${
            userType === 'artisan' 
              ? 'bg-white text-rose-800 shadow-sm' 
              : 'text-stone-500 hover:text-stone-700'
          }`}
        >
          I want to Sell
        </button>
      </div>

      <form onSubmit={handleRegister} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-stone-700 mb-1">Full Name</label>
          <input
            type="text"
            required
            placeholder="John Doe"
            className="w-full px-4 py-3 rounded-lg border border-stone-300 placeholder-stone-600 focus:outline-none focus:ring-2 focus:ring-rose-800 focus:border-transparent transition"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-stone-700 mb-1">Email Address</label>
          <input
            type="email"
            required
            placeholder="name@example.com"
            className="w-full px-4 py-3 rounded-lg border border-stone-300 placeholder-stone-600 focus:outline-none focus:ring-2 focus:ring-rose-800 focus:border-transparent transition"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-stone-700 mb-1">Password</label>
          <input
            type="password"
            required
            placeholder="Create a password"
            className="w-full px-4 py-3 rounded-lg border border-stone-300 placeholder-stone-600 focus:outline-none focus:ring-2 focus:ring-rose-800 focus:border-transparent transition"
          />
        </div>
        
        {userType === 'artisan' && (
          <div>
            <label className="block text-sm font-medium text-stone-700 mb-1">Shop Name (Optional)</label>
            <input
              type="text"
              placeholder="e.g. Clay & Earth Studio"
              className="w-full px-4 py-3 rounded-lg border border-stone-300 placeholder-stone-600 focus:outline-none focus:ring-2 focus:ring-rose-800 focus:border-transparent transition"
            />
          </div>
        )}

        <div className="flex items-center text-sm mt-2">
          <label className="flex items-center text-stone-600 cursor-pointer">
            <input type="checkbox" required className="mr-2 rounded text-rose-800 focus:ring-rose-800 accent-rose-800" />
            I agree to the <a href="#" className="text-rose-800 ml-1 hover:underline">Terms & Conditions</a>
          </label>
        </div>

        <button
          type="submit"
          className="w-full bg-rose-900 text-white font-bold py-3 rounded-lg hover:bg-rose-800 transition shadow-lg shadow-rose-900/20 mt-4"
        >
          Create Account
        </button>
      </form>

      <p className="mt-8 text-center text-stone-500 text-sm">
        Already have an account?{' '}
        <Link href="/login" className="text-rose-800 font-bold hover:underline">
          Log in
        </Link>
      </p>
    </>
  );
}