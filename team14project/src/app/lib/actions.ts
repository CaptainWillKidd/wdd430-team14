'use server';
 
import { z } from 'zod';
import {revalidatePath} from 'next/cache';
import { redirect } from 'next/navigation';
import postgres from 'postgres';

 
const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });
 
const FormSchema = z.object({
  orderNumber: z.string(),
  date: z.string(),
  customerId: z.string(),
  items: z.string().min(1, { message: 'Please select items.' }),
  itemQuantity: z.coerce.number().positive({ message: 'Quantity must be greater than 0.' }),
  total: z.coerce.number().gt(0, { message: 'Please enter an amount greater than $0.' }),
  status: z.enum(['pending', 'processing', 'completed', 'shipped']),
});
 
const CreateOrder = FormSchema.omit({ orderNumber: true, date: true });

export type State = {
    errors?: {
        customerId?: string[];
        items?: string[];
        itemQuantity?: string[];
        total?: string[];
        status?: string[];
    };
    message?: string | null;
};

export async function createOrder(prevState: State, formData: FormData) {
  // Validate form using Zod
  const validatedFields = CreateOrder.safeParse({
    customerId: formData.get('customerId'),
    items: formData.get('items'),
    itemQuantity: formData.get('itemQuantity'),
    total: formData.get('total'),
    status: formData.get('status'),
  });
 
  // If form validation fails, return errors early. Otherwise, continue.
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Item details. Failed to Create Order.',
    };
  }
 
  // Prepare data for insertion into the database
  const { customerId, items, itemQuantity, total, status } = validatedFields.data;
  const orderNumber = `ORD-${Date.now()}`;
  const date = new Date().toISOString().split('T')[0];

  try {
    await sql`
      INSERT INTO invoices (customer_id, order_number, items, item_quantity, total, status, date)
      VALUES (${customerId}, ${orderNumber}, ${items}, ${itemQuantity}, ${total}, ${status}, ${date})
    `;
    console.log(`Invoice created successfully.`);
  } catch (error) {
    console.error(error);
    return {
      message: 'Database Error: Failed to Create Order.',
    };
  }
  
  revalidatePath('/product_order');
  redirect('/product_order');
}