import type { Item } from "../entities/Item.js";

export interface ItemRepository {
  findAll(): Promise<Item[]>;
  find(id: string): Promise<Item | null>;
  create(item: Item): Promise<Item>;
  update(id: string, item: Item): Promise<Item | null>;
  delete(id: string): Promise<Item | null>;
}
