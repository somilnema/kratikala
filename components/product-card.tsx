"use client"

import { formatPrice } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Product } from '@/types'
import { useCart } from '@/app/context/cart-context'
import Image from 'next/image'
import Link from 'next/link'

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart()

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      title: product.title,
      price: product.price,
      size: product.size,
      quantity: 1,
      image: product.image
    })
  }

  return (
    <Link href={`/paintings/${product.id}`}>
      <div className="relative group">
        <div className="w-full overflow-hidden bg-gray-200 rounded-lg aspect-[4/5] max-w-[300px] mx-auto">
          <Image
            src={product.image}
            alt={product.title}
            width={300}
            height={375}
            className="object-cover object-center w-full h-full transition-transform duration-300 group-hover:scale-105"
            priority
          />
        </div>
        <div className="flex justify-between mt-4">
          <div>
            <h3 className="text-sm font-medium text-gray-900">{product.title}</h3>
            <p className="mt-1 text-sm text-gray-500">{product.size}</p>
          </div>
          <p className="text-sm font-medium text-gray-900">
            {formatPrice(product.price)}
          </p>
        </div>
        <div className="mt-4">
          <Button 
            onClick={handleAddToCart} 
            className="w-full bg-rose-500 hover:bg-rose-600"
          >
            Add to Cart
          </Button>
        </div>
      </div>
    </Link>
  )
} 