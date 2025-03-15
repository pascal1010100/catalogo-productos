"use client";


import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import type { BruddenProduct, AgroforestaProduct } from "@/lib/types"

// Definir el tipo para los items del carrito
export interface CartItem {
  id: string
  product: BruddenProduct | AgroforestaProduct
  type: "brudden" | "agroforesta"
  quantity: number
}

// Definir el tipo para el contexto del carrito
interface CartContextType {
  items: CartItem[]
  addItem: (product: BruddenProduct | AgroforestaProduct, type: "brudden" | "agroforesta") => void
  removeItem: (id: string) => void
  updateQuantity: (id: string, quantity: number) => void
  clearCart: () => void
  totalItems: number
  totalPrice: number
}

// Crear el contexto
const CartContext = createContext<CartContextType | undefined>(undefined)

// Hook personalizado para usar el contexto
export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error("useCart debe ser usado dentro de un CartProvider")
  }
  return context
}

// Proveedor del contexto
export function CartProvider({ children }: { children: React.ReactNode }) {
  // Estado para los items del carrito
  const [items, setItems] = useState<CartItem[]>([])

  // Cargar el carrito desde localStorage al iniciar
  useEffect(() => {
    const savedCart = localStorage.getItem("cart")
    if (savedCart) {
      try {
        setItems(JSON.parse(savedCart))
      } catch (error) {
        console.error("Error al cargar el carrito:", error)
      }
    }
  }, [])

  // Guardar el carrito en localStorage cuando cambie
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(items))
  }, [items])

  // Función para generar un ID único para cada item
  const generateId = (product: BruddenProduct | AgroforestaProduct, type: "brudden" | "agroforesta") => {
    if (type === "brudden") {
      return `brudden-${(product as BruddenProduct).model}`
    } else {
      return `agroforesta-${(product as AgroforestaProduct).name.replace(/\s+/g, "-").toLowerCase()}`
    }
  }

  // Función para añadir un item al carrito
  const addItem = (product: BruddenProduct | AgroforestaProduct, type: "brudden" | "agroforesta") => {
    const id = generateId(product, type)

    setItems((prevItems) => {
      // Verificar si el producto ya está en el carrito
      const existingItemIndex = prevItems.findIndex((item) => item.id === id)

      if (existingItemIndex >= 0) {
        // Si ya existe, incrementar la cantidad
        const updatedItems = [...prevItems]
        updatedItems[existingItemIndex].quantity += 1
        return updatedItems
      } else {
        // Si no existe, añadirlo con cantidad 1
        return [...prevItems, { id, product, type, quantity: 1 }]
      }
    })
  }

  // Función para eliminar un item del carrito
  const removeItem = (id: string) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== id))
  }

  // Función para actualizar la cantidad de un item
  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(id)
      return
    }

    setItems((prevItems) => prevItems.map((item) => (item.id === id ? { ...item, quantity } : item)))
  }

  // Función para vaciar el carrito
  const clearCart = () => {
    setItems([])
  }

  // Calcular el número total de items
  const totalItems = items.reduce((total, item) => total + item.quantity, 0)

  // Calcular el precio total
  const totalPrice = items.reduce((total, item) => {
    let price = 0

    if (item.type === "brudden") {
      price = (item.product as BruddenProduct).pricePublico
    } else {
      price = (item.product as AgroforestaProduct).precioPublico
    }

    return total + price * item.quantity
  }, 0)

  // Valor del contexto
  const value = {
    items,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    totalItems,
    totalPrice,
  }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

