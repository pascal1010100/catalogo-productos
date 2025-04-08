// server/controllers/productController.js

import {
  getAllProducts as getAllProductsService,
  getProductById as getProductByIdService,
  createProduct as createProductService,
  updateProduct as updateProductService,
  deleteProduct as deleteProductService
} from '../services/productService.js';

/**
 * GET /api/products
 * Obtiene todos los productos.
 */
export async function getAllProducts(req, res) {
  try {
    const products = await getAllProductsService();
    return res.status(200).json(products);
  } catch (error) {
    console.error('Error obteniendo productos:', error);
    return res.status(500).json({ error: 'Error interno al obtener los productos.' });
  }
}

/**
 * GET /api/products/:id
 * Obtiene un producto por su ID.
 */
export async function getProductById(req, res) {
  const { id } = req.params;
  try {
    const product = await getProductByIdService(id);
    if (!product) {
      return res.status(404).json({ error: 'Producto no encontrado.' });
    }
    return res.status(200).json(product);
  } catch (error) {
    console.error(`Error obteniendo producto ${id}:`, error);
    return res.status(500).json({ error: 'Error interno al obtener el producto.' });
  }
}

/**
 * POST /api/products
 * Crea un nuevo producto.
 */
export async function createProduct(req, res) {
  const productData = req.body;
  // Validación básica
  if (!productData.name || typeof productData.price !== 'number') {
    return res
      .status(400)
      .json({ error: "Faltan datos: se requiere 'name' (string) y 'price' (number)." });
  }

  try {
    const newProduct = await createProductService(productData);
    return res.status(201).json(newProduct);
  } catch (error) {
    console.error('Error creando producto:', error);
    return res.status(500).json({ error: 'Error interno al crear el producto.' });
  }
}

/**
 * PUT /api/products/:id
 * Actualiza un producto existente.
 */
export async function updateProduct(req, res) {
  const { id } = req.params;
  const updateData = req.body;

  try {
    const updatedProduct = await updateProductService(id, updateData);
    if (!updatedProduct) {
      return res.status(404).json({ error: 'Producto no encontrado.' });
    }
    return res.status(200).json(updatedProduct);
  } catch (error) {
    console.error(`Error actualizando producto ${id}:`, error);
    return res.status(500).json({ error: 'Error interno al actualizar el producto.' });
  }
}

/**
 * DELETE /api/products/:id
 * Elimina un producto por su ID.
 */
export async function deleteProduct(req, res) {
  const { id } = req.params;

  try {
    const deleted = await deleteProductService(id);
    if (!deleted) {
      return res.status(404).json({ error: 'Producto no encontrado.' });
    }
    return res.status(200).json({ message: 'Producto eliminado correctamente.' });
  } catch (error) {
    console.error(`Error eliminando producto ${id}:`, error);
    return res.status(500).json({ error: 'Error interno al eliminar el producto.' });
  }
}

/**
 * POST /api/products/notify
 * Maneja el envío de notificaciones (por ejemplo, emails, websockets, etc.).
 */
export function notify(req, res) {
  const { message, recipients } = req.body;
  if (!message || !Array.isArray(recipients) || recipients.length === 0) {
    return res
      .status(400)
      .json({ error: "Faltan datos: se requiere 'message' y un arreglo de 'recipients'." });
  }

  // Aquí podrías integrar tu servicio de notificaciones (email, push, etc.)
  // Por ahora, simulamos envío exitoso:
  console.log('Enviando notificación:', { message, recipients });
  return res.status(200).json({ message: 'Notificaciones enviadas correctamente.' });
}
