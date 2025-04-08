"use client";

import { useState } from "react";
import { useCart } from "@/context/cart-context";

export default function Checkout() {
  const { items, totalPrice, clearCart } = useCart();
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Preparar los datos de la orden
    const orderData = {
      userEmail: email,
      products: items.map((item) => ({
        // En este ejemplo, usamos "model" para brudden y "name" para agroforesta.
        name:
          item.type === "brudden"
            ? (item.product as any).model
            : (item.product as any).name,
        // Aquí, ajusta el precio según tu estructura de producto.
        pricePublico:
          item.type === "brudden"
            ? (item.product as any).pricePublico
            : (item.product as any).precioPublico,
        quantity: item.quantity,
      })),
    };

    try {
      const response = await fetch("http://localhost:5000/orders/create", {
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