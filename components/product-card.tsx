"use client";
import React, { useMemo } from "react";
import { useCart } from "@/lib/cart-context";
import { ShoppingCart, Check, X } from "lucide-react";
import Link from "next/link";

interface ProductCardProps {
  id: number;
  name: string;
  slug: string;
  price: number;
  image: string;
  type: string;
  subTitle?: string;
  variant?: string;
  color?: string;
}

export function ProductCard({
  id,
  name,
  slug,
  price,
  subTitle,
  type,
  image,
  variant,
  color,
}: ProductCardProps) {
  const { addToCart, removeFromCart, items } = useCart();

  // Check if this product is in the cart
  const isInCart = useMemo(() => {
    return items.some(
      (item) =>
        item.id === id && item.variant === variant && item.color === color
    );
  }, [items, id, variant, color]);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!isInCart) {
      addToCart({ id: Number(id), name, price, image, variant, type, color });
    } else {
      removeFromCart(id);
    }
  };

  return (
    <Link href={`/products/${slug}`}>
      <div className="w-full max-w-sm mx-auto">
        <div className="bg-white rounded-lg overflow-hidden">
          {/* Product Name */}
          <p className="text-center text-sm font-semibold tracking-wide text-gray-800 uppercase mb-px">
            {name}
          </p>
          {/* Product Image Container */}
          <div className="relative aspect-square rounded-lg overflow-hidden">
            <img
              src={image}
              alt={name}
              className="w-full transition-transform duration-500"
            />
            {/* ✅ Subtitle — Top Left Corner */}
            {subTitle && (
              <div className="absolute top-4 left-4 bg-black/70 text-white text-xs font-semibold px-3 py-1 rounded-md uppercase tracking-wide">
                {subTitle}
              </div>
            )}
            {/* Add to Cart Button — Top Right */}
            <button
              onClick={handleAddToCart}
              className={`absolute top-12 right-12 ${
                isInCart ? "bg-[#A3B18A]" : "bg-[#D9E4DD] hover:bg-[#C0C8B6]"
              } text-black font-semibold py-2 px-4 rounded-lg flex items-center gap-2 shadow-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#A3B18A]`}
            >
              {isInCart ? (
                <Check className="h-4 w-4 text-white" />
              ) : (
                <ShoppingCart className="h-4 w-4" />
              )}
            </button>
            {/* Price Tag — Bottom Right */}
            <div className="absolute bottom-4 right-4">
              <div className="relative inline-flex items-center bg-[#555B46] text-white font-bold text-sm px-4 py-2 pr-4 rounded-r-md">
                <span className="z-10">BDT {price}</span>
                {/* Left triangle */}
                <div
                  className="absolute -left-[14px] top-0 bottom-0 w-0 h-0 
                border-t-[25px] border-b-[18px] border-r-[14px] 
                border-t-transparent border-b-transparent border-r-[#555B46]"
                ></div>
                {/* Hole circle */}
                <span className="absolute -left-[6px] top-1/2 -translate-y-1/2 w-2 h-2 bg-[#999] rounded-full z-20"></span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}