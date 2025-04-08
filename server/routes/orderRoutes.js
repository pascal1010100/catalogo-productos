// server/routes/orderRoutes.js
import express from "express";
const router = express.Router();

// POST /orders/create - Crear un nuevo pedido
router.post("/create", (req, res) => {
  const { userEmail, products } = req.body;
  
  // Validación mínima
  if (!userEmail || !products || products.length === 0) {
    return res.status(400).json({ error: "Faltan datos: se requiere 'userEmail' y un arreglo de 'products'" });
  }
  
  // Aquí podrías agregar lógica para guardar el pedido en una base de datos.
  // Por ahora, retornamos la información recibida.
  res.status(201).json({
    message: "Pedido creado",
    order: { userEmail, products }
  });
});

export default router;
