
import { Router } from "express";
import { getChildren } from "../controllers/child";
import validateToken from "./validate";

const router = Router();

router.get("/api/child/getChildren", getChildren);

export default router;
