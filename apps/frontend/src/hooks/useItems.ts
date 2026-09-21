import { useState, useEffect } from "react";
import type { Item, CreateItemInput, UpdateItemInput } from "@shopping/domain";
import { httpItemRepository } from "../repositories/HttpItemRepository";
import { toUserMessage } from "../utils/toUserMessage";

/**
 * Loads the items and offers the actions that change them.
 * Every action re-fetches the whole list afterwards instead of updating the list locally.
 * It is simpler and correct even if the server changed something else too.
 *
 * @returns items, isLoading, error, notice, clearNotice, and the actions:
 * toggleBought, addItem, updateItem, deleteMany.
 */
export const useItems = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  // Two states on purpose: `error` replaces the whole list, `notice` is a Snackbar that must never hide it.
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);

  // [] means: run once, right after the page first appears.
  // The function passed to useEffect must not be async itself, so .then() is used here.
  useEffect(() => {
    httpItemRepository
      .findAll()
      .then((list) => setItems(list))
      .catch((err) => {
        const message = toUserMessage(err);
        console.error(err);
        setError(message);
      })
      .finally(() => setIsLoading(false));
  }, []);

  /**
   * Flips whether an item is bought.
   *
   * @param item - The item to toggle
   */
  const toggleBought = async (item: Item) => {
    try {
      await httpItemRepository.update(item.id, { bought: !item.bought });
      const updatedItems = await httpItemRepository.findAll();
      setItems(updatedItems);
    } catch (err) {
      const message = toUserMessage(err);
      console.error(err);
      setNotice(message);
    }
  };

  /**
   * Creates a new item.
   *
   * @param item - The fields for the new item
   */
  const addItem = async (item: CreateItemInput) => {
    try {
      await httpItemRepository.create(item);
      const updatedItems = await httpItemRepository.findAll();
      setItems(updatedItems);
    } catch (err) {
      const message = toUserMessage(err);
      console.error(err);
      setNotice(message);
    }
  };

  /**
   * Changes an existing item.
   *
   * @param id - The id of the item to change
   * @param item - The fields to change
   */
  const updateItem = async (id: string, item: UpdateItemInput) => {
    try {
      await httpItemRepository.update(id, item);
      const updatedItems = await httpItemRepository.findAll();
      setItems(updatedItems);
    } catch (err) {
      const message = toUserMessage(err);
      console.error(err);
      setNotice(message);
    }
  };

  /**
   * Deletes several items at once.
   *
   * @param ids - The ids to delete
   */
  const deleteMany = async (ids: string[]) => {
    try {
      const deletePromises = ids.map((id) => httpItemRepository.delete(id));
      await Promise.all(deletePromises);
      const updatedItems = await httpItemRepository.findAll();
      setItems(updatedItems);
    } catch (err) {
      const message = toUserMessage(err);
      console.error(err);
      setNotice(message);
    }
  };

  const clearNotice = () => {
    setNotice(null);
  };
  return {
    items,
    isLoading,
    error,
    toggleBought,
    notice,
    clearNotice,
    addItem,
    updateItem,
    deleteMany,
  };
};
