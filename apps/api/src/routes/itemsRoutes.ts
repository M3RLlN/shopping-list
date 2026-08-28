import express from "express";
import { ItemsController } from "../controllers/ItemsController.js";
import type { ItemRepository } from "@shopping/domain";
import { validate } from "../middlewares/validate.js";
import { createItemSchema } from "../contracts/createItemSchema.js";
import { updateItemSchema } from "../contracts/updateItemSchema.js";
import { validateId } from "../middlewares/validateId.js";

export const createItemsRoutes = (itemRepo: ItemRepository) => {
  const controller = new ItemsController(itemRepo);
  const router = express.Router();

  router.get("/", controller.getAllItems);
  router.get("/:id", validateId, controller.getItemById);
  router.post("/", validate(createItemSchema), controller.createItem);
  router.put("/:id", validateId, validate(updateItemSchema), controller.updateItem);
  router.delete("/:id", validateId, controller.deleteItem);

  return router;
};
