/**
 * A shopping list entry, in the form the API returns it to a client.
 *
 * `id`, `createdAt` and `updatedAt` are assigned by the database, so every stored item has them.
 */
export interface Item {
  id: string;
  label: string;
  amount?: number;
  unit?: string;
  bought: boolean;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * The fields a client is allowed to send when creating an item.
 *
 * `id`, `bought` and the timestamps are left out on purpose:
 * The database sets those, not the caller.
 */
export interface CreateItemInput {
  label: string;
  amount?: number;
  unit?: string;
}

/**
 * The fields a client is allowed to send when changing an item.
 *
 * All of them are optional, because a request only carries what really changes.
 */
export interface UpdateItemInput {
  label?: string;
  amount?: number;
  unit?: string;
  bought?: boolean;
}
