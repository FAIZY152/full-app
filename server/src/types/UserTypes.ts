import { Document } from "mongoose";

export interface UserT {
  fullname: string;
  email: string;
  password: string;
  phone?: string;
  address?: string;
  city?: string;
  country?: string;
  profilePicture?: string;
  lastLogin?: Date;
  isAdmin?: boolean;
  resetPasswordToken?: string;
  resetPasswordExpires?: Date;
  verificationToken?: string;
  verificationTokenExpire?: Date;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface UserDocs extends UserT, Document {
  createAt: Date;
  updateAt: Date;
}
