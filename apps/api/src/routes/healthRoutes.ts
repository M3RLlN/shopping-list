import express, { type Request, type Response } from "express";

const router = express.Router();

/**
 * Sign of life for the API. Docker asks for it every 10 seconds, see `healthcheck` in `docker-compose.yml`.
 *
 * Always answers `ok` without checking anything.
 * The question is only "is the process still running?", not "is everything fine?".
 *
 * No database call on purpose: otherwise the container would count as dead as soon as the database gets slow for a moment.
 */
router.get("/", (req: Request, res: Response) => {
  return res.status(200).json({ status: "ok" });
});

export const healthRoutes = router;
