export interface CartItem {
  id: string
  title: string
  price: number
  image: string
  size: string
  quantity: number
}

export interface CartContextType {
  cartItems: CartItem[]
  addToCart: (item: CartItem) => void
  removeFromCart: (id: string) => void
  updateQuantity: (id: string, quantity: number) => void
  clearCart: () => void
} 