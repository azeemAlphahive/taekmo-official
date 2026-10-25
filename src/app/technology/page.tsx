import type { Metadata } from "next";
import { Zap, Cpu, ShieldCheck, Leaf } from "lucide-react";
import { PageHero } from "@/components/layout/PageHero";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Technology",
  description:
    "Learn about TAEKMO solar module, inverter, and storage technology.",
};

const pillars = [
  {
    title: "High-Efficiency Modules",
    description:
      "Advanced cell architectures designed for strong real-world energy yield across rooftops and ground mounts.",
    icon: Zap,
  },
  {
    title: "Smart Power Conversion",
    description:
      "Inverter platforms engineered for reliable grid-tied, hybrid, and backup configurations.",
    icon: Cpu,
  },
  {
    title: "Quality & Durability",
    description:
      "Materials and processes selected for long-term outdoor performance and system stability.",
    icon: ShieldCheck,
  },
  {
    title: "Clean Energy Systems",
    description:
      "Complete solutions that help homes and businesses reduce reliance on conventional power.",
    icon: Leaf,
  },
];

export default function TechnologyPage() {
  return (
    <>
      <PageHero
        eyebrow="TECHNOLOGY"
        title="Engineered for Performance"
        description="A clear look at the technologies behind TAEKMO modules, inverters, and storage — content will be expanded with approved technical materials."
        imageSrc="/images/promo/technician.jpg"
      />

      <section className="bg-white py-12 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {pillars.map((item) => (
              <li
                key={item.title}
                className="rounded-lg border border-brand-border bg-white p-5"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-green/10 text-brand-green">
                  <item.icon className="h-5 w-5" strokeWidth={1.75} />
                </span>
                <h2 className="mt-4 text-base font-semibold text-brand-ink">
                  {item.title}
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-brand-muted">
                  {item.description}
                </p>
              </li>
            ))}
          </ul>

          <div className="mt-12 flex flex-wrap gap-3">
            <Button href="/products" variant="primary">
              View Products
            </Button>
            <Button href="/contact" variant="secondary">
              Talk to an Engineer
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
