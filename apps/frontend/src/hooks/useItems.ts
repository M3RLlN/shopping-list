import { useState, useEffect } from "react";
import type { Item } from "@shopping/domain";
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

  const clearNotice = () => {
    setNotice(null);
  };
  return { items, isLoading, error, toggleBought, notice, clearNotice };
};
