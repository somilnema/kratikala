"use client"

import { createContext, useContext, useState, ReactNode } from "react"
import { paintings } from "@/app/data/paintings"

type LikesContextType = {
  likedPaintings: string[]
  toggleLike: (paintingId: string) => void
  isLiked: (paintingId: string) => boolean
}

const LikesContext = createContext<LikesContextType | undefined>(undefined)

export function LikesProvider({ children }: { children: ReactNode }) {
  const [likedPaintings, setLikedPaintings] = useState<string[]>([])

  const toggleLike = (paintingId: string) => {
    setLikedPaintings((prev) => {
      if (prev.includes(paintingId)) {
        return prev.filter((id) => id !== paintingId)
      }
      return [...prev, paintingId]
    })
  }

  const isLiked = (paintingId: string) => likedPaintings.includes(paintingId)

  return (
    <LikesContext.Provider value={{ likedPaintings, toggleLike, isLiked }}>
      {children}
    </LikesContext.Provider>
  )
}

export function useLikes() {
  const context = useContext(LikesContext)
  if (context === undefined) {
    throw new Error("useLikes must be used within a LikesProvider")
  }
  return context
} 