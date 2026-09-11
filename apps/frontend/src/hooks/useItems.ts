import { useState, useEffect } from "react";
import type { Item } from "@shopping/domain";
import { httpItemRepository } from "../repositories/HttpItemRepository";
import { toUserMessage } from "../utils/toUserMessage";

export const useItems = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    httpItemRepository
      .findAll()
      .then(setItems)
      .catch((err) => {
        const message = toUserMessage(err);
        console.error(err);
        setError(message);
      })
      .finally(() => setIsLoading(false));
  }, []);

  return { items, setItems, isLoading, error };
};
