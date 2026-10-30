"use client";

import Image from "next/image";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type KeyboardEvent,
} from "react";
import { SectionReveal } from "@/components/ui/SectionReveal";
import { pakistanDistributors } from "@/data/distributors";
import { cn } from "@/lib/utils";

const GAP_PX = 16;
const AUTO_MS = 3200;
const cardMotion =
  "will-change-transform transition-[transform,box-shadow] duration-[1200ms] [transition-timing-function:cubic-bezier(0.33,1,0.32,1)] motion-safe:hover:-translate-y-1 motion-safe:hover:shadow-[0_24px_44px_-16px_rgba(4,16,10,0.22)]";

export function Distributors({ className }: { className?: string }) {
  const sectionRef = useRef<HTMLElement>(null);
  const railRef = useRef<HTMLDivElement>(null);
  const indexRef = useRef(0);
  const cardWidthRef = useRef(280);
  const userDraggingRef = useRef(false);
  const programmaticRef = useRef(false);
  const resumeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const inViewRef = useRef(false);
  const [cardWidth, setCardWidth] = useState(280);
  const [inView, setInView] = useState(false);
  const [paused, setPaused] = useState(false);

  const count = pakistanDistributors.length;

  const measure = useCallback(() => {
    const rail = railRef.current;
    if (!rail) return;
    const w = rail.clientWidth;
    // Keep overflow so L→R auto-scroll is always visible (≈1.2–2.2 cards)
    const next =
      w < 640
        ? Math.round(w * 0.78)
        : w < 1024
          ? Math.round(w * 0.48)
          : Math.min(340, Math.round(w * 0.38));
    cardWidthRef.current = next;
    setCardWidth(next);
  }, []);

  const scrollToIndex = useCallback((index: number, animated: boolean) => {
    const rail = railRef.current;
    if (!rail) return;
    const step = cardWidthRef.current + GAP_PX;
    programmaticRef.current = true;
    rail.scrollTo({
      left: index * step,
      behavior: animated ? "smooth" : "auto",
    });
    window.setTimeout(() => {
      programmaticRef.current = false;
    }, animated ? 450 : 50);
  }, []);

  const resetToStart = useCallback(() => {
    indexRef.current = 0;
    scrollToIndex(0, false);
  }, [scrollToIndex]);

  useEffect(() => {
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [measure]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const visible = entry.isIntersecting;
        const was = inViewRef.current;
        inViewRef.current = visible;
        setInView(visible);
        if (visible && !was) {
          resetToStart();
          setPaused(false);
        }
      },
      { threshold: 0.2, rootMargin: "0px" },
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, [resetToStart]);

  // Left → right auto-scroll while section is on screen
  useEffect(() => {
    if (!inView || paused || count <= 1) return;

    const id = window.setInterval(() => {
      if (userDraggingRef.current) return;
      const atEnd = indexRef.current >= count - 1;
      const next = atEnd ? 0 : indexRef.current + 1;
      indexRef.current = next;
      scrollToIndex(next, !atEnd);
    }, AUTO_MS);

    return () => window.clearInterval(id);
  }, [inView, paused, count, scrollToIndex]);

  useEffect(() => {
    return () => {
      if (resumeTimer.current) clearTimeout(resumeTimer.current);
    };
  }, []);

  function pauseForUser() {
    userDraggingRef.current = true;
    setPaused(true);
    if (resumeTimer.current) clearTimeout(resumeTimer.current);
  }

  function resumeSoon() {
    userDraggingRef.current = false;
    if (resumeTimer.current) clearTimeout(resumeTimer.current);
    resumeTimer.current = setTimeout(() => setPaused(false), 1800);
  }

  function syncIndexFromScroll() {
    const rail = railRef.current;
    if (!rail) return;
    const step = cardWidthRef.current + GAP_PX;
    indexRef.current = Math.round(rail.scrollLeft / step);
  }

  function onRailScroll() {
    if (programmaticRef.current) return;
    if (userDraggingRef.current) syncIndexFromScroll();
  }

  function onKeyDown(e: KeyboardEvent<HTMLDivElement>) {
    if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
    e.preventDefault();
    pauseForUser();
    const delta = e.key === "ArrowRight" ? 1 : -1;
    const next = Math.max(0, Math.min(count - 1, indexRef.current + delta));
    indexRef.current = next;
    scrollToIndex(next, true);
    resumeSoon();
  }

  return (
    <section
      ref={sectionRef}
      id="distributors"
      className={cn(
        "scroll-mt-24 overflow-hidden bg-[#f4f7f5] py-14 sm:py-16 lg:py-20",
        className,
      )}
      aria-labelledby="distributors-heading"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionReveal>
          <div>
            <p className="text-[11px] font-semibold tracking-[0.22em] text-brand-green uppercase">
              Pakistan network
            </p>
            <h2
              id="distributors-heading"
              className="mt-2 text-2xl font-bold tracking-tight text-brand-ink sm:text-3xl"
            >
              Our distributors in Pakistan
            </h2>
            <p className="mt-2 max-w-xl text-sm text-brand-muted sm:text-[15px]">
              Authorized local partners for genuine TAEKMO modules — supply,
              project support, and nationwide reach.
            </p>
          </div>
        </SectionReveal>

        <div
          ref={railRef}
          role="region"
          aria-roledescription="carousel"
          aria-label="Pakistan distributors"
          tabIndex={0}
          onKeyDown={onKeyDown}
          onPointerDown={pauseForUser}
          onPointerUp={resumeSoon}
          onPointerCancel={resumeSoon}
          onTouchStart={pauseForUser}
          onTouchEnd={() => {
            syncIndexFromScroll();
            resumeSoon();
          }}
          onScroll={onRailScroll}
          className={cn(
            "mt-10 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2",
            "[-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
            "outline-none focus-visible:ring-2 focus-visible:ring-brand-green/40 focus-visible:ring-offset-2",
          )}
        >
          {pakistanDistributors.map((distributor) => (
            <article
              key={distributor.id}
              style={{ width: cardWidth, minWidth: cardWidth }}
              className={cn(
                "snap-start shrink-0 rounded-2xl border border-brand-border bg-white p-5 sm:p-6",
                cardMotion,
              )}
            >
              <div
                className={cn(
                  "flex h-[4.5rem] w-full items-center justify-center sm:h-20",
                  distributor.logoOnDark &&
                    "rounded-xl bg-brand-ink px-2 py-1.5",
                )}
              >
                <Image
                  src={distributor.logo}
                  alt={distributor.logoAlt}
                  width={280}
                  height={96}
                  unoptimized
                  className={cn(
                    "w-full max-w-full object-contain object-center",
                    distributor.logoOnDark
                      ? "h-16 sm:h-[4.5rem]"
                      : "h-14 sm:h-16",
                  )}
                />
              </div>

              <p className="mt-4 text-[10px] font-semibold tracking-[0.16em] text-brand-green uppercase">
                {distributor.role}
                <span className="text-brand-green/45"> · </span>
                {distributor.location}
              </p>
              <h3 className="mt-2 text-base font-bold tracking-tight text-brand-ink sm:text-lg">
                {distributor.shortName}
              </h3>
              <p className="mt-0.5 line-clamp-1 text-xs text-brand-muted sm:text-sm">
                {distributor.name}
              </p>
              <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-brand-muted">
                {distributor.highlight}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
