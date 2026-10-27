import Image from "next/image";
import { VerificationCard } from "@/components/home/VerificationCard";
import { ProductVerificationForm } from "@/components/verify/ProductVerificationForm";
import { cn } from "@/lib/utils";

interface VerifySectionProps {
  compact?: boolean;
  /** Taller full-bleed layout for the /verify page with the full form. */
  fullPage?: boolean;
}

export function VerifySection({
  compact = false,
  fullPage = false,
}: VerifySectionProps) {
  return (
    <section
      id="verify"
      className={cn(
        "relative overflow-hidden bg-brand-ink",
        fullPage
          ? "min-h-[70vh] pt-24 pb-14 sm:pt-28 sm:pb-16 lg:pt-28 lg:pb-20"
          : compact
            ? "py-14 sm:py-16"
            : "py-16 sm:py-20 lg:py-24",
      )}
      aria-labelledby="verify-section-heading"
    >
      <Image
        src="/images/solutions/solutions-bg.jpg"
        alt="Solar panels background for product verification"
        fill
        priority={fullPage}
        sizes="100vw"
        className="object-cover object-center opacity-45"
      />
      <div
        className="absolute inset-0 bg-gradient-to-r from-brand-ink/90 via-brand-ink/75 to-brand-ink/55"
        aria-hidden
      />
      <div
        className="absolute inset-0 bg-gradient-to-t from-brand-ink/70 via-transparent to-brand-ink/40"
        aria-hidden
      />

      {fullPage ? (
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <p className="mb-2 text-[11px] font-semibold tracking-[0.2em] text-brand-green uppercase sm:text-xs">
              Product authenticity
            </p>
            <h1
              id="verify-section-heading"
              className="text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-[2.75rem]"
            >
              Verify Your Product
            </h1>
            <p className="mx-auto mt-2 max-w-xl text-sm leading-relaxed text-white/70 sm:text-[15px]">
              Enter or scan the Product No. from your module label and confirm
              with the on-screen verification code.
            </p>
          </div>

          <div className="mx-auto mt-8 flex max-w-lg justify-center lg:mt-10">
            <ProductVerificationForm />
          </div>
        </div>
      ) : (
        <div className="relative mx-auto flex w-full max-w-7xl flex-col items-start gap-8 px-4 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:gap-14 lg:px-8">
          <div className="max-w-xl">
            <p className="mb-3 text-[11px] font-semibold tracking-[0.2em] text-brand-green uppercase sm:text-xs">
              Product authenticity
            </p>
            <h2
              id="verify-section-heading"
              className="text-2xl font-bold tracking-tight text-white sm:text-3xl"
            >
              Verify Your Product
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-white/70 sm:text-[15px]">
              Enter or scan the Product No. from your module label to confirm
              your TAEKMO panel is genuine.
            </p>
          </div>

          <VerificationCard
            showBarcodeGuide
            className="w-full max-w-[320px] sm:max-w-[340px]"
          />
        </div>
      )}
    </section>
  );
}
