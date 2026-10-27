import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProductDetailView } from "@/components/products/ProductDetailView";
import { JsonLd } from "@/components/seo/JsonLd";
import {
  getAllProductSlugs,
  getProductBySlug,
} from "@/data/products";
import {
  breadcrumbJsonLd,
  buildPageMetadata,
  productJsonLd,
} from "@/lib/seo";

export function generateStaticParams() {
  return getAllProductSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata(
  props: PageProps<"/products/[slug]">,
): Promise<Metadata> {
  const { slug } = await props.params;
  const product = getProductBySlug(slug);

  if (!product) {
    return { title: "Product not found" };
  }

  return buildPageMetadata({
    title: `${product.name} | TAEKMO Solar Panel`,
    description: `${product.description} Official TAEKMO Solar product page for ${product.name}.`,
    path: `/products/${product.slug}`,
    image: product.image,
    keywords: [
      product.name,
      "TAEKMO solar panel",
      "TAEKMO module",
      product.category,
    ],
  });
}

export default async function ProductDetailPage(
  props: PageProps<"/products/[slug]">,
) {
  const { slug } = await props.params;
  const product = getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  return (
    <>
      <JsonLd
        data={[
          productJsonLd({
            name: product.name,
            description: product.description,
            slug: product.slug,
            image: product.image,
            category: product.category,
          }),
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Products", path: "/products" },
            { name: product.name, path: `/products/${product.slug}` },
          ]),
        ]}
      />
      <ProductDetailView product={product} />
    </>
  );
}
