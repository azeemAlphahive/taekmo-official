"use client";

import { useMemo, useState } from "react";
import { CategoryFilters } from "@/components/products/CategoryFilters";
import { ProductCard } from "@/components/products/ProductCard";
import { products } from "@/data/products";
import type { ProductCategory } from "@/types";

export function ProductsCatalogue() {
  const [category, setCategory] = useState<ProductCategory>("all");

  const filtered = useMemo(() => {
    if (category === "all") return products;
    return products.filter((p) => p.category === category);
  }, [category]);

  return (
    <section
      id="all-products"
      className="scroll-mt-24 bg-white py-12 sm:py-16"
      aria-labelledby="catalogue-heading"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2
              id="catalogue-heading"
              className="text-2xl font-bold tracking-tight text-brand-ink sm:text-3xl"
            >
              All Products
            </h2>
            <p className="mt-2 text-sm text-brand-muted">
              TAEKMO N-type modules — sorted from lower to higher watt class.
            </p>
          </div>
          <CategoryFilters active={category} onChange={setCategory} />
        </div>

        <div className="mt-8 grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-3 xl:grid-cols-4 lg:gap-6">
          {filtered.map((product, index) => (
            <ProductCard
              key={product.id}
              product={product}
              index={index}
            />
          ))}
        </div>

        {filtered.length === 0 && (
          <p className="py-16 text-center text-sm text-brand-muted">
            No products in this category yet.
          </p>
        )}

        <p className="mt-6 text-[11px] text-brand-muted">
          Confirm exact datasheet values with your TAEKMO quote.
        </p>
      </div>
    </section>
  );
}
