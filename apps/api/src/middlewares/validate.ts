import type { RequestHandler } from "express";
import { z } from "zod";

export const validate = (schema: z.ZodType): RequestHandler => {
  return (req, res, next) => {
    req.body = schema.parse(req.body);
    next();
  };
};
