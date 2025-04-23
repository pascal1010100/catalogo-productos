export interface BruddenProduct {
  id: string
  name: string
  model?: string
  priceMayorista?: number
  pricePublico?: number
  minCompra?: number
  description?: string
  image?: string
  type: "brudden"
}

export interface AgroforestaProduct {
  name: string
  precioPublico?: number
  precioMinorista?: number
  precioMayorista?: number
  precioContado?: number
  unidadesCaja?: number
  description?: string
}

export type Product = BruddenProduct | AgroforestaProduct
