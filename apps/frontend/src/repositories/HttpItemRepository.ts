import type { Item, UpdateItemInput } from "@shopping/domain";
import { AppException } from "@shopping/domain";
import { z } from "zod";

const itemResponseSchema = z.object({
  id: z.string(),
  label: z.string(),
  amount: z.number().optional(),
  unit: z.string().optional(),
  bought: z.boolean(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});

const throwIfNotOk = async (res: Response): Promise<void> => {
  if (!res.ok) {
    const errorBody = await res.json().catch(() => null);
    const message = errorBody?.error?.message ?? "Request Failed";
    throw new AppException(message, res.status);
  }
};

export const httpItemRepository = {
  async findAll(): Promise<Item[]> {
    const res = await fetch("/api/items");
    await throwIfNotOk(res);
    const body = await res.json();
    return itemResponseSchema.array().parse(body.data);
  },

  async update(id: string, item: UpdateItemInput): Promise<Item | null> {
    const res = await fetch(`/api/items/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(item),
    });
    await throwIfNotOk(res);
    const body = await res.json();
    return itemResponseSchema.parse(body.data);
  },
};
