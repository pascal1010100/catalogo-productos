import express from "express";
import { createProduct, getProducts } from "../controllers/productController.js";

const router = express.Router();

// Ruta GET: Obtener productos
router.get("/", getProducts);

// Ruta POST: Crear un producto
router.post("/", createProduct);

export default router;
