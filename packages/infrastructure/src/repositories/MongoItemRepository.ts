import type { Item, ItemRepository } from "@shopping/domain";
import { ItemModel } from "../models/Item.js";

export class MongoItemRepository implements ItemRepository {
  async findAll(): Promise<Item[]> {
    return await ItemModel.find().sort({ createdAt: -1 });
  }

  async find(id: string): Promise<Item | null> {
    return await ItemModel.findById(id);
  }

  async create(item: Item): Promise<Item> {
    const newItem = new ItemModel(item);
    return await newItem.save();
  }

  async update(id: string, item: Item): Promise<Item | null> {
    return await ItemModel.findByIdAndUpdate(id, item, {
      returnDocument: "after",
      runValidators: true,
    });
  }

  async delete(id: string): Promise<Item | null> {
    return await ItemModel.findByIdAndDelete(id);
  }
}
