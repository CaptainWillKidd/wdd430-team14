import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { sql } from '@/lib/db';

export async function POST(request: Request) {
  try {
    const session = (await getServerSession(authOptions)) as any;

    if (!session || !session.user || session.user.role !== 'artisan') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    // NOW ACCEPTING IMAGE URL
    const { name, description, price, category, stock, image_url } = body;

    if (!name || !price || !category) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const artisanId = session.user.id;

    await sql`
      INSERT INTO products (
        name, 
        description, 
        price, 
        stock, 
        category, 
        image_url, 
        artisan_id, 
        status
      ) VALUES (
        ${name}, 
        ${description}, 
        ${parseFloat(price)}, 
        ${parseInt(stock)}, 
        ${category}, 
        ${image_url || null}, 
        ${artisanId}, 
        'Active'
      )
    `;

    return NextResponse.json({ success: true, message: 'Product created successfully' });

  } catch (error) {
    console.error('Error adding product:', error);
    return NextResponse.json({ error: 'Database Error' }, { status: 500 });
  }
}




    // 4. Insert into Database
    // We explicitly convert price and stock to numbers to prevent database errors
    // We also use a random UUID for the product ID since we aren't letting the DB auto-generate it (optional depending on the schema)
    // If our DB auto-generates IDs, you can remove the 'id' field from the INSERT
    
    // NOTE: If our database uses UUIDs, we might need: import { randomUUID } from 'crypto';
    // For now, I am assuming the database auto-generates the ID or we let Postgres handle it.
    