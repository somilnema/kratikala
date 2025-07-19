"use client";
import { useCart } from "@/app/context/cart-context";
import { useLogin } from "@/app/context/login";
import Link from "next/link";
import { ShoppingBag, Heart, User, Search } from "lucide-react";
import { Button } from "@/components/ui/button";

function getInitials(name: string) {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase();
}

export default function MainNav() {
  const { cartItems } = useCart();
  const { isLoggedIn, user } = useLogin();
  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  return (
    <div className="flex gap-6 md:gap-10">
      <Link href="/" className="flex items-center space-x-2">
        <span className="inline-block font-bold text-transparent bg-clip-text bg-gradient-to-r from-rose-600 via-violet-600 to-teal-600">
          KRATI KALA
        </span>
      </Link>
      <nav className="hidden gap-6 md:flex">
        <Link
          href="/"
          className="flex relative items-center text-sm font-medium transition-colors text-muted-foreground hover:text-rose-600 group"
        >
          Home
          <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-rose-500 group-hover:w-full transition-all duration-300"></span>
        </Link>
        <Link
          href="/gallery"
          className="flex relative items-center text-sm font-medium transition-colors text-muted-foreground hover:text-violet-600 group"
        >
          Gallery
          <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-violet-500 group-hover:w-full transition-all duration-300"></span>
        </Link>
        <Link
          href="/custom-order"
          className="flex relative items-center text-sm font-medium transition-colors text-muted-foreground hover:text-teal-600 group"
        >
          Custom Orders
          <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-teal-500 group-hover:w-full transition-all duration-300"></span>
        </Link>
        <Link
          href="/about"
          className="flex relative items-center text-sm font-medium transition-colors text-muted-foreground hover:text-rose-600 group"
        >
          About
          <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-rose-500 group-hover:w-full transition-all duration-300"></span>
        </Link>
        <Link
          href="/contact"
          className="flex relative items-center text-sm font-medium transition-colors text-muted-foreground hover:text-violet-600 group"
        >
          Contact
          <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-violet-500 group-hover:w-full transition-all duration-300"></span>
        </Link>
        <Link href="/cart">
          <Button
            variant="ghost"
            size="icon"
            aria-label="Shopping cart"
            className="relative transition-colors hover:bg-rose-100 hover:text-rose-600"
          >
            <ShoppingBag className="w-5 h-5" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-rose-500 text-[10px] font-medium text-white">
                {cartCount}
              </span>
            )}
            <span className="sr-only">Shopping cart</span>
          </Button>
        </Link>
        <Link href="/likes">
          <Button
            variant="ghost"
            size="icon"
            aria-label="Wishlist"
            className="transition-colors hover:bg-violet-100 hover:text-violet-600"
          >
            <Heart className="w-5 h-5" />
            <span className="sr-only">Wishlist</span>
          </Button>
        </Link>
        <Link href="/auth">
          <Button
            variant="ghost"
            size="icon"
            aria-label="Account"
            className="flex justify-center items-center transition-colors hover:bg-teal-100 hover:text-teal-600"
          >
            {isLoggedIn && user && user.fullName ? (
              <span className="inline-flex justify-center items-center w-7 h-7 text-base font-bold text-white bg-teal-500 rounded-full">
                {getInitials(user.fullName)}
              </span>
            ) : (
              <User className="w-5 h-5" />
            )}
            <span className="sr-only">Account</span>
          </Button>
        </Link>
      </nav>
    </div>
  );
} 