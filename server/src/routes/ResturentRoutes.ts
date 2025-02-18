import express from "express";
import upload from "../middlewares/multer";
import {
  CreateResturent,
  GetOrders,
  GetResturent,
  GetSingleResturent,
  searchByCityOrRestaurantName,
  searchByCuisines,
  searchByLocation,
  UpdateResturent,
  updateStatus,
} from "../controller/ResturentController";
import IsAuthenticated, { IsAdmin } from "../middlewares/IsAuthenticated";
import { Request, Response } from "express";



export const resturentRoute = express.Router();

// Resturents

resturentRoute.get("/", (req: Request, res: Response): void => {
  res.send("Hello Resturent");
});

resturentRoute.post(
  "/create-resturent",
  IsAdmin,
  upload.single("image"),
  CreateResturent
);
resturentRoute.get("/get-resturent", IsAuthenticated, GetResturent);

resturentRoute.get(
  "/resturents/:resturenId",
  IsAuthenticated,
  GetSingleResturent
);
resturentRoute.put(
  "/update-resturent",
  IsAdmin,
  upload.single("image"),
  UpdateResturent
);

// order
resturentRoute.get("/order", IsAuthenticated, GetOrders);
resturentRoute.put("/order/status/:orderId", IsAuthenticated, updateStatus);

// Route to search by country and city
resturentRoute.get("/search/location", searchByLocation);

// Route to search by restaurant name in country/city
resturentRoute.get("/search/searchByname", searchByCityOrRestaurantName);

// Route to search/filter by cuisine
resturentRoute.post("/search/cuisines", searchByCuisines);
