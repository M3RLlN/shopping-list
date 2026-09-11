import { useState, useEffect } from "react";
import type { Item } from "@shopping/domain";
import { httpItemRepository } from "../repositories/HttpItemRepository";

export const useItems = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    httpItemRepository
      .findAll()
      .then(setItems)
      .catch((err) => setError(err.message))
      .finally(() => setIsLoading(false));
  }, []);

  return { items, setItems, isLoading, error };
};
