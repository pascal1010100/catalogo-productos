"use client"

import React, { useState } from "react"
import { ShoppingBag } from "lucide-react"
import { Button } from "@/components/ui/button"
import { CartItemComponent } from "@/components/cart/cart-item"
import { useCart } from "@/context/cart-context"
import { CheckoutModal } from "@/components/checkout-modal"

interface CartDropdownProps {
  isOpen: boolean
  onClose: () => void
}

export function CartDropdown({ isOpen, onClose }: CartDropdownProps) {
  const { items, totalPrice, clearCart, totalItems } = useCart()
  // Removed unused loading state
  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false)

  if (!isOpen) return null

  const handleCheckout = () => {
    setIsCheckoutModalOpen(true)
    onClose()
  }

  return (
    <>
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
              <Button 
                className="w-full" 
                onClick={handleCheckout}
                disabled={items.length === 0}
              >
                Finalizar compra
              </Button>
            </div>
          </div>
        )}
      </div>

      <CheckoutModal 
        isOpen={isCheckoutModalOpen} 
        onClose={() => setIsCheckoutModalOpen(false)} 
      />
    </>
  )
}

