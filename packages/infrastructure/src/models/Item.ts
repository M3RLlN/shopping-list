import mongoose from "mongoose";
import type { Item } from "@shopping/domain";

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

export const ItemModel = mongoose.model<Omit<Item, "id">>("Item", itemSchema);
