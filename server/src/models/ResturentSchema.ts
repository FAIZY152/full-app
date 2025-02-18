import mongoose, { Document } from "mongoose";
import { ResturentDocs } from "../types/ReastaurentTypes";

const ResturentSchema = new mongoose.Schema<ResturentDocs>(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    resturentName: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    deliveryTime: {
      type: Number,
      required: true,
    },
    deliveryPrice: {
      type: Number,
      required: true,
    },

    imageFile: {
      type: String,
      required: true,
    },
    cusines: { type: [String], required: true },
    menu: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Menu",
      },
    ],
  },
  { timestamps: true }
);

const ResturentModel = mongoose.model<ResturentDocs>(
  "Resturent",
  ResturentSchema
);

export default ResturentModel;
