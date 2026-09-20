import { z } from "zod";
import { itemSchema } from "@shopping/contracts";

/**
 * Checks the shape of an Item as the API sends it back.
 *
 * Builds on `itemSchema` from `@shopping/contracts`, the same field rules the API uses to check what comes in.
 * `.extend()` adds the fields only a stored Item has:
 * `id`, `bought`, `createdAt`, `updatedAt`.
 */
export const itemResponseSchema = itemSchema.extend({
  id: z.string(),
  bought: z.boolean(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});
