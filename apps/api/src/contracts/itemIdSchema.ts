import { z } from "zod";

export const itemIdSchema = z.string().regex(/^([0-9]|[a-f]|[A-F]){24}$/, "Invalid Id format");
