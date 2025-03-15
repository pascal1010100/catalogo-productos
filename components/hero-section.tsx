import Image from "next/image"
import { Button } from "@/components/ui/button"

export function HeroSection() {
  return (
    <section className="relative h-[70vh] flex items-center justify-center overflow-hidden">
      {/* Imagen de fondo */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/banner-principal.jpg" // Asegúrate de que esta es la ruta correcta
          alt="Banner principal"
          fill
          className="object-cover brightness-50"
          priority
        />
      </div>

      {/* Contenido del Hero Section */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">Catálogo de Productos</h1>
        <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto">
          Descubre nuestra amplia gama de maquinaria Brudden y productos Agroforesta para todas tus necesidades.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" className="bg-primary hover:bg-primary/90 text-white">
            Maquinaria Brudden
          </Button>
          <Button size="lg" variant="outline" className="bg-transparent text-white border-white hover:bg-white/10">
            Productos Agroforesta
          </Button>
        </div>
      </div>
    </section>
  )
}
