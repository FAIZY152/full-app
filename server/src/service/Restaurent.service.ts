import CloudinaryImage from "../helper/ImageUpload";
import OrderModel from "../models/OrderSchema";
import ResturentModel from "../models/ResturentSchema";

export const createRestaurantService = async (
  userId: string,
  resturentName: string,
  city: string,
  country: string,
  deliveryPrice: number,
  deliveryTime: string,
  cusines: string,
  file: Express.Multer.File | undefined
) => {
  if (!file) {
    throw new Error("Restaurant image is required");
  }

  // Check if user already has a restaurant
  const existingRestaurant = await ResturentModel.findOne({ user: userId });
  if (existingRestaurant) {
    throw new Error("Restaurant already exists for this user");
  }

  // Convert cuisines from comma-separated string to an array
  const cuisinesArray = cusines.split(",").map((cuisine) => cuisine.trim());

  // Upload image to Cloudinary
  const imageUrl = await CloudinaryImage(file as Express.Multer.File);

  // Create restaurant entry in database
  const restaurant = await ResturentModel.create({
    user: userId,
    resturentName,
    city,
    country,
    deliveryTime,
    cusines: cuisinesArray,
    deliveryPrice,
    imageFile: imageUrl,
  });

  return restaurant;
};

export const GetOrderService = async (userId: string) => {
  const resturent = await ResturentModel.findOne({ user: userId });
  if (!resturent) throw new Error("No Restaurant Found");

  return await OrderModel.find({ resturent: resturent._id })
    .populate("user")
    .populate("resturent");
};

export const GetSingleResturentService = async (restaurantId: string) => {
  const resturent = await ResturentModel.findById(restaurantId).populate({
    path: "menu",
    options: { createdAt: -1 },
  });

  if (!resturent) throw new Error("Restaurant Not Found");
  return resturent;
};
