import { itemSchema } from "@shopping/contracts";

/**
 * Checks the body of `POST /api/items`.
 *
 * The field rules themselves, label required, amount and unit optional,
 * live in `itemSchema` from `@shopping/contracts`, shared with the frontend.
 *
 * `.strict()` rejects fields that are not listed there instead of dropping them quietly,
 * so a typo in a field name shows up as an error right away.
 */
export const createItemSchema = itemSchema.strict();
