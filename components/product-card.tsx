"use client"

import Image from "next/image"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useCart } from "@/context/cart-context"
import type { BruddenProduct, AgroforestaProduct } from "@/lib/types"

interface ProductCardProps {
  product: (BruddenProduct | AgroforestaProduct) & {
    image?: string
    type: "brudden" | "agroforesta"
    pricePublico?: number
    minCompra?: number
  }
  type: "brudden" | "agroforesta"
  onClick: () => void
}

export function ProductCard({ product, type, onClick }: ProductCardProps) {
  const { addItem } = useCart()

  const handleAddToCart = () => {
    addItem(product, type)
  }

  const getImage = () => {
    if (product.image) {
      return product.image
    }
    // Ruta fija a la imagen de placeholder
    return "/images/placeholder.svg"
  }

  return (
    <Card className="overflow-hidden group hover:shadow-lg transition-shadow">
      <div className="relative h-48">
        <Image
          src={getImage()}
          alt={product.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform"
        />
      </div>

      <CardContent className="p-4">
        <h3 className="font-semibold text-lg mb-2">{product.name}</h3>
        <p className="text-sm text-muted-foreground mb-2">
          {product.description || "Sin descripción"}
        </p>
        <div className="space-y-1">
          <p className="text-sm">
            <span className="font-medium">Precio Público:</span>{" "}
            Q{product.pricePublico?.toLocaleString("es-GT")}
          </p>
          {type === "brudden" && product.minCompra && (
            <p className="text-sm">
              <span className="font-medium">Mínimo:</span> {product.minCompra}
            </p>
          )}
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0 grid grid-cols-2 gap-2">
        <Button variant="outline" onClick={onClick}>
          Ver más
        </Button>
        <Button onClick={handleAddToCart}>
          Agregar
        </Button>
      </CardFooter>
    </Card>
  )
} 