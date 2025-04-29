import { NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

// Tipos para la validación
interface OrderItem {
  id: string
  name: string
  quantity: number
  price: number
  type: "brudden" | "agroforesta"
}

interface OrderData {
  name: string
  contact: string
  notes?: string
  items: OrderItem[]
  totalPrice: number
}

// Validación de la orden
function validateOrder(data: OrderData): string | null {
  if (!data.name?.trim()) return "El nombre es requerido"
  if (!data.contact?.trim()) return "El contacto es requerido"
  if (!data.items?.length) return "El carrito está vacío"
  if (!data.totalPrice || data.totalPrice <= 0) return "El total es inválido"
  return null
}

export async function POST(request: Request) {
  try {
    const data: OrderData = await request.json()
    
    // Validación
    const validationError = validateOrder(data)
    if (validationError) {
      return NextResponse.json(
        { error: validationError },
        { status: 400 }
      )
    }

    // Crear la orden en la base de datos
    const order = await prisma.order.create({
      data: {
        customerName: data.name,
        customerContact: data.contact,
        notes: data.notes,
        totalAmount: data.totalPrice,
        items: {
          create: data.items.map(item => ({
            productId: item.id,
            quantity: item.quantity,
            price: item.price,
            type: item.type
          }))
        },
        status: "PENDING"
      }
    })

    return NextResponse.json({
      message: "Orden creada exitosamente",
      orderId: order.id
    }, { status: 201 })

  } catch (error) {
    console.error("Error al crear la orden:", error)
    return NextResponse.json(
      { error: "Error interno al procesar la orden" },
      { status: 500 }
    )
  }
}