import { HeroSection } from "@/components/hero-section"
import { ProductsSection } from "@/components/products-section"

export default function Home() {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <ProductsSection />
    </main>
  )
}

