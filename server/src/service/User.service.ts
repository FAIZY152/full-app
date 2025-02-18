import UserModel from "../models/UserSchema";
import { GenerateToken } from "../utils/GenerateToken";
import { comparePasswords, hashedPassword } from "../utils/HashPasswordUtil";
import { Response } from "express";
import bcrypt from "bcrypt";
import cloudinary from "../utils/Cloudinary";

export const createUser = async (
  fullname: string,
  email: string,
  password: string,
  phone: string,
  res: Response
) => {
  let user = await UserModel.findOne({ email });
  if (user) {
    return res.status(400).json({ message: "Email already exists" });
  }
  const hashPassword = await hashedPassword(password);

  user = await UserModel.create({
    fullname,
    email,
    password: hashPassword,
    phone,
  });

  await GenerateToken(res, user);

  return UserModel.findOne({ email }).select("-password");
};

export const LoginService = async (
  email: string,
  password: string,
  res: Response
) => {
  const user = await UserModel.findOne({ email });
  if (!user) {
    throw new Error("Email not found");
  }

  const IsMatch = await comparePasswords(password, user.password);
  if (!IsMatch) {
    throw new Error("Password is not correct");
  }

  await GenerateToken(res, user);

  user.lastLogin = new Date();
  await user.save(); // Save the last login update

  return UserModel.findOne({ email }).select("-password");
};

export const forgotPasswordService = async (
  email: string,
  fullname: string,
  newPassword: string
) => {
  if (!email) {
    throw new Error("E-mail is Required!");
  }
  if (!fullname) {
    throw new Error("Your Full Name is Required!");
  }
  if (!newPassword) {
    throw new Error("Write The New Password!");
  }

  const user = await UserModel.findOne({ email, fullname });
  if (!user) {
    throw new Error("Email and Full Name is not correct");
  }

  const hashPassword = await bcrypt.hash(newPassword, 10);
  await UserModel.findByIdAndUpdate(user._id, { password: hashPassword });

  return { success: true, message: "Password Reset Successfully" };
};

export const UpdateService = async (
  userId: string,
  fullname: string,
  email: string,
  address: string,
  city: string,
  country: string,
  phone: string,
  profilePicture: string
) => {
  let cloudResponse: any;
  if (profilePicture) {
    cloudResponse = await cloudinary.uploader.upload(profilePicture);
    profilePicture = cloudResponse.secure_url; // Use the uploaded image URL
  }

  const updatedData = {
    fullname,
    email,
    address,
    city,
    phone,
    country,
    profilePicture,
  };

  return await UserModel.findByIdAndUpdate(userId, updatedData, {
    new: true,
  }).select("-password");
};
