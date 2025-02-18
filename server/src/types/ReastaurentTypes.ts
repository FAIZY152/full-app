import mongoose, { Document } from "mongoose";

interface ResturentT {
  user: mongoose.Schema.Types.ObjectId;
  resturentName: string;
  city: string;
  country: string;
  deliveryTime: number;
  deliveryPrice: number;
  cusines: string[];
  imageFile: string;
  menu: mongoose.Schema.Types.ObjectId[];
}

export interface ResturentDocs extends ResturentT, Document {
  createAt: Date;
  updateAt: Date;
}

// Order types

interface CartDetails {
  menuId: string;
  name: string;
  image: string;
  price: number;
  quantity: number;
}

interface OrderT {
  user: mongoose.Schema.Types.ObjectId;
  resturent: mongoose.Schema.Types.ObjectId;
  cartItems: CartDetails;
  totalPrice: number;
  status: "pending" | "confirmed" | "preparing" | "delivered";
}

export interface OrderDocs extends OrderT, Document {
  createAt: Date;
  updateAt: Date;
}
