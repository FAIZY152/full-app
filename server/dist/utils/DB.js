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
// db.js
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config(); // Load environment variables from .env file
const connectDB = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const dbUri = process.env.MONGO_URl;
        if (!dbUri) {
            throw new Error("MONGO_URL is not defined in environment variables.");
        }
        yield mongoose_1.default
            .connect(dbUri)
            .then(() => {
            console.log("✅ Database connection successful.");
        })
            .catch((error) => {
            console.error(`❌ Database connection error: ${error.message}`);
        });
    }
    catch (error) {
        console.error(`❌ Database connection error: ${error.message}`);
        // Exit process with failure
        process.exit(1);
    }
});
exports.default = connectDB;
//# sourceMappingURL=DB.js.map