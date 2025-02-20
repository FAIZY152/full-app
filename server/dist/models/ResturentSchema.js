"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const ResturentSchema = new mongoose_1.default.Schema({
    user: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "User",
    },
    resturentName: {
        type: String,
        required: true,
    },
    city: {
        type: String,
        required: true,
    },
    country: {
        type: String,
        required: true,
    },
    deliveryTime: {
        type: Number,
        required: true,
    },
    deliveryPrice: {
        type: Number,
        required: true,
    },
    imageFile: {
        type: String,
        required: true,
    },
    cusines: { type: [String], required: true },
    menu: [
        {
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: "Menu",
        },
    ],
}, { timestamps: true });
const ResturentModel = mongoose_1.default.model("Resturent", ResturentSchema);
exports.default = ResturentModel;
//# sourceMappingURL=ResturentSchema.js.map