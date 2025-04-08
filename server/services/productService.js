// server/services/productService.js

let products = []; // Simula tu base de datos

export async function getAllProducts() {
  return products;
}

export async function getProductById(id) {
  return products.find(p => p.id === Number(id));
}

export async function createProduct(data) {
  const newProduct = { id: products.length + 1, ...data };
  products.push(newProduct);
  return newProduct;
}

export async function updateProduct(id, data) {
  const idx = products.findIndex(p => p.id === Number(id));
  if (idx < 0) return null;
  products[idx] = { ...products[idx], ...data };
  return products[idx];
}

export async function deleteProduct(id) {
  const idx = products.findIndex(p => p.id === Number(id));
  if (idx < 0) return false;
  products.splice(idx, 1);
  return true;
}
