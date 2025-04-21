"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ProductGrid } from "@/components/product-grid"
import { SearchBar } from "@/components/search-bar"

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
  type?: string // <- si vas a clasificar por tipo
}

interface ProductsSectionProps {
  products: Product[]
}

export function ProductsSection({ products }: ProductsSectionProps) {
  const [searchQuery, setSearchQuery] = useState("")

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const bruddenProducts = filteredProducts.filter(
    (product) => product.type === "brudden"
  )

  const agroforestaProducts = filteredProducts.filter(
    (product) => product.type === "agroforesta"
  )

  return (
    <section className="container mx-auto py-16 px-4">
      <h2 className="text-3xl font-bold text-center mb-12">Nuestros Productos</h2>

      <SearchBar onSearch={setSearchQuery} />

      <Tabs defaultValue="brudden" className="mt-8">
        <TabsList className="grid w-full grid-cols-2 mb-8">
          <TabsTrigger value="brudden">Maquinaria Brudden</TabsTrigger>
          <TabsTrigger value="agroforesta">Agroforesta - Suplijardines</TabsTrigger>
        </TabsList>

        <TabsContent value="brudden">
          <ProductGrid products={bruddenProducts} type="brudden" />
        </TabsContent>

        <TabsContent value="agroforesta">
          <ProductGrid products={agroforestaProducts} type="agroforesta" />
        </TabsContent>
      </Tabs>
    </section>
  )
}
