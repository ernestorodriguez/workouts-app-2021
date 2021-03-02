import { Request, Response, NextFunction } from "express";
import workoutsService from "../../lib/services/workoutsService";
import galleryService from "../../lib/services/galleryService";

export default class WorkoutsMiddlewares {
  static async detail(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const { alias } = req.params;
    await workoutsService
      .get("alias", alias)
      .then((response: Record<string, unknown>) => {
        res.status(200);
        res.json({ itemDetail: response });
      })
      .catch((error: Error) => next(error));
  }

  static async workoutsGallery(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    await galleryService(req.query)
      .then((response) => {
        res.status(200);
        res.json(response);
      })
      .catch((error) => next(error));
  }
}
