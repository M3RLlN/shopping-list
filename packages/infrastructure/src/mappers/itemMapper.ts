import type { Item } from "@shopping/domain";
import type { ItemDocument } from "../models/ItemDocument.js";

/**
 * Turns a MongoDB document into a domain `Item`.
 *
 * This is where Mongoose stops: `_id` becomes the string `id`, and fields like `__v` are dropped.
 * Nothing outside this package has to know how the data is stored.
 *
 * @param itemDoc - The document as Mongoose returns it
 * @returns The item in the form the API sends out
 */
export const toItem = (itemDoc: ItemDocument): Item => {
  const item: Item = {
    id: itemDoc._id.toString(),
    label: itemDoc.label,
    createdAt: itemDoc.createdAt,
    updatedAt: itemDoc.updatedAt,
    bought: itemDoc.bought,
  };

  // `amount` and `unit` are only set when there really is a value.
  // The `exactOptionalPropertyTypes` setting in tsconfig.json allows the field
  // to be missing, but not to be present with the value `undefined`.
  if (itemDoc.amount !== undefined) item.amount = itemDoc.amount;
  if (itemDoc.unit !== undefined) item.unit = itemDoc.unit;

  return item;
};
