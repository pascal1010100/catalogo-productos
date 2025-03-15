"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { CartButton } from "@/components/cart/cart-button"

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/" className="font-bold text-xl">
            Mi Catálogo
          </Link>
        </div>

        <nav className="hidden md:flex items-center gap-6">
          <Link href="/" className="text-sm font-medium transition-colors hover:text-primary">
            Inicio
          </Link>
          <Link href="#brudden" className="text-sm font-medium transition-colors hover:text-primary">
            Maquinaria Brudden
          </Link>
          <Link href="#agroforesta" className="text-sm font-medium transition-colors hover:text-primary">
            Agroforesta
          </Link>
          <Link href="#contacto" className="text-sm font-medium transition-colors hover:text-primary">
            Contacto
          </Link>
        </nav>

        <div className="flex items-center gap-2">
          <CartButton />
          <Button variant="ghost" size="icon" className="md:hidden" onClick={toggleMenu}>
            <Menu className="h-6 w-6" />
            <span className="sr-only">Toggle menu</span>
          </Button>
        </div>

        {isMenuOpen && (
          <div className="fixed inset-0 z-50 bg-background md:hidden">
            <div className="container flex h-16 items-center justify-between">
              <div className="flex items-center gap-2">
                <Link href="/" className="font-bold text-xl">
                  Mi Catálogo
                </Link>
              </div>
              <Button variant="ghost" size="icon" onClick={toggleMenu}>
                <X className="h-6 w-6" />
                <span className="sr-only">Close menu</span>
              </Button>
            </div>
            <nav className="container grid gap-6 py-6">
              <Link href="/" className="text-lg font-medium transition-colors hover:text-primary" onClick={toggleMenu}>
                Inicio
              </Link>
              <Link
                href="#brudden"
                className="text-lg font-medium transition-colors hover:text-primary"
                onClick={toggleMenu}
              >
                Maquinaria Brudden
              </Link>
              <Link
                href="#agroforesta"
                className="text-lg font-medium transition-colors hover:text-primary"
                onClick={toggleMenu}
              >
                Agroforesta
              </Link>
              <Link
                href="#contacto"
                className="text-lg font-medium transition-colors hover:text-primary"
                onClick={toggleMenu}
              >
                Contacto
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}

