import express from "express";

import IsAuthenticated from "../middlewares/IsAuthenticated";
import upload from "../middlewares/multer";
import {
  addMenu,
  deleteMenu,
  editMenu,
  getMenus,
} from "../controller/MenuController";

const menuRoute = express.Router();

menuRoute.get("/", (req, res) => {
  res.send("Menu Route is working");
});

menuRoute
  .route("/create-menu")
  .post(IsAuthenticated, upload.single("image"), addMenu);

menuRoute
  .route("/edit-menu/:id")
  .put(IsAuthenticated, upload.single("image"), editMenu);

menuRoute
  .route("/delete-menu/:restaurantId/:menuId")
  .delete(IsAuthenticated, deleteMenu);

menuRoute.route("/get-menus").get(IsAuthenticated, getMenus);

export default menuRoute;
