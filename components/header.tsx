"use client";

import Link from "next/link";
import { ShoppingCart, Menu, X } from "lucide-react";
import { useState } from "react";
import { useCart } from "@/lib/cart-context";

export const NAV_LINKS = [
  { href: "#singleorigincoffe", label: "SINGLE ORIGIN COFFES" },
  { href: "#blends", label: "BLENDS" },
  { href: "#coffe-accesories", label: "COFFE ACCESORIES" },
  { href: "order-history", label: "ORDERS HISTORY" },
  // { href: "cart", label: "MY CART" },
];

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { totalItems } = useCart();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="text-xl font-semibold tracking-tight">
          EAST BANGLE COFFEE ROASTERS
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium hover:text-black transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="md:hidden p-2 hover:bg-accent/10 rounded-md transition-colors"
            aria-label="Open menu"
          >
            <Menu className="h-6 w-6" />
          </button>

          <Link
            href="/cart"
            className="flex items-center gap-2 hover:text-accent transition-colors relative"
          >
            <ShoppingCart className="h-5 w-5" />
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-accent text-accent-foreground text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                {totalItems}
              </span>
            )}
            <span className="text-sm font-medium hidden sm:inline">Cart</span>
          </Link>
        </div>
      </div>

      {mobileMenuOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/50 z-50 md:hidden"
            onClick={() => setMobileMenuOpen(false)}
          />

          {/* Drawer */}
          <div className="fixed inset-y-0 right-0 w-full bg-background z-50 md:hidden">
            <div className="flex flex-col h-full">
              {/* Close button */}
              <div className="flex justify-end ">
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-3 hover:bg-accent/10 rounded-md transition-colors"
                  aria-label="Close menu"
                >
                  <X className="h-8 w-8" />
                </button>
              </div>

              {/* Navigation links */}
              <nav className="flex flex-col bg-white gap-2 px-6 py-4">
                {NAV_LINKS.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-2xl font-medium py-4 hover:text-accent transition-colors border-b border-border"
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
            </div>
          </div>
        </>
      )}
    </header>
  );
}
