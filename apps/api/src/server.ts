import express from "express";
import itemsRoutes from "./routes/itemsRoutes.js";
import { connectDB } from "@shopping/infrastructure";
import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.resolve(process.cwd(), "../../_docker/.env") });

const app = express();
const PORT = process.env.API_PORT;

await connectDB();

app.use("/api/items", itemsRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
