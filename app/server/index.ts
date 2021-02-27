import express from "express";
import getPageData from "./middlewares/getPageData";
import getPageDetailData from "./middlewares/getPageDetailData";
import spa from "./spa";
const router = express.Router();

router.get("/workouts/:alias", getPageDetailData, spa);
router.get("/workouts/", (req, res) => {
  res.redirect("/");
});
router.get("/", getPageData, spa);

export default router;
