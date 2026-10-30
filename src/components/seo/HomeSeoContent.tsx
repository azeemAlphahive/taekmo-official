import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

const links = [
  {
    title: "TAEKMO solar panels",
    body: "Bankable N-type modules for rooftop, C&I, and utility projects.",
    href: "/products",
  },
  {
    title: "TAEKMO solutions",
    body: "System approaches for homes, businesses, and large solar plants.",
    href: "/solutions",
  },
  {
    title: "Verify TAEKMO modules",
    body: "Check authenticity with your module Product No. or barcode.",
    href: "/verify",
  },
  {
    title: "Contact TAEKMO",
    body: "Talk to sales for supply, specs, and regional partnership.",
    href: "/contact",
  },
] as const;

const cardMotion =
  "will-change-transform transition-[transform,box-shadow,border-color,background-color] duration-[1200ms] [transition-timing-function:cubic-bezier(0.33,1,0.32,1)] motion-safe:hover:-translate-y-2 motion-safe:hover:shadow-[0_24px_44px_-16px_rgba(4,16,10,0.22)]";

/**
 * Indexable brand + product copy for “TAEKMO” search intent.
 * Placed below the fold so the hero composition stays clean.
 */
export function HomeSeoContent() {
  return (
    <section
      className="bg-[#f4f7f5] py-14 sm:py-16 lg:py-20"
      aria-labelledby="about-taekmo-seo-heading"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <p className="text-[11px] font-semibold tracking-[0.2em] text-brand-green uppercase">
            Official TAEKMO website
          </p>
          <h2
            id="about-taekmo-seo-heading"
            className="mt-2 text-2xl font-bold tracking-tight text-brand-ink sm:text-3xl"
          >
            About TAEKMO Solar
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-brand-muted sm:text-[15px]">
            <strong className="font-semibold text-brand-ink">TAEKMO</strong>{" "}
            (also known as{" "}
            <strong className="font-semibold text-brand-ink">TAEKMO Solar</strong>
            ) is the international module brand of Talesun Solar under the C&amp;D
            Group. This is the official TAEKMO website for high-efficiency{" "}
            <strong className="font-semibold text-brand-ink">
              N-type solar panels
            </strong>
            , project solutions, and product authenticity verification.
          </p>
          <p className="mt-3 text-sm leading-relaxed text-brand-muted sm:text-[15px]">
            Buyers searching for TAEKMO solar modules, TAEKMO panels, or Talesun
            TAEKMO can explore our catalogue (including TKM series), residential
            to utility solutions, and the{" "}
            <Link
              href="/verify"
              className="font-semibold text-brand-green underline-offset-2 hover:underline"
            >
              TAEKMO product verification
            </Link>{" "}
            tool to confirm genuine Product Nos.
          </p>
        </div>

        <ul className="mt-8 grid gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-4">
          {links.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className={cn(
                  "group flex h-full flex-col rounded-2xl border border-brand-border bg-white p-5 sm:p-6",
                  "hover:border-brand-green/30",
                  cardMotion,
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-green focus-visible:ring-offset-2 focus-visible:ring-offset-[#f4f7f5]",
                )}
              >
                <div className="flex items-start justify-between gap-3">
                  <h3 className="text-sm font-bold tracking-tight text-brand-ink transition-colors duration-300 group-hover:text-brand-green sm:text-[15px]">
                    {item.title}
                  </h3>
                  <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-brand-green/10 text-brand-green transition-transform duration-500 ease-[cubic-bezier(0.33,1,0.32,1)] motion-safe:group-hover:translate-x-0.5 motion-safe:group-hover:-translate-y-0.5">
                    <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
                  </span>
                </div>
                <p className="mt-3 text-xs leading-relaxed text-brand-muted sm:text-sm">
                  {item.body}
                </p>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
