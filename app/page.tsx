"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Palette, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ProductCard } from "@/components/product-card"

const products = [
  {
    id: "1",
    name: "Sunset Waves",
    category: "Landscape",
    price: 299,
    image: "/image1.jpg"
  },
  {
    id: "2",
    name: "Mountain View",
    category: "Landscape",
    price: 349,
    image: "/image2.jpg"
  },
  {
    id: "3",
    name: "Forest Path",
    category: "Nature",
    price: 279,
    image: "/image.3.jpg"
  },
  {
    id: "4",
    name: "Ocean Breeze",
    category: "Seascape",
    price: 329,
    image: "/image4.jpg"
  },
  {
    id: "5",
    name: "City Lights",
    category: "Urban",
    price: 399,
    image: "/image5.jpg"
  },
  {
    id: "6",
    name: "Desert Dunes",
    category: "Landscape",
    price: 289,
    image: "/image6.jpg"
  }
]

export default function HomePage() {
  const [isVisible, setIsVisible] = useState({
    hero: false,
    featured: false,
    custom: false,
  })

  const heroRef = useRef(null)
  const featuredRef = useRef(null)
  const customRef = useRef(null)

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "0px",
      threshold: 0.1,
    }

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry: IntersectionObserverEntry) => {
        if (entry.target === heroRef.current && entry.isIntersecting) {
          setIsVisible((prev) => ({ ...prev, hero: true }))
        } else if (entry.target === featuredRef.current && entry.isIntersecting) {
          setIsVisible((prev) => ({ ...prev, featured: true }))
        } else if (entry.target === customRef.current && entry.isIntersecting) {
          setIsVisible((prev) => ({ ...prev, custom: true }))
        }
      })
    }

    const observer = new IntersectionObserver(observerCallback, observerOptions)

    if (heroRef.current) observer.observe(heroRef.current)
    if (featuredRef.current) observer.observe(featuredRef.current)
    if (customRef.current) observer.observe(customRef.current)

    return () => {
      if (heroRef.current) observer.unobserve(heroRef.current)
      if (featuredRef.current) observer.unobserve(featuredRef.current)
      if (customRef.current) observer.unobserve(customRef.current)
    }
  }, [])

  return (
    <div className="flex flex-col min-h-screen cursor-paint-brush">
      {/* Hero Section with animated background */}
      <section
        ref={heroRef}
        className="relative w-full py-8 overflow-hidden sm:py-12 md:py-16 lg:py-24 xl:py-32 animated-bg paint-splatter"
      >
        {/* Animated background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-fuchsia-100 via-yellow-100 to-cyan-100 opacity-70 animate-color-mix" />
        <div className="absolute inset-0 bg-[url('/placeholder.svg')] mix-blend-overlay opacity-10" />

        {/* Paint splashes */}
        <div className="absolute inset-0 overflow-hidden">
          {Array.from({ length: 15 }).map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full animate-paint-splash"
              style={{
                width: `${Math.random() * 60 + 20}px`,
                height: `${Math.random() * 60 + 20}px`,
                background: [
                  "rgba(255, 20, 147, 0.4)",
                  "rgba(255, 140, 0, 0.4)",
                  "rgba(255, 255, 0, 0.4)",
                  "rgba(0, 255, 127, 0.4)",
                  "rgba(0, 191, 255, 0.4)",
                ][Math.floor(Math.random() * 5)],
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
              }}
            />
          ))}
        </div>

        {/* Floating elements */}
        <div className="absolute top-10 sm:top-20 left-[5%] sm:left-[10%] animate-float-slow">
          <div className="w-16 h-16 rounded-full sm:w-20 sm:h-20 bg-fuchsia-300/70 blur-xl" />
        </div>
        <div className="absolute bottom-10 sm:bottom-20 right-[10%] sm:right-[15%] animate-float">
          <div className="w-24 h-24 rounded-full sm:w-32 sm:h-32 bg-cyan-300/70 blur-xl" />
        </div>
        <div className="absolute top-1/4 sm:top-1/3 right-[15%] sm:right-[20%] animate-float-slow-reverse">
          <div className="w-20 h-20 rounded-full sm:w-24 sm:h-24 bg-yellow-300/70 blur-xl" />
        </div>

        <div className="container relative z-10 px-4 sm:px-6 md:px-8">
          <div className="grid items-center gap-6 lg:grid-cols-2 lg:gap-12">
            <div
              className={`flex flex-col justify-center space-y-4 text-center lg:text-left ${
                isVisible.hero ? "animate-fade-in-left" : "opacity-0"
              }`}
            >
              <Badge className="mx-auto mb-2 w-fit lg:mx-0 bg-fuchsia-500 hover:bg-fuchsia-600 animate-pulse-slow">
                Artistic Creations
              </Badge>
              <div className="space-y-2">
                <h1 className="text-2xl font-bold tracking-tighter sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl animate-text-shimmer brush-stroke">
                  Unique Artwork for Your Space
                </h1>
                <p className="max-w-[600px] text-muted-foreground text-sm sm:text-base md:text-lg mx-auto lg:mx-0">
                  Discover original paintings, commission custom artwork, and find unique art goodies that speak to your
                  soul.
                </p>
              </div>
              <div className="flex flex-col justify-center gap-2 pt-4 sm:flex-row lg:justify-start">
                <Link href="/gallery" className="w-full sm:w-auto">
                  <Button
                    size="lg"
                    className="w-full sm:w-auto gap-1.5 bg-fuchsia-600 hover:bg-fuchsia-700 shadow-lg hover:shadow-xl transition-all duration-300 group shine animate-paint-drip"
                  >
                    Browse Gallery
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </Link>
                <Link href="/custom-order" className="w-full sm:w-auto">
                  <Button
                    size="lg"
                    variant="outline"
                    className="w-full sm:w-auto gap-1.5 border-yellow-400 hover:bg-yellow-100 shadow-lg hover:shadow-xl transition-all duration-300 shine"
                  >
                    Commission Artwork
                    <Palette className="w-4 h-4 animate-bounce-slow" />
                  </Button>
                </Link>
              </div>
            </div>
            <div
              className={`flex items-center justify-center mt-8 lg:mt-0 ${
                isVisible.hero ? "animate-fade-in-right animate-delay-300" : "opacity-0"
              }`}
            >
              <div className="grid grid-cols-2 gap-2 transition-all duration-500 transform sm:gap-4 md:gap-6 lg:gap-8 rotate-2 hover:rotate-0">
                <div className="grid gap-2 sm:gap-4 md:gap-6 lg:gap-8">
                  <div className="overflow-hidden transition-all duration-300 transform shadow-xl rounded-2xl hover:shadow-2xl hover:-translate-y-1 animated-border animate-canvas-reveal">
                    <Image
                      alt="Painting 1"
                      className="aspect-[4/5] overflow-hidden rounded-2xl object-cover hover:scale-105 transition-all duration-500 canvas-texture"
                      height={300}
                      src="/image8.jpg?height=300&width=240"
                      width={240}
                    />
                  </div>
                  <div className="overflow-hidden transition-all duration-300 transform shadow-xl rounded-2xl hover:shadow-2xl hover:-translate-y-1 animated-border animate-canvas-reveal animate-delay-300">
                    <Image
                      alt="Painting 2"
                      className="aspect-[4/5] overflow-hidden rounded-2xl object-cover hover:scale-105 transition-all duration-500 canvas-texture"
                      height={300}
                      src="/image10.jpg?height=300&width=240"
                      width={240}
                    />
                  </div>
                </div>
                <div className="grid gap-2 transform translate-y-4 sm:gap-4 md:gap-6 lg:gap-8 sm:translate-y-6">
                  <div className="overflow-hidden transition-all duration-300 transform shadow-xl rounded-2xl hover:shadow-2xl hover:-translate-y-1 animated-border animate-canvas-reveal animate-delay-200">
                    <Image
                      alt="Painting 3"
                      className="aspect-[4/5] overflow-hidden rounded-2xl object-cover hover:scale-105 transition-all duration-500 canvas-texture"
                      height={300}
                      src="/image11.jpg?height=300&width=240"
                      width={240}
                    />
                  </div>
                  <div className="overflow-hidden transition-all duration-300 transform shadow-xl rounded-2xl hover:shadow-2xl hover:-translate-y-1 animated-border animate-canvas-reveal animate-delay-500">
                    <Image
                      alt="Painting 4"
                      className="aspect-[4/5] overflow-hidden rounded-2xl object-cover hover:scale-105 transition-all duration-500 canvas-texture"
                      height={300}
                      src="/image7.jpg?height=300&width=240"
                      width={240}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Paintings */}
      <section
        ref={featuredRef}
        className="relative w-full py-12 overflow-hidden md:py-24 lg:py-32 bg-gradient-to-b from-white to-fuchsia-50"
      >
        {/* Animated brush strokes */}
        <div className="absolute inset-0 overflow-hidden">
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className="absolute animate-brush-stroke"
              style={{
                width: `${Math.random() * 300 + 100}px`,
                height: `${Math.random() * 20 + 5}px`,
                background: [
                  "rgba(255, 20, 147, 0.2)",
                  "rgba(255, 140, 0, 0.2)",
                  "rgba(255, 255, 0, 0.2)",
                  "rgba(0, 255, 127, 0.2)",
                  "rgba(0, 191, 255, 0.2)",
                ][Math.floor(Math.random() * 5)],
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                transform: `rotate(${Math.random() * 180}deg)`,
                borderRadius: "40% 60% 60% 40% / 70% 30% 70% 30%",
                animationDelay: `${Math.random() * 2}s`,
              }}
            />
          ))}
        </div>

        <div className="container relative z-10 px-4 md:px-6">
          <div
            className={`flex flex-col items-center justify-center space-y-4 text-center ${
              isVisible.featured ? "animate-fade-in-up" : "opacity-0"
            }`}
          >
            <Badge className="bg-yellow-500 hover:bg-yellow-600 animate-pulse-slow">Featured Collection</Badge>
            <div className="space-y-2">
              <h2 className="relative inline-block text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl brush-stroke">
                Featured Paintings
                <span className="absolute -top-6 -right-6">
                  <Sparkles className="w-5 h-5 text-yellow-400 animate-pulse" />
                </span>
              </h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Explore my latest creations and find the perfect piece for your home or office.
              </p>
            </div>
          </div>
          <div className="grid max-w-5xl grid-cols-1 gap-8 py-12 mx-auto sm:grid-cols-2 md:grid-cols-3 lg:gap-12">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          <div
            className={`flex justify-center ${
              isVisible.featured ? "animate-fade-in-up animate-delay-800" : "opacity-0"
            }`}
          >
            <Link href="/gallery">
              <Button
                variant="outline"
                size="lg"
                className="gap-1.5 border-cyan-400 hover:bg-cyan-100 shadow-lg hover:shadow-xl transition-all duration-300 group shine"
              >
                View All Paintings
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Custom Orders */}
      <section ref={customRef} className="relative w-full py-12 overflow-hidden md:py-24 lg:py-32 animated-bg">
        <div className="absolute inset-0 bg-gradient-to-tr from-yellow-100 to-cyan-100 opacity-70 animate-color-mix" />
        <div className="absolute inset-0 bg-[url('/placeholder.svg')] mix-blend-overlay opacity-10" />

        {/* Decorative elements */}
        <div className="absolute w-40 h-40 border-4 border-yellow-300 border-dashed rounded-full opacity-50 top-1/4 left-10 animate-spin-slow" />
        <div className="absolute w-32 h-32 border-4 border-dashed rounded-full opacity-50 bottom-1/4 right-10 border-cyan-300 animate-spin-slow-reverse" />

        {/* Paint splashes */}
        <div className="absolute inset-0 overflow-hidden">
          {Array.from({ length: 10 }).map((_, i) => (
            <div
              key={i}
              className="absolute animate-paint-splash"
              style={{
                width: `${Math.random() * 40 + 10}px`,
                height: `${Math.random() * 40 + 10}px`,
                background: [
                  "rgba(255, 20, 147, 0.3)",
                  "rgba(255, 140, 0, 0.3)",
                  "rgba(255, 255, 0, 0.3)",
                  "rgba(0, 255, 127, 0.3)",
                  "rgba(0, 191, 255, 0.3)",
                ][Math.floor(Math.random() * 5)],
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                borderRadius: "40% 60% 60% 40% / 70% 30% 70% 30%",
                animationDelay: `${Math.random() * 5}s`,
              }}
            />
          ))}
        </div>

        <div className="container relative z-10 px-4 md:px-6">
          <div className="grid items-center gap-6 lg:grid-cols-2 lg:gap-12">
            <div
              className={`flex items-center justify-center order-2 lg:order-1 ${
                isVisible.custom ? "animate-fade-in-left" : "opacity-0"
              }`}
            >
              <div className="relative">
                <div className="absolute -inset-4 rounded-xl bg-gradient-to-r from-fuchsia-400 to-yellow-400 opacity-30 blur-xl animate-pulse-slow" />
                <Image
                  alt="Custom Artwork Example"
                  className="relative rounded-xl shadow-2xl object-cover object-center sm:w-full transform hover:scale-[1.02] transition-all duration-300 shine canvas-texture"
                  height={500}
                  src="/image20.jpg"
                  width={400}
                />

                {/* Floating palette */}
                <div className="absolute -top-10 -right-10 color-palette">
                  <div className="w-10 h-10"></div>
                </div>
              </div>
            </div>
            <div
              className={`flex flex-col justify-center space-y-4 order-1 lg:order-2 ${
                isVisible.custom ? "animate-fade-in-right animate-delay-300" : "opacity-0"
              }`}
            >
              <Badge className="mb-2 w-fit bg-cyan-500 hover:bg-cyan-600 animate-pulse-slow">Personalized Art</Badge>
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl animate-text-shimmer brush-stroke">
                  Custom Artwork
                </h2>
                <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Commission a personalized painting or sketch that captures your vision perfectly.
                </p>
              </div>
              <ul className="grid gap-3 py-4">
                <li className="flex items-center gap-2 animate-fade-in-right animate-delay-400">
                  <div className="flex items-center justify-center w-8 h-8 text-white rounded-full shadow-lg bg-gradient-to-br from-fuchsia-500 to-yellow-500 animate-pulse-slow">
                    <CheckIcon className="w-4 h-4" />
                  </div>
                  <span className="font-medium">Portraits from your photos</span>
                </li>
                <li className="flex items-center gap-2 animate-fade-in-right animate-delay-500">
                  <div className="flex items-center justify-center w-8 h-8 text-white rounded-full shadow-lg bg-gradient-to-br from-yellow-500 to-cyan-500 animate-pulse-slow">
                    <CheckIcon className="w-4 h-4" />
                  </div>
                  <span className="font-medium">Custom landscapes and scenery</span>
                </li>
                <li className="flex items-center gap-2 animate-fade-in-right animate-delay-600">
                  <div className="flex items-center justify-center w-8 h-8 text-white rounded-full shadow-lg bg-gradient-to-br from-cyan-500 to-fuchsia-500 animate-pulse-slow">
                    <CheckIcon className="w-4 h-4" />
                  </div>
                  <span className="font-medium">Abstract art in your preferred colors</span>
                </li>
              </ul>
              <div className="flex flex-col gap-2 min-[400px]:flex-row pt-4 animate-fade-in-right animate-delay-700">
                <Link href="/custom-order">
                  <Button
                    size="lg"
                    className="gap-1.5 bg-cyan-600 hover:bg-cyan-700 shadow-lg hover:shadow-xl transition-all duration-300 group shine animate-paint-drip"
                  >
                    Start Your Commission
                    <Palette className="w-4 h-4 transition-transform group-hover:rotate-12 animate-bounce-slow" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

function CheckIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  )
}
