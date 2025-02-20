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
exports.loginCaptainService = exports.registerCaptainService = void 0;
const UserSchema_1 = __importDefault(require("../models/UserSchema"));
const GenerateToken_1 = require("../utils/GenerateToken");
const HashPasswordUtil_1 = require("../utils/HashPasswordUtil");
const registerCaptainService = (fullname, email, password, phone, res) => __awaiter(void 0, void 0, void 0, function* () {
    const existingUser = yield UserSchema_1.default.findOne({ email });
    if (existingUser) {
        throw new Error("Email already exists");
    }
    const hashPassword = yield (0, HashPasswordUtil_1.hashedPassword)(password);
    let user = yield UserSchema_1.default.create({
        fullname,
        email,
        password: hashPassword,
        phone,
        isAdmin: true,
    });
    yield (0, GenerateToken_1.GenerateToken)(res, user);
    return UserSchema_1.default.findOne({ email }).select("-password");
});
exports.registerCaptainService = registerCaptainService;
const loginCaptainService = (email, password, res) => __awaiter(void 0, void 0, void 0, function* () {
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
    user.isAdmin = true; // Ensure user remains admin
    yield user.save();
    return UserSchema_1.default.findOne({ email }).select("-password");
});
exports.loginCaptainService = loginCaptainService;
//# sourceMappingURL=Admin.service.js.map