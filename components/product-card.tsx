"use client"

import Image from "next/image"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useCart } from "@/context/cart-context"

interface Product {
  id: string
  name: string
  description?: string
  model?: string
  priceMayorista?: number
  pricePublico?: number
  precioMinorista?: number
  precioContado?: number
  unidadesCaja?: number
  minCompra?: number
  type: "brudden" | "agroforesta"
}

interface ProductCardProps {
  product: Product
  type: "brudden" | "agroforesta"
  onClick: () => void
}

export function ProductCard({ product, type, onClick }: ProductCardProps) {
  const { addItem } = useCart()

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation()
    addItem({
      ...product,
      model: product.model || "",
      priceMayorista: product.priceMayorista || 0,
      pricePublico: product.pricePublico || 0,
      precioMinorista: product.precioMinorista || 0,
      precioContado: product.precioContado || 0,
      unidadesCaja: product.unidadesCaja || 0,
      minCompra: String(product.minCompra || 0),
    }, type)
  }

  const imageText = product.model || product.name

  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg group">
      <div className="relative h-48 overflow-hidden">
        <Image
          src={`/images/placeholder.svg?height=300&width=400&text=${imageText.replace(/\s+/g, "+")}`}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      <CardContent className="p-4">
        <h3 className="font-semibold text-lg mb-2 line-clamp-2">{product.name}</h3>

        {type === "brudden" && (
          <>
            <p className="text-sm text-muted-foreground mb-2">Modelo: {product.model}</p>
            <p className="text-sm">
              <span className="font-medium">Precio Mayorista:</span> Q {product.priceMayorista?.toLocaleString("es-GT")}
            </p>
            <p className="text-sm">
              <span className="font-medium">Precio Público:</span> Q {product.pricePublico?.toLocaleString("es-GT")}
            </p>
            <p className="text-sm">
              <span className="font-medium">Mínimo de compra:</span> {product.minCompra}
            </p>
          </>
        )}

        {type === "agroforesta" && (
          <>
            <p className="text-sm">
              <span className="font-medium">Precio Público:</span> Q {product.pricePublico?.toLocaleString("es-GT")}
            </p>
            <p className="text-sm">
              <span className="font-medium">Precio Minorista:</span> Q {product.precioMinorista?.toLocaleString("es-GT")}
            </p>
            <p className="text-sm">
              <span className="font-medium">Precio Mayorista:</span> Q {product.priceMayorista?.toLocaleString("es-GT")}
            </p>
          </>
        )}
      </CardContent>

      <CardFooter className="p-4 pt-0 grid grid-cols-2 gap-2">
        <Button variant="outline" onClick={onClick} className="w-full">
          Ver más
        </Button>
        <Button onClick={handleAddToCart} className="w-full">
          Agregar
        </Button>
      </CardFooter>
    </Card>
  )
}
