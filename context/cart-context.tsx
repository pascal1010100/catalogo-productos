// ✅ Este archivo maneja el estado global del carrito de compras en la aplicación.
// Usa Context API y localStorage para mantener los productos agregados y el estado del modal.

"use client";

import type React from "react";
import { createContext, useContext, useState, useEffect } from "react";
import type { BruddenProduct, AgroforestaProduct } from "@/lib/types";

// Definir el tipo para los items del carrito
export interface CartItem {
  id: string;
  product: BruddenProduct | AgroforestaProduct;
  type: "brudden" | "agroforesta";
  quantity: number;
}

// Definir el tipo para el contexto del carrito
interface CartContextType {
  items: CartItem[];
  addItem: (product: BruddenProduct | AgroforestaProduct, type: "brudden" | "agroforesta") => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
  isCheckoutModalOpen: boolean;
  openCheckoutModal: () => void;
  closeCheckoutModal: () => void;
}

// Crear el contexto
const CartContext = createContext<CartContextType | undefined>(undefined);

// Hook personalizado para usar el contexto
export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart debe ser usado dentro de un CartProvider");
  }
  return context;
}

// Proveedor del contexto
export function CartProvider({ children }: { children: React.ReactNode }) {
  // Estado para los items del carrito
  const [items, setItems] = useState<CartItem[]>([]);

  // Estado para el modal de checkout
  const [isCheckoutModalOpen, setCheckoutModalOpen] = useState(false);

  // Funciones para abrir/cerrar el modal
  const openCheckoutModal = () => setCheckoutModalOpen(true);
  const closeCheckoutModal = () => setCheckoutModalOpen(false);

  // Cargar el carrito desde localStorage al iniciar
  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      try {
        setItems(JSON.parse(savedCart));
      } catch (error) {
        console.error("Error al cargar el carrito:", error);
      }
    }
  }, []);

  // Guardar el carrito en localStorage cuando cambie
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(items));
  }, [items]);

  // ✅ FUNCIÓN CORRECTA: Usa el campo 'id' del producto para generar un ID único
  const generateId = (product: BruddenProduct | AgroforestaProduct, type: "brudden" | "agroforesta") => {
    if ('id' in product) {
      return `${type}-${product.id}`;
    } else {
      throw new Error("Product does not have an 'id' property");
    }
  };

  // Función para añadir un item al carrito
  const addItem = (product: BruddenProduct | AgroforestaProduct, type: "brudden" | "agroforesta") => {
    const id = generateId(product, type);

    setItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === id);

      if (existingItem) {
        return prevItems.map((item) =>
          item.id === id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        return [...prevItems, { id, product, type, quantity: 1 }];
      }
    });
  };

  // Función para eliminar un item del carrito
  const removeItem = (id: string) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  // Función para actualizar la cantidad de un item
  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(id);
      return;
    }

    setItems((prevItems) => prevItems.map((item) => (item.id === id ? { ...item, quantity } : item)));
  };

  // Función para vaciar el carrito
  const clearCart = () => {
    setItems([]);
  };

  // Calcular el número total de items
  const totalItems = items.reduce((total, item) => total + item.quantity, 0);

  // Calcular el precio total
  const totalPrice = items.reduce((total, item) => {
    let price = 0;

    if (item.type === "brudden") {
      price = (item.product as BruddenProduct).pricePublico ?? 0;
    } else {
      price = (item.product as AgroforestaProduct).precioPublico ?? 0;
    }

    return total + price * item.quantity;
  }, 0);

  // Valor del contexto
  const value = {
    items,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    totalItems,
    totalPrice,
    isCheckoutModalOpen,
    openCheckoutModal,
    closeCheckoutModal,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
