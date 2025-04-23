interface FlexibleProduct {
  id: string
  name: string
  model: string
  type: "brudden" | "agroforesta"
  description?: string
  priceMayorista?: number
  pricePublico?: number
  minCompra?: number
  precioMinorista?: number
  precioContado?: number
  unidadesCaja?: number
  image?: string
}

interface ProductCardProps {
  product: FlexibleProduct
  type: "brudden" | "agroforesta"
  onClick: () => void
}
