import Link from "next/link";
import { ChevronRight } from "lucide-react";
import type { ProductDetail } from "@/types";
import { getCategoryPathLabel } from "@/data/products";

interface ProductBreadcrumbsProps {
  product: ProductDetail;
}

export function ProductBreadcrumbs({ product }: ProductBreadcrumbsProps) {
  const categoryLabel = getCategoryPathLabel(product.category);
  const items = [
    { label: "Home", href: "/" },
    { label: "Products", href: "/products" },
    { label: categoryLabel, href: "/products" },
    { label: product.name, href: product.href },
  ];

  return (
    <nav aria-label="Breadcrumb" className="border-b border-brand-border/70 bg-white">
      <ol className="mx-auto flex max-w-7xl flex-wrap items-center gap-1.5 px-4 py-3 text-xs text-brand-muted sm:px-6 sm:text-[13px] lg:px-8">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={`${item.label}-${index}`} className="inline-flex items-center gap-1.5">
              {index > 0 && (
                <ChevronRight
                  className="h-3.5 w-3.5 shrink-0 text-brand-muted/70"
                  aria-hidden
                />
              )}
              {isLast ? (
                <span
                  className="font-medium text-brand-ink"
                  aria-current="page"
                >
                  {item.label}
                </span>
              ) : (
                <Link
                  href={item.href}
                  className="transition-colors hover:text-brand-green focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-green"
                >
                  {item.label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
