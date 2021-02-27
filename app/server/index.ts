import express from "express";
import getPageData from "./middlewares/getPageData";
import getPageDetailData from "./middlewares/getPageDetailData";
const router = express.Router();

router.get("/workouts/:alias", getPageDetailData, (req, res) => {
  res.status(200).json(res.locals.pageData);
});

router.get("/workouts/", (req, res) => {
  res.redirect("/");
});

router.get("/", getPageData, (req, res) => {
  res.status(200).json(res.locals.pageData);
});

export default router;
