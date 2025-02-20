"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const OrderSchema = new mongoose_1.default.Schema({
    user: {
        type: mongoose_1.default.Schema.ObjectId,
        ref: "User",
    },
    resturent: {
        type: mongoose_1.default.Schema.ObjectId,
        ref: "Resturent",
    },
    cartItems: [
        {
            menuid: {
                type: String,
                required: true,
            },
            name: {
                type: String,
                required: true,
            },
            image: {
                type: String,
                required: true,
            },
            price: {
                type: Number,
                required: true,
            },
            quantity: {
                type: Number,
                required: true,
            },
        },
    ],
    totalPrice: {
        type: Number,
        required: true,
    },
    status: {
        type: String,
        enum: ["pending", "confirmed", "preparing", "delivered"],
        default: "pending",
        required: true,
    },
}, { timestamps: true });
const OrderModel = mongoose_1.default.model("Order", OrderSchema);
exports.default = OrderModel;
//# sourceMappingURL=OrderSchema.js.map