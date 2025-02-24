import { Router } from "express";
import { create, getAllProducts, deleteProduct } from "../controllers/product";

const router = Router();
router.get("/products", getAllProducts);
router.delete("/products/:id", deleteProduct);
router.post("/products", create);
export default router;
