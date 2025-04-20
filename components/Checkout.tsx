"use client";

import { useState } from "react";
import { useCart } from "@/context/cart-context";

interface BruddenProduct {
  model: string;
  pricePublico: number;
}

interface AgroforestaProduct {
  name: string;
  precioPublico: number;
}


export default function Checkout() {
  const { items, totalPrice, clearCart } = useCart();
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const orderData = {
      userEmail: email,
      products: items.map((item) => ({
        name:
          item.type === "brudden"
            ? (item.product as BruddenProduct).model
            : (item.product as AgroforestaProduct).name,
        pricePublico:
          item.type === "brudden"
            ? (item.product as BruddenProduct).pricePublico
            : (item.product as AgroforestaProduct).precioPublico,
        quantity: item.quantity,
      })),
    };

    try {
      const response = await fetch("http://localhost:5000/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderData),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage("Orden creada exitosamente.");
        clearCart(); // Limpiar el carrito tras finalizar la compra
      } else {
        setMessage(data.error || "Error al crear la orden.");
      }
    } catch (error) {
      console.error("Error en checkout:", error);
      setMessage("Error al enviar la orden.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl mb-4">Checkout</h1>
      <p>Total a pagar: ${totalPrice.toFixed(2)}</p>
      <form onSubmit={handleCheckout} className="mt-4">
        <label className="block mb-2">
          Correo:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="border p-1 mt-1 block"
          />
        </label>
        <button
          type="submit"
          disabled={isLoading}
          className="bg-blue-500 text-white p-2 rounded"
        >
          {isLoading ? "Procesando..." : "Finalizar compra"}
        </button>
      </form>
      {message && <p className="mt-4">{message}</p>}
    </div>
  );
}
