import express from "express";
import itemsRoutes from "./routes/itemsRoutes.js";

const app = express();

app.use("/api/items", itemsRoutes);

app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
