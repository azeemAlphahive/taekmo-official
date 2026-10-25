"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Product } from "@/types";
import { cn } from "@/lib/utils";

interface ProductCardProps {
  product: Product;
  index?: number;
  className?: string;
}

function PriceDisplay({ label }: { label: string }) {
  const fromMatch = label.match(/^From\s+(.+)$/i);
  if (fromMatch) {
    return (
      <p className="text-sm text-brand-ink">
        <span className="text-brand-muted">From </span>
        <span className="font-semibold text-brand-green">{fromMatch[1]}</span>
      </p>
    );
  }

  return (
    <p className="text-sm font-semibold text-brand-green">{label}</p>
  );
}

export function ProductCard({ product, className }: ProductCardProps) {
  return (
    <article
      className={cn(
        "group relative flex h-full flex-col overflow-hidden rounded-lg border border-brand-border bg-white shadow-sm",
        "will-change-transform transition-[transform,box-shadow] duration-[1800ms] [transition-timing-function:cubic-bezier(0.33,1,0.32,1)]",
        "motion-safe:hover:-translate-y-5 motion-safe:hover:shadow-[0_32px_56px_-18px_rgba(4,16,10,0.38)]",
        "motion-safe:focus-within:-translate-y-5 motion-safe:focus-within:shadow-[0_32px_56px_-18px_rgba(4,16,10,0.38)]",
        className,
      )}
    >
      <Link
        href={product.href}
        className="flex h-full flex-col focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-green focus-visible:ring-inset"
      >
        <div className="relative aspect-[4/3] overflow-hidden bg-[#f3f5f4]">
          <Image
            src={product.image}
            alt={product.imageAlt}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className="object-contain p-3 transition-transform duration-[1800ms] [transition-timing-function:cubic-bezier(0.33,1,0.32,1)] motion-safe:group-hover:scale-[1.04]"
          />
        </div>
        <div className="flex flex-1 flex-col p-4">
          <span className="inline-flex w-fit rounded-full bg-[#eef1ef] px-2.5 py-0.5 text-[11px] font-medium text-brand-muted">
            {product.categoryLabel}
          </span>
          <h3 className="mt-2.5 text-sm font-bold leading-snug text-brand-ink sm:text-[15px]">
            {product.name}
          </h3>
          {product.wattLabel ? (
            <p className="mt-1 text-sm font-bold text-brand-ink sm:text-[15px]">
              {product.wattLabel}
            </p>
          ) : null}
          <p className="mt-1.5 line-clamp-2 flex-1 text-xs leading-relaxed text-[#7a8f9c]">
            {product.featureLine ?? product.description}
          </p>
          <div className="mt-3 flex items-end justify-between gap-2">
            <PriceDisplay label={product.priceLabel} />
            <span
              className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-green text-white transition-transform duration-[1800ms] [transition-timing-function:cubic-bezier(0.33,1,0.32,1)] motion-safe:group-hover:translate-x-0.5"
              aria-hidden
            >
              <ArrowUpRight className="h-4 w-4" />
            </span>
          </div>
        </div>
      </Link>
    </article>
  );
}
