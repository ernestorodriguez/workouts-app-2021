import config from "config";
import workoutsService from "../../../lib/services/workoutsService";
import getMonthSelectorList from "./utils/monthSelectorList";
import { Request, Response, NextFunction } from "express";

const { name: siteName } = config.get("site");
const availableCategories = ["c1", "c2", "c3", "c4", "c5", "c6", "c7"];

interface HomePageQuery {
  page?: string;
  startDate?: string;
  selectedCategories?: string;
}

export default (req: Request, res: Response, next: NextFunction): void => {
  const queryData: HomePageQuery = req.query;
  let pageNumber = 1;
  if (queryData.page) {
    pageNumber = Number(queryData.page);
  }

  workoutsService
    .getPage(pageNumber, queryData.startDate, queryData.selectedCategories)
    .then((response) => {
      res.locals.pageData = {
        title: siteName,
        gallery: {
          page: pageNumber,
          workouts: response.data,
          selectedCategories: queryData.selectedCategories,
          totalPages: Math.ceil(response.results / 20),
          totalWorkOuts: response.results,
          startDateSelector: getMonthSelectorList(new Date(Date.now())),
          startDate: queryData.startDate,
          availableCategories,
        },
      };
      next();
    })
    .catch((error) => next(error));
};
