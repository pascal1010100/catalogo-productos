import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const MONGODB_URI = process.env.DATABASE_URL;

export const connectDB = async () => {
    if (!MONGODB_URI) {
        throw new Error("⚠️ No se encontró DATABASE_URL en .env");
    }

    try {
        await mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log("✅ Conectado a MongoDB Atlas");
    } catch (error) {
        console.error("❌ Error al conectar MongoDB:", error);
        process.exit(1);
    }
};