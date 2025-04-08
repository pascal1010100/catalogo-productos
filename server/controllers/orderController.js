// server/controllers/orderController.js

import {
  createOrder as createOrderService,
  getAllOrders as getAllOrdersService,
  getOrderById as getOrderByIdService,
  updateOrder as updateOrderService,
  deleteOrder as deleteOrderService
} from '../services/orderService.js';

/**
 * POST /api/orders
 * Crea un nuevo pedido.
 */
export async function createOrder(req, res) {
  const { userEmail, products } = req.body;

  if (!userEmail || !Array.isArray(products) || products.length === 0) {
    return res
      .status(400)
      .json({ error: "Faltan datos: se requiere 'userEmail' y un arreglo de 'products'." });
  }

  try {
    const newOrder = await createOrderService({ userEmail, products });
    return res.status(201).json(newOrder);
  } catch (error) {
    console.error('Error creando pedido:', error);
    return res.status(500).json({ error: 'Error interno al crear el pedido.' });
  }
}

/**
 * GET /api/orders
 * Obtiene todos los pedidos.
 */
export async function getAllOrders(req, res) {
  try {
    const orders = await getAllOrdersService();
    return res.status(200).json(orders);
  } catch (error) {
    console.error('Error obteniendo pedidos:', error);
    return res.status(500).json({ error: 'Error interno al obtener los pedidos.' });
  }
}

/**
 * GET /api/orders/:id
 * Obtiene un pedido por su ID.
 */
export async function getOrderById(req, res) {
  const { id } = req.params;

  try {
    const order = await getOrderByIdService(id);
    if (!order) {
      return res.status(404).json({ error: 'Pedido no encontrado.' });
    }
    return res.status(200).json(order);
  } catch (error) {
    console.error(`Error obteniendo pedido ${id}:`, error);
    return res.status(500).json({ error: 'Error interno al obtener el pedido.' });
  }
}

/**
 * PUT /api/orders/:id
 * Actualiza un pedido existente.
 */
export async function updateOrder(req, res) {
  const { id } = req.params;
  const updateData = req.body;

  try {
    const updated = await updateOrderService(id, updateData);
    if (!updated) {
      return res.status(404).json({ error: 'Pedido no encontrado.' });
    }
    return res.status(200).json(updated);
  } catch (error) {
    console.error(`Error actualizando pedido ${id}:`, error);
    return res.status(500).json({ error: 'Error interno al actualizar el pedido.' });
  }
}

/**
 * DELETE /api/orders/:id
 * Elimina un pedido por su ID.
 */
export async function deleteOrder(req, res) {
  const { id } = req.params;

  try {
    const deleted = await deleteOrderService(id);
    if (!deleted) {
      return res.status(404).json({ error: 'Pedido no encontrado.' });
    }
    return res.status(200).json({ message: 'Pedido eliminado correctamente.' });
  } catch (error) {
    console.error(`Error eliminando pedido ${id}:`, error);
    return res.status(500).json({ error: 'Error interno al eliminar el pedido.' });
  }
}
