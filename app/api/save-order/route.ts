import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import OrderModel, { IOrder } from '@/app/models/order';

export async function POST(request: Request) {
  await connectToDatabase(); // Ensure the database is connected

  const data: IOrder = await request.json();

  // Create a new order instance
  const newOrder = new OrderModel(data);

  // Save the order to the database
  await newOrder.save();

  return NextResponse.json({ message: 'Order saved successfully!' });
}
