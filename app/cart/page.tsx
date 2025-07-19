"use client"

import { useCart } from "@/app/context/cart-context"
import { formatPrice } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"
import { CartItem } from "@/types/index"
import { useRouter } from "next/navigation"

export default function CartPage() {
  const { cartItems, removeFromCart, updateQuantity, clearCart } = useCart()
  const router = useRouter()
  const total = cartItems.reduce((sum: number, item: CartItem) => sum + item.price * item.quantity, 0)

  if (cartItems.length === 0) {
    return (
      <div className="container px-4 py-8 mx-auto">
        <h1 className="mb-4 text-2xl font-bold">Your Cart</h1>
        <p className="text-gray-500">Your cart is empty</p>
        <Link href="/">
          <Button className="mt-4">Continue Shopping</Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="container px-4 py-8 mx-auto">
      <h1 className="mb-4 text-2xl font-bold">Your Cart</h1>
      <div className="grid gap-4">
        {cartItems.map((item: CartItem) => (
          <div key={item.id} className="flex items-center gap-4 p-4 border rounded-lg">
            <Image
              src={item.image}
              alt={item.title}
              width={100}
              height={100}
              className="rounded-md"
            />
            <div className="flex-1">
              <h3 className="font-medium">{item.title}</h3>
              <p className="text-gray-500">{item.size}</p>
              <p className="font-medium">{formatPrice(item.price)}</p>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                disabled={item.quantity <= 1}
              >
                -
              </Button>
              <span>{item.quantity}</span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => updateQuantity(item.id, item.quantity + 1)}
              >
                +
              </Button>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => removeFromCart(item.id)}
            >
              Remove
            </Button>
          </div>
        ))}
      </div>
      <div className="flex items-center justify-between mt-8">
        <div>
          <p className="text-lg font-medium">Total: {formatPrice(total)}</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={clearCart}>
            Clear Cart
          </Button>
          <Button onClick={() => router.push(`/payment?amount=${total}`)}>Checkout</Button>
        </div>
      </div>
    </div>
  )
}
