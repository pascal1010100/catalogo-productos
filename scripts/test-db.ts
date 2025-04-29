import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  try {
    // Prueba la conexión a la base de datos
    const products = await prisma.product.findMany()
    console.log('🟢 Conexión a DB exitosa!')
    console.log('📦 Productos encontrados:', products.length)

    // Prueba el endpoint
    const response = await fetch('http://localhost:5000/api/products')
    const responseText = await response.text() // Obtener respuesta como texto
    
    console.log('🔍 Status:', response.status)
    console.log('📄 Headers:', Object.fromEntries(response.headers))
    console.log('📝 Response:', responseText)

    // Intentar parsear como JSON solo si es válido
    try {
      const data = JSON.parse(responseText)
      console.log('✅ JSON válido:', data)
    } catch {
      console.error('❌ JSON inválido')
    }

  } catch (error) {
    console.error('❌ Error:', error)
  } finally {
    await prisma.$disconnect()
  }
}

main()