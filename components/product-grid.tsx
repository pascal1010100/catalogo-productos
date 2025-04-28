"use client"

import { ProductCard } from "@/components/product-card"

type Product = {
  id: string
  name: string
  description?: string
  priceMayorista?: number
  pricePublico?: number
  minCompra?: number
  precioMinorista?: number
  precioContado?: number
  unidadesCaja?: number
  type?: "brudden" | "agroforesta"
  image?: string
  model?: string
}

interface ProductGridProps {
  products: Product[]
  type: "brudden" | "agroforesta"
  onViewMore: (product: Product) => void // 👈 nuevo
}

export const ProductGrid = ({ products, type, onViewMore }: ProductGridProps) => {
  console.log("🖼️ Productos recibidos en ProductGrid:", products)

  if (products.length === 0) {
    return <div className="text-center text-gray-500">No hay productos para mostrar.</div>
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={{
            ...product,
            model: product.model ?? "",
            type: (product.type ?? type) as "brudden" | "agroforesta",
          }}
          type={type}
          onClick={() => onViewMore(product)} // ⚡ llamamos a la función que abre el modal
        />
      ))}
    </div>
  )
}
