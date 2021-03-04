import express from "express";
import getPageData from "./middlewares/getGalleryData";
import getPageDetailData from "./middlewares/getPageDetailData";
import { errorHandler } from "./middlewares/errorHandler";
import spa from "./spa";
import notFound from "./notFound";

const router = express.Router();

router.get("/workouts/:alias", getPageDetailData, spa);
router.get("/workouts/", (req, res) => {
  res.redirect("/");
});

router.get("/", getPageData, spa);
router.use(notFound);
router.use(errorHandler);

export default router;
