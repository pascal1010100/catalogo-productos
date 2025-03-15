export interface BruddenProduct {
  name: string
  model: string
  priceMayorista: number
  pricePublico: number
  minCompra: string
  description?: string
  image?: string  // Propiedad opcional
}

export interface AgroforestaProduct {
  name: string
  precioPublico: number
  precioMinorista: number
  precioMayorista: number
  precioContado: number
  unidadesCaja: number
  description?: string
}
