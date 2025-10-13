"use client";

import { use } from "react";
import { notFound } from "next/navigation";
import { ImageGallery } from "@/components/image-gallery";
import { ProductInfo } from "@/components/product-info";
import { ProductCard } from "@/components/product-card";
import { IProduct, useProducts } from "@/hook/useProducts";

interface ProductPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default function ProductPage({ params }: ProductPageProps) {
  const { slug } = use(params);
  const { getProductBySlug, getRecommendedProducts, loading, error } = useProducts();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">Loading product...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center text-red-500">Error: {error}</div>
      </div>
    );
  }

  const product = getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const recommendedProducts = getRecommendedProducts(product.id);

  return (
    <div className="min-h-screen">
      {/* Product Details Section */}
      <section className="container mx-auto px-4 py-8 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Image Gallery */}
          <div>
            <ImageGallery images={product.images ? product.images : []} productName={product.name} />
          </div>
          {/* Product Info */}
          <div>
            <ProductInfo product={product} />
          </div>
        </div>
      </section>

      {/* Recommended Products Section */}
      <section className="container mx-auto px-4 py-16 border-t">
        <h2 className="text-2xl md:text-3xl font-bold mb-8">
          You May Also Like
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {recommendedProducts.map((product: IProduct) => (
            <ProductCard
              key={product.id}
              id={Number(product.id)}
              name={product.name}
              slug={product.slug}
              subTitle={product.subTitle}
              price={product.price}
              image={product.image}
            />
          ))}
        </div>
      </section>
    </div>
  );
}