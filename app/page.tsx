// app/page.tsx

import { HeroSection } from "@/components/hero-section";
import { ProductsSection } from "@/components/products-section";

async function getProducts() {
  try {
    console.log("Iniciando fetch de productos...");
    const res = await fetch("http://localhost:5000/api/products", {
      cache: "no-store",
      headers: {
        'Content-Type': 'application/json'
      }
    });
    
    console.log("Status:", res.status);
    
    if (!res.ok) {
      throw new Error(`Error: ${res.status}`);
    }
    
    const data = await res.json();
    console.log("Productos recibidos:", data);
    return data;
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
      
      <HeroSection />
      <ProductsSection products={products} />
    </main>
  );
}
