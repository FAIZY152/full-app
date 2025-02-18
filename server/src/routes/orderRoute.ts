import express from "express";
import {
  createOrder,
  getAllOrders,
  getOrders,
  updateOrderStatus,
} from "../controller/OrderController";
import IsAuthenticated from "../middlewares/IsAuthenticated";

const orderRoute = express.Router();

orderRoute.post("/create-order", IsAuthenticated, createOrder);

// single order
orderRoute.get("/get-orders/:userId", IsAuthenticated, getOrders);

orderRoute.get("/admin/all-orders", IsAuthenticated, getAllOrders);

// Admin: Update order status
orderRoute.patch("/admin/orders/:id", IsAuthenticated, updateOrderStatus);

// User: Get order status by ID

export default orderRoute;
