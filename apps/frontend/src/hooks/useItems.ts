import { useState, useEffect } from "react";
import type { Item } from "@shopping/domain";
import { httpItemRepository } from "../repositories/HttpItemRepository";

export const useItems = () => {
  const [items, setItems] = useState<Item[]>([]);

  useEffect(() => {
    httpItemRepository.findAll().then(setItems);
  }, []);

  return { items, setItems };
};
