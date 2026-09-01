import { z } from "zod";

/**
 * Checks the body of `POST /api/items`.
 *
 * `label` is required and must not be empty, `amount` and `unit` are optional.
 *
 * `.strict()` rejects fields that are not listed here instead of dropping them quietly,
 * so a typo in a field name shows up as an error right away.
 */
export const createItemSchema = z
  .object({
    label: z.string().min(1),
    amount: z.number().min(1).optional(),
    unit: z.string().optional(),
  })
  .strict();
