"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/lib/cart-context";
import { ShoppingCart, Minus, Plus, Check } from "lucide-react";
import { useRouter } from "next/navigation";
import { IProduct } from "@/hook/useProducts";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface ProductInfoProps {
  product: IProduct;
}

export function ProductInfo({ product }: ProductInfoProps) {
  const router = useRouter();
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [selectedVariant, setSelectedVariant] = useState(
    product.variants?.[0] || "None"
  );
  const [selectedColor, setSelectedColor] = useState(
    product.colors?.[0] || "None"
  );
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const decreaseQuantity = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  const handleAddToCart = async () => {
    setIsLoading(true);

    try {
      // Simulate a small delay for better UX (optional)
      await new Promise((resolve) => setTimeout(resolve, 500));
      console.log('selectedVarient', selectedVariant)
      console.log('selected color', selectedColor)
      for (let i = 0; i < quantity; i++) {
        addToCart({
          id: Number(product.id),
          name: product.name,
          price: product.price,
          image: product.image,
          variant: selectedVariant !== "None" ? selectedVariant : "",
          color: selectedColor !== "None" ? selectedColor : "",
        });
      }

      // Show success modal
      setShowSuccessModal(true);
    } catch (error) {
      console.error("Error adding to cart:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleBuyNow = async () => {
    setIsLoading(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 500));

      for (let i = 0; i < quantity; i++) {
        addToCart({
          id: Number(product.id),
          name: product.name,
          price: product.price,
          image: product.image,
          variant: selectedVariant !== "None" ? selectedVariant : undefined,
          color: selectedColor !== "None" ? selectedColor : undefined,
        });
      }

      router.push("/cart");
    } catch (error) {
      console.error("Error adding to cart:", error);
      setIsLoading(false);
    }
  };

  const handleContinueShopping = () => {
    setShowSuccessModal(false);
    setQuantity(1); // Reset quantity
  };

  const handleGoToCart = () => {
    setShowSuccessModal(false);
    router.push("/cart");
  };

  return (
    <>
      <div className="space-y-6">
        {/* Product Name and Price */}
        <div>
          <h1 className="text-3xl md:text-4xl font-bold mb-2">
            {product.name}
          </h1>
          <p className="text-3xl font-semibold text-foreground">
            ${product.price.toFixed(2)}
          </p>
        </div>

        {/* Description */}
        <p className="text-muted-foreground leading-relaxed">
          {product.description}
        </p>

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
                  disabled={isLoading}
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
                  disabled={isLoading}
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
            <Button
              variant="outline"
              size="icon"
              onClick={decreaseQuantity}
              disabled={quantity <= 1 || isLoading}
            >
              <Minus className="h-4 w-4" />
            </Button>
            <span className="text-lg font-medium w-12 text-center">
              {quantity}
            </span>
            <Button
              variant="outline"
              size="icon"
              onClick={increaseQuantity}
              disabled={isLoading}
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 pt-4">
          <Button
            onClick={handleAddToCart}
            className="flex-1 gap-2 cursor-pointer"
            size="lg"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <div className="h-5 w-5 animate-spin rounded-full border-2 border-current border-t-transparent" />
                Adding...
              </>
            ) : (
              <>
                <ShoppingCart className="h-5 w-5" />
                Add to Cart
              </>
            )}
          </Button>
          <Button
            onClick={handleBuyNow}
            variant="secondary"
            className="flex-1 cursor-pointer"
            size="lg"
            disabled={isLoading}
          >
            {isLoading ? "Processing..." : "Buy Now"}
          </Button>
        </div>
      </div>

      {/* Success Modal */}
      <Dialog open={showSuccessModal} onOpenChange={setShowSuccessModal}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
              <Check className="h-6 w-6 text-green-600" />
            </div>
            <DialogTitle className="text-center text-xl">
              Added to Cart!
            </DialogTitle>
            <DialogDescription className="text-center">
              {quantity} {quantity === 1 ? "item" : "items"} of {product.name}{" "}
              {selectedVariant !== "None" && ` (${selectedVariant})`}
              {selectedColor !== "None" && ` - ${selectedColor}`}
              {quantity === 1 ? "has" : "have"} been added to your cart.
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col gap-2 mt-4">
            <Button onClick={handleGoToCart} size="lg">
              Go to Cart
            </Button>
            <Button
              onClick={handleContinueShopping}
              variant="outline"
              size="lg"
            >
              Continue Shopping
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
