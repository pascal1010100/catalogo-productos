// server/index.js

import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./lib/mongodb.js";
import productRoutes from "./routes/productRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";

dotenv.config();

const app = express();

// Conectar a MongoDB
await connectDB();

// Configuración de CORS
app.use(cors({
  origin: 'http://localhost:3000'
}));

// Parsear JSON
app.use(express.json());

// Rutas de la API
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);

// Manejo de errores
app.use((err, req, res) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something broke!' });
});

// Ruta raíz
app.get("/", (req, res) => {
  res.send("Bienvenido a mi API de Catálogo de Productos");
});

// Iniciar el servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
