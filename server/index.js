// server/index.js

import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./lib/mongodb.js";
import productRoutes from "./routes/productRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";

dotenv.config();

const app = express();

// Conectar a MongoDB usando try/catch
try {
  await connectDB();
  console.log('✅ MongoDB conectado exitosamente');
} catch (error) {
  console.error('❌ Error conectando a MongoDB:', error);
  process.exit(1);
}

// Configuración de CORS con opciones extendidas
app.use(cors({
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Middleware para parsear JSON con límite
app.use(express.json({ limit: '10mb' }));

// Rutas de la API
app.use("/api", productRoutes); // Ahora todas las rutas de productos son /api/productos
app.use("/api/orders", orderRoutes);

// Ruta raíz (colocada antes del middleware de "no encontrada")
app.get("/", (req, res) => {
  res.json({ 
    message: "Bienvenido a mi API de Catálogo de Productos",
    version: "1.0.0"
  });
});

// Middleware para rutas no encontradas
app.use((req, res, next) => {
  const error = new Error(`Ruta no encontrada - ${req.originalUrl}`);
  res.status(404);
  next(error);
});

// Middleware de manejo de errores (con 4 parámetros)
app.use((err, req, res, _next) => {
  console.error('❌ Error:', err.stack);
  res.status(500).json({ 
    error: err.message || 'Error interno del servidor',
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
  });
});

// Iniciar el servidor con manejo de errores
const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

// Manejo de errores no capturados
process.on('unhandledRejection', (err) => {
  console.error('❌ Unhandled Rejection:', err);
  server.close(() => process.exit(1));
});
