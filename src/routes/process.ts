import { Router } from "express";
import { getProcesses, register } from "../controllers/process";

const router = Router();

router.post("/api/process/register", register);
router.get("/api/process/getProcesses", getProcesses);

export default router;