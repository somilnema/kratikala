"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Heart, Minus, Plus, ShoppingBag, Star } from "lucide-react"
import { notFound } from "next/navigation"
import { paintings } from "@/app/data/paintings"
import { Button } from "@/components/ui/button"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"
import { formatPrice } from "@/lib/utils"
import { useLikes } from "@/app/context/likes-context"

export default function PaintingPage({ params }: { params: { id: string } }) {
  const painting = paintings.find((p) => p.id === params.id)
  const { isLiked, toggleLike } = useLikes()

  if (!painting) {
    notFound()
  }

  const [isVisible, setIsVisible] = useState(false)
  const paintingRef = useRef(null)
  const [activeImage, setActiveImage] = useState(0)

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "0px",
      threshold: 0.1,
    }

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry: IntersectionObserverEntry) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      })
    }

    const observer = new IntersectionObserver(observerCallback, observerOptions)

    if (paintingRef.current) observer.observe(paintingRef.current)

    return () => {
      if (paintingRef.current) observer.unobserve(paintingRef.current)
    }
  }, [])

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-b from-white via-rose-50 to-white">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full">
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className="absolute border-2 border-dashed rounded-full border-rose-200/20 animate-spin-slow"
              style={{
                width: `${Math.random() * 300 + 200}px`,
                height: `${Math.random() * 300 + 200}px`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDuration: `${Math.random() * 50 + 30}s`,
                animationDelay: `${Math.random() * 5}s`,
              }}
            />
          ))}
        </div>
      </div>

      <div className="container relative z-10 px-4 py-8 md:px-6 md:py-12">
        <Link
          href="/gallery"
          className="inline-flex items-center gap-1 mb-8 text-sm transition-colors text-muted-foreground hover:text-rose-600 group animate-fade-in-left"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          Back to Gallery
        </Link>
        <div className="grid gap-8 md:grid-cols-2" ref={paintingRef}>
          <div className={`relative group ${isVisible ? "animate-fade-in-left" : "opacity-0"}`}>
            <div className="absolute transition-opacity duration-700 opacity-0 -inset-4 rounded-xl bg-gradient-to-r from-rose-400 via-violet-400 to-teal-400 group-hover:opacity-30 blur-xl animate-gradient" />
            <div className="relative overflow-hidden border shadow-lg rounded-xl animated-border">
              <Image
                src={painting.image}
                alt={painting.title}
                width={600}
                height={600}
                className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-110 shine"
                priority
              />
              <div className="absolute top-4 right-4">
                <Button
                  size="icon"
                  variant="secondary"
                  className={`w-10 h-10 transition-colors rounded-full bg-white/80 backdrop-blur-sm hover:bg-rose-100 hover:text-rose-600 animate-pulse-slow ${
                    isLiked(painting.id) ? "text-rose-500" : ""
                  }`}
                  onClick={() => toggleLike(painting.id)}
                >
                  <Heart className={`w-5 h-5 ${isLiked(painting.id) ? "fill-current" : ""}`} />
                  <span className="sr-only">Add to wishlist</span>
                </Button>
              </div>
            </div>
            <div className="grid grid-cols-4 gap-2 mt-4">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className={`overflow-hidden rounded-lg border cursor-pointer hover:border-rose-400 transition-colors ${
                    activeImage === i - 1 ? "border-rose-500 ring-2 ring-rose-300" : ""
                  } ${isVisible ? `animate-fade-in-up animate-delay-${i * 100}` : "opacity-0"}`}
                  onClick={() => setActiveImage(i - 1)}
                >
                  <Image
                    src={painting.image}
                    alt={`${painting.title} view ${i}`}
                    width={150}
                    height={150}
                    className="object-cover w-full h-full transition-transform duration-300 hover:scale-110"
                  />
                </div>
              ))}
            </div>
          </div>
          <div
            className={`flex flex-col gap-6 bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-sm border border-rose-100 ${
              isVisible ? "animate-fade-in-right" : "opacity-0"
            }`}
          >
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Badge
                  variant="outline"
                  className="text-violet-600 border-violet-200 bg-violet-50 animate-fade-in animate-delay-100"
                >
                  {painting.category}
                </Badge>
                <div className="flex items-center text-amber-500 animate-fade-in animate-delay-200">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${i < 4 ? "fill-current" : ""} animate-pulse-slow`}
                      style={{ animationDelay: `${i * 0.2}s` }}
                    />
                  ))}
                  <span className="ml-2 text-xs text-muted-foreground">(24 reviews)</span>
                </div>
              </div>
              <h1 className="text-3xl font-bold animate-text-shimmer">{painting.title}</h1>
              <p className="text-muted-foreground">{painting.category}</p>
            </div>
            <div className="text-3xl font-bold animate-fade-in animate-delay-300">
              {formatPrice(painting.price)}
            </div>
            <div className="prose max-w-none animate-fade-in animate-delay-400">
              <p className="text-gray-600">Let&apos;s explore this masterpiece together.</p>
            </div>
            <div className="grid gap-3 p-4 mt-2 rounded-lg bg-gradient-to-r from-rose-50 to-violet-50 animate-fade-in animate-delay-500">
              <div className="flex items-center justify-between text-sm">
                <span className="font-medium text-muted-foreground">Size:</span>
                <span className="font-medium">{painting.size}</span>
              </div>
            </div>
            <div className="flex items-center gap-2 mt-4 animate-fade-in animate-delay-600">
              <Button
                size="icon"
                variant="outline"
                className="w-10 h-10 transition-colors rounded-full hover:bg-rose-100 hover:text-rose-600"
              >
                <Minus className="w-4 h-4" />
                <span className="sr-only">Decrease quantity</span>
              </Button>
              <div className="w-12 font-medium text-center">1</div>
              <Button
                size="icon"
                variant="outline"
                className="w-10 h-10 transition-colors rounded-full hover:bg-rose-100 hover:text-rose-600"
              >
                <Plus className="w-4 h-4" />
                <span className="sr-only">Increase quantity</span>
              </Button>
            </div>
            <Button
              size="lg"
              className="gap-2 mt-4 transition-all duration-300 shadow-lg bg-gradient-to-r from-rose-600 to-violet-600 hover:from-rose-700 hover:to-violet-700 hover:shadow-xl animate-fade-in animate-delay-700 shine"
            >
              <ShoppingBag className="w-5 h-5 animate-bounce-slow" />
              Add to Cart
            </Button>
            <Accordion type="single" collapsible className="w-full mt-6 animate-fade-in animate-delay-800">
              <AccordionItem value="shipping" className="border-b border-rose-100">
                <AccordionTrigger className="transition-colors hover:text-rose-600">
                  Shipping Information
                </AccordionTrigger>
                <AccordionContent>
                  <p className="text-sm text-muted-foreground">
                    All paintings are carefully packaged and shipped within 3-5 business days. Shipping costs are
                    calculated at checkout based on your location.
                  </p>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="returns" className="border-b border-rose-100">
                <AccordionTrigger className="transition-colors hover:text-violet-600">Return Policy</AccordionTrigger>
                <AccordionContent>
                  <p className="text-sm text-muted-foreground">
                    All sales are final — kind of like a pinky promise. 💅 So make sure everything looks good before you hit that order button. Thanks a bunch for the love and support!
                  </p>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="authenticity" className="border-b border-rose-100">
                <AccordionTrigger className="transition-colors hover:text-teal-600">Authenticity</AccordionTrigger>
                <AccordionContent>
                  <p className="text-sm text-muted-foreground">
                    Each artwork comes with a certificate of authenticity signed by the artist. All pieces are original,
                    one-of-a-kind creations.
                  </p>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </div>
    </div>
  )
}
