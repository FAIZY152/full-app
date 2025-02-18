import ResturentModel from "../models/ResturentSchema";
import { Request, Response } from "express";
import CloudinaryImage from "../helper/ImageUpload";
import OrderModel from "../models/OrderSchema";
import { createRestaurantSchema } from "../schema/RestaurentSchema";
import {
  createRestaurantService,
  GetOrderService,
  GetSingleResturentService,
} from "../service/Restaurent.service";

export const CreateResturent = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    // Validate request body using Zod
    createRestaurantSchema.parse(req.body);

    const {
      resturentName,
      city,
      country,
      deliveryPrice,
      deliveryTime,
      cusines,
    } = req.body;
    const file = req.file;

    const restaurant = await createRestaurantService(
      req.id,
      resturentName,
      city,
      country,
      deliveryPrice,
      deliveryTime,
      cusines,
      file
    );

    return res.status(200).json({
      message: "Restaurant Created Successfully",
      success: true,
      restaurant,
    });
  } catch (error) {
    return res.status(400).json({ message: error.message, success: false });
  }
};

export const GetResturent = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    console.log("Fetching restaurant for user:", req.id);
    const resturent = await ResturentModel.findOne({ user: req.id }).populate(
      "menu"
    );

    if (!resturent) {
      return res.status(400).json({
        message: "No Resturent Found",
        success: false,
        resturent: null,
      });
    }

    return res.status(200).json({
      resturent,
      success: true,
    });
  } catch (error) {
    console.error("Error fetching restaurant:", error);
    return res.status(500).json({
      message: "Error Occured",
      success: false,
    });
  }
};

export const UpdateResturent = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const {
      resturentName,
      city,
      country,
      deliveryPrice,
      deliveryTime,
      cusines,
    } = req.body;

    let file = req.file;

    const resturent = await ResturentModel.findOne({ user: req.id });
    if (!resturent) {
      return res.status(400).json({
        message: "No Resturent Found",
        success: false,
      });
    }
    const cuisinesArray = cusines.split(",").map((cuisine) => cuisine.trim());

    resturent.resturentName = resturentName;
    resturent.city = city;
    resturent.country = country;
    resturent.deliveryTime = deliveryTime;
    resturent.deliveryPrice = deliveryPrice;
    resturent.cusines = cuisinesArray;

    if (file) {
      const imageUrl = await CloudinaryImage(file as Express.Multer.File);
      resturent.imageFile = imageUrl;
    }

    await resturent.save();

    return res.status(200).json({
      message: "Resturent Updated Successfully",
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error Occured to update Resturent",
      success: false,
    });
  }
};

export const GetOrders = async (req: Request, res: Response): Promise<any> => {
  try {
    const orders = await GetOrderService(req.id);
    return res.status(200).json({
      success: true,
      orders,
      message: "Orders Fetched Successfully",
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
      success: false,
    });
  }
};

export const updateStatus = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    let { orderid } = req.params;
    let { status } = req.body;
    // order ko le aww konsa order ka status update karna ha
    const order = await OrderModel.findById(orderid);

    if (!order) {
      return res.status(400).json({
        message: "No Order Found",
        success: false,
      });
    }
    order.status = status;
    await order.save();

    return res.status(200).json({
      message: "Status Updated Successfully",
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error Occured to update Status",
      success: false,
    });
  }
};

// export const searchRestaurant = async (
//   req: Request,
//   res: Response
// ): Promise<any> => {
//   try {
//     const searchText = req.params.searchText || "";
//     const searchQuery = (req.query.searchQuery as string) || "";
//     const selectedCuisines = ((req.query.selectedCuisines as string) || "")
//       .split(",")
//       .filter((cuisine) => cuisine);
//     const query: any = {};
//     // basic search based on searchText (name ,city, country)
//     console.log(selectedCuisines);

//     if (searchText) {
//       query.$or = [
//         { resturentName: { $regex: searchText, $options: "i" } },
//         { city: { $regex: searchText, $options: "i" } },
//         { country: { $regex: searchText, $options: "i" } },
//       ];
//     }
//     // filter on the basis of searchQuery
//     if (searchQuery) {
//       query.$or = [
//         { resturentName: { $regex: searchQuery, $options: "i" } },
//         { cusines: { $regex: searchQuery, $options: "i" } },
//       ];
//     }
//     console.log(query);
//     // ["momos", "burger"]
//     if (selectedCuisines.length > 0) {
//       query.cusines = { $in: selectedCuisines };
//     }

//     const restaurants = await ResturentModel.find(query);
//     return res.status(200).json({
//       success: true,
//       data: restaurants,
//     });
//   } catch (error) {
//     console.log(error);
//     return res.status(500).json({ message: "Internal server error" });
//   }
// };
// export const SearchResturentTest = async (
//   req: Request,
//   res: Response
// ): Promise<any> => {
//   try {
//     const searchTxt = req.params.testsearch;
//     const resturent = await ResturentModel.find({
//       $or: [
//         { resturentName: { $regex: searchTxt, options: "i" } },
//         { city: { $regex: searchTxt, options: "i" } },
//         { country: { $regex: searchTxt, options: "i" } },
//       ],
//     });
//     return res.status(200).json({
//       success: true,
//       resturent,
//     });
//   } catch (error) {
//     return res.status(500).json({
//       message: "Error Occured to search Resturent",
//       success: false,
//       error: error.message,
//     });
//   }
// };

export const searchByLocation = async (
  req: Request,
  res: Response
): Promise<any> => {
  const { mainSearch } = req.query;

  try {
    if (typeof mainSearch !== "string") {
      return res.status(400).json({ message: "searchQuery is required" });
    }

    const searchRegex = new RegExp(mainSearch, "i"); // Case-insensitive search

    // Search for either restaurantName or city
    const restaurants = await ResturentModel.find({
      $or: [{ resturentName: searchRegex }, { country: searchRegex }],
    });

    console.log("Search Query:", { mainSearch });

    return res.status(200).json({
      success: true,
      data: restaurants,
    });
  } catch (error) {
    console.error("Error fetching restaurants:", error);
    res.status(500).json({ message: "Error fetching restaurants", error });
  }
};

export const searchByCityOrRestaurantName = async (
  req: Request,
  res: Response
): Promise<any> => {
  const { searchQuery } = req.query; // This will be the single input for both city and restaurantName

  try {
    if (typeof searchQuery !== "string") {
      return res.status(400).json({ message: "searchQuery is required" });
    }

    const searchRegex = new RegExp(searchQuery, "i"); // Case-insensitive search

    // Search for either restaurantName or city
    const restaurants = await ResturentModel.find({
      $or: [
        { resturentName: searchRegex },
        { city: searchRegex },
        { cusines: searchRegex },
      ],
    });

    console.log("Search Query:", { searchQuery });
    console.log("Found Restaurants:", restaurants);

    return res.status(200).json({
      success: true,
      data: restaurants,
    });
  } catch (error) {
    console.error("Error fetching restaurants:", error);
    res.status(500).json({ message: "Error fetching restaurants", error });
  }
};

export const searchByCuisines = async (
  req: Request,
  res: Response
): Promise<any> => {
  const { cuisines } = req.body;
  try {
    let query: any = {};
    if (cuisines && cuisines.length > 0) {
      query.cusines = { $in: cuisines };
    }

    const restaurants = await ResturentModel.find(query);
    console.log("Cusine body :", cuisines);
    return res.status(200).json({
      success: true,
      data: restaurants,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error occurred while fetching restaurants",
    });
  }
};

export const GetSingleResturent = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const resturent = await GetSingleResturentService(req.params.resturenId);
    return res.status(200).json({
      success: true,
      message: "Restaurant Fetched Successfully",
      resturent,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
      success: false,
    });
  }
};
