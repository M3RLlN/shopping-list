import express from "express";
import cors from "cors";
import { connectDB, MongoItemRepository } from "@shopping/infrastructure";
import { createItemsRoutes } from "./routes/itemsRoutes.js";
import { healthRoutes } from "./routes/healthRoutes.js";
import { errorHandler } from "./middlewares/errorHandler.js";
import { config } from "./config.js";

// The app and its settings.
// `PORT`           - fixed inside the container; the port reachable from outside is mapped in `docker-compose.yml`.
// `itemRepository` - the only place that picks the actual database.
// See `config.ts` for `BASE_URL`, `CORS_ORIGIN` and the Mongo connection string.
const app = express();
const PORT = 3000;
const itemRepository = new MongoItemRepository();

// `express.json()` turns the body of a request into an object, without this line `req.body` would always be empty.
app.use(express.json());
// `cors` tells the browser which website is allowed to use this API.
app.use(cors({ origin: config.corsOrigin }));

// Add the routes. `errorHandler` has to be last:
// Express only looks for it once an error comes up, and it only finds what comes after the failing route.
app.use("/health", healthRoutes);
app.use("/api/items", createItemsRoutes(itemRepository));
app.use(errorHandler);

// Connect first, then start listening.
connectDB(config.mongoUri).then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on ${config.baseUrl}`);
  });
});
