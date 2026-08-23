import type { Item } from "@shopping/domain";
import type { Types } from "mongoose";

export type ItemDocument = Omit<Item, "id"> & { _id: Types.ObjectId };
