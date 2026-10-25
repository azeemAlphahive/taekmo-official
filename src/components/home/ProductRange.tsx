"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { CategoryFilters } from "@/components/products/CategoryFilters";
import { ProductCard } from "@/components/products/ProductCard";
import { SectionReveal } from "@/components/ui/SectionReveal";
import { products } from "@/data/products";
import type { ProductCategory } from "@/types";

export function ProductRange() {
  const [category, setCategory] = useState<ProductCategory>("all");

  const filtered = useMemo(() => {
    const list =
      category === "all"
        ? products
        : products.filter((p) => p.category === category);
    // Home: first row only (4 cards on desktop grid)
    return list.slice(0, 4);
  }, [category]);

  return (
    <section
      id="products"
      className="bg-white py-14 sm:py-16 lg:py-20"
      aria-labelledby="products-heading"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionReveal>
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2
                id="products-heading"
                className="text-2xl font-bold tracking-tight text-brand-ink sm:text-3xl"
              >
                Our Product Range
              </h2>
              <p className="mt-2 text-sm text-brand-muted sm:text-[15px]">
                Full Talesun BIPRO & HYPRO lineup — BloombergNEF Tier 1.
              </p>
            </div>
            <Link
              href="/products#all-products"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-green transition-colors hover:text-brand-green-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-green"
            >
              View All Products
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </div>

          <div className="mt-6">
            <CategoryFilters active={category} onChange={setCategory} />
          </div>
        </SectionReveal>

        <SectionReveal delay={0.08} className="mt-8">
          {filtered.length === 0 ? (
            <p className="py-12 text-center text-sm text-brand-muted">
              No products in this category yet.
            </p>
          ) : (
            <div className="grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-4 lg:gap-6">
              {filtered.map((product, index) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  index={index}
                />
              ))}
            </div>
          )}
          <p className="mt-4 text-[11px] text-brand-muted">
            Catalogue mirrors Talesun official BIPRO / HYPRO datasheet ranges.
            Confirm final values with your TAEKMO quote.
          </p>
        </SectionReveal>
      </div>
    </section>
  );
}
