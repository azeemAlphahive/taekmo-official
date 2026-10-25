import type { ProductDetail } from "@/types";
import { ProductBreadcrumbs } from "@/components/products/ProductBreadcrumbs";
import { ProductGallery } from "@/components/products/ProductGallery";
import { ProductSummary } from "@/components/products/ProductSummary";
import { ProductInfoTabs } from "@/components/products/ProductInfoTabs";
import { ProductInquiryForm } from "@/components/products/ProductInquiryForm";

interface ProductDetailViewProps {
  product: ProductDetail;
}

export function ProductDetailView({ product }: ProductDetailViewProps) {
  return (
    <div className="bg-white pt-24 lg:pt-28">
      <ProductBreadcrumbs product={product} />

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8 lg:py-12">
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-12 xl:gap-14">
          <ProductGallery
            images={product.gallery}
            productName={product.name}
          />
          <ProductSummary product={product} />
        </div>

        <div className="mt-12 border-t border-brand-border pt-8 sm:mt-14 sm:pt-10 lg:mt-16">
          <ProductInfoTabs product={product} />
        </div>

        <div className="mt-12 sm:mt-14">
          <ProductInquiryForm productName={product.name} />
        </div>
      </div>
    </div>
  );
}
