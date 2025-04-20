"use client"

import React from "react"
import { ShoppingBag } from "lucide-react"
import { Button } from "@/components/ui/button"
import { CartItemComponent } from "@/components/cart/cart-item"
import { useCart } from "@/context/cart-context"

interface CartDropdownProps {
  isOpen: boolean
}

export function CartDropdown({ isOpen }: CartDropdownProps) {

  const { items, totalPrice, clearCart, totalItems } = useCart()
  const [loading, setLoading] = React.useState(false)

  if (!isOpen) return null

  const handleCheckout = async () => {
    setLoading(true)
    try {
      // Aquí defines la URL del endpoint en tu backend para procesar el checkout.
      // Por ejemplo, '/api/checkout' o la ruta que hayas definido.
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ items, totalPrice })
      })
      if (!response.ok) {
        // Manejar error de respuesta
        console.error("Error al procesar la compra")
      } else {
        // Procesar la respuesta, quizá limpiar el carrito, mostrar mensaje, etc.
        console.log("Compra procesada exitosamente")
        clearCart()
      }
    } catch (error) {
      console.error("Error en el checkout:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="absolute right-0 mt-2 w-80 bg-background border rounded-md shadow-lg z-50">
      <div className="p-4 border-b">
        <div className="flex items-center justify-between">
          <h3 className="font-medium">Carrito de Compras</h3>
          <span className="text-sm text-muted-foreground">{totalItems} productos</span>
        </div>
      </div>

      <div className="max-h-96 overflow-y-auto p-4">
        {items.length > 0 ? (
          items.map((item) => <CartItemComponent key={item.id} item={item} />)
        ) : (
          <div className="py-8 text-center">
            <ShoppingBag className="mx-auto h-12 w-12 text-muted-foreground" />
            <p className="mt-4 text-muted-foreground">Tu carrito está vacío</p>
          </div>
        )}
      </div>

      {items.length > 0 && (
        <div className="p-4 border-t">
          <div className="flex justify-between font-medium mb-4">
            <span>Total:</span>
            <span>Q {totalPrice.toLocaleString("es-GT")}</span>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <Button variant="outline" size="sm" onClick={clearCart}>
              Vaciar Carrito
            </Button>
            <Button size="sm" onClick={handleCheckout} disabled={loading}>
              {loading ? "Procesando..." : "Finalizar Compra"}
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}

