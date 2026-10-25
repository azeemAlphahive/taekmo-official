"use client";

import type { ProductCategory } from "@/types";
import { productCategories } from "@/data/products";
import { cn } from "@/lib/utils";

interface CategoryFiltersProps {
  active: ProductCategory;
  onChange: (category: ProductCategory) => void;
}

export function CategoryFilters({ active, onChange }: CategoryFiltersProps) {
  return (
    <div
      className="flex flex-wrap gap-2"
      role="tablist"
      aria-label="Product categories"
    >
      {productCategories.map((category) => {
        const isActive = active === category.id;
        return (
          <button
            key={category.id}
            type="button"
            role="tab"
            aria-selected={isActive}
            onClick={() => onChange(category.id)}
            className={cn(
              "rounded-full px-3.5 py-1.5 text-xs font-semibold transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-green focus-visible:ring-offset-2 sm:px-4 sm:text-[13px]",
              isActive
                ? "bg-brand-green text-white"
                : "bg-brand-surface text-brand-ink/80 hover:bg-brand-green/10 hover:text-brand-green",
            )}
          >
            {category.label}
          </button>
        );
      })}
    </div>
  );
}
