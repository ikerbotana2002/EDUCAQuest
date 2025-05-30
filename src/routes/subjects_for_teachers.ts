import { Router } from "express";
import { getSubjectsForTeachers, addSubjectsForTeachers } from "../controllers/subjects_for_teachers";

const router = Router();

router.get("/api/subjectsForTeachers/getSubjectsForTeachers", getSubjectsForTeachers);
router.post("/api/subjectsForTeachers/addSubjectsForTeachers", addSubjectsForTeachers);

export default router;
