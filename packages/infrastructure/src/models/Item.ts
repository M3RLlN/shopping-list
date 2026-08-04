import mongoose from "mongoose";
import type { Item } from "@shopping/domain";

const itemSchema = new mongoose.Schema<Item>(
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
  },
  { timestamps: true },
);

export const ItemModel = mongoose.model<Item>("Item", itemSchema);
