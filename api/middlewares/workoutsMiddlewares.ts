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
      .getItem("alias", alias)
      .then((response: Record<string, unknown>) => {
        if (response) {
          res.status(200);
          res.json({ itemDetail: response });
        } else {
          res.status(404);
          res.json({ error: 404, status: "Not Found" });
        }
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
