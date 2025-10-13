import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import "./globals.css"
import { CartProvider } from "@/lib/cart-context"
import { Header } from "@/components/header"
import { Suspense } from "react"
import { Smooch_Sans } from "next/font/google"

export const metadata: Metadata = {
  title: "The Coffee Store",
  description: "Your one-stop shop for premium coffee beans and accessories.",
  generator: "v0.app",
}

const smoochSans = Smooch_Sans({
  weight: "400",
  subsets: ["latin"],
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable} ${smoochSans.className}`}>
        <Suspense fallback={null}>
          <CartProvider>
            {/* <Header /> */}
            {children}
          </CartProvider>
        </Suspense>
      </body>
    </html>
  )
}
