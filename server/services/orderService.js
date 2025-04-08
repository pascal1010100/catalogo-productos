// server/services/orderService.js

let orders = []; // Simula tu base de datos

export async function getAllOrders() {
  return orders;
}

export async function getOrderById(id) {
  return orders.find(o => o.id === Number(id));
}

export async function createOrder({ userEmail, products }) {
  const newOrder = { id: orders.length + 1, userEmail, products, createdAt: new Date() };
  orders.push(newOrder);
  return newOrder;
}

export async function updateOrder(id, data) {
  const idx = orders.findIndex(o => o.id === Number(id));
  if (idx < 0) return null;
  orders[idx] = { ...orders[idx], ...data };
  return orders[idx];
}

export async function deleteOrder(id) {
  const idx = orders.findIndex(o => o.id === Number(id));
  if (idx < 0) return false;
  orders.splice(idx, 1);
  return true;
}
