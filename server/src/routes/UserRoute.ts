import { loginValidator } from "./../validator/AuthValidators";
import express from "express";
import {
  CaptainLogin,
  CaptainRegister,
  CheckAuth,
  forgotPassword,
  logout,
  UpdateProfile,
  UserLogin,
  UserRegister,
} from "../controller/UserController";
import IsAuthenticated from "../middlewares/IsAuthenticated";
import { registerValidator } from "../validator/AuthValidators";
import { Request, Response } from "express";

const userRoute = express.Router();

userRoute.get("/", (req, res) => {
  res.send("Auth is working");
});

userRoute.get("/check-auth", IsAuthenticated, CheckAuth);
userRoute.route("/regester").post(registerValidator, UserRegister);
userRoute.route("/login").post(loginValidator, UserLogin);
userRoute.route("/logout").post(logout);
userRoute.route("/forgot-password").post(forgotPassword);
userRoute.route("/profile/update").put(
  IsAuthenticated, // Handle single file upload
  UpdateProfile
);

// admin routes
userRoute.route("/captain-regester").post(registerValidator, CaptainRegister);
userRoute.route("/captain-login").post(loginValidator, CaptainLogin);
// userRoute.route("/promote-admin").put(IsAuthenticated, PromoteToAdmin);

// Test
// Test Route (Only Active in Test Mode)
export default userRoute;
