"use client";
import { useProducts } from "@/hook/useProducts";
import { ProductCard } from "./product-card";

export function ProductGrid() {
  const { singleOriginProducts, blendProducts, loading, error } = useProducts();

  // Loading skeleton component
  const ProductSkeleton = () => (
    <div className="bg-white rounded-lg shadow-md overflow-hidden animate-pulse">
      <div className="bg-gray-300 h-64 w-full"></div>
      <div className="p-4 space-y-3">
        <div className="h-4 bg-gray-300 rounded w-3/4"></div>
        <div className="h-3 bg-gray-200 rounded w-1/2"></div>
        <div className="h-4 bg-gray-300 rounded w-1/4"></div>
      </div>
    </div>
  );

  // Error state
  if (error) {
    return (
      <section className="container mx-auto px-4 py-12">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
          <h3 className="text-xl font-semibold text-red-800 mb-2">
            Unable to Load Products
          </h3>
          <p className="text-red-600">{error}</p>
        </div>
      </section>
    );
  }

  return (
    <section className="container mx-auto">
      {/* Single Origin Coffees Section */}
      <h2
        className="text-3xl md:text-4xl font-bold mb-12 mt-10 text-center font-bebas"
        id="singleorigincoffe"
      >
        SINGLE ORIGIN COFFEES
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {loading ? (
          // Show 4 skeleton cards while loading
          Array.from({ length: 4 }).map((_, i) => (
            <ProductSkeleton key={`single-skeleton-${i}`} />
          ))
        ) : singleOriginProducts.length === 0 ? (
          <div className="col-span-full text-center py-12 text-gray-500">
            No single origin coffees available at the moment.
          </div>
        ) : (
          singleOriginProducts.map((product) => (
            <ProductCard
              key={product.id}
              subTitle={product.subTitle}
              id={Number(product.id)}
              type="Whole"
              name={product.name}
              slug={product.slug}
              price={product.price}
              image={product.image ? product.image : "/images/2.png"}
              variant={product?.variants?.length ? product?.variants[0] : ""}
              color={product?.colors?.length ? product?.colors[0] : ""}
            />
          ))
        )}
      </div>

      {/* Blends Section */}
      <h2
        className="text-3xl md:text-4xl font-bold mb-12 mt-16 text-center font-bebas"
        id="blends"
      >
        BLENDS
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {loading ? (
          // Show 4 skeleton cards while loading
          Array.from({ length: 4 }).map((_, i) => (
            <ProductSkeleton key={`blend-skeleton-${i}`} />
          ))
        ) : blendProducts.length === 0 ? (
          <div className="col-span-full text-center py-12 text-gray-500">
            No blend coffees available at the moment.
          </div>
        ) : (
          blendProducts.map((product) => (
            <ProductCard
              key={product.id}
              id={Number(product.id)}
              type="Whole"
              name={product.name}
              subTitle={product.subTitle}
              slug={product.slug}
              price={product.price}
              image={product.image ? product.image : "/images/2.png"}
              variant={product?.variants?.length ? product?.variants[0] : ""}
              color={product?.colors?.length ? product?.colors[0] : ""}
            />
          ))
        )}
      </div>
    </section>
  );
}
