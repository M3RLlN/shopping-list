import type { ErrorRequestHandler } from "express";
import { AppException } from "@shopping/domain";
import { z } from "zod";

/**
 * Catches every error and turns it into the answer for the client.
 *
 * Express calls this on its own whenever a route runs into an error.
 * It has to be added in `server.ts` after all routes, otherwise it is never reached.
 *
 * All four parameters have to be there: Express uses the number of them to tell
 * that this is the error middleware. `req` and `next` are not used here.
 *
 * @param err - The error that came up
 * @param req - Not used here
 * @param res - Used to send the answer
 * @param next - Not used here, but has to be listed
 */
export const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  // Our own errors bring their status code with them. `instanceof` also matches
  // classes that inherit, so this one check covers `NotFoundException` as well.
  if (err instanceof AppException) {
    res.status(err.status).json({ error: { message: err.message } });
    return;
  }

  // An error from Zod always means the input was wrong, so 400.
  // `flattenError` turns the list of problems into a shorter form.
  if (err instanceof z.ZodError) {
    res
      .status(400)
      .json({ error: { message: "Invalid request data", details: z.flattenError(err) } });
    return;
  }

  // Anything else is a problem on server side.
  // The real error goes to the log, the client only gets a general message.
  console.error(err);
  res.status(500).json({ error: { message: "Internal server error" } });
};
