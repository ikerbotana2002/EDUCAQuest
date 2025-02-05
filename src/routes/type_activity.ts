
import { Router } from "express";
import { getTypesActivity } from "../controllers/type_activity";

const router = Router();

router.get("/api/type_activity/getTypesActivity", getTypesActivity);

export default router;
