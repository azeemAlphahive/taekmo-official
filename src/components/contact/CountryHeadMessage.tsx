import { Mail, Phone, MessageCircle } from "lucide-react";
import { SectionReveal } from "@/components/ui/SectionReveal";
import { pakistanCountryHead } from "@/data/content";

export function CountryHeadMessage() {
  const person = pakistanCountryHead;
  const telHref = `tel:${person.phone.replace(/\s/g, "")}`;
  const mailHref = `mailto:${person.email}`;
  const waHref = `https://wa.me/${person.whatsapp.replace(/\D/g, "")}`;

  return (
    <section
      id="pakistan"
      className="scroll-mt-24 bg-[#f4f7f5] py-12 sm:py-14 lg:py-16"
      aria-labelledby="country-head-heading"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionReveal>
          <p className="text-[11px] font-semibold tracking-[0.22em] text-brand-green uppercase">
            {person.region} · Local leadership
          </p>
          <div className="mt-6 grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-start lg:gap-14">
            <div>
              <blockquote className="border-l-2 border-brand-green pl-5 sm:pl-6">
                <p className="text-base leading-relaxed text-brand-ink sm:text-lg sm:leading-relaxed">
                  “{person.message}”
                </p>
              </blockquote>
              <footer className="mt-6 pl-5 sm:pl-6">
                <p
                  id="country-head-heading"
                  className="text-lg font-bold tracking-tight text-brand-ink"
                >
                  {person.name}
                </p>
                <p className="mt-0.5 text-sm text-brand-muted">{person.title}</p>
              </footer>
            </div>

            <div className="lg:pt-1">
              <h3 className="text-sm font-semibold tracking-wide text-brand-ink uppercase">
                Contact details
              </h3>
              <ul className="mt-4 space-y-3 text-sm">
                <li>
                  <a
                    href={mailHref}
                    className="flex items-center gap-3 text-brand-muted transition-colors hover:text-brand-green focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-green"
                  >
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white text-brand-green shadow-sm">
                      <Mail className="h-4 w-4" aria-hidden />
                    </span>
                    <span>
                      <span className="block text-[11px] font-semibold tracking-wide text-brand-ink/50 uppercase">
                        Email
                      </span>
                      {person.email}
                    </span>
                  </a>
                </li>
                <li>
                  <a
                    href={telHref}
                    className="flex items-center gap-3 text-brand-muted transition-colors hover:text-brand-green focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-green"
                  >
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white text-brand-green shadow-sm">
                      <Phone className="h-4 w-4" aria-hidden />
                    </span>
                    <span>
                      <span className="block text-[11px] font-semibold tracking-wide text-brand-ink/50 uppercase">
                        Phone
                      </span>
                      {person.phone}
                    </span>
                  </a>
                </li>
                <li>
                  <a
                    href={waHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-brand-muted transition-colors hover:text-brand-green focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-green"
                  >
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white text-brand-green shadow-sm">
                      <MessageCircle className="h-4 w-4" aria-hidden />
                    </span>
                    <span>
                      <span className="block text-[11px] font-semibold tracking-wide text-brand-ink/50 uppercase">
                        WhatsApp
                      </span>
                      {person.phone}
                    </span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}
