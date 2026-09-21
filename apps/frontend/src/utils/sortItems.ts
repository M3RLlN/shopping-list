import type { Item } from "@shopping/domain";

/**
 * Orders items for display.
 *
 * @param items - The items to order
 * @param mode - "normal" keeps the given order, "edit" moves bought items to the top
 * @returns A new, ordered array
 */
export const sortItems = (items: Item[], mode: "normal" | "edit"): Item[] => {
  if (mode === "normal") {
    return items;
  } else {
    // A copy: `items` is the same array useItems holds as state. Sorting it in place
    // would reorder that state permanently, normal mode could never show the original order again.
    const sortedItems = [...items];

    // `Number(true)` is 1, `Number(false)` is 0. `b - a` puts bought items (1) first.
    sortedItems.sort((a, b) => Number(b.bought) - Number(a.bought));
    return sortedItems;
  }
};
