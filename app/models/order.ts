import mongoose, { Schema, Document } from 'mongoose';

// Define the interface for the Order document
export interface IOrder extends Document {
  name: string;
  email: string;
  phone: string;
  artStyle: string;
  size: string;
  description: string;
  images: string[];
}

// Create the schema for the Order
const OrderSchema: Schema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  artStyle: { type: String, required: true },
  size: { type: String, required: true },
  description: { type: String, required: true },
  images: { type: [String], required: true },
});

// Create the model from the schema
const OrderModel = mongoose.models.Order || mongoose.model<IOrder>('Order', OrderSchema);

export default OrderModel;
