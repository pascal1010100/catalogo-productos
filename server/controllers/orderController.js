import { PrismaClient } from "@prisma/client";
import { sendEmail, sendWhatsAppMessage } from "../services/notificationService.js";

const prisma = new PrismaClient();

export const createOrder = async (req, res) => {
  const { userEmail, products } = req.body;

  // Validaciones básicas
  if (!userEmail || !products || products.length === 0) {
    return res.status(400).json({ error: "Faltan datos requeridos en la orden." });
  }

  try {
    // Crear el pedido en la base de datos
    const order = await prisma.order.create({
      data: {
        userEmail,
        products: {
          create: products.map((product) => ({
            name: product.name,
            productModel: product.productModel,
            priceMayorista: product.priceMayorista,
            pricePublico: product.pricePublico,
            minCompra: product.minCompra,
            image: product.image,
          })),
        },
      },
    });

    // 📧 Enviar email de confirmación al usuario
    await sendEmail(
      userEmail,
      "Confirmación de Pedido",
      `Tu pedido con ID ${order.id} ha sido recibido. ¡Gracias por tu compra!`
    );

    // 📲 Enviar WhatsApp al vendedor
    await sendWhatsAppMessage(`📦 Nuevo pedido recibido de ${userEmail}. Pedido ID: ${order.id}`);

    res.status(201).json({ message: "Pedido creado exitosamente", order });
  } catch (error) {
    console.error("Error en createOrder:", error);
    res.status(500).json({ error: "Error al crear el pedido" });
  }
};
