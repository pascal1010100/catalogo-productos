// app/page.tsx

import { HeroSection } from "@/components/hero-section"
import { ProductsSection } from "@/components/products-section"

export default async function Home() {
  // Hacemos fetch al backend que corre por separado en el puerto 5000
  const res = await fetch("http://localhost:5000/api/products", {
    cache: "no-store",
  })

  // Si la respuesta no es OK, podrías manejar el error aquí
  if (!res.ok) {
    throw new Error("Failed to fetch products")
  }

  const products = await res.json()

  return (
    <main className="min-h-screen">
      <HeroSection />
      <ProductsSection products={products} />
    </main>
  )
}
