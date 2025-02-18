import { z } from "zod";
import { Request, Response, NextFunction } from "express";
import { ZodSchema } from "zod";

export const createRestaurantSchema = z.object({
  resturentName: z
    .string()
    .min(3, "Restaurant name must be at least 3 characters long"),
  city: z.string().min(2, "City name must be at least 2 characters long"),
  country: z.string().min(2, "Country name must be at least 2 characters long"),
  deliveryPrice: z.string().min(0, "Delivery price must be a positive number"),
  deliveryTime: z.string().min(1, "Delivery time is required"),
  cusines: z.string(),
});

export const validateRequest = (schema: ZodSchema<any>) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req.body);
      next(); // ✅ Proceed if validation passes
    } catch (error) {
      return res.status(400).json({ success: false, errors: error.errors });
    }
  };
};
