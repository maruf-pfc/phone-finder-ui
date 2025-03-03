import type { Order } from "@/types/order"

let orders: Order[] = []

export function getOrders(): Order[] {
  return orders
}

export function getOrderById(id: string): Order | undefined {
  return orders.find((order) => order.id === id)
}

export function createOrder(order: Omit<Order, "id">): Order {
  const newOrder = { ...order, id: `ORD-${orders.length + 1}` }
  orders.push(newOrder)
  return newOrder
}

export function updateOrder(id: string, updates: Partial<Order>): Order | undefined {
  const index = orders.findIndex((order) => order.id === id)
  if (index !== -1) {
    orders[index] = { ...orders[index], ...updates }
    return orders[index]
  }
  return undefined
}

export function deleteOrder(id: string): boolean {
  const initialLength = orders.length
  orders = orders.filter((order) => order.id !== id)
  return orders.length < initialLength
}

