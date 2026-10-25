import Image from "next/image";

interface PageHeroProps {
  title: string;
  description: string;
  eyebrow?: string;
  imageSrc?: string;
  imageAlt?: string;
}

export function PageHero({
  title,
  description,
  eyebrow,
  imageSrc = "/images/hero/solar-farm.jpg",
  imageAlt = "TAEKMO solar installation",
}: PageHeroProps) {
  return (
    <section className="relative overflow-hidden bg-brand-ink pt-28 pb-14 sm:pt-32 sm:pb-16 lg:pt-36 lg:pb-20">
      <Image
        src={imageSrc}
        alt={imageAlt}
        fill
        priority
        sizes="100vw"
        className="object-cover opacity-40"
      />
      <div
        className="absolute inset-0 bg-gradient-to-r from-brand-ink/90 via-brand-ink/75 to-brand-ink/50"
        aria-hidden
      />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {eyebrow && (
          <p className="mb-3 text-[11px] font-semibold tracking-[0.2em] text-brand-green uppercase sm:text-xs">
            {eyebrow}
          </p>
        )}
        <h1 className="max-w-3xl text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
          {title}
        </h1>
        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-white/75 sm:text-base">
          {description}
        </p>
      </div>
    </section>
  );
}
