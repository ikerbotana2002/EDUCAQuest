import { Router } from "express";
import { register, login, getUsers, updateRol, updateAvatar, forgotPassword, resetPassword } from "../controllers/user";

const router = Router();

router.post("/api/user/register", register);
router.post("/api/user/login", login);
//router.get("/api/user/getUsers", validateToken, getUsers);
router.get("/api/user/getUsers", getUsers);
router.patch("/api/user/updateRol", updateRol);
router.patch("/api/user/updateAvatar", updateAvatar);
router.post("/api/user/forgotPassword", forgotPassword);
router.patch("/api/user/resetPassword", resetPassword);

export default router;
