import type { Metadata } from "next";
import Link from "next/link";
import { FileText, HelpCircle, Shield, QrCode } from "lucide-react";
import { PageHero } from "@/components/layout/PageHero";
import { VerifySection } from "@/components/home/VerifySection";
import { Button } from "@/components/ui/Button";

import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "TAEKMO Support | Help, Warranty & Verification",
  description:
    "TAEKMO support resources — product verification, warranty guidance, documentation, and contact options for genuine TAEKMO modules.",
  path: "/support",
  keywords: ["TAEKMO support", "TAEKMO warranty", "TAEKMO help center"],
});

const links = [
  {
    title: "Verify Product",
    description: "Confirm authenticity with your serial number.",
    href: "/verify",
    icon: QrCode,
  },
  {
    title: "Product Datasheets",
    description: "Browse products and request available documentation.",
    href: "/products",
    icon: FileText,
  },
  {
    title: "Warranty Guidance",
    description: "Review illustrative warranty information on product pages.",
    href: "/products",
    icon: Shield,
  },
  {
    title: "Contact Support",
    description: "Reach the TAEKMO team for installation and product questions.",
    href: "/contact",
    icon: HelpCircle,
  },
];

export default function SupportPage() {
  return (
    <>
      <PageHero
        eyebrow="SUPPORT"
        title="We're Here to Help"
        description="Find verification tools, product resources, and ways to contact TAEKMO support."
        imageSrc="/images/promo/technician.jpg"
      />

      <section className="bg-white py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {links.map((item) => (
              <li key={item.title}>
                <Link
                  href={item.href}
                  className="flex h-full flex-col rounded-lg border border-brand-border bg-white p-5 transition-shadow hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-green"
                >
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-green/10 text-brand-green">
                    <item.icon className="h-5 w-5" strokeWidth={1.75} />
                  </span>
                  <h2 className="mt-4 text-base font-semibold text-brand-ink">
                    {item.title}
                  </h2>
                  <p className="mt-2 text-sm text-brand-muted">
                    {item.description}
                  </p>
                </Link>
              </li>
            ))}
          </ul>

          <div className="mt-10">
            <Button href="/contact" variant="primary">
              Contact Support
            </Button>
          </div>
        </div>
      </section>

      <VerifySection />
    </>
  );
}
