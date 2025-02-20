"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const AuthValidators_1 = require("./../validator/AuthValidators");
const express_1 = __importDefault(require("express"));
const UserController_1 = require("../controller/UserController");
const IsAuthenticated_1 = __importDefault(require("../middlewares/IsAuthenticated"));
const AuthValidators_2 = require("../validator/AuthValidators");
const userRoute = express_1.default.Router();
userRoute.get("/", (req, res) => {
    res.send("Auth is working");
});
userRoute.get("/check-auth", IsAuthenticated_1.default, UserController_1.CheckAuth);
userRoute.route("/regester").post(AuthValidators_2.registerValidator, UserController_1.UserRegister);
userRoute.route("/login").post(AuthValidators_1.loginValidator, UserController_1.UserLogin);
userRoute.route("/logout").post(UserController_1.logout);
userRoute.route("/forgot-password").post(UserController_1.forgotPassword);
userRoute.route("/profile/update").put(IsAuthenticated_1.default, // Handle single file upload
UserController_1.UpdateProfile);
// admin routes
userRoute.route("/captain-regester").post(AuthValidators_2.registerValidator, UserController_1.CaptainRegister);
userRoute.route("/captain-login").post(AuthValidators_1.loginValidator, UserController_1.CaptainLogin);
// userRoute.route("/promote-admin").put(IsAuthenticated, PromoteToAdmin);
// Test
// Test Route (Only Active in Test Mode)
exports.default = userRoute;
//# sourceMappingURL=UserRoute.js.map