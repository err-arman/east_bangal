"use client";
import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";

export const NAV_LINKS = [
  { href: "#singleorigincoffe", label: "SINGLE ORIGIN COFFES" },
  { href: "#blends", label: "BLENDS" },
  { href: "#coffe-accesories", label: "COFFE ACCESORIES" },
  { href: "cart", label: "MY CART" },
];

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="w-full z-50">
      {/* Desktop Navbar */}
      <div className="hidden md:flex ml-0 lg:ml-96 justify-start gap-3 bg-transparent">
        {NAV_LINKS.map((link, idx) => (
          <Link
            key={idx}
            href={link.href}
            className={`uppercase font-extrabold ttracking-wider px-1 py-0  rounded-sm transition-all duration-200
              ${
                link.label === "MY CART"
                  ? "ml-7 bg-[#1A00AB] text-white hover:bg-[#1A00AB]"
                  : "bg-cyan-500 text-white hover:bg-cyan-600"
              }`}
          >
            {link.label}
          </Link>
        ))}
      </div>

      {/* Mobile Navbar */}
      <div className="flex md:hidden flex-wrap items-center justify-start gap-4 px-6  bg-transparent">
        {NAV_LINKS.map((link, idx) => (
          <Link
            key={idx}
            href={link.href}
            className={`uppercase font-bold tracking-wide text-[12px] px-1 rounded-sm transition-all duration-200
              ${
                link.label === "MY CART"
                  ? "bg-[#1A00AB] text-white hover:bg-[#1A00AB]"
                  : "bg-cyan-500 text-white hover:bg-cyan-600"
              }`}
          >
            {link.label}
          </Link>
        ))}
      </div>
    </nav>
  );
}
