
import { Router } from "express";
import { getActivities, registerActivity, updateActivity } from "../controllers/activity";
import validateToken from "./validate";

const router = Router();

router.post("/api/activity/register", registerActivity);
router.get("/api/activity/getActivities", getActivities);
router.patch("/api/activity/update", updateActivity);

export default router;
