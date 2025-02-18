import { z } from "zod";

export const ResturentSchema = z.object({
  resturentName: z.string().nonempty({ message: "Resturent Name is required" }),
  city: z.string().nonempty({ message: "City Name is required" }),
  country: z.string().nonempty({ message: "Country Name is required" }),
  deliveryTime: z
    .number()
    .min(0, { message: "Delivery Time is must be greater than 0" })
    .max(60, { message: "Delivery Time is must be less than 60" }),
  deliveryPrice: z
    .number()
    .min(0, { message: "Delivery Price is must be greater than 150 " }),
  cusines: z.array(z.string()),
  image: z
    .instanceof(File)
    .optional()
    .refine((file) => file?.size !== 0, { message: "Image is required" }),
});

export type ResturentTypes = z.infer<typeof ResturentSchema>;
