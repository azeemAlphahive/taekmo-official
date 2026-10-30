import type { Metadata } from "next";
import { Mail, Phone, MapPin } from "lucide-react";
import { PageHero } from "@/components/layout/PageHero";
import { ContactForm } from "@/components/contact/ContactForm";
import { CountryHeadMessage } from "@/components/contact/CountryHeadMessage";
import { siteConfig } from "@/data/content";

import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Contact TAEKMO Solar | Sales & Support",
  description:
    "Contact TAEKMO Solar for product inquiries, project support, and partnership. Reach the official TAEKMO sales team for modules and solutions.",
  path: "/contact",
  keywords: ["contact TAEKMO", "TAEKMO sales", "TAEKMO support"],
});

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="CONTACT"
        title="Contact Us"
        description="Tell us about your project or product needs. We will get back to you soon."
      />

      <CountryHeadMessage />

      <section
        id="contact"
        className="bg-white py-12 sm:py-16 lg:py-20"
      >
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:gap-14 lg:px-8">
          <div>
            <h2 className="text-xl font-bold text-brand-ink">Get in touch</h2>
            <p className="mt-2 text-sm leading-relaxed text-brand-muted">
              Prefer email or phone? Use the details below, or send a message
              with the form.
            </p>
            <ul className="mt-8 space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <Mail className="mt-0.5 h-4 w-4 text-brand-green" />
                <span>
                  <span className="block font-semibold text-brand-ink">Email</span>
                  <a
                    href={`mailto:${siteConfig.email}`}
                    className="text-brand-muted hover:text-brand-green"
                  >
                    {siteConfig.email}
                  </a>
                </span>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="mt-0.5 h-4 w-4 text-brand-green" />
                <span>
                  <span className="block font-semibold text-brand-ink">Phone</span>
                  <a
                    href={`tel:${siteConfig.phone.replace(/\s/g, "")}`}
                    className="text-brand-muted hover:text-brand-green"
                  >
                    {siteConfig.phone}
                  </a>
                </span>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-4 w-4 text-brand-green" />
                <span>
                  <span className="block font-semibold text-brand-ink">
                    Headquarters
                  </span>
                  <span className="text-brand-muted">
                    {siteConfig.address}
                  </span>
                </span>
              </li>
            </ul>
          </div>

          <ContactForm />
        </div>
      </section>
    </>
  );
}
