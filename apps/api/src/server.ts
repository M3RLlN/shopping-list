import path from "node:path";
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB, MongoItemRepository } from "@shopping/infrastructure";
import { createItemsRoutes } from "./routes/itemsRoutes.js";
import { healthRoutes } from "./routes/healthRoutes.js";

dotenv.config({ path: path.resolve(process.cwd(), "../../_docker/.env") });

const app = express();
const PORT = 3000;
const BASE_URL = process.env.BASE_URL ?? `http://localhost:${PORT}`;
const CORS_ORIGIN = process.env.CORS_ORIGIN ?? "http://localhost:5173";
const itemRepository = new MongoItemRepository();

// Middleware
app.use(express.json());
app.use(cors({ origin: CORS_ORIGIN }));

// Routes
app.use("/health", healthRoutes);
app.use("/api/items", createItemsRoutes(itemRepository));

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on ${BASE_URL}`);
  });
});
