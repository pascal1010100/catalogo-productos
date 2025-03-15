"use client"

import { useState } from "react"
import { ProductCard } from "@/components/product-card"
import { ProductModal } from "@/components/product-modal"
import type { BruddenProduct, AgroforestaProduct } from "@/lib/types"

interface ProductGridProps {
  products: (BruddenProduct | AgroforestaProduct)[]
  type: "brudden" | "agroforesta"
}

export function ProductGrid({ products, type }: ProductGridProps) {
  const [selectedProduct, setSelectedProduct] = useState<BruddenProduct | AgroforestaProduct | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const openModal = (product: BruddenProduct | AgroforestaProduct) => {
    setSelectedProduct(product)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setSelectedProduct(null)
  }

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product, index) => (
          <ProductCard key={`${type}-${index}`} product={product} type={type} onClick={() => openModal(product)} />
        ))}
      </div>

      {products.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No se encontraron productos.</p>
        </div>
      )}

      {selectedProduct && (
        <ProductModal product={selectedProduct} type={type} isOpen={isModalOpen} onClose={closeModal} />
      )}
    </div>
  )
}

