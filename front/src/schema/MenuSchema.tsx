import { z } from "zod";

export const MenuSchema = z.object({
  name: z.string().nonempty({ message: "Menu Name is required" }),
  description: z.string().nonempty({ message: "Description is required" }),
  price: z.number().min(0, { message: "Price is must be greater than 0" }),
  image: z
    .instanceof(File)
    .optional()
    .refine((file) => file?.size !== 0, { message: "Image is required" }),
});

export type MenuTypes = z.infer<typeof MenuSchema>;
