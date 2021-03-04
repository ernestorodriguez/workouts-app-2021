import { Router, Request, Response, NextFunction } from "express";
import { renderToString } from "react-dom/server";
import controller from "./controller";

const router = Router();

const renderNotFound = (req: Request, res: Response, next: NextFunction) => {
  const pageData = {
    title: "NOT FOUND",
  };

  const config = {
    data: pageData,
    url: req.url,
  };
  res.status(404);
  res.send(
    `
    <!DOCTYPE html>
    <html class="no-js" lang="">
       ${renderToString(controller(config))}
    </html>
    `
  );
};

router.get("*", renderNotFound);

export default router;
