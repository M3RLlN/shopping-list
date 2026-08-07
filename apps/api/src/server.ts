import express from "express";
import { connectDB, MongoItemRepository } from "@shopping/infrastructure";
import dotenv from "dotenv";
import path from "path";
import { createItemsRoutes } from "./routes/itemsRoutes.js";

dotenv.config({ path: path.resolve(process.cwd(), "../../_docker/.env") });

const app = express();
const PORT = process.env.API_PORT;

await connectDB();

// Middleware
app.use(express.json());

const itemRepository = new MongoItemRepository();
app.use("/api/items", createItemsRoutes(itemRepository));

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
