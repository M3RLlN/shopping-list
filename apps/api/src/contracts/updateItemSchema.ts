import { z } from "zod";
import { itemSchema } from "@shopping/contracts";

/**
 * Checks the body of `PUT /api/items/:id`.
 *
 * Builds on `itemSchema` from `@shopping/contracts`.
 * `bought` is added here with `.extend()`, because it only makes sense when changing an item, never when creating one.
 * `.partial()` then makes everything, `bought` included, optional, an update only carries what changes.
 *
 * `.strict()` rejects unknown fields, same as in `createItemSchema`.
 */
export const updateItemSchema = itemSchema.extend({ bought: z.boolean() }).partial().strict();
