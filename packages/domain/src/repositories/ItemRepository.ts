import type { CreateItemInput, Item, UpdateItemInput } from "../entities/Item.js";

export interface ItemRepository {
  findAll(): Promise<Item[]>;
  find(id: string): Promise<Item | null>;
  create(item: CreateItemInput): Promise<Item>;
  update(id: string, item: UpdateItemInput): Promise<Item | null>;
  delete(id: string): Promise<Item | null>;
}
