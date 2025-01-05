import { Router } from "express";
import { register, login, getUsers } from "../controllers/user";
import validateToken from "./validate";

const router = Router();

router.post("/api/user/register", register);
router.post("/api/user/login", login);
//router.get("/api/user/getUsers", validateToken, getUsers);
router.get("/api/user/getUsers", getUsers);



export default router;
