"use client"

import Image from "next/image"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import type { BruddenProduct, AgroforestaProduct } from "@/lib/types"
import { useCart } from "@/context/cart-context"

interface ProductCardProps {
  product: BruddenProduct | AgroforestaProduct
  type: "brudden" | "agroforesta"
  onClick: () => void
}

export function ProductCard({ product, type, onClick }: ProductCardProps) {
  const { addItem } = useCart()

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation()
    addItem(product, type)
  }

  if (type === "brudden") {
    const bruddenProduct = product as BruddenProduct
    return (
      <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg group">
        <div className="relative h-48 overflow-hidden">
          <Image
            src={`/images/placeholder.svg?height=300&width=400&text=${bruddenProduct.model}`}
            alt={bruddenProduct.name}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
        <CardContent className="p-4">
          <h3 className="font-semibold text-lg mb-1 line-clamp-1">{bruddenProduct.name}</h3>
          <p className="text-sm text-muted-foreground mb-2">Modelo: {bruddenProduct.model}</p>
          <div className="space-y-1">
            <p className="text-sm">
              <span className="font-medium">Precio Mayorista:</span> Q{" "}
              {bruddenProduct.priceMayorista.toLocaleString("es-GT")}
            </p>
            <p className="text-sm">
              <span className="font-medium">Precio Público:</span> Q{" "}
              {bruddenProduct.pricePublico.toLocaleString("es-GT")}
            </p>
            <p className="text-sm">
              <span className="font-medium">Mínimo de compra:</span> {bruddenProduct.minCompra}
            </p>
          </div>
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
  } else {
    const agroProduct = product as AgroforestaProduct
    return (
      <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg group">
        <div className="relative h-48 overflow-hidden">
          <Image
            src={`/images/placeholder.svg?height=300&width=400&text=${agroProduct.name.replace(/\s+/g, "+")}`}
            alt={agroProduct.name}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
        <CardContent className="p-4">
          <h3 className="font-semibold text-lg mb-2 line-clamp-2">{agroProduct.name}</h3>
          <div className="space-y-1">
            <p className="text-sm">
              <span className="font-medium">Precio Público:</span> Q {agroProduct.precioPublico.toLocaleString("es-GT")}
            </p>
            <p className="text-sm">
              <span className="font-medium">Precio Minorista:</span> Q{" "}
              {agroProduct.precioMinorista.toLocaleString("es-GT")}
            </p>
            <p className="text-sm">
              <span className="font-medium">Precio Mayorista:</span> Q{" "}
              {agroProduct.precioMayorista.toLocaleString("es-GT")}
            </p>
          </div>
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
}
