export default function handler(req, res) {
  if (req.method === 'POST') {
    const { name, price } = req.body;
    return res.status(201).json({ message: 'Producto creado', product: { name, price } });
  } else if (req.method === 'GET') {
    return res.status(200).json([]);
  }

  return res.status(405).json({ error: 'Método no permitido' });
}
