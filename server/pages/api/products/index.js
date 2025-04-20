import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { name, price } = req.body;

    try {
      const newProduct = await prisma.product.create({
        data: {
          name,
          pricePublico: price, // o el campo real según tu modelo
        },
      });

      return res.status(201).json({ message: 'Producto creado', product: newProduct });
    } catch (error) {
      return res.status(500).json({ error: 'Error al crear producto', details: error.message });
    }
  }

  if (req.method === 'GET') {
    try {
      const products = await prisma.product.findMany();
      return res.status(200).json(products);
    } catch (error) {
      return res.status(500).json({ error: 'Error al obtener productos', details: error.message });
    }
  }

  return res.status(405).json({ error: 'Método no permitido' });
}
