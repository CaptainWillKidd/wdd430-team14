#!/usr/bin/env node
import dotenv from 'dotenv';
import { resolve } from 'path';
import { neon } from '@neondatabase/serverless';

// prefer .env.local, fall back to .env.development.local or .env
dotenv.config({ path: resolve(process.cwd(), '.env.local') });
dotenv.config({ path: resolve(process.cwd(), '.env.development.local') });
dotenv.config({ path: resolve(process.cwd(), '.env') });

if (!process.env.DATABASE_URL) {
  console.error('Missing DATABASE_URL in environment. Set it in .env.local or export it.');
  process.exit(1);
}

const sql = neon(process.env.DATABASE_URL);

async function run() {
  try {
    console.log('Running migration...');
    await sql.query('CREATE EXTENSION IF NOT EXISTS pgcrypto');
    await sql.query(`CREATE TABLE IF NOT EXISTS users (
      id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
      name text,
      email text UNIQUE NOT NULL,
      password_hash text,
      role text NOT NULL DEFAULT 'customer' CHECK (role IN (\'customer\',\'artisan\')),
      created_at timestamptz DEFAULT now()
    )`);
    console.log('Migration applied: users table created or already exists.');
    process.exit(0);
  } catch (err) {
    console.error('Migration failed:', err);
    process.exit(2);
  }
}

run();
