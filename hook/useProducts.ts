"use client";

import { useState, useEffect } from "react";

export interface IProduct {
  id: string;
  name: string;
  subTitle?: string;
  description: string;  
  slug: string;
  category?: string;
  price: number;
  image: string;
  images?: string[];
  weight?: string;
  variants?: string[];
  stock?: number;
  colors?: string[];
  is_available?: boolean;
  blends?: boolean;
}

async function fetchSheetData(): Promise<IProduct[]> {
  try {
    const response = await fetch(
      `https://sheets.googleapis.com/v4/spreadsheets/1wrV0Q50a1SNOqYVEG69AAmEgSYTDyk57aLkTZHlr5IM/values/Products!A1:P?key=AIzaSyDDMVo4pbfVILkWe3hxQt0mI94bSt-9kZI`
    );

    //     const response = await fetch(
    //   `https://sheets.googleapis.com/v4/spreadsheets/${process.env.NEXT_PUBLIC_SPREADSHEET_ID}/values/${process.env.NEXT_PUBLIC_RANGE}?key=${process.env.NEXT_PUBLIC_SPREADSHEET_API_KEY}`
    // );


    if (!response.ok) throw new Error("Failed to fetch data");

    const result = await response.json();
    const rows = result.values || [];

    if (rows.length < 2) {
      console.warn("No product data found");
      return [];
    }

    const headers = rows[0];
    const products = rows.slice(1).map((row: any) => {
      const product: Record<string, any> = {};
      headers.forEach((key: string, index: number) => {
        let value = row[index] ?? "";

        // Parse numeric fields
        if (["price", "stock"].includes(key)) {
          value = value ? Number(value) : 0;
        }

        // Parse boolean fields
        if (["is_available", "blends"].includes(key)) {
          value = value === "TRUE" || value === "true";
        }

        // Parse comma-separated fields into arrays
        if (["variants", "colors", "images"].includes(key)) {
          value = value
            ? value
              .split(",")
              .map((v: string) => v.trim())
              .filter(Boolean)
            : [];
        }

        product[key] = value;
      });

      return product as IProduct;
    });

    console.log("✅ Products:", products);
    return products;
  } catch (error) {
    console.error("❌ Error fetching sheet data:", error);
    return [];
  }
}

export function useProducts() {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchSheetData();
        setProducts(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load products");
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  // Filter products by category
  const singleOriginProducts = products.filter(product => !product.blends);
  const blendProducts = products.filter(product => product.blends);

  const getProductBySlug = (slug: string): IProduct | undefined => {
    return products.find(product => product.slug === slug);
  };

  const getRecommendedProducts = (productId: string, limit: number = 4): IProduct[] => {
    const filtered = products.filter(product => product.id !== productId);

    // Shuffle array and return limited items
    const shuffled = filtered.sort(() => Math.random() - 0.5);
    return shuffled.slice(0, limit);
  };


  return {
    products,
    singleOriginProducts,
    blendProducts,
    getProductBySlug,
    getRecommendedProducts,
    loading,
    error,
  };
}