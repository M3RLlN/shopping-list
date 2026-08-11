import express, { type Request, type Response } from "express";

const router = express.Router();

router.get("/", (req: Request, res: Response) => {
  return res.status(200).json({ status: "ok" });
});

export const healthRoutes = router;
