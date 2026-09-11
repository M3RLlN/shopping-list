import type { Item } from "@shopping/domain";
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

export const httpItemRepository = {
  async findAll(): Promise<Item[]> {
    const res = await fetch("/api/items");
    if (!res.ok) {
      const errorBody = await res.json().catch(() => null);
      const message = errorBody?.error?.message ?? "Failed to load items";
      throw new AppException(message, res.status);
    }
    const body = await res.json();
    return itemResponseSchema.array().parse(body.data);
  },
};
