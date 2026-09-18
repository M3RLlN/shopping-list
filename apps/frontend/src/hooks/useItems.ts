import { useState, useEffect } from "react";
import type { Item, CreateItemInput, UpdateItemInput } from "@shopping/domain";
import { httpItemRepository } from "../repositories/HttpItemRepository";
import { toUserMessage } from "../utils/toUserMessage";

export const useItems = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);

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
