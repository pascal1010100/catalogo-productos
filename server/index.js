import express from "express";
import cors from "cors";
import { connectDB } from "./lib/mongodb.js";
import mongoose from "mongoose";

const app = express();

// Conectar a MongoDB
connectDB();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Bienvenido a mi API");
});

// Definir modelo de producto
const ProductSchema = new mongoose.Schema({
    name: String,
    price: Number
});

const Product = mongoose.model("Product", ProductSchema);

// Obtener productos desde la base de datos
app.get("/products", async (req, res) => {
    const products = await Product.find();
    res.json(products);
});

// Crear un producto en la base de datos
app.post("/products", async (req, res) => {
    const { name, price } = req.body;
    if (!name || !price) {
        return res.status(400).json({ error: "Faltan datos (name, price)" });
    }

    const newProduct = new Product({ name, price });
    await newProduct.save();

    res.status(201).json({
        message: "Producto creado",
        product: newProduct,
    });
});

// Iniciar el servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
