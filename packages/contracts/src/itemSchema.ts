import { z } from "zod";

/**
 * The field rules every Item shares, used by both the API and the frontend.
 *
 * `label` is required and must not be empty, `amount` and `unit` are optional.
 * This is the single place these rules are written down. `createItemSchema` and
 * `updateItemSchema` in `apps/api` build on this with `.strict()`, `.partial()`
 * and `.extend()`. `itemResponseSchema` in `apps/frontend` extends it with the
 * fields a stored Item has on top: `id`, `bought`, `createdAt`, `updatedAt`.
 */
export const itemSchema = z.object({
  label: z.string().min(1),
  amount: z.number().min(1).optional(),
  unit: z.string().optional(),
});
