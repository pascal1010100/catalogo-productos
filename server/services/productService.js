// server/services/productService.js
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Obtener todos los productos
export const getAllProducts = async () => {
  return await prisma.product.findMany();
};

// Obtener un producto por ID
export const getProductById = async (id) => {
  return await prisma.product.findUnique({
    where: { id }
  });
};

// Crear un nuevo producto
export const createProduct = async (data) => {
  return await prisma.product.create({ data });
};

// Actualizar producto
export const updateProduct = async (id, data) => {
  return await prisma.product.update({
    where: { id },
    data
  });
};

// Eliminar producto
export const deleteProduct = async (id) => {
  return await prisma.product.delete({
    where: { id }
  });
};
