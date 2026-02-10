"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';

export default function LoginPage() {
  const router = useRouter();
  const [userType, setUserType] = useState<'customer' | 'artisan'>('customer');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await signIn('credentials', { redirect: false, email, password });
      // res may be undefined in some versions; check for error
      if ((res as any)?.error) {
        alert((res as any).error || 'Login failed');
      } else {
        router.push(userType === 'artisan' ? '/dashboard' : '/shop');
      }
    } catch (err) {
      console.error(err);
      alert('Login request failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <h3 className="text-2xl font-bold text-stone-800 mb-2">Welcome Back</h3>
      <p className="text-stone-500 mb-8">Please enter your details to sign in.</p>

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
          Customer
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
          Artisan
        </button>
      </div>

      <form onSubmit={handleLogin} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-stone-700 mb-1">Email Address</label>
          <input
            type="email"
            required
            placeholder="name@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 rounded-lg border border-stone-300 placeholder-stone-600 text-stone-900 focus:outline-none focus:ring-2 focus:ring-rose-800 focus:border-transparent transition"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-stone-700 mb-1">Password</label>
          <input
            type="password"
            required
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 rounded-lg border border-stone-300 placeholder-stone-600 text-stone-900 focus:outline-none focus:ring-2 focus:ring-rose-800 focus:border-transparent transition"
          />
        </div>

        <div className="flex items-center justify-between text-sm">
          <label className="flex items-center text-stone-600 cursor-pointer">
            <input type="checkbox" className="mr-2 rounded text-rose-800 focus:ring-rose-800 accent-rose-800" />
            Remember me
          </label>
          <a href="#" className="text-rose-800 font-medium hover:underline">Forgot password?</a>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-rose-900 text-white font-bold py-3 rounded-lg hover:bg-rose-800 transition shadow-lg shadow-rose-900/20"
        >
          {loading ? 'Signing in...' : `Sign In as ${userType === 'customer' ? 'Customer' : 'Artisan'}`}
        </button>

        <div className="mt-3">
          <button
            type="button"
            onClick={() => signIn('google', { callbackUrl: `/api/auth/after-google?role=${userType}` })}
            className="w-full inline-flex items-center justify-center gap-3 border border-stone-300 py-2 rounded-lg bg-white text-stone-900 font-semibold hover:bg-stone-50 shadow-sm transition text-sm"
          >
            <span className="w-6 h-6 flex items-center justify-center rounded bg-red-50 text-red-600 font-bold">G</span>
            Sign in with Google
          </button>
        </div>
      </form>

      <p className="mt-8 text-center text-stone-500 text-sm">
        Don't have an account?{' '}
        <Link href="/register" className="text-rose-800 font-bold hover:underline">
          Sign up
        </Link>
      </p>
    </>
  );
}