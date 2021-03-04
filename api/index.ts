import express from "express";
import WorkoutApi from "./middlewares/workoutsMiddlewares";
import { notFound, serverError} from "./middlewares/errors";

const router = express.Router();

router.get("/workouts/:alias", WorkoutApi.detail);
router.get("/workouts", WorkoutApi.workoutsGallery);
router.use(notFound);
router.use(serverError);

export default router;
