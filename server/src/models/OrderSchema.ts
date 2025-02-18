import mongoose, { Document } from "mongoose";
import { OrderDocs } from "../types/ReastaurentTypes";



const OrderSchema = new mongoose.Schema<OrderDocs>(
  {
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
    },
    resturent: {
      type: mongoose.Schema.ObjectId,
      ref: "Resturent",
    },

    cartItems: [
      {
        menuid: {
          type: String,
          required: true,
        },
        name: {
          type: String,
          required: true,
        },
        image: {
          type: String,
          required: true,
        },
        price: {
          type: Number,
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
        },
      },
    ],
    totalPrice: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "confirmed", "preparing", "delivered"],
      default: "pending",
      required: true,
    },
  },
  { timestamps: true }
);

const OrderModel = mongoose.model<OrderDocs>("Order", OrderSchema);
export default OrderModel;
