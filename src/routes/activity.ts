
import { Router } from "express";
import { getActivities, registerActivity } from "../controllers/activity";
import validateToken from "./validate";

const router = Router();

router.post("/api/activity/register", registerActivity);
router.get("/api/activity/getActivities", getActivities);

export default router;
