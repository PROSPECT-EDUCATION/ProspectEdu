import { z } from "zod";

export const updateMeSchema = z.object({
  state: z.string().max(80).optional(),
  city: z.string().max(80).optional(),
  grade: z.string().max(40).optional(),
  stream: z.string().max(60).optional(),
});
