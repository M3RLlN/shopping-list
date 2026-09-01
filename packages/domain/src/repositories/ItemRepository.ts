import type { CreateItemInput, Item, UpdateItemInput } from "../entities/Item.js";

/**
 * Data access contract for shopping list items.
 *
 * Declared in the domain layer and implemented by `MongoItemRepository` in the
 * infrastructure layer. The domain therefore states which operations it needs
 * without depending on a specific database.
 */
export interface ItemRepository {
  /**
   * Returns all items.
   *
   * @returns All items, newest one first
   */
  findAll(): Promise<Item[]>;

  /**
   * Finds a single item.
   *
   * @param id - The id of the item
   * @returns The item, or `null` if no item with that id exists
   */
  find(id: string): Promise<Item | null>;

  /**
   * Creates a new item.
   *
   * @param item - Only the fields a caller is able to send
   * @returns The stored item, including the generated id and timestamps
   */
  create(item: CreateItemInput): Promise<Item>;

  /**
   * Changes an item that already exists.
   *
   * @param id - The id of the item
   * @param item - Only the fields that should change
   * @returns The changed item, or `null` if there is none with that id
   */
  update(id: string, item: UpdateItemInput): Promise<Item | null>;

  /**
   * Deletes an item.
   *
   * @param id - The id of the item
   * @returns The deleted item, or `null` if no item with that id exists
   */
  delete(id: string): Promise<Item | null>;
}
