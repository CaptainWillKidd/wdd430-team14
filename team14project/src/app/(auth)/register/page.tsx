"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';

export default function RegisterPage() {
  const router = useRouter();
  const [userType, setUserType] = useState<'customer' | 'artisan'>('customer');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password, role: userType }),
      });
      const json = await res.json();
      if (json.ok) {
        // after creating, sign in with credentials
        await signIn('credentials', { redirect: false, email, password });
        router.push(userType === 'artisan' ? '/dashboard' : '/shop');
      } else {
        alert(json.error || 'Registration failed');
      }
    } catch (err) {
      console.error(err);
      alert('Request failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <h3 className="text-2xl font-bold text-stone-800 mb-2">Create Account</h3>
      <p className="text-stone-500 mb-8">It's free and easy to set up.</p>

      {/* User Type Toggle */}
      <div className="flex bg-stone-100 p-1 rounded-lg mb-6 border border-stone-300">
        <button
          type="button"
          onClick={() => setUserType('customer')}
          className={`flex-1 py-2 text-sm font-bold rounded-md transition ${
            userType === 'customer' 
              ? 'bg-white text-rose-800 shadow-sm border border-stone-300' 
              : 'text-stone-600 hover:text-stone-800'
          }`}
        >
          I want to Buy
        </button>
        <button
          type="button"
          onClick={() => setUserType('artisan')}
          className={`flex-1 py-2 text-sm font-bold rounded-md transition ${
            userType === 'artisan' 
              ? 'bg-white text-rose-800 shadow-sm border border-stone-300' 
              : 'text-stone-600 hover:text-stone-800'
          }`}
        >
          I want to Sell
        </button>
      </div>

      <form onSubmit={handleRegister} className="space-y-4">
        <div>
          <label className="block text-sm font-bold text-stone-800 mb-1">Full Name</label>
          <input
            type="text"
            required
            placeholder="John Doe"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-3 rounded-lg border border-stone-400 placeholder-stone-500 text-stone-900 focus:outline-none focus:ring-2 focus:ring-rose-800 focus:border-transparent transition"
          />
        </div>
        <div>
          <label className="block text-sm font-bold text-stone-800 mb-1">Email Address</label>
          <input
            type="email"
            required
            placeholder="name@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 rounded-lg border border-stone-400 placeholder-stone-500 text-stone-900 focus:outline-none focus:ring-2 focus:ring-rose-800 focus:border-transparent transition"
          />
        </div>
        <div>
          <label className="block text-sm font-bold text-stone-800 mb-1">Password</label>
          <input
            type="password"
            required
            placeholder="Create a password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 rounded-lg border border-stone-400 placeholder-stone-500 text-stone-900 focus:outline-none focus:ring-2 focus:ring-rose-800 focus:border-transparent transition"
          />
        </div>
        
        {userType === 'artisan' && (
          <div>
            <label className="block text-sm font-bold text-stone-800 mb-1">Shop Name (Optional)</label>
            <input
              type="text"
              placeholder="e.g. Clay & Earth Studio"
              className="w-full px-4 py-3 rounded-lg border border-stone-400 placeholder-stone-500 text-stone-900 focus:outline-none focus:ring-2 focus:ring-rose-800 focus:border-transparent transition"
            />
          </div>
        )}

        <div className="flex items-center text-sm mt-2">
          <label className="flex items-center text-stone-700 cursor-pointer font-medium">
            <input type="checkbox" required className="mr-2 rounded text-rose-800 focus:ring-rose-800 accent-rose-800 border border-stone-400" />
            I agree to the <a href="#" className="text-rose-800 ml-1 hover:underline font-bold">Terms & Conditions</a>
          </label>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-rose-900 text-white font-bold py-3 rounded-lg hover:bg-rose-800 transition shadow-lg shadow-rose-900/20 mt-4"
        >
          {loading ? 'Creating...' : 'Create Account'}
        </button>

        <div className="mt-3">
          <button
            type="button"
            onClick={() => signIn('google', { callbackUrl: `/api/auth/after-google?role=${userType}` })}
            className="w-full inline-flex items-center justify-center gap-3 border border-stone-400 py-2 rounded-lg bg-white text-stone-900 font-semibold hover:bg-stone-50 shadow-sm transition text-sm mt-2"
          >
            <span className="w-6 h-6 flex items-center justify-center rounded bg-red-50 text-red-600 font-bold">G</span>
            Sign in with Google
          </button>
        </div>
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