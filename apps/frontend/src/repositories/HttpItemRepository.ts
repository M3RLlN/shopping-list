import type { Item, UpdateItemInput, CreateItemInput } from "@shopping/domain";
import { itemResponseSchema } from "../contracts/itemResponseSchema";
import { httpClient } from "./httpClient";

/**
 * Talks to the API over HTTP, the browser-side counterpart to `MongoItemRepository`.
 * Every method calls `httpClient` and checks the response shape with `itemResponseSchema` before handing the result back.
 */
export const httpItemRepository = {
  async findAll(): Promise<Item[]> {
    const body = await httpClient.get("/api/items");
    return itemResponseSchema.array().parse(body.data) as Item[];
  },

  async create(item: CreateItemInput): Promise<Item> {
    const body = await httpClient.post("/api/items", item);
    return itemResponseSchema.parse(body.data) as Item;
  },

  async update(id: string, item: UpdateItemInput): Promise<Item> {
    const body = await httpClient.put(`/api/items/${id}`, item);
    return itemResponseSchema.parse(body.data) as Item;
  },

  async delete(id: string): Promise<Item> {
    const body = await httpClient.delete(`/api/items/${id}`);
    return itemResponseSchema.parse(body.data) as Item;
  },
};
