"use client";

import React, { useEffect, useState } from 'react';

type User = { id: string; name: string | null; email: string; role: string };

export default function UserPromote() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);

  async function load() {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/users');
      const json = await res.json();
      if (json.ok) setUsers(json.users || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { load(); }, []);

  async function promote(id: string) {
    try {
      const res = await fetch(`/api/admin/users/${id}/promote`, { method: 'POST' });
      const json = await res.json();
      if (json.ok) load();
      else alert(json.error || 'Failed');
    } catch (err) {
      console.error(err);
      alert('Request failed');
    }
  }

  if (loading) return <div>Loading users...</div>;

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Manage Users</h2>
      <div className="overflow-x-auto bg-white rounded-lg border border-stone-200 p-4">
        <table className="w-full text-left text-sm">
          <thead className="text-xs text-stone-500 uppercase">
            <tr>
              <th className="pb-2">Name</th>
              <th className="pb-2">Email</th>
              <th className="pb-2">Role</th>
              <th className="pb-2">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-100">
            {users.map(u => (
              <tr key={u.id} className="py-2">
                <td className="py-2">{u.name ?? '-'}</td>
                <td className="py-2">{u.email}</td>
                <td className="py-2">{u.role}</td>
                <td className="py-2">
                  {u.role !== 'artisan' ? (
                    <button onClick={() => promote(u.id)} className="text-sm bg-rose-800 text-white px-3 py-1 rounded">Promote to Artisan</button>
                  ) : (
                    <span className="text-sm text-stone-500">—</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
