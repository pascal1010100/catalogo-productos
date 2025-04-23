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
  image?: string  // Added optional image property
  model?: string  // Added model property for compatibility with BruddenProduct
}

interface ProductGridProps {
  products: Product[]
  type: "brudden" | "agroforesta"
}

export const ProductGrid = ({ products, type }: ProductGridProps) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={{ ...product, model: product.model ?? "", type: type as "brudden" | "agroforesta" }}
          type={type}
          onClick={() => {
            console.log("Ver más:", product.name)
          }}
        />
      ))}
    </div>
  )
}
