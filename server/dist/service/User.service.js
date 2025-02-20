"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateService = exports.forgotPasswordService = exports.LoginService = exports.createUser = void 0;
const UserSchema_1 = __importDefault(require("../models/UserSchema"));
const GenerateToken_1 = require("../utils/GenerateToken");
const HashPasswordUtil_1 = require("../utils/HashPasswordUtil");
const bcrypt_1 = __importDefault(require("bcrypt"));
const Cloudinary_1 = __importDefault(require("../utils/Cloudinary"));
const createUser = (fullname, email, password, phone, res) => __awaiter(void 0, void 0, void 0, function* () {
    let user = yield UserSchema_1.default.findOne({ email });
    if (user) {
        return res.status(400).json({ message: "Email already exists" });
    }
    const hashPassword = yield (0, HashPasswordUtil_1.hashedPassword)(password);
    user = yield UserSchema_1.default.create({
        fullname,
        email,
        password: hashPassword,
        phone,
    });
    yield (0, GenerateToken_1.GenerateToken)(res, user);
    return UserSchema_1.default.findOne({ email }).select("-password");
});
exports.createUser = createUser;
const LoginService = (email, password, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield UserSchema_1.default.findOne({ email });
    if (!user) {
        throw new Error("Email not found");
    }
    const IsMatch = yield (0, HashPasswordUtil_1.comparePasswords)(password, user.password);
    if (!IsMatch) {
        throw new Error("Password is not correct");
    }
    yield (0, GenerateToken_1.GenerateToken)(res, user);
    user.lastLogin = new Date();
    yield user.save(); // Save the last login update
    return UserSchema_1.default.findOne({ email }).select("-password");
});
exports.LoginService = LoginService;
const forgotPasswordService = (email, fullname, newPassword) => __awaiter(void 0, void 0, void 0, function* () {
    if (!email) {
        throw new Error("E-mail is Required!");
    }
    if (!fullname) {
        throw new Error("Your Full Name is Required!");
    }
    if (!newPassword) {
        throw new Error("Write The New Password!");
    }
    const user = yield UserSchema_1.default.findOne({ email, fullname });
    if (!user) {
        throw new Error("Email and Full Name is not correct");
    }
    const hashPassword = yield bcrypt_1.default.hash(newPassword, 10);
    yield UserSchema_1.default.findByIdAndUpdate(user._id, { password: hashPassword });
    return { success: true, message: "Password Reset Successfully" };
});
exports.forgotPasswordService = forgotPasswordService;
const UpdateService = (userId, fullname, email, address, city, country, phone, profilePicture) => __awaiter(void 0, void 0, void 0, function* () {
    let cloudResponse;
    if (profilePicture) {
        cloudResponse = yield Cloudinary_1.default.uploader.upload(profilePicture);
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
    return yield UserSchema_1.default.findByIdAndUpdate(userId, updatedData, {
        new: true,
    }).select("-password");
});
exports.UpdateService = UpdateService;
//# sourceMappingURL=User.service.js.map