// server/routes/productRoutes.js
import { Router } from 'express';
import {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  notify
} from '../controllers/productController.js';

const router = Router();

// CRUD de productos
router.get('/',     getAllProducts);    // GET  /api/products
router.get('/:id',  getProductById);    // GET  /api/products/:id
router.post('/',    createProduct);     // POST /api/products
router.put('/:id',  updateProduct);     // PUT  /api/products/:id
router.delete('/:id', deleteProduct);   // DELETE /api/products/:id

// Notificaciones (si sigue siendo necesario)
router.post('/notify', notify);         // POST /api/products/notify

export default router;
