import type { Request, Response } from "express";

export const getAllItems = (req: Request, res: Response) => {
  res.status(200).send("You got 30 items on your Shoppinglist.");
};

export const createItem = (req: Request, res: Response) => {
  res.status(201).json({ message: "Item added successfully!" });
};

export const updateItem = (req: Request, res: Response) => {
  res.status(200).json({ message: "Item updated successfully!" });
};

export const deleteItem = (req: Request, res: Response) => {
  res.status(200).json({ message: "Item deleted successfully!" });
};
