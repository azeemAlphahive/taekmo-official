import Image from "next/image";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  /** light = white wordmark for dark headers; dark = black wordmark for light surfaces */
  variant?: "light" | "dark";
}

/**
 * Official TAEKMO wordmark from public/images/brand/.
 * light → taekmo-logo-light.png (white letters + green accents)
 * dark  → taekmo-logo.png (black letters + green accents)
 */
export function Logo({ className, variant = "light" }: LogoProps) {
  const src =
    variant === "light"
      ? "/images/brand/taekmo-logo-light.png"
      : "/images/brand/taekmo-logo.png";

  return (
    <span
      className={cn("inline-flex items-center", className)}
      aria-label="TAEKMO"
    >
      <Image
        src={src}
        alt="TAEKMO"
        width={168}
        height={56}
        priority
        className="h-12 w-auto"
      />
    </span>
  );
}
