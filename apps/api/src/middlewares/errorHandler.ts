import type { ErrorRequestHandler } from "express";
import { AppException } from "@shopping/domain";

export const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  if (err instanceof AppException) {
    res.status(err.status).json({ error: { message: err.message } });
    return;
  }

  console.error(err);
  res.status(500).json({ error: { message: "internal server error" } });
};
