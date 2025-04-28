// server/controllers/productController.js
import * as productService from '../services/productService.js';

// Obtener todos los productos
export async function getAllProducts(req, res) {
  try {
    const products = await productService.getAllProducts();
    return res.status(200).json(products);
  } catch (error) {
    console.error("Error al obtener productos:", error);
    return res.status(500).json({ error: "Error interno al obtener los productos." });
  }
}

// Obtener un producto por ID
export async function getProductById(req, res) {
  const { id } = req.params;
  try {
    const product = await productService.getProductById(id);
    if (!product) {
      return res.status(404).json({ error: "Producto no encontrado." });
    }
    return res.status(200).json(product);
  } catch (error) {
    console.error("Error al obtener el producto:", error);
    return res.status(500).json({ error: "Error interno al obtener el producto." });
  }
}

// Crear un nuevo producto
export async function createProduct(req, res) {
  const {
    name,
    description,
    priceMayorista,
    pricePublico,
    precioMinorista,
    precioContado,
    unidadesCaja,
    type
  } = req.body;

  if (!name || unidadesCaja === undefined) {
    return res.status(400).json({ error: "Faltan datos: 'name' y 'unidadesCaja' son requeridos." });
  }

  try {
    const newProduct = await productService.createProduct({
      name,
      description,
      priceMayorista,
      pricePublico,
      precioMinorista,
      precioContado,
      unidadesCaja,
      type
    });
    return res.status(201).json(newProduct);
  } catch (error) {
    console.error("Error creando producto:", error);
    return res.status(500).json({ error: "Error interno al crear el producto." });
  }
}

// Actualizar producto
export async function updateProduct(req, res) {
  const { id } = req.params;
  const updateData = req.body;

  try {
    const updatedProduct = await productService.updateProduct(id, updateData);
    return res.status(200).json(updatedProduct);
  } catch (error) {
    console.error("Error al actualizar el producto:", error);
    return res.status(500).json({ error: "Error interno al actualizar el producto." });
  }
}

// Eliminar producto
export async function deleteProduct(req, res) {
  const { id } = req.params;

  try {
    await productService.deleteProduct(id);
    return res.status(200).json({ message: "Producto eliminado correctamente." });
  } catch (error) {
    console.error("Error al eliminar el producto:", error);
    return res.status(500).json({ error: "Error interno al eliminar el producto." });
  }
}
