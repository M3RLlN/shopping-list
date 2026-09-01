import type { RequestHandler } from "express";
import { z } from "zod";

/**
 * Builds a middleware that checks the body of a request against a schema.
 *
 * Express requires a middleware to have exactly `(req, res, next)`,
 * so the schema cannot be handed over with each request.
 * Instead it is put in once while the routes are being set up,
 * that is why `itemsRoutes.ts` calls `validate(createItemSchema)` for example.
 *
 * @param schema - The schema the body has to match
 * @returns A ready-made middleware with that schema inside it
 */
export const validate = (schema: z.ZodType): RequestHandler => {
  // The checked result replaces `req.body`,
  // so the code after this always works with the validated value.
  return (req, res, next) => {
    req.body = schema.parse(req.body);
    next();
  };
};
