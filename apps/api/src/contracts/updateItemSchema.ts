import { z } from "zod";

/**
 * Checks the body of `PUT /api/items/:id`.
 *
 * Everything is optional, because an update only carries what changes.
 * But whatever is there does get checked.
 *
 * `.strict()` rejects unknown fields — same as in `createItemSchema`.
 */
export const updateItemSchema = z
  .object({
    label: z.string().min(1).optional(),
    amount: z.number().min(1).optional(),
    unit: z.string().optional(),
    bought: z.boolean().optional(),
  })
  .strict();
