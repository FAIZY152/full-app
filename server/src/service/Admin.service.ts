import UserModel from "../models/UserSchema";
import { GenerateToken } from "../utils/GenerateToken";
import { comparePasswords, hashedPassword } from "../utils/HashPasswordUtil";
import { Response } from "express";

export const registerCaptainService = async (
  fullname: string,
  email: string,
  password: string,
  phone: string,
  res: Response
) => {
  const existingUser = await UserModel.findOne({ email });
  if (existingUser) {
    throw new Error("Email already exists");
  }

  const hashPassword = await hashedPassword(password);

  let user = await UserModel.create({
    fullname,
    email,
    password: hashPassword,
    phone,
    isAdmin: true,
  });

  await GenerateToken(res, user);

  return UserModel.findOne({ email }).select("-password");
};

export const loginCaptainService = async (
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
  user.isAdmin = true; // Ensure user remains admin
  await user.save();

  return UserModel.findOne({ email }).select("-password");
};
