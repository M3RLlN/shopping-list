import type { Item, UpdateItemInput, CreateItemInput } from "@shopping/domain";
import { itemResponseSchema } from "../contracts/itemResponseSchema";
import { httpClient } from "./httpClient";

/**
 * Talks to the API over HTTP, the browser-side counterpart to `MongoItemRepository`.
 * Every method calls `httpClient` and checks the response shape with `itemResponseSchema` before handing the result back.
 */
export const httpItemRepository = {
  /**
   * Loads all items.
   *
   * @returns All items
   */
  async findAll(): Promise<Item[]> {
    const body = await httpClient.get("/api/items");
    return itemResponseSchema.array().parse(body.data) as Item[];
  },

  /**
   * Creates a new item.
   *
   * @param item - The fields for the new item
   * @returns The created item
   */
  async create(item: CreateItemInput): Promise<Item> {
    const body = await httpClient.post("/api/items", item);
    return itemResponseSchema.parse(body.data) as Item;
  },

  /**
   * Changes an existing item.
   *
   * @param id - The id of the item to change
   * @param item - The fields to change
   * @returns The updated item
   */
  async update(id: string, item: UpdateItemInput): Promise<Item> {
    const body = await httpClient.put(`/api/items/${id}`, item);
    return itemResponseSchema.parse(body.data) as Item;
  },

  /**
   * Deletes an item.
   *
   * @param id - The id of the item to delete
   * @returns The deleted item
   */
  async delete(id: string): Promise<Item> {
    const body = await httpClient.delete(`/api/items/${id}`);
    return itemResponseSchema.parse(body.data) as Item;
  },
};
