import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import UserModel from "../models/UserSchema";

dotenv.config();
// write the types for Global add id in Request
declare global {
  namespace Express {
    interface Request {
      id: string;
    }
  }
}

const IsAuthenticated = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    let token = req.cookies.token;
    if (!token)
      return res
        .status(401)
        .json({ error: "User is Not Authenticated", success: false });

    // verify the token with decode
    const decode = (await jwt.verify(
      token,
      process.env.JWT_TOKEN
    )) as jwt.JwtPayload;

    if (!decode) {
      return res
        .status(401)
        .json({ error: "User is Not Authenticated", success: false });
    }
    req.id = decode.userid;

    next();
  } catch (error) {
    return res
      .status(401)
      .json({ error: "User is Not Authenticated", success: false });
  }
};
// Adjust the path as needed

export const IsAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    // Get token from headers or cookies
    const token =
      req.cookies.token || req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      return res
        .status(401)
        .json({ error: "User is Not Authenticated", success: false });
    }

    // Verify the token
    const decode = jwt.verify(token, process.env.JWT_TOKEN) as jwt.JwtPayload;

    // Attach user ID from decoded token to request
    req.id = decode.userid;

    // Find the user in the database
    const user = await UserModel.findById(req.id);

    if (!user || !user.isAdmin) {
      return res
        .status(403)
        .json({ error: "Access Denied: Admin Only", success: false });
    }

    next();
  } catch (error) {
    return res
      .status(401)
      .json({ error: "User is Not Authenticated", success: false });
  }
};

export default IsAuthenticated;
