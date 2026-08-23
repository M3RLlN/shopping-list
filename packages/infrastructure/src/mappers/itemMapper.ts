import type { Item } from "@shopping/domain";
import type { ItemDocument } from "../models/ItemDocument.js";

export const toItem = (itemDoc: ItemDocument): Item => {
  const item: Item = {
    id: itemDoc._id.toString(),
    label: itemDoc.label,
    createdAt: itemDoc.createdAt,
    updatedAt: itemDoc.updatedAt,
  };

  if (itemDoc.amount !== undefined) item.amount = itemDoc.amount;
  if (itemDoc.unit !== undefined) item.unit = itemDoc.unit;

  return item;
};
