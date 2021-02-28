import config from "config";
import { Request, Response, NextFunction } from "express";
import galleryService from "../../../lib/services/galleryService";

const { name: siteName } = config.get("site");

export default (req: Request, res: Response, next: NextFunction): void => {
  galleryService(req.query)
    .then((response) => {
      res.locals.pageData = {
        title: siteName,
        gallery: response,
      };
      next();
    })
    .catch((error) => next(error));
};
