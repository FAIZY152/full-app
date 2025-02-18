import mongoose, { Document } from "mongoose";
import { UserDocs } from "../types/UserTypes";

const UserSchema = new mongoose.Schema<UserDocs>(
  {
    fullname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
    },

    address: {
      type: String,
      default: "Update Your Address",
    },
    city: {
      type: String,
      default: "Update Your City",
    },
    country: {
      type: String,
      default: "Update Your Country",
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    profilePicture: {
      type: String,
      default: "",
    },
    lastLogin: {
      type: Date,
      default: Date.now(),
    },

    resetPasswordToken: String,
    resetPasswordExpires: Date,
    verificationToken: String,
    verificationTokenExpire: Date,
  },
  { timestamps: true }
);

const UserModel = mongoose.model("User", UserSchema);
export default UserModel;
