"use client";

import { useId, useState, KeyboardEvent } from "react";
import type { ProductDetail } from "@/types";
import { ProductOverview } from "@/components/products/ProductOverview";
import { ProductSpecTable } from "@/components/products/ProductSpecifications";
import { ProductWarranty } from "@/components/products/ProductWarranty";
import { ProductDownloads } from "@/components/products/ProductDownloads";
import { ProductReviews } from "@/components/products/ProductReviews";
import { cn } from "@/lib/utils";

const tabs = [
  { id: "overview", label: "Overview" },
  { id: "specifications", label: "Specifications" },
  { id: "warranty", label: "Warranty" },
  { id: "downloads", label: "Downloads" },
  { id: "reviews", label: "Reviews" },
] as const;

type TabId = (typeof tabs)[number]["id"];

interface ProductInfoTabsProps {
  product: ProductDetail;
}

export function ProductInfoTabs({ product }: ProductInfoTabsProps) {
  const [active, setActive] = useState<TabId>("overview");
  const baseId = useId();

  function onKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    const index = tabs.findIndex((tab) => tab.id === active);
    if (index < 0) return;

    let next = index;
    if (event.key === "ArrowRight") {
      next = (index + 1) % tabs.length;
    } else if (event.key === "ArrowLeft") {
      next = (index - 1 + tabs.length) % tabs.length;
    } else if (event.key === "Home") {
      next = 0;
    } else if (event.key === "End") {
      next = tabs.length - 1;
    } else {
      return;
    }

    event.preventDefault();
    setActive(tabs[next].id);
    const button = document.getElementById(`${baseId}-${tabs[next].id}`);
    button?.focus();
  }

  return (
    <div>
      <div
        role="tablist"
        aria-label="Product information"
        onKeyDown={onKeyDown}
        className="flex gap-1 overflow-x-auto border-b border-brand-border [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {tabs.map((tab) => {
          const selected = active === tab.id;
          return (
            <button
              key={tab.id}
              id={`${baseId}-${tab.id}`}
              type="button"
              role="tab"
              aria-selected={selected}
              aria-controls={`${baseId}-panel-${tab.id}`}
              tabIndex={selected ? 0 : -1}
              onClick={() => setActive(tab.id)}
              className={cn(
                "shrink-0 border-b-2 px-3 py-3 text-sm font-semibold whitespace-nowrap transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-green focus-visible:ring-offset-2 sm:px-4",
                selected
                  ? "border-brand-green text-brand-green"
                  : "border-transparent text-brand-muted hover:text-brand-ink",
              )}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      <div className="pt-8">
        {tabs.map((tab) => {
          const selected = active === tab.id;
          return (
            <div
              key={tab.id}
              id={`${baseId}-panel-${tab.id}`}
              role="tabpanel"
              aria-labelledby={`${baseId}-${tab.id}`}
              hidden={!selected}
            >
              {selected && tab.id === "overview" && (
                <ProductOverview product={product} />
              )}
              {selected && tab.id === "specifications" && (
                <ProductSpecTable
                  rows={product.specifications}
                  isDemo={product.isDemoContent}
                />
              )}
              {selected && tab.id === "warranty" && (
                <ProductWarranty
                  items={product.warranty}
                  isDemo={product.isDemoContent}
                />
              )}
              {selected && tab.id === "downloads" && (
                <ProductDownloads documents={product.documents} />
              )}
              {selected && tab.id === "reviews" && (
                <ProductReviews reviews={product.reviews} />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
