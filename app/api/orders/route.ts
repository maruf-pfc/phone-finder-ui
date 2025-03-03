import { NextResponse } from "next/server"
import { getOrders, updateOrder, deleteOrder, readDb, writeDb } from "@/lib/orders"

export async function GET(request: Request) {
  const orders = getOrders()
  return NextResponse.json(orders)
}

export async function POST(request: Request) {
  const body = await request.json()
  const db = readDb()
  const newOrder = { ...body, id: `ORD-${db.orders.length + 1}` }
  db.orders.push(newOrder)
  writeDb(db)
  return NextResponse.json(newOrder, { status: 201 })
}

export async function PUT(request: Request) {
  const body = await request.json()
  const { id, ...updates } = body
  const updatedOrder = updateOrder(id, updates)
  if (updatedOrder) {
    return NextResponse.json(updatedOrder)
  }
  return NextResponse.json({ error: "Order not found" }, { status: 404 })
}

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url)
  const id = searchParams.get("id")
  if (id) {
    const deleted = deleteOrder(id)
    if (deleted) {
      return NextResponse.json({ message: "Order deleted successfully" })
    }
    return NextResponse.json({ error: "Order not found" }, { status: 404 })
  }
  return NextResponse.json({ error: "Invalid request" }, { status: 400 })
}

