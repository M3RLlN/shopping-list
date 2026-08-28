import { z } from "zod";

export const createItemSchema = z
  .object({
    label: z.string().min(1),
    amount: z.number().min(1).optional(),
    unit: z.string().optional(),
  })
  .strict();
