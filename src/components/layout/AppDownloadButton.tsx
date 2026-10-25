"use client";

import { useState } from "react";
import Image from "next/image";
import { Smartphone } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { siteConfig } from "@/data/content";
import { cn } from "@/lib/utils";

const APP_DOWNLOAD_URL =
  process.env.NEXT_PUBLIC_APP_DOWNLOAD_URL ?? `${siteConfig.url}/app`;

function qrSrc(size: number) {
  return `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&margin=8&data=${encodeURIComponent(APP_DOWNLOAD_URL)}`;
}

interface AppDownloadButtonProps {
  className?: string;
  /** Compact style for tight header slots */
  compact?: boolean;
}

export function AppDownloadButton({
  className,
  compact = false,
}: AppDownloadButtonProps) {
  const [open, setOpen] = useState(false);
  const reduceMotion = useReducedMotion();

  return (
    <div
      className={cn("relative", className)}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onFocus={() => setOpen(true)}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node)) {
          setOpen(false);
        }
      }}
    >
      <button
        type="button"
        aria-expanded={open}
        aria-haspopup="dialog"
        onClick={() => setOpen((v) => !v)}
        className={cn(
          "inline-flex items-center gap-1.5 rounded-full border border-white/25 bg-white/5 text-white transition-colors duration-300",
          "hover:border-brand-mint/50 hover:bg-brand-green/15 hover:text-brand-mint",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-green",
          compact
            ? "px-3 py-1.5 text-[11px] font-semibold"
            : "px-3.5 py-2 text-xs font-semibold sm:text-[13px]",
        )}
      >
        <Smartphone className="h-3.5 w-3.5 shrink-0" aria-hidden />
        <span className="whitespace-nowrap">Download App</span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            role="dialog"
            aria-label="Scan QR code to download the TAEKMO mobile app"
            initial={reduceMotion ? false : { opacity: 0, y: 8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={reduceMotion ? undefined : { opacity: 0, y: 6, scale: 0.96 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            className="absolute top-full right-0 z-[60] mt-2 w-[200px] rounded-2xl border border-white/15 bg-brand-ink/95 p-3 shadow-2xl shadow-black/40 backdrop-blur-md"
          >
            <div className="overflow-hidden rounded-xl bg-white p-2">
              <Image
                src={qrSrc(168)}
                alt="QR code to download TAEKMO mobile app"
                width={168}
                height={168}
                unoptimized
                className="h-full w-full"
              />
            </div>
            <p className="mt-2.5 text-center text-[11px] font-medium leading-snug text-white/80">
              Scan barcode to download
            </p>
            <a
              href={APP_DOWNLOAD_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 block text-center text-[11px] font-semibold text-brand-mint transition-colors hover:text-white"
            >
              Or open download link
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
