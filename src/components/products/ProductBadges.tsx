import type { ProductBadge } from "@/types";

interface ProductBadgesProps {
  badges: ProductBadge[];
}

export function ProductBadges({ badges }: ProductBadgesProps) {
  if (badges.length === 0) return null;

  return (
    <ul className="flex flex-wrap gap-2" aria-label="Product tags">
      {badges.map((badge) => (
        <li
          key={badge.label}
          className="rounded-full bg-brand-green/10 px-2.5 py-1 text-[11px] font-semibold tracking-wide text-brand-green uppercase"
        >
          {badge.label}
        </li>
      ))}
    </ul>
  );
}
