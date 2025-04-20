import Order from '../models/Order.js'; // Importa el modelo Order

// Crear un nuevo pedido
export async function createOrder(req, res) {
  const { userEmail, products } = req.body;

  if (!userEmail || !Array.isArray(products) || products.length === 0) {
    return res.status(400).json({ error: "Faltan datos: 'userEmail' y 'products' son requeridos." });
  }

  try {
    // Crear un nuevo pedido con los datos del cuerpo de la solicitud
    const newOrder = new Order({
      userEmail,
      products
    });

    // Guardar el pedido en la base de datos
    await newOrder.save();

    return res.status(201).json(newOrder);
  } catch (error) {
    console.error("Error al crear el pedido:", error);
    return res.status(500).json({ error: 'Error interno al crear el pedido.' });
  }
}

// Obtener todos los pedidos
export async function getAllOrders(req, res) {
  try {
    const orders = await Order.find();
    return res.status(200).json(orders);
  } catch (error) {
    console.error('Error al obtener los pedidos:', error);
    return res.status(500).json({ error: 'Error interno al obtener los pedidos.' });
  }
}

// Obtener un pedido por ID
export async function getOrderById(req, res) {
  const { id } = req.params;

  try {
    const order = await Order.findById(id);
    if (!order) {
      return res.status(404).json({ error: 'Pedido no encontrado.' });
    }
    return res.status(200).json(order);
  } catch (error) {
    console.error('Error al obtener el pedido:', error);
    return res.status(500).json({ error: 'Error interno al obtener el pedido.' });
  }
}

// Actualizar un pedido existente
export async function updateOrder(req, res) {
  const { id } = req.params;
  const updateData = req.body;

  try {
    const updatedOrder = await Order.findByIdAndUpdate(id, updateData, { new: true });
    if (!updatedOrder) {
      return res.status(404).json({ error: 'Pedido no encontrado.' });
    }
    return res.status(200).json(updatedOrder);
  } catch (error) {
    console.error('Error al actualizar el pedido:', error);
    return res.status(500).json({ error: 'Error interno al actualizar el pedido.' });
  }
}

// Eliminar un pedido por ID
export async function deleteOrder(req, res) {
  const { id } = req.params;

  try {
    const deletedOrder = await Order.findByIdAndDelete(id);
    if (!deletedOrder) {
      return res.status(404).json({ error: 'Pedido no encontrado.' });
    }
    return res.status(200).json({ message: 'Pedido eliminado correctamente.' });
  } catch (error) {
    console.error('Error al eliminar el pedido:', error);
    return res.status(500).json({ error: 'Error interno al eliminar el pedido.' });
  }
}
