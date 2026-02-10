import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { redirect } from 'next/navigation';
import UserPromote from '@/components/UserPromote';
import SettingsClient from '@/components/SettingsClient';

export default async function SettingsPage() {
  const session = await getServerSession(authOptions as any);
  if (!session || (session.user as any)?.role !== 'artisan') {
    redirect('/login');
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Dashboard Settings</h1>
      <UserPromote />
      <SettingsClient />
    </div>
  );
}