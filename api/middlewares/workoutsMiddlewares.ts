import { Request, Response, NextFunction } from "express";
import workoutsService from "../../lib/services/workoutsService";
import getMonthSelectorList from "../../app/server/middlewares/utils/monthSelectorList";

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

  static async list(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const page: string = req.query.page as string;
    const pageNumber = Number(page);
    const startDate: string = req.query.startDate as string;
    const selectedCategories: string = req.query.selectedCategories as string;
    const availableCategories = ["c1", "c2", "c3", "c4", "c5", "c6", "c7"];
    await workoutsService
      .getPage(pageNumber, startDate, selectedCategories)
      .then((response) => {
        res.status(200);
        res.json({
          page: pageNumber,
          workouts: response.data,
          selectedCategories: selectedCategories,
          totalPages: Math.ceil(response.results / 20),
          totalWorkOuts: response.results,
          startDateSelector: getMonthSelectorList(new Date(Date.now())),
          startDate,
          availableCategories,
        });
      })
      .catch((error) => next(error));
  }
}
