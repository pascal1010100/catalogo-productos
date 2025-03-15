"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ProductGrid } from "@/components/product-grid"
import { SearchBar } from "@/components/search-bar"
import { bruddenProducts, agroforestaProducts } from "@/lib/products"

export function ProductsSection() {
  const [searchQuery, setSearchQuery] = useState("")

  const filteredBruddenProducts = bruddenProducts.filter(
    (product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.model.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const filteredAgroforestaProducts = agroforestaProducts.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase()),
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
          <ProductGrid products={filteredBruddenProducts} type="brudden" />
        </TabsContent>

        <TabsContent value="agroforesta">
          <ProductGrid products={filteredAgroforestaProducts} type="agroforesta" />
        </TabsContent>
      </Tabs>
    </section>
  )
}

