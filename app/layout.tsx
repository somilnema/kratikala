import type React from "react"
import { Inter } from "next/font/google"
import Link from "next/link"
import { ShoppingBag, Menu, Search, User, Heart } from "lucide-react"
import { ThemeProvider } from "@/components/theme-provider"
import { Button } from "@/components/ui/button"
import { CartProvider } from "@/app/context/cart-context"
import { LikesProvider } from "@/app/context/likes-context"
import { useCart } from "@/app/context/cart-context";
import "./globals.css"
import MainNav from "@/components/MainNav";
import { LoginProvider } from "@/app/context/login";

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "kratikala",
  description: "Discover and purchase original paintings and custom artwork",
  generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          <CartProvider>
            <LikesProvider>
              <LoginProvider>
                <div className="flex relative flex-col min-h-screen">
                  <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 shadow-sm">
                    <div className="container flex items-center h-16">
                      <MainNav />
                      <div className="flex flex-1 justify-end items-center space-x-4">
                        <nav className="flex items-center space-x-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            aria-label="Search"
                            className="transition-colors hover:bg-rose-100 hover:text-rose-600"
                          >
                            <Search className="w-5 h-5" />
                            <span className="sr-only">Search</span>
                          </Button>
                        </nav>
                      </div>
                    </div>
                  </header>
                  <main className="flex-1">{children}</main>
                  <footer className="py-12 bg-gradient-to-b from-white to-rose-50 border-t">
                    <div className="container grid gap-8 md:grid-cols-2 lg:grid-cols-4">
                      <div>
                        <h3 className="mb-4 text-lg font-semibold">ART GALLERY</h3>
                        <p className="mb-4 text-sm text-muted-foreground">
                          Bringing unique artwork to art lovers worldwide. Each piece is handcrafted with passion and
                          creativity.
                        </p>
                        <div className="flex space-x-4">
                          <a href="https://www.instagram.com/krati_kreates?igsh=cHhod283Z214YTIx" target="_blank" rel="noopener noreferrer" className="transition-colors text-muted-foreground hover:text-rose-500">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="20"
                              height="20"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="lucide lucide-instagram"
                            >
                              <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                              <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                            </svg>
                          </a>
                          <a href="https://m.youtube.com/@kratikreates2305?fbclid=PAY2xjawJidthleHRuA2FlbQIxMAABp_VLxgd8d_oQqeqr1TYXgC9dNqh06VAVC8kVxm5VmfkvhTklwKkNZS88g0oL_aem_6Af4CFfkwX9zY5oVIpw0lw" target="_blank" rel="noopener noreferrer" className="transition-colors text-muted-foreground hover:text-red-500">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="20"
                              height="20"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="lucide lucide-youtube"
                            >
                              <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-2C18.88 4 12 4 12 4s-6.88 0-8.59.42a2.78 2.78 0 0 0-1.95 2A29.94 29.94 0 0 0 1 12a29.94 29.94 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 2C5.12 20 12 20 12 20s6.88 0 8.59-.42a2.78 2.78 0 0 0 1.95-2A29.94 29.94 0 0 0 23 12a29.94 29.94 0 0 0-.46-5.58z" />
                              <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" />
                            </svg>
                          </a>
                        </div>
                      </div>
                      <div>
                        <h3 className="mb-4 text-lg font-semibold">Quick Links</h3>
                        <ul className="space-y-2 text-sm">
                          <li>
                            <Link href="/" className="transition-colors text-muted-foreground hover:text-rose-500">
                              Home
                            </Link>
                          </li>
                          <li>
                            <Link href="/gallery" className="transition-colors text-muted-foreground hover:text-rose-500">
                              Gallery
                            </Link>
                          </li>
                          <li>
                            <Link
                              href="/custom-order"
                              className="transition-colors text-muted-foreground hover:text-rose-500"
                            >
                              Custom Orders
                            </Link>
                          </li>
                          <li>
                            <Link href="/about" className="transition-colors text-muted-foreground hover:text-rose-500">
                              About
                            </Link>
                          </li>
                        </ul>
                      </div>
                      <div>
                        <h3 className="mb-4 text-lg font-semibold">Customer Service</h3>
                        <ul className="space-y-2 text-sm">
                          <li>
                            <Link href="/contact" className="transition-colors text-muted-foreground hover:text-violet-500">
                              Contact Us
                            </Link>
                          </li>
                          <li>
                            <Link href="/shipping" className="transition-colors text-muted-foreground hover:text-violet-500">
                              Shipping Policy
                            </Link>
                          </li>
                          <li>
                            <Link href="/returns" className="transition-colors text-muted-foreground hover:text-violet-500">
                              Returns & Refunds
                            </Link>
                          </li>
                          <li>
                            <Link href="/faq" className="transition-colors text-muted-foreground hover:text-violet-500">
                              FAQ
                            </Link>
                          </li>
                        </ul>
                      </div>
                      <div>
                        <h3 className="mb-4 text-lg font-semibold">Newsletter</h3>
                        <p className="mb-4 text-sm text-muted-foreground">
                          Subscribe to get updates on new artwork and exclusive offers.
                        </p>
                        <form className="flex gap-2">
                          <input
                            type="email"
                            placeholder="Your email"
                            className="flex px-3 py-2 w-full h-10 text-sm rounded-md border border-input bg-background ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                          />
                          <Button className="bg-rose-500 hover:bg-rose-600">Subscribe</Button>
                        </form>
                      </div>
                    </div>
                    <div className="container pt-8 mt-8 border-t">
                      <p className="text-sm text-center text-muted-foreground">
                        © 2024 Art Gallery & Shop. All rights reserved.
                      </p>
                    </div>
                  </footer>
                </div>
              </LoginProvider>
            </LikesProvider>
          </CartProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}