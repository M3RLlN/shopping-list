import type { Item } from "@shopping/domain";
import type { Types } from "mongoose";

/**
 * How an item looks inside MongoDB.
 *
 * `Omit<Item, "id">` takes every field of `Item` except `id`, and the `&` adds MongoDB's own `_id` on top.
 *
 * Built from `Item` so that a new field shows up here automatically.
 */
export type ItemDocument = Omit<Item, "id"> & { _id: Types.ObjectId };
