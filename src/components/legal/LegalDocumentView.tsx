import { legalDocuments, type LegalDocument } from "@/data/legal";
import { PageHero } from "@/components/layout/PageHero";
import { cn } from "@/lib/utils";

export function LegalDocumentView({
  slug,
  className,
}: {
  slug: LegalDocument["slug"];
  className?: string;
}) {
  const doc = legalDocuments[slug];

  return (
    <>
      <PageHero
        eyebrow={doc.eyebrow}
        title={doc.title}
        description={doc.description}
        imageSrc="/images/hero/solar-farm.jpg"
      />
      <section
        className={cn("bg-[#f4f7f5] py-12 sm:py-16", className)}
        aria-labelledby="legal-doc-title"
      >
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-semibold tracking-wide text-brand-muted uppercase">
            Last updated · {doc.lastUpdated}
          </p>
          <h2 id="legal-doc-title" className="sr-only">
            {doc.title}
          </h2>

          <div className="mt-8 space-y-10 rounded-2xl border border-brand-border bg-white p-6 sm:p-8">
            {doc.sections.map((section) => (
              <article key={section.heading}>
                <h3 className="text-lg font-bold tracking-tight text-brand-ink">
                  {section.heading}
                </h3>
                {section.paragraphs.map((p) => (
                  <p
                    key={p.slice(0, 48)}
                    className="mt-3 text-sm leading-relaxed text-brand-muted sm:text-[15px]"
                  >
                    {p}
                  </p>
                ))}
                {section.bullets ? (
                  <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-relaxed text-brand-muted sm:text-[15px]">
                    {section.bullets.map((b) => (
                      <li key={b.slice(0, 40)}>{b}</li>
                    ))}
                  </ul>
                ) : null}
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
