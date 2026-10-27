import type { Metadata } from "next";
import Image from "next/image";
import { PageHero } from "@/components/layout/PageHero";
import { Button } from "@/components/ui/Button";

import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "TAEKMO Solar Projects | Residential, C&I & Utility",
  description:
    "Explore illustrative TAEKMO solar project examples across residential rooftops, commercial sites, and utility-scale plants.",
  path: "/projects",
  keywords: ["TAEKMO projects", "TAEKMO solar plant", "TAEKMO installation"],
});

const projects = [
  {
    title: "Residential Rooftop",
    location: "Urban home installation",
    image: "/images/solutions/residential.jpg",
    summary:
      "Illustrative rooftop project example for homes seeking reliable daytime generation.",
  },
  {
    title: "Commercial Campus",
    location: "Business facility",
    image: "/images/solutions/commercial.jpg",
    summary:
      "Illustrative commercial array designed to offset daytime operational loads.",
  },
  {
    title: "Industrial Site",
    location: "Manufacturing facility",
    image: "/images/solutions/industrial.jpg",
    summary:
      "Illustrative industrial deployment focused on high daytime energy demand.",
  },
  {
    title: "Utility Scale Field",
    location: "Open-field array",
    image: "/images/hero/solar-farm.jpg",
    summary:
      "Illustrative utility-scale concept showcasing large-area clean generation.",
  },
];

export default function ProjectsPage() {
  return (
    <>
      <PageHero
        eyebrow="PROJECTS"
        title="Selected Solar Projects"
        description="Placeholder project stories for the website. Replace with verified case studies and photography when available."
        imageSrc="/images/solutions/utility.jpg"
      />

      <section className="bg-white py-12 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ul className="grid gap-6 sm:grid-cols-2">
            {projects.map((project) => (
              <li
                key={project.title}
                className="overflow-hidden rounded-lg border border-brand-border bg-white"
              >
                <div className="relative aspect-[16/10]">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    sizes="(max-width: 640px) 100vw, 50vw"
                    className="object-cover"
                  />
                </div>
                <div className="p-5">
                  <p className="text-[11px] font-semibold tracking-wide text-brand-green uppercase">
                    {project.location}
                  </p>
                  <h2 className="mt-1 text-lg font-semibold text-brand-ink">
                    {project.title}
                  </h2>
                  <p className="mt-2 text-sm leading-relaxed text-brand-muted">
                    {project.summary}
                  </p>
                </div>
              </li>
            ))}
          </ul>

          <div className="mt-12 text-center">
            <Button href="/contact" variant="primary">
              Start a Project Inquiry
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
