import { Router, Request, Response, NextFunction } from "express";
import { renderToString } from "react-dom/server";
import controller from "./controller";

const router = Router();

const renderSPA = (req: Request, res: Response, next: NextFunction) => {
  const { pageData } = res.locals;
  if (!pageData) {
    next();
    return;
  }

  const config = {
    data: pageData,
    url: req.url,
  };

  res.send(
    `
    <!DOCTYPE html>
    <html class="no-js" lang="">
       ${renderToString(controller(config))}
    </html>
    `
  );
};

router.get("*", renderSPA);

export default router;
