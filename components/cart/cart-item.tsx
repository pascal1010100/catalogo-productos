"use client"

import Image from "next/image"
import { Minus, Plus, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCart, type CartItem } from "@/context/cart-context"
import type { BruddenProduct, AgroforestaProduct } from "@/lib/types"

interface CartItemProps {
  item: CartItem
}

export function CartItemComponent({ item }: CartItemProps) {
  const { updateQuantity, removeItem } = useCart()

  const getProductName = () => {
    return item.product.name
  }

  const getProductPrice = () => {
    if (item.type === "brudden") {
      return (item.product as BruddenProduct).pricePublico
    } else {
      return (item.product as AgroforestaProduct).precioPublico
    }
  }

  const getProductImage = () => {
    if (item.type === "brudden") {
      return `/placeholder.svg?height=80&width=80&text=${(item.product as BruddenProduct).model}`
    } else {
      return `/placeholder.svg?height=80&width=80&text=${(item.product as AgroforestaProduct).name.replace(/\s+/g, "+")}`
    }
  }

  const incrementQuantity = () => {
    updateQuantity(item.id, item.quantity + 1)
  }

  const decrementQuantity = () => {
    if (item.quantity > 1) {
      updateQuantity(item.id, item.quantity - 1)
    } else {
      removeItem(item.id)
    }
  }

  return (
    <div className="flex items-center py-3 border-b last:border-b-0">
      <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-md border">
        <Image
          src={getProductImage() || "/placeholder.svg"}
          alt={getProductName()}
          fill
          className="object-cover object-center"
        />
      </div>

      <div className="ml-4 flex flex-1 flex-col">
        <div className="flex justify-between text-sm font-medium">
          <h3 className="line-clamp-1">{getProductName()}</h3>
          <p className="ml-4">Q {(getProductPrice() * item.quantity).toLocaleString("es-GT")}</p>
        </div>

        <div className="flex items-center justify-between text-sm mt-2">
          <div className="flex items-center border rounded-md">
            <Button variant="ghost" size="icon" className="h-8 w-8 rounded-none" onClick={decrementQuantity}>
              <Minus className="h-3 w-3" />
            </Button>
            <span className="w-8 text-center">{item.quantity}</span>
            <Button variant="ghost" size="icon" className="h-8 w-8 rounded-none" onClick={incrementQuantity}>
              <Plus className="h-3 w-3" />
            </Button>
          </div>

          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-muted-foreground hover:text-destructive"
            onClick={() => removeItem(item.id)}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}

