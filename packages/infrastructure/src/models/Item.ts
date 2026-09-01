import mongoose from "mongoose";
import type { Item } from "@shopping/domain";

/**
 * Mongoose schema for the `items` collection.
 *
 * `Omit` keeps `id` out of it: MongoDB calls that field `_id` and creates it
 * automatically.
 *
 * `createdAt` and `updatedAt` come from the `timestamps` option at the bottom,
 * and `bought` gets `false` by default. That is why none of the three is in the
 * list below.
 */
const itemSchema = new mongoose.Schema<Omit<Item, "id">>(
  {
    label: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: false,
    },
    unit: {
      type: String,
      required: false,
    },
    bought: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

/**
 * Creates the object used to read and write items.
 *
 * `mongoose.model`  - the function that creates it; the result has `.find()`, `.findById()` and `.save()`.
 * `<Omit<...>>`     - only for TypeScript, gone when the code runs.
 * `"Item"`          - the name; Mongoose turns it into the collection `items`.
 * `itemSchema`      - the schema above: which fields exist and which are required.
 */
export const ItemModel = mongoose.model<Omit<Item, "id">>("Item", itemSchema);
