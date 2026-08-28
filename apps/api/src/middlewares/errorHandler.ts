import type { ErrorRequestHandler } from "express";
import { AppException } from "@shopping/domain";
import { z } from "zod";

export const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  if (err instanceof AppException) {
    res.status(err.status).json({ error: { message: err.message } });
    return;
  }

  if (err instanceof z.ZodError) {
    res
      .status(400)
      .json({ error: { message: "Invalid request data", details: z.flattenError(err) } });
    return;
  }

  console.error(err);
  res.status(500).json({ error: { message: "Internal server error" } });
};
