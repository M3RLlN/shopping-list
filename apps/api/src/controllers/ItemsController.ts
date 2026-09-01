import type { Request, Response } from "express";
import type { ItemRepository } from "@shopping/domain";
import { NotFoundException } from "@shopping/domain";

/**
 * The handlers for all `/api/items` routes.
 *
 * The repository is passed in through the constructor (dependency injection),
 * so the controller does not know the database and can be tested with a stand-in.
 *
 * The body of a request is already checked by middleware,
 * and a missing item is reported by throwing a `NotFoundException`.
 * That is why no error status code appears anywhere in here.
 *
 * Every successful answer is wrapped in `{ data: ... }`,
 * so a client always finds either `data` or `error` at the top.
 */
export class ItemsController {
  constructor(private readonly itemRepo: ItemRepository) {}
  getAllItems = async (req: Request, res: Response) => {
    const items = await this.itemRepo.findAll();
    return res.status(200).json({ data: items });
  };

  getItemById = async (req: Request<{ id: string }>, res: Response) => {
    const foundItem = await this.itemRepo.find(req.params.id);
    if (!foundItem) throw new NotFoundException("Item not found");
    return res.status(200).json({ data: foundItem });
  };

  createItem = async (req: Request, res: Response) => {
    const savedItem = await this.itemRepo.create(req.body);
    return res.status(201).json({ data: savedItem });
  };

  updateItem = async (req: Request<{ id: string }>, res: Response) => {
    const updatedItem = await this.itemRepo.update(req.params.id, req.body);
    if (!updatedItem) throw new NotFoundException("Item not found");
    return res.status(200).json({ data: updatedItem });
  };

  deleteItem = async (req: Request<{ id: string }>, res: Response) => {
    const deletedItem = await this.itemRepo.delete(req.params.id);
    if (!deletedItem) throw new NotFoundException("Item not found");
    return res.status(200).json({ data: deletedItem });
  };
}
