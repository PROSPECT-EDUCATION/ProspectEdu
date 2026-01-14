import { z } from "zod";

export const createProductSchema = z.object({
  name: z.string().min(1, "Product name required"),
  description: z.string().optional().default(""),

  // supplier will send either predefined OR any custom string
  category: z.string().min(1, "Category required"),

  // ✅ optional (only for custom category)
  customCategory: z.string().optional().default(""),

  price: z.coerce.number().min(0),
  offerPrice: z.coerce.number().min(0),

  quantity: z.coerce.number().int().min(0),

  images: z
    .array(z.string().url("Each image must be a valid URL"))
    .max(4, "Max 4 images allowed")
    .optional()
    .default([]),
});
