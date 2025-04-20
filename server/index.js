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

app.use(cors());
app.use(express.json());

// Rutas de la API
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);

// Ruta raíz
app.get("/", (req, res) => {
  res.send("Bienvenido a mi API de Catálogo de Productos");
});

// Iniciar el servidor
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
