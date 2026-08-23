import type { Item, CreateItemInput, UpdateItemInput, ItemRepository } from "@shopping/domain";
import { ItemModel } from "../models/Item.js";
import { toItem } from "../mappers/itemMapper.js";

export class MongoItemRepository implements ItemRepository {
  async findAll(): Promise<Item[]> {
    const itemDocs = await ItemModel.find().sort({ createdAt: -1 });
    return itemDocs.map(toItem);
  }

  async find(id: string): Promise<Item | null> {
    const itemDoc = await ItemModel.findById(id);
    if (!itemDoc) return null;
    return toItem(itemDoc);
  }

  async create(item: CreateItemInput): Promise<Item> {
    const itemDoc = await new ItemModel(item).save();
    return toItem(itemDoc);
  }

  async update(id: string, item: UpdateItemInput): Promise<Item | null> {
    const itemDoc = await ItemModel.findByIdAndUpdate(id, item, {
      returnDocument: "after",
      runValidators: true,
    });
    if (!itemDoc) return null;
    return toItem(itemDoc);
  }

  async delete(id: string): Promise<Item | null> {
    const itemDoc = await ItemModel.findByIdAndDelete(id);
    if (!itemDoc) return null;
    return toItem(itemDoc);
  }
}
