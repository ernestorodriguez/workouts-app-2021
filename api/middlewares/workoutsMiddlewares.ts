import workoutsService from "../../lib/services/workoutsService";

import express from "express";

export default class WorkoutsMiddlewares {
  static async detail(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    const { alias } = req.params;
    await workoutsService
      .get("alias", alias)
      .then((response: object) => {
        res.status(200);
        res.json({ itemDetail: response });
      })
      .catch((error: Error) => next(error));
  }

  static async list(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    const page: string = req.query.page as string;
    const pageNumber = Number(page);
    const startDate: string = req.query.startDate as string;
    const selectedCategories: string = req.query.selectedCategories as string;

    await workoutsService
      .getPage(pageNumber, startDate, selectedCategories)
      .then((response) => {
        res.status(200);
        res.json({
          workouts: response.data,
          totalPages: Math.ceil(response.results / 20),
          totalWorkOuts: response.results,
        });
      })
      .catch((error) => next(error));
  }
}
