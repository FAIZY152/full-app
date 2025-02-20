import jwt from "jsonwebtoken";
import { Response } from "express";
import { UserDocs } from "../types/UserTypes";
export const GenerateToken = async (res: Response | null, user: UserDocs) => {
  try {
    const token = await jwt.sign({ userid: user._id }, process.env.JWT_TOKEN!, {
      expiresIn: "1d",
    });
    if (res) {
      res.cookie("token", token, {
        httpOnly: true,
        sameSite: "strict",
        maxAge: 24 * 60 * 60 * 1000,
      });
    }
    return token;
  } catch (error: any) {
    if (res) {
      return res.status(500).json({ message: error.message });
    }
  }
};
