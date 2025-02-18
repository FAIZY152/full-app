import { Request, Response } from "express";
import CloudinaryImage from "../helper/ImageUpload";
import MenuModel from "../models/MenuSchema";
import ResturentModel from "../models/ResturentSchema";
import mongoose, { ObjectId } from "mongoose";

export const addMenu = async (req: Request, res: Response): Promise<any> => {
  try {
    let { name, description, price } = req.body;

    let file = req.file;
    if (!file) {
      return res.status(400).json({
        message: "Image is Required",
        success: false,
      });
    }

    const imageUrl = await CloudinaryImage(file as Express.Multer.File);
    const menu = await MenuModel.create({
      name,
      description,
      price,
      image: imageUrl,
    });
    // get the user resturent and add this menu to that resturent
    const resturent = await ResturentModel.findOne({ user: req.id });
    if (resturent) {
      (resturent.menu as mongoose.Schema.Types.ObjectId[]).push(
        menu._id as ObjectId
      );
      await resturent.save();

      //2nd way
      //   await ResturentModel.findById(resturent._id).updateOne({
      //     $push: { menu: menu._id },
      //   });
    }
    return res.status(200).json({
      message: "Menu Added Successfully",
      success: true,
      menu,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error Occured to add Menu",
      success: false,
    });
  }
};

export const editMenu = async (req: Request, res: Response): Promise<any> => {
  try {
    let { id } = req.params;
    const { name, description, price } = req.body;
    let file = req.file;
    const menu = await MenuModel.findById(id);

    if (name) menu.name = name;
    if (description) menu.description = description;
    if (price) menu.price = price;

    if (file) {
      let imageUrl = await CloudinaryImage(file as Express.Multer.File);
      menu.image = imageUrl;
    }

    return res.status(200).json({
      message: "Menu Updated Successfully",
      success: true,
      menu,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error Occured to update Menu",
      success: false,
    });
  }
};

export const deleteMenu = async (req: Request, res: Response): Promise<any> => {
  const { restaurantId, menuId } = req.params;

  try {
    // Find the restaurant by ID and update its menu array
    const updatedResturent = await ResturentModel.findByIdAndUpdate(
      restaurantId,
      { $pull: { menu: menuId } }, // Removes the menuId from the menu array
      { new: true } // Return the updated document
    );

    if (!updatedResturent) {
      return res
        .status(404)
        .json({ success: false, message: "Restaurant not found" });
    }

    // Delete from menu colllection
    await MenuModel.findByIdAndDelete(menuId);

    res.status(200).json({
      success: true,
      message: "Menu item deleted successfully",
      resturent: updatedResturent,
    });
  } catch (error) {
    console.error("Error deleting menu item:", error.message);
    res
      .status(500)
      .json({ success: false, message: "Failed to delete menu item" });
  }
};

export const getMenus = async (req: Request, res: Response): Promise<any> => {
  try {
    const menus = await MenuModel.find();
    return res.status(200).json({
      message: "Menus Fetched Successfully",
      success: true,
      menus,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error Occured to get Menus",
      success: false,
    });
  }
};
