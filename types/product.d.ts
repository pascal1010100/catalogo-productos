// types/product.d.ts
export interface Product {
  id: string;
  name: string;
  description?: string;
  priceMayorista?: number;
  pricePublico?: number;
  minCompra?: number;
  precioMinorista?: number;
  precioContado?: number;
  unidadesCaja?: number;
  type?: string;
}
export interface BruddenProduct extends Product {
  image?: string;
  type: "brudden";
  pricePublico?: number;
  minCompra?: number;
}
export interface AgroforestaProduct extends Product {
  image?: string;
}