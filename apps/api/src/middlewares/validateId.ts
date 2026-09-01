import type { RequestHandler } from "express";
import { itemIdSchema } from "../contracts/itemIdSchema.js";

/**
 * Rejects requests whose `id` in the URL is not a valid MongoDB id.
 *
 * @param req - Holds the `id` from the URL
 * @param res - Not used here
 * @param next - Passes on to the controller when the id is fine
 */
export const validateId: RequestHandler = (req, res, next) => {
  itemIdSchema.parse(req.params.id);
  next();
};
