import type { ProductDetail } from "@/types";
import { ProductBadges } from "@/components/products/ProductBadges";
import { ProductQuickSpecs } from "@/components/products/ProductSpecifications";
import { ProductActionButtons } from "@/components/products/ProductActionButtons";

interface ProductSummaryProps {
  product: ProductDetail;
}

export function ProductSummary({ product }: ProductSummaryProps) {
  return (
    <div className="flex flex-col gap-5">
      <ProductBadges badges={product.badges} />

      <div>
        <h1 className="text-2xl font-bold tracking-tight text-brand-ink sm:text-3xl lg:text-[2rem]">
          {product.name}
        </h1>
        <p className="mt-2 text-sm leading-relaxed text-brand-muted sm:text-[15px]">
          {product.description}
        </p>
      </div>

      <p className="text-xl font-bold text-brand-green sm:text-2xl">
        {product.priceLabel}
      </p>

      <ProductQuickSpecs specs={product.quickSpecs} />

      <ProductActionButtons documents={product.documents} />

      {product.isDemoContent && (
        <p className="text-[11px] leading-relaxed text-brand-muted">
          Sample pricing and specifications shown for design purposes. They are
          not official published figures.
        </p>
      )}
    </div>
  );
}
