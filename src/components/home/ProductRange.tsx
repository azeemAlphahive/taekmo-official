"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ProductCard } from "@/components/products/ProductCard";
import { SectionReveal } from "@/components/ui/SectionReveal";
import { homeFeaturedProducts } from "@/data/products";

export function ProductRange() {
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
                High-reliability N-type modules — from lower to higher watt
                class.
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
        </SectionReveal>

        <SectionReveal delay={0.08} className="mt-8">
          <div className="grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-4 lg:gap-6">
            {homeFeaturedProducts.map((product, index) => (
              <ProductCard key={product.id} product={product} index={index} />
            ))}
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}
