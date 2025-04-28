"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ProductGrid } from "@/components/product-grid"
import { SearchBar } from "@/components/search-bar"
import { ProductModal } from "@/components/product-modal" // 👈 asegúrate que esté importado
import type { Product as BaseProduct } from "@/lib/types"

type Product = BaseProduct & {
  id?: string
  name: string
  type?: string
  minCompra?: number | string
}

interface ProductsSectionProps {
  products: Product[]
}

const normalizeType = (type: string = "") => {
  return type.trim().toLowerCase()
}

export function ProductsSection({ products }: ProductsSectionProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedType, setSelectedType] = useState<"brudden" | "agroforesta">("brudden")

  const handleViewMore = (product: Product) => {
    setSelectedProduct(product)
    setSelectedType((product.type as "brudden" | "agroforesta") ?? "brudden") // 👈 aseguramos el type
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setSelectedProduct(null)
    setIsModalOpen(false)
  }

  const filteredProducts = products
    .map((product) => ({
      ...product,
      type: normalizeType(product.type ?? "brudden"),
    }))
    .filter((product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase())
    )

  const bruddenProducts = filteredProducts
    .filter((product) => product.type === "brudden")
    .map((product) => ({
      ...product,
      id: product.id || crypto.randomUUID(),
      minCompra: typeof product.minCompra === "string" ? parseFloat(product.minCompra) : product.minCompra,
      type: "brudden" as const,
    }))

  const agroforestaProducts = filteredProducts
    .filter((product) => product.type === "agroforesta")
    .map((product) => ({
      ...product,
      id: product.id || crypto.randomUUID(),
      minCompra: typeof product.minCompra === "string" ? parseFloat(product.minCompra) : product.minCompra,
      type: "agroforesta" as const,
    }))

  return (
    <section className="container mx-auto py-16 px-4">
      <h2 className="text-3xl font-bold text-center mb-12">Nuestros Productos</h2>

      <SearchBar onSearch={setSearchQuery} />

      <Tabs defaultValue="brudden" className="mt-8">
        <TabsList className="grid w-full grid-cols-2 mb-8">
          <TabsTrigger value="brudden">Maquinaria Brudden</TabsTrigger>
          <TabsTrigger value="agroforesta">Productos Agroforesta</TabsTrigger>
        </TabsList>

        <TabsContent value="brudden">
          <ProductGrid products={bruddenProducts} type="brudden" onViewMore={handleViewMore} />
        </TabsContent>

        <TabsContent value="agroforesta">
          <ProductGrid products={agroforestaProducts} type="agroforesta" onViewMore={handleViewMore} />
        </TabsContent>
      </Tabs>

      {selectedProduct && (
        <ProductModal
          isOpen={isModalOpen}
          product={selectedProduct}
          type={selectedType}
          onClose={handleCloseModal}
        />
      )}
    </section>
  )
}
