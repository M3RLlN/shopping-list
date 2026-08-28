import { z } from "zod";

export const updateItemSchema = z
  .object({
    label: z.string().min(1).optional(),
    amount: z.number().min(1).optional(),
    unit: z.string().optional(),
    bought: z.boolean().optional(),
  })
  .strict();
