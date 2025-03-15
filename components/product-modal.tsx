"use client"

import Image from "next/image"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import type { BruddenProduct, AgroforestaProduct } from "@/lib/types"
import { useCart } from "@/context/cart-context"

interface ProductModalProps {
  product: BruddenProduct | AgroforestaProduct
  type: "brudden" | "agroforesta"
  isOpen: boolean
  onClose: () => void
}

export function ProductModal({ product, type, isOpen, onClose }: ProductModalProps) {
  const { addItem } = useCart()
  if (type === "brudden") {
    const bruddenProduct = product as BruddenProduct
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-xl">{bruddenProduct.name}</DialogTitle>
            <DialogDescription>Modelo: {bruddenProduct.model}</DialogDescription>
          </DialogHeader>
          <div className="grid gap-6 py-4">
            <div className="relative h-64 sm:h-80 overflow-hidden rounded-md">
              <Image
                src={`/images/placeholder.svg?height=600&width=800&text=${bruddenProduct.model}`}
                alt={bruddenProduct.name}
                fill
                className="object-cover"
              />
            </div>

            <div className="grid gap-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-muted p-4 rounded-md">
                  <h4 className="font-medium mb-2">Precio Mayorista</h4>
                  <p className="text-2xl font-bold">Q {bruddenProduct.priceMayorista.toLocaleString("es-GT")}</p>
                </div>
                <div className="bg-muted p-4 rounded-md">
                  <h4 className="font-medium mb-2">Precio Público</h4>
                  <p className="text-2xl font-bold">Q {bruddenProduct.pricePublico.toLocaleString("es-GT")}</p>
                </div>
              </div>

              <div className="bg-muted p-4 rounded-md">
                <h4 className="font-medium mb-2">Mínimo de Compra</h4>
                <p>{bruddenProduct.minCompra}</p>
              </div>

              <div>
                <h4 className="font-medium mb-2">Descripción</h4>
                <p className="text-muted-foreground">
                  {bruddenProduct.description ||
                    "Maquinaria de alta calidad para uso profesional. Diseñada para ofrecer durabilidad y rendimiento excepcional en diversas aplicaciones."}
                </p>
              </div>
            </div>

            <div className="flex justify-between">
              <Button variant="outline" onClick={onClose}>
                Cerrar
              </Button>
              <Button onClick={() => addItem(product, type)}>Agregar al Carrito</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    )
  } else {
    const agroProduct = product as AgroforestaProduct
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-xl">{agroProduct.name}</DialogTitle>
          </DialogHeader>
          <div className="grid gap-6 py-4">
            <div className="relative h-64 sm:h-80 overflow-hidden rounded-md">
              <Image
                src={`/images/placeholder.svg?height=600&width=800&text=${agroProduct.name.replace(/\s+/g, "+")}`}
                alt={agroProduct.name}
                fill
                className="object-cover"
              />
            </div>

            <div className="grid gap-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-muted p-4 rounded-md">
                  <h4 className="font-medium mb-2">Precio Público</h4>
                  <p className="text-2xl font-bold">Q {agroProduct.precioPublico.toLocaleString("es-GT")}</p>
                </div>
                <div className="bg-muted p-4 rounded-md">
                  <h4 className="font-medium mb-2">Precio Minorista</h4>
                  <p className="text-lg font-semibold">Q {agroProduct.precioMinorista.toLocaleString("es-GT")}</p>
                  <p className="text-xs text-muted-foreground">Caja de {agroProduct.unidadesCaja} unidades</p>
                  <p className="text-xs text-muted-foreground">Crédito 20-30 días</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-muted p-4 rounded-md">
                  <h4 className="font-medium mb-2">Precio Mayorista</h4>
                  <p className="text-lg font-semibold">Q {agroProduct.precioMayorista.toLocaleString("es-GT")}</p>
                  <p className="text-xs text-muted-foreground">Crédito 30-45 días</p>
                </div>
                <div className="bg-muted p-4 rounded-md">
                  <h4 className="font-medium mb-2">Precio Contado</h4>
                  <p className="text-lg font-semibold">Q {agroProduct.precioContado.toLocaleString("es-GT")}</p>
                </div>
              </div>

              <div>
                <h4 className="font-medium mb-2">Descripción</h4>
                <p className="text-muted-foreground">
                  {agroProduct.description ||
                    "Producto de alta calidad para el cuidado y mantenimiento de jardines y plantas. Formulado para proporcionar los mejores resultados."}
                </p>
              </div>
            </div>

            <div className="flex justify-between">
              <Button variant="outline" onClick={onClose}>
                Cerrar
              </Button>
              <Button onClick={() => addItem(product, type)}>Agregar al Carrito</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    )
  }
}
