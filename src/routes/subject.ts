
import { Router } from "express";
import { getSubjects } from "../controllers/subject";

const router = Router();

router.get("/api/subject/getSubjects", getSubjects);

export default router;
