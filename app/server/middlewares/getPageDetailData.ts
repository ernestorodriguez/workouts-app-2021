import config from "config";
import workoutsService from "../../../lib/services/workoutsService";
import { NextFunction, Request, Response } from "express";

const { name: siteName } = config.get("site");

export default (req: Request, res: Response, next: NextFunction) => {
  workoutsService
    .get("alias", req.params.alias)
    .then((response) => {
      res.locals.pageData = {
        title: siteName,
        itemDetail: response,
      };
      next();
    })
    .catch((error) => next(error));
};
