
import { Router } from "express";
import { getProducts, registerProduct } from "../controllers/product";
import validateToken from "./validate";

const router = Router();

router.post("/api/product/register", registerProduct);
router.get("/api/product/getAllProducts", validateToken, getProducts);

export default router;
