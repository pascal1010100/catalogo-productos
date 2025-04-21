interface Product {
  id: string
  name: string
  description?: string
  priceMayorista?: number
  pricePublico?: number
  minCompra?: number
  precioMinorista?: number
  precioContado?: number
  unidadesCaja?: number
  type?: string
}

interface ProductGridProps {
  products: Product[]
  type: "brudden" | "agroforesta"
}

export const ProductGrid: React.FC<ProductGridProps> = ({ products, type }) => {
  return (
    <div>
      <h1>Product Grid - {type}</h1>
      <ul>
        {products.map((product) => (
          <li key={product.id}>{product.name}</li>
        ))}
      </ul>
    </div>
  );
};
