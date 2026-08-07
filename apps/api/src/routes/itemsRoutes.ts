import express from "express";
import { ItemsController } from "../controllers/ItemsController.js";
import type { ItemRepository } from "@shopping/domain";

export const createItemsRoutes = (itemRepo: ItemRepository) => {
  const controller = new ItemsController(itemRepo);
  const router = express.Router();

  router.get("/", controller.getAllItems);
  router.get("/:id", controller.getItemById);
  router.post("/", controller.createItem);
  router.put("/:id", controller.updateItem);
  router.delete("/:id", controller.deleteItem);

  return router;
};
