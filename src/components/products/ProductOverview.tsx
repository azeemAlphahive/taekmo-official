import type { ReactNode } from "react";
import Image from "next/image";
import {
  Gauge,
  ShieldCheck,
  Snowflake,
  TrendingDown,
  CircleDot,
} from "lucide-react";
import type { ProductDetail, ProductHighlight } from "@/types";

const highlightIcons: Record<ProductHighlight["icon"], ReactNode> = {
  efficiency: <Gauge className="h-5 w-5" strokeWidth={1.75} />,
  degradation: <TrendingDown className="h-5 w-5" strokeWidth={1.75} />,
  temperature: <Snowflake className="h-5 w-5" strokeWidth={1.75} />,
  warranty: <ShieldCheck className="h-5 w-5" strokeWidth={1.75} />,
  generic: <CircleDot className="h-5 w-5" strokeWidth={1.75} />,
};

interface ProductOverviewProps {
  product: ProductDetail;
}

export function ProductOverview({ product }: ProductOverviewProps) {
  const { overview, highlights } = product;

  return (
    <div className="space-y-8">
      <div className="grid gap-8 lg:grid-cols-2 lg:items-start lg:gap-10">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-brand-ink sm:text-2xl">
            {overview.heading}
          </h2>
          <div className="mt-4 space-y-3 text-sm leading-relaxed text-brand-muted sm:text-[15px]">
            {overview.paragraphs.map((paragraph) => (
              <p key={paragraph.slice(0, 32)}>{paragraph}</p>
            ))}
          </div>
        </div>
        <div className="relative aspect-[16/10] overflow-hidden rounded-lg bg-brand-surface">
          <Image
            src={overview.image}
            alt={overview.imageAlt}
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
          />
        </div>
      </div>

      {highlights.length > 0 && (
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {highlights.map((item) => (
            <li
              key={item.id}
              className="rounded-lg border border-brand-border bg-white p-4"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-green/10 text-brand-green">
                {highlightIcons[item.icon]}
              </span>
              <h3 className="mt-3 text-sm font-semibold text-brand-ink">
                {item.title}
              </h3>
              <p className="mt-1 text-xs leading-relaxed text-brand-muted">
                {item.description}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
