"use client"

import { useLikes } from "@/app/context/likes-context"
import { paintings } from "@/app/data/paintings"
import Image from "next/image"
import Link from "next/link"
import { Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { formatPrice } from "@/lib/utils"

export default function LikesPage() {
  const { likedPaintings, toggleLike } = useLikes()
  const likedItems = paintings.filter((painting) => likedPaintings.includes(painting.id))

  return (
    <div className="container px-4 py-8 md:px-6 md:py-12">
      <h1 className="mb-8 text-3xl font-bold">Your Liked Paintings</h1>
      
      {likedItems.length === 0 ? (
        <div className="py-12 text-center">
          <Heart className="w-12 h-12 mx-auto mb-4 text-rose-200" />
          <h2 className="mb-2 text-2xl font-semibold text-gray-600">No liked paintings yet</h2>
          <p className="mb-4 text-gray-500">Start exploring our gallery and like your favorite pieces!</p>
          <Link href="/gallery">
            <Button variant="outline" className="gap-2">
              Browse Gallery
            </Button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {likedItems.map((painting) => (
            <div
              key={painting.id}
              className="relative overflow-hidden transition-all bg-white border rounded-lg shadow-sm group hover:shadow-md"
            >
              <Link href={`/paintings/${painting.id}`}>
                <div className="overflow-hidden aspect-square">
                  <Image
                    src={painting.image}
                    alt={painting.title}
                    width={400}
                    height={400}
                    className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
              </Link>
              <div className="p-4">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-semibold">{painting.title}</h3>
                    <p className="text-sm text-gray-500">{painting.category}</p>
                  </div>
                  <Button
                    size="icon"
                    variant="ghost"
                    className="w-8 h-8 rounded-full"
                    onClick={() => toggleLike(painting.id)}
                  >
                    <Heart className="w-4 h-4 fill-rose-500 text-rose-500" />
                  </Button>
                </div>
                <p className="mt-2 font-semibold">{formatPrice(painting.price)}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
} 