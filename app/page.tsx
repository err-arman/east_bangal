import { Hero } from "@/components/hero"
import { ProductGrid } from "@/components/product-grid"

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <ProductGrid />
    </main>
  )
}
