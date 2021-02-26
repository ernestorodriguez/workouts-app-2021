import express from "express";
import WorkoutApi from "./middlewares/workoutsMiddlewares";

const router = express.Router();

router.get("/workouts/:alias", WorkoutApi.detail);
router.get("/workouts", WorkoutApi.list);

export default router;
