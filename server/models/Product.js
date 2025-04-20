import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export async function getAllProducts() {
  return await prisma.product.findMany();
}

export async function createProduct(data) {
  return await prisma.product.create({ data });
}
