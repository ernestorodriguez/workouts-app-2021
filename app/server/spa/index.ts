import { Router, Request, Response } from "express";
import { renderToString } from "react-dom/server";
import controller from "./controller";

const router = Router();

const renderSPA = (req: Request, res: Response) => {
  const config = {
    data: res.locals.pageData,
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
