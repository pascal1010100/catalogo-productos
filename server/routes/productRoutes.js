// server/routes/productRoutes.js
import { Router } from 'express';
import {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
} from '../controllers/productController.js';

const router = Router();

// Ruta para obtener todos los productos
router.get('/productos', getAllProducts);

// Ruta para obtener un producto por su ID
router.get('/productos/:id', getProductById);

// Ruta para crear un nuevo producto
router.post('/productos', createProduct);

// Ruta para actualizar un producto existente
router.put('/productos/:id', updateProduct);

// Ruta para eliminar un producto
router.delete('/productos/:id', deleteProduct);

export default router;

