"use client";

import Image from "next/image";
import { useState } from "react";
import { Mail, Phone, MessageCircle } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { SectionReveal } from "@/components/ui/SectionReveal";
import { salesLeadership } from "@/data/content";
import { cn } from "@/lib/utils";

type Person = (typeof salesLeadership)[number];

function formatWhatsAppDisplay(value: string) {
  const digits = value.replace(/\D/g, "");
  if (digits.startsWith("92") && digits.length >= 12) {
    return `+${digits.slice(0, 2)} ${digits.slice(2, 5)} ${digits.slice(5)}`;
  }
  return value.startsWith("+") ? value : `+${digits}`;
}

function SalesDirectorCard({
  person,
  index,
}: {
  person: Person;
  index: number;
}) {
  const [hovered, setHovered] = useState(false);
  const reduceMotion = useReducedMotion();
  const lift = !reduceMotion && hovered;

  const phone = person.phone;
  const whatsapp = person.whatsapp;
  const telHref = phone ? `tel:${phone.replace(/\s/g, "")}` : null;
  const mailHref = `mailto:${person.email}`;
  const waNumber = whatsapp || phone || null;
  const waHref = waNumber
    ? `https://wa.me/${waNumber.replace(/\D/g, "")}`
    : null;
  const waLabel = waNumber ? formatWhatsAppDisplay(waNumber) : null;

  return (
    <motion.article
      layout
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      onFocus={() => setHovered(true)}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node | null)) {
          setHovered(false);
        }
      }}
      tabIndex={0}
      animate={
        reduceMotion
          ? undefined
          : {
              scale: lift ? 1.035 : 1,
              y: lift ? -6 : 0,
              zIndex: lift ? 20 : 1,
            }
      }
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        "group relative flex h-full origin-center overflow-hidden rounded-2xl border border-brand-border bg-white outline-none",
        "transition-[border-color,box-shadow] duration-500 ease-[cubic-bezier(0.33,1,0.32,1)]",
        "hover:border-brand-green/35 hover:shadow-[0_24px_48px_-18px_rgba(4,16,10,0.3)]",
        "focus-visible:border-brand-green/40 focus-visible:ring-2 focus-visible:ring-brand-green/40",
        lift &&
          "border-brand-green/35 shadow-[0_24px_48px_-18px_rgba(4,16,10,0.3)]",
      )}
    >
      <div className="relative w-[8.5rem] shrink-0 self-stretch overflow-hidden bg-brand-ink sm:w-44">
        <div className="absolute inset-0">
          <Image
            src={person.photo}
            alt={person.photoAlt}
            fill
            sizes="(max-width: 640px) 136px, 176px"
            quality={95}
            className={cn(
              "object-cover object-top transition-transform duration-700 ease-[cubic-bezier(0.33,1,0.32,1)]",
              lift && "scale-[1.03]",
            )}
            priority={index === 0}
          />
        </div>
      </div>

      <div className="flex min-w-0 flex-1 flex-col p-3.5 sm:p-4">
        <p className="text-[15px] font-bold tracking-tight text-brand-ink sm:text-base">
          {person.name}
        </p>
        <p className="mt-0.5 text-xs font-medium text-brand-green sm:text-[13px]">
          {person.title}
        </p>

        <p className="mt-2 text-xs leading-relaxed text-brand-muted sm:text-[13px] sm:leading-relaxed">
          {person.message}
        </p>

        <ul className="mt-auto flex flex-wrap items-center gap-1.5 pt-3">
          <li>
            <a
              href={mailHref}
              title={person.email}
              className="inline-flex h-8 max-w-full items-center gap-1.5 rounded-full border border-brand-border bg-[#f4f7f5] px-2.5 text-[11px] text-brand-muted transition-colors hover:border-brand-green/30 hover:text-brand-green"
            >
              <Mail className="h-3 w-3 shrink-0 text-brand-green" aria-hidden />
              <span>{person.email}</span>
            </a>
          </li>
          {telHref && phone ? (
            <li>
              <a
                href={telHref}
                className="inline-flex h-8 items-center gap-1.5 rounded-full border border-brand-border bg-[#f4f7f5] px-2.5 text-[11px] text-brand-muted transition-colors hover:border-brand-green/30 hover:text-brand-green"
              >
                <Phone
                  className="h-3 w-3 shrink-0 text-brand-green"
                  aria-hidden
                />
                {phone}
              </a>
            </li>
          ) : null}
          {waHref && waLabel ? (
            <li>
              <a
                href={waHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-8 items-center gap-1.5 rounded-full border border-brand-border bg-[#f4f7f5] px-2.5 text-[11px] text-brand-muted transition-colors hover:border-brand-green/30 hover:text-brand-green"
              >
                <MessageCircle
                  className="h-3 w-3 shrink-0 text-brand-green"
                  aria-hidden
                />
                {waLabel}
              </a>
            </li>
          ) : null}
        </ul>
      </div>
    </motion.article>
  );
}

export function CountryHeadMessage() {
  return (
    <section
      id="pakistan"
      className="scroll-mt-24 bg-[#f4f7f5] py-10 sm:py-12 lg:py-14"
      aria-labelledby="sales-leadership-heading"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionReveal>
          <p className="text-[11px] font-semibold tracking-[0.22em] text-brand-green uppercase">
            TAEKMO · Our team
          </p>
          <h2
            id="sales-leadership-heading"
            className="mt-2 text-xl font-bold tracking-tight text-brand-ink sm:text-2xl"
          >
            Meet our team
          </h2>
        </SectionReveal>

        <ul className="mt-5 grid items-stretch gap-5 sm:mt-6 sm:gap-6 lg:grid-cols-2">
          {salesLeadership.map((person, index) => (
            <li key={person.id} className="h-full">
              <SectionReveal delay={index * 0.08} className="h-full">
                <SalesDirectorCard person={person} index={index} />
              </SectionReveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
