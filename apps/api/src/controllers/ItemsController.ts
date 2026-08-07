import type { Request, Response } from "express";
import type { ItemRepository } from "@shopping/domain";

export class ItemsController {
  constructor(private readonly itemRepo: ItemRepository) {}
  getAllItems = async (req: Request, res: Response) => {
    try {
      const items = await this.itemRepo.findAll();
      res.status(200).json(items);
    } catch (error) {
      console.error("Error in getAllItems controller", error);
      res.status(500).json({ message: "Internal server error" });
    }
  };

  getItemById = async (req: Request<{ id: string }>, res: Response) => {
    try {
      const foundItem = await this.itemRepo.find(req.params.id);
      if (!foundItem) return res.status(404).json({ message: "Item not found" });
      return res.status(200).json({ message: "Item found: ", item: foundItem });
    } catch (error) {
      console.error("Error in getItemById", error);
      res.status(500).json({ message: "Internal server error" });
    }
  };

  createItem = async (req: Request, res: Response) => {
    try {
      const savedItem = await this.itemRepo.create(req.body);
      res.status(201).json({ message: "Item created successfully:", item: savedItem });
    } catch (error) {
      console.error("Error in createItem", error);
      res.status(500).json({ message: "Internal server error" });
    }
  };

  updateItem = async (req: Request<{ id: string }>, res: Response) => {
    try {
      const updatedItem = await this.itemRepo.update(req.params.id, req.body);
      if (!updatedItem) return res.status(404).json({ message: "Item not found" });
      res.status(200).json({ message: "Item updated successfully!", item: updatedItem });
    } catch (error) {
      console.error("Error in updateItem", error);
      res.status(500).json({ message: "Internal server error" });
    }
  };

  deleteItem = async (req: Request<{ id: string }>, res: Response) => {
    try {
      const deletedItem = await this.itemRepo.delete(req.params.id);
      if (!deletedItem) return res.status(404).json({ message: "Item not found" });
      res.status(200).json({ message: "Item successfully deleted!", item: deletedItem });
    } catch (error) {
      console.error("Error in deleteItem", error);
      res.status(500).json({ message: "Internal server error" });
    }
  };
}
