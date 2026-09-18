import type { Item } from "@shopping/domain";

export const sortItems = (items: Item[], mode: "normal" | "edit"): Item[] => {
  if (mode === "normal") {
    return items;
  } else {
    const sortedItems = [...items];
    sortedItems.sort((a, b) => Number(b.bought) - Number(a.bought));
    return sortedItems;
  }
};
