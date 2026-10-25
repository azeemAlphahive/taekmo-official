import { Shield } from "lucide-react";
import type { ProductWarrantyItem } from "@/types";

interface ProductWarrantyProps {
  items: ProductWarrantyItem[];
  isDemo?: boolean;
}

export function ProductWarranty({ items, isDemo }: ProductWarrantyProps) {
  if (items.length === 0) {
    return (
      <p className="rounded-lg border border-dashed border-brand-border bg-brand-surface/40 px-4 py-10 text-center text-sm text-brand-muted">
        Warranty details coming soon.
      </p>
    );
  }

  return (
    <div className="space-y-4">
      <ul className="grid gap-4 sm:grid-cols-2">
        {items.map((item) => (
          <li
            key={item.id}
            className="rounded-lg border border-brand-border bg-white p-5"
          >
            <div className="flex items-start gap-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-green/10 text-brand-green">
                <Shield className="h-5 w-5" strokeWidth={1.75} aria-hidden />
              </span>
              <div>
                <h3 className="text-sm font-semibold text-brand-ink">
                  {item.title}
                </h3>
                {item.duration && (
                  <p className="mt-0.5 text-sm font-bold text-brand-green">
                    {item.duration}
                  </p>
                )}
                <p className="mt-2 text-xs leading-relaxed text-brand-muted sm:text-[13px]">
                  {item.description}
                </p>
              </div>
            </div>
          </li>
        ))}
      </ul>
      {isDemo && (
        <p className="text-[11px] text-brand-muted">
          * Illustrative warranty terms for UI development only. Official claim
          instructions will be published with verified documents.
        </p>
      )}
    </div>
  );
}
