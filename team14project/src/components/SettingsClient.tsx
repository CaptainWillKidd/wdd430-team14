"use client";

import React, { useState } from 'react';
import Image from 'next/image';

export default function SettingsClient() {
  const [activeTab, setActiveTab] = useState('profile');
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    // Simulate API save
    setTimeout(() => setIsSaving(false), 1000);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-serif font-bold text-stone-900">Settings</h1>
        <p className="text-stone-500 text-sm">Manage your shop profile and account preferences.</p>
      </div>

      {/* Settings Tabs */}
      <div className="flex border-b border-stone-200 mb-8">
        <button
          onClick={() => setActiveTab('profile')}
          className={`pb-4 px-4 text-sm font-medium transition ${
            activeTab === 'profile'
              ? 'border-b-2 border-rose-800 text-rose-800'
              : 'text-stone-500 hover:text-stone-700'
          }`}
        >
          Shop Profile
        </button>
        <button
          onClick={() => setActiveTab('security')}
          className={`pb-4 px-4 text-sm font-medium transition ${
            activeTab === 'security'
              ? 'border-b-2 border-rose-800 text-rose-800'
              : 'text-stone-500 hover:text-stone-700'
          }`}
        >
          Security & Login
        </button>
      </div>

      {/* PROFILE TAB */}
      {activeTab === 'profile' && (
        <form onSubmit={handleSave} className="space-y-8">
          {/* Avatar Section */}
          <div className="bg-white p-6 rounded-xl border border-stone-200 shadow-sm flex items-center">
            <div className="mr-6">
              <div className="w-20 h-20 rounded-full bg-stone-200 relative overflow-hidden">
                <Image src="https://placehold.co/100x100/333/white?text=JD" alt="Avatar" fill className="object-cover" />
              </div>
            </div>
            <div>
              <h3 className="font-bold text-stone-900">Your Avatar</h3>
              <p className="text-xs text-stone-500 mb-3">This will be displayed on your shop page.</p>
              <div className="flex space-x-3">
                <button type="button" className="text-xs bg-stone-100 px-3 py-2 rounded-md hover:bg-stone-200 transition font-medium">Change</button>
                <button type="button" className="text-xs text-red-600 px-3 py-2 rounded-md hover:bg-red-50 transition font-medium">Remove</button>
              </div>
            </div>
          </div>

          {/* Shop Details */}
          <div className="bg-white p-6 rounded-xl border border-stone-200 shadow-sm space-y-6">
            <h3 className="font-bold text-stone-900 border-b border-stone-100 pb-2">Shop Information</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-1">Shop Name</label>
                <input
                  type="text"
                  defaultValue="John Doe Studios"
                  className="w-full px-4 py-2 rounded-lg border border-stone-300 focus:ring-2 focus:ring-rose-800 focus:border-transparent outline-none transition"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-1">Display Email</label>
                <input
                  type="email"
                  defaultValue="contact@johndoe.com"
                  className="w-full px-4 py-2 rounded-lg border border-stone-300 focus:ring-2 focus:ring-rose-800 focus:border-transparent outline-none transition"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-stone-700 mb-1">Bio / Story</label>
              <textarea
                rows={4}
                defaultValue="Creating unique handcrafted pieces since 2015. Inspired by nature and classical forms."
                className="w-full px-4 py-2 rounded-lg border border-stone-300 focus:ring-2 focus:ring-rose-800 focus:border-transparent outline-none transition"
              ></textarea>
              <p className="text-xs text-stone-400 mt-1">Brief description of your shop for customers.</p>
            </div>
          </div>

          {/* Action Button */}
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={isSaving}
              className="bg-rose-800 text-white px-6 py-2 rounded-lg font-bold hover:bg-rose-900 transition shadow-lg shadow-rose-900/20"
            >
              {isSaving ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </form>
      )}

      {/* SECURITY TAB */}
      {activeTab === 'security' && (
        <div className="bg-white p-6 rounded-xl border border-stone-200 shadow-sm space-y-6">
          <h3 className="font-bold text-stone-900 border-b border-stone-100 pb-2">Change Password</h3>

          <div className="space-y-4 max-w-md">
            <div>
              <label className="block text-sm font-medium text-stone-700 mb-1">Current Password</label>
              <input type="password" className="w-full px-4 py-2 rounded-lg border border-stone-300 focus:ring-2 focus:ring-rose-800 outline-none" />
            </div>
            <div>
              <label className="block text-sm font-medium text-stone-700 mb-1">New Password</label>
              <input type="password" className="w-full px-4 py-2 rounded-lg border border-stone-300 focus:ring-2 focus:ring-rose-800 outline-none" />
            </div>
            <div>
              <label className="block text-sm font-medium text-stone-700 mb-1">Confirm New Password</label>
              <input type="password" className="w-full px-4 py-2 rounded-lg border border-stone-300 focus:ring-2 focus:ring-rose-800 outline-none" />
            </div>
            <button className="bg-stone-800 text-white px-6 py-2 rounded-lg font-medium hover:bg-stone-900 transition mt-4">
              Update Password
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
