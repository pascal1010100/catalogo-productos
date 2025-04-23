// app/page.tsx

import { HeroSection } from "@/components/hero-section";
import { ProductsSection } from "@/components/products-section";

async function getProducts() {
  try {
    const res = await fetch("http://localhost:5000/api/products", {
      cache: "no-store",
    });
    if (!res.ok) {
      throw new Error("Failed to fetch products");
    }
    return res.json();
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
}

export default async function Home() {
  const products = await getProducts();

  // 1) Log en la terminal de Next.js
  console.log("🌟 Productos recibidos en Home:", products);

  return (
    <main className="min-h-screen p-4">
      {/* 2) Muestra los datos crudos */}
      <pre className="bg-gray-100 p-2 rounded mb-6">
        {JSON.stringify(products, null, 2)}
      </pre>

      <HeroSection />
      <ProductsSection products={products} />
    </main>
  );
}
