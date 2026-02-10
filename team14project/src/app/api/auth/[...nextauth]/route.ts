import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';
import { randomUUID } from 'crypto';
import { sql } from '@/lib/db';

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;
        try {
          const [row] = await sql`SELECT id, name, email, password_hash FROM users WHERE email = ${credentials.email}`;
          if (!row || !row.password_hash) return null;
          const match = await bcrypt.compare(credentials.password, row.password_hash);
          if (!match) return null;
          return { id: row.id, name: row.name, email: row.email };
        } catch (err) {
          console.error('credentials authorize error', err);
          return null;
        }
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    // After sign in, upsert the user into our users table so we keep names/roles
    async signIn({ user, account, profile }: { user: any; account: any; profile: any }) {
      try {
        const email = user.email ?? (profile as any)?.email;
        const name = user.name ?? (profile as any)?.name ?? null;
        if (!email) return false;

        const [existing] = await sql`SELECT id FROM users WHERE email = ${email}`;

        if (!existing) {
          const id = randomUUID();
          await sql`INSERT INTO users (id, name, email, role, created_at) VALUES (${id}, ${name}, ${email}, 'customer', now())`;
        }

        return true;
      } catch (err) {
        console.error('signIn upsert error', err);
        return false;
      }
    },
    async session({ session, token, user }: { session: any; token: any; user: any }) {
      try {
        if ((session as any)?.user?.email) {
          const [row] = await sql`SELECT id, role, name FROM users WHERE email = ${(session as any).user.email}`;
          if (row) {
            (session as any).user.id = row.id;
            (session as any).user.role = row.role;
            (session as any).user.name = row.name ?? (session as any).user.name;
          }
        }
      } catch (err) {
        console.error('session callback error', err);
      }
      return session;
    },
  },
};

const handler = NextAuth(authOptions as any);

export { handler as GET, handler as POST };
