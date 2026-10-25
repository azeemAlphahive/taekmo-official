"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import type { ProductGalleryImage } from "@/types";
import { cn } from "@/lib/utils";

interface ProductGalleryProps {
  images: ProductGalleryImage[];
  productName: string;
}

export function ProductGallery({ images, productName }: ProductGalleryProps) {
  const [activeId, setActiveId] = useState(images[0]?.id ?? "");
  const reduceMotion = useReducedMotion();
  const active = images.find((img) => img.id === activeId) ?? images[0];

  if (!active) {
    return (
      <div className="flex aspect-square items-center justify-center rounded-lg bg-brand-surface text-sm text-brand-muted">
        No product images available
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <div className="relative aspect-square overflow-hidden rounded-lg bg-white">
        <AnimatePresence mode="wait">
          <motion.div
            key={active.id}
            className="absolute inset-0"
            initial={reduceMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={reduceMotion ? undefined : { opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <Image
              src={active.src}
              alt={active.alt || productName}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className={
                active.id === "main"
                  ? "object-contain p-6"
                  : "object-cover"
              }
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {images.length > 1 && (
        <ul
          className="flex gap-2.5 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          aria-label="Product image thumbnails"
        >
          {images.map((image) => {
            const selected = image.id === active.id;
            return (
              <li key={image.id} className="shrink-0">
                <button
                  type="button"
                  onClick={() => setActiveId(image.id)}
                  aria-label={`Show ${image.alt}`}
                  aria-pressed={selected}
                  className={cn(
                    "relative h-16 w-16 overflow-hidden rounded-md border-2 bg-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-green sm:h-[72px] sm:w-[72px]",
                    selected
                      ? "border-brand-green"
                      : "border-transparent hover:border-brand-border",
                  )}
                >
                  <Image
                    src={image.src}
                    alt=""
                    fill
                    sizes="72px"
                    className={
                      image.id === "main" ? "object-contain p-1" : "object-cover"
                    }
                  />
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
