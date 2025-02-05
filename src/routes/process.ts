import { Router } from "express";
import { getProcesses, register, registerHomeActivityProcess, updateFeedback } from "../controllers/process";

const router = Router();

router.post("/api/process/register", register);
router.post("/api/process/registerHomeActivityProcess", registerHomeActivityProcess);
router.get("/api/process/getProcesses", getProcesses);
router.patch("/api/process/updateFeedback", updateFeedback);

export default router;