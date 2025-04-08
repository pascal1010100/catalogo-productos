// server/routes/orderRoutes.js
import { Router } from 'express';
import {
  createOrder,
  getAllOrders,
  getOrderById,
  updateOrder,
  deleteOrder
} from '../controllers/orderController.js';

const router = Router();

// CRUD de pedidos
router.get('/',        getAllOrders);     // GET  /api/orders
router.get('/:id',     getOrderById);     // GET  /api/orders/:id
router.post('/',       createOrder);      // POST /api/orders
router.put('/:id',     updateOrder);      // PUT  /api/orders/:id
router.delete('/:id',  deleteOrder);      // DELETE /api/orders/:id

export default router;
