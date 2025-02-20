"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const OrderController_1 = require("../controller/OrderController");
const IsAuthenticated_1 = __importDefault(require("../middlewares/IsAuthenticated"));
const orderRoute = express_1.default.Router();
orderRoute.post("/create-order", IsAuthenticated_1.default, OrderController_1.createOrder);
// single order
orderRoute.get("/get-orders/:userId", IsAuthenticated_1.default, OrderController_1.getOrders);
orderRoute.get("/admin/all-orders", IsAuthenticated_1.default, OrderController_1.getAllOrders);
// Admin: Update order status
orderRoute.patch("/admin/orders/:id", IsAuthenticated_1.default, OrderController_1.updateOrderStatus);
// User: Get order status by ID
exports.default = orderRoute;
//# sourceMappingURL=orderRoute.js.map