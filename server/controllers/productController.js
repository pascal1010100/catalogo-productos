import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Crear un nuevo producto
export async function createProduct(req, res) {
  const { name, description, priceMayorista, pricePublico, precioMinorista, precioContado, stock } = req.body;

  // Validar los datos requeridos
  if (!name || !stock) {
    return res.status(400).json({ error: "Faltan datos: 'name' y 'stock' son requeridos." });
  }

  try {
    // Crear el producto en la base de datos
    const newProduct = await prisma.product.create({
      data: {
        name,
        description,
        priceMayorista, // Asegúrate de usar el campo correcto según tu lógica
        pricePublico,
        precioMinorista,
        precioContado,
        stock
      }
    });

    // Responder con el producto creado
    return res.status(201).json(newProduct);
  } catch (error) {
    console.error("Error creando producto:", error);
    return res.status(500).json({ error: "Error interno al crear el producto." });
  }
}

// Obtener todos los productos
export async function getAllProducts(req, res) {
  try {
    const products = await prisma.product.findMany();
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
    const product = await prisma.product.findUnique({
      where: {
        id
      }
    });
    if (!product) {
      return res.status(404).json({ error: "Producto no encontrado." });
    }
    return res.status(200).json(product);
  } catch (error) {
    console.error("Error al obtener el producto:", error);
    return res.status(500).json({ error: "Error interno al obtener el producto." });
  }
}

// Actualizar un producto existente
export async function updateProduct(req, res) {
  const { id } = req.params;
  const updateData = req.body;

  try {
    const updatedProduct = await prisma.product.update({
      where: {
        id
      },
      data: updateData
    });
    if (!updatedProduct) {
      return res.status(404).json({ error: "Producto no encontrado." });
    }
    return res.status(200).json(updatedProduct);
  } catch (error) {
    console.error("Error al actualizar el producto:", error);
    return res.status(500).json({ error: "Error interno al actualizar el producto." });
  }
}

// Eliminar un producto por ID
export async function deleteProduct(req, res) {
  const { id } = req.params;

  try {
    const deletedProduct = await prisma.product.delete({
      where: {
        id
      }
    });
    if (!deletedProduct) {
      return res.status(404).json({ error: "Producto no encontrado." });
    }
    return res.status(200).json({ message: "Producto eliminado correctamente." });
  } catch (error) {
    console.error("Error al eliminar el producto:", error);
    return res.status(500).json({ error: "Error interno al eliminar el producto." });
  }
}
