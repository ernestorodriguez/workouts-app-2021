import express from "express";
import WorkoutApi from "./middlewares/workoutsMiddlewares";

const router = express.Router();

router.get("/workouts/:alias", WorkoutApi.detail);
router.get("/workouts", WorkoutApi.workoutsGallery);

router.use(function (req, res, next) {
  res.status(404).json({ error: 404, status: "Not Found" });
});

router.use(
  (
    err: Record<string, unknown>,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    console.error(err.stack);
    res.status(500).json({ error: 500, status: "Server error" });
  }
);

export default router;
