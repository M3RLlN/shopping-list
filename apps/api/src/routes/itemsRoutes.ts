import express from "express";
import { ItemsController } from "../controllers/ItemsController.js";
import type { ItemRepository } from "@shopping/domain";
import { validate } from "../middlewares/validate.js";
import { createItemSchema } from "../contracts/createItemSchema.js";
import { updateItemSchema } from "../contracts/updateItemSchema.js";
import { validateId } from "../middlewares/validateId.js";

/**
 * Puts together the router for `/api/items`.
 *
 * Takes the repository from outside and passes it on to the controller.
 * That way there is only one place that decides which database is used: `server.ts`.
 *
 * @param itemRepo - The repository the controller should work with
 * @returns The finished router, ready to be added
 */
export const createItemsRoutes = (itemRepo: ItemRepository) => {
  const controller = new ItemsController(itemRepo);
  const router = express.Router();

  // The functions run from left to right:
  // first the id is checked, then the body, then the controller.
  // If one of them throws, the rest never run.
  // `get` and `delete` have no body to check, `post` has no id.
  router.get("/", controller.getAllItems);
  router.get("/:id", validateId, controller.getItemById);
  router.post("/", validate(createItemSchema), controller.createItem);
  router.put("/:id", validateId, validate(updateItemSchema), controller.updateItem);
  router.delete("/:id", validateId, controller.deleteItem);

  return router;
};
