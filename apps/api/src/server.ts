import path from "node:path";
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB, MongoItemRepository } from "@shopping/infrastructure";
import { createItemsRoutes } from "./routes/itemsRoutes.js";
import { healthRoutes } from "./routes/healthRoutes.js";
import { errorHandler } from "./middlewares/errorHandler.js";

// Reads `_docker/.env` so that `process.env` knows the values.
dotenv.config({ path: path.resolve(process.cwd(), "../../_docker/.env") });

// The app and its settings.
// `PORT`           - fixed inside the container; the port reachable from outside is mapped in `docker-compose.yml`.
// `BASE_URL`       - only used for the log line at startup.
// `CORS_ORIGIN`    - which website is allowed to call this API.
// `itemRepository` - the only place that picks the actual database.
const app = express();
const PORT = 3000;
const BASE_URL = process.env.BASE_URL ?? `http://localhost:${PORT}`;
const CORS_ORIGIN = process.env.CORS_ORIGIN ?? "http://localhost:5173";
const itemRepository = new MongoItemRepository();

// `express.json()` turns the body of a request into an object, without this line `req.body` would always be empty.
app.use(express.json());
// `cors` tells the browser which website is allowed to use this API.
app.use(cors({ origin: CORS_ORIGIN }));

// Add the routes. `errorHandler` has to be last:
// Express only looks for it once an error comes up, and it only finds what comes after the failing route.
app.use("/health", healthRoutes);
app.use("/api/items", createItemsRoutes(itemRepository));
app.use(errorHandler);

// Connect first, then start listening.
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on ${BASE_URL}`);
  });
});
