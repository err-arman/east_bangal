"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { useCart } from "@/lib/cart-context"
import { ShoppingCart, Minus, Plus } from "lucide-react"
import { useRouter } from "next/navigation"
import { IProduct } from "@/hook/useProducts"

interface ProductInfoProps {
  product: IProduct
}

export function ProductInfo({ product }: ProductInfoProps) {
  const router = useRouter()
  const { addToCart } = useCart()
  const [quantity, setQuantity] = useState(1)
  const [selectedVariant, setSelectedVariant] = useState(product.variants?.[0] || "None")
  const [selectedColor, setSelectedColor] = useState(product.colors?.[0] || "None")

  const decreaseQuantity = () => {
    if (quantity > 1) setQuantity(quantity - 1)
  }

  const increaseQuantity = () => {
    setQuantity(quantity + 1)
  }

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart({
        id: Number(product.id),
        name: product.name,
        price: product.price,
        image: product.image,
      })
    }
  }

  const handleBuyNow = () => {
    handleAddToCart()
    router.push("/cart")
  }

  return (
    <div className="space-y-6">
      {/* Product Name and Price */}
      <div>
        <h1 className="text-3xl md:text-4xl font-bold mb-2">{product.name}</h1>
        <p className="text-3xl font-semibold text-foreground">{product.price.toFixed(2)}</p>
      </div>

      {/* Description */}
      <p className="text-muted-foreground leading-relaxed">{product.description}</p>

      {/* Variant Selector */}
      {product.variants && product.variants.length > 0 && (
        <div>
          <label className="block text-sm font-medium mb-2">Variant</label>
          <div className="flex flex-wrap gap-2">
            {product.variants.map((variant) => (
              <Button
                key={variant}
                variant={selectedVariant === variant ? "default" : "outline"}
                onClick={() => setSelectedVariant(variant)}
                className="min-w-[80px]"
              >
                {variant}
              </Button>
            ))}
          </div>
        </div>
      )}

      {/* Color Selector */}
      {product.colors && product.colors.length > 0 && (
        <div>
          <label className="block text-sm font-medium mb-2">Color</label>
          <div className="flex flex-wrap gap-2">
            {product.colors.map((color) => (
              <Button
                key={color}
                variant={selectedColor === color ? "default" : "outline"}
                onClick={() => setSelectedColor(color)}
                className="min-w-[100px]"
              >
                {color}
              </Button>
            ))}
          </div>
        </div>
      )}

      {/* Quantity Selector */}
      <div>
        <label className="block text-sm font-medium mb-2">Quantity</label>
        <div className="flex items-center gap-3">
          <Button variant="outline" size="icon" onClick={decreaseQuantity} disabled={quantity <= 1}>
            <Minus className="h-4 w-4" />
          </Button>
          <span className="text-lg font-medium w-12 text-center">{quantity}</span>
          <Button variant="outline" size="icon" onClick={increaseQuantity}>
            <Plus className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-3 pt-4">
        <Button onClick={handleAddToCart} className="flex-1 gap-2" size="lg">
          <ShoppingCart className="h-5 w-5" />
          Add to Cart
        </Button>
        <Button onClick={handleBuyNow} variant="secondary" className="flex-1" size="lg">
          Buy Now
        </Button>
      </div>
    </div>
  )
}
