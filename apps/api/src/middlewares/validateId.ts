import type { RequestHandler } from "express";
import { itemIdSchema } from "../contracts/itemIdSchema.js";

export const validateId: RequestHandler = (req, res, next) => {
  itemIdSchema.parse(req.params.id);
  next();
};
