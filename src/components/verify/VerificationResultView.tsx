import Image from "next/image";
import Link from "next/link";
import {
  BadgeCheck,
  CircleAlert,
  Factory,
  Gauge,
  Package,
  QrCode,
  ShieldCheck,
  Zap,
} from "lucide-react";
import type { VerifyResult } from "@/data/verify";
import { Button } from "@/components/ui/Button";

interface VerificationResultViewProps {
  result: VerifyResult;
}

export function VerificationResultView({ result }: VerificationResultViewProps) {
  const rows = [
    { icon: Package, label: "Model", value: result.model },
    { icon: QrCode, label: "Product No.", value: result.barcode },
    { icon: Factory, label: "Product type", value: result.productType },
    { icon: ShieldCheck, label: "Pallet No.", value: result.palletNo },
    { icon: Zap, label: "Label power", value: result.power },
    { icon: Gauge, label: "Pmax", value: result.pmax },
    { icon: Gauge, label: "FF", value: result.ff },
    { icon: Zap, label: "Voc", value: result.voc },
    { icon: Zap, label: "Isc", value: result.isc },
    { icon: Zap, label: "Vpm", value: result.vpm },
    { icon: Zap, label: "Ipm", value: result.ipm },
    { icon: ShieldCheck, label: "Category", value: result.categoryLabel },
  ];

  return (
    <div className="relative overflow-hidden bg-brand-ink pt-24 lg:pt-28">
      <Image
        src="/images/solutions/solutions-bg.jpg"
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover opacity-35"
        aria-hidden
      />
      <div
        className="absolute inset-0 bg-gradient-to-b from-brand-ink/85 via-brand-ink/80 to-brand-ink"
        aria-hidden
      />

      <div className="relative mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
        <div className="mx-auto max-w-3xl text-center">
          <p className="mb-3 text-[11px] font-semibold tracking-[0.2em] text-brand-green uppercase">
            Verification result
          </p>
          <div className="inline-flex items-center gap-2 rounded-full border border-brand-green/40 bg-brand-green/15 px-4 py-1.5 text-sm font-semibold text-brand-mint">
            <BadgeCheck className="h-4 w-4" strokeWidth={1.75} aria-hidden />
            Authenticity confirmed
          </div>
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl">
            {result.productName}
          </h1>
          <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-white/65">
            {result.note}
          </p>
        </div>

        <div className="mx-auto mt-10 grid max-w-5xl gap-6 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)] lg:gap-8">
          <div className="overflow-hidden rounded-xl border border-white/10 bg-[#12161c]/80 shadow-2xl backdrop-blur-md">
            <div className="relative aspect-[4/3] bg-brand-surface/20">
              <Image
                src={result.image}
                alt={result.imageAlt}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
            <div className="border-t border-white/10 px-5 py-4 sm:px-6">
              <p className="text-[11px] font-semibold tracking-wide text-brand-mint uppercase">
                {result.categoryLabel}
              </p>
              <p className="mt-1 text-lg font-semibold text-white">
                {result.productName}
              </p>
              <p className="mt-1 text-xs text-white/55">{result.model}</p>
            </div>
          </div>

          <div className="rounded-xl border border-white/10 bg-[#12161c]/85 p-5 shadow-2xl backdrop-blur-md sm:p-6">
            <h2 className="text-base font-semibold text-white">
              Product details
            </h2>
            <p className="mt-1 text-xs text-white/55">
              Verified against the TAEKMO authenticity database.
            </p>

            <dl className="mt-5 grid gap-3 sm:grid-cols-2">
              {rows.map((row) => (
                <div
                  key={row.label}
                  className="rounded-lg border border-white/10 bg-white/5 px-3 py-2.5"
                >
                  <dt className="flex items-center gap-1.5 text-[10px] font-semibold tracking-wide text-white/45 uppercase">
                    <row.icon
                      className="h-3.5 w-3.5 text-brand-green"
                      strokeWidth={1.75}
                      aria-hidden
                    />
                    {row.label}
                  </dt>
                  <dd className="mt-1 break-all text-sm font-medium text-white">
                    {row.value}
                  </dd>
                </div>
              ))}
            </dl>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Button
                href={result.productHref}
                variant="primary"
                className="flex-1"
              >
                View product page
              </Button>
              <Button
                href="/verify"
                variant="outline"
                className="flex-1 border-brand-green text-brand-mint hover:bg-brand-green/15"
              >
                Verify another
              </Button>
            </div>
          </div>
        </div>

        <p className="mx-auto mt-8 max-w-2xl text-center text-[11px] text-white/40">
          Need assistance?{" "}
          <Link href="/support" className="text-brand-mint hover:underline">
            Contact support
          </Link>
        </p>
      </div>
    </div>
  );
}

export function VerificationNotFoundView({ code }: { code: string }) {
  return (
    <div className="relative overflow-hidden bg-brand-ink pt-24 lg:pt-28">
      <Image
        src="/images/solutions/solutions-bg.jpg"
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover opacity-35"
        aria-hidden
      />
      <div
        className="absolute inset-0 bg-gradient-to-b from-brand-ink/85 via-brand-ink/80 to-brand-ink"
        aria-hidden
      />

      <div className="relative mx-auto max-w-xl px-4 py-16 text-center sm:px-6 lg:py-24">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-amber-400/40 bg-amber-400/10 text-amber-300">
          <CircleAlert className="h-7 w-7" strokeWidth={1.75} aria-hidden />
        </div>
        <h1 className="mt-5 text-2xl font-bold tracking-tight text-white sm:text-3xl">
          Panel not found
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-white/65">
          No matching product was found for{" "}
          <span className="font-mono text-brand-mint">{code}</span>. Check the
          Product No. on the module label and try again.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Button href="/verify" variant="primary">
            Try again
          </Button>
          <Button
            href="/support"
            variant="outline"
            className="border-brand-green text-brand-mint hover:bg-brand-green/15"
          >
            Contact support
          </Button>
        </div>
      </div>
    </div>
  );
}
