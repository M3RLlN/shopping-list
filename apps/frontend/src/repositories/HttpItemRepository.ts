import type { Item, UpdateItemInput, CreateItemInput } from "@shopping/domain";
import { itemResponseSchema } from "../contracts/itemResponseSchema";
import { throwIfNotOk } from "./httpClient";

/**
 * Talks to the API over HTTP, the browser-side counterpart to `MongoItemRepository`.
 * Every method checks for a failed request with `throwIfNotOk` and the shape of the
 * response with `itemResponseSchema` before handing the result back.
 */
export const httpItemRepository = {
  async findAll(): Promise<Item[]> {
    const res = await fetch("/api/items");
    await throwIfNotOk(res);
    const body = await res.json();
    return itemResponseSchema.array().parse(body.data) as Item[];
  },

  async create(item: CreateItemInput): Promise<Item> {
    const res = await fetch("/api/items", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(item),
    });
    await throwIfNotOk(res);
    const body = await res.json();
    return itemResponseSchema.parse(body.data) as Item;
  },

  async update(id: string, item: UpdateItemInput): Promise<Item> {
    const res = await fetch(`/api/items/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(item),
    });
    await throwIfNotOk(res);
    const body = await res.json();
    return itemResponseSchema.parse(body.data) as Item;
  },

  async delete(id: string): Promise<Item> {
    const res = await fetch(`/api/items/${id}`, {
      method: "DELETE",
    });
    await throwIfNotOk(res);
    const body = await res.json();
    return itemResponseSchema.parse(body.data) as Item;
  },
};
