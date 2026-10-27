"use client";

import { FormEvent, useId, useLayoutEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { ArrowRight, QrCode } from "lucide-react";
import { verificationContent } from "@/data/content";
import { BarcodeScanner } from "@/components/verify/BarcodeScanner";
import { cn } from "@/lib/utils";

interface VerificationCardProps {
  className?: string;
  /** Show barcode guide label under the QR icon. */
  showBarcodeGuide?: boolean;
}

export function VerificationCard({
  className,
  showBarcodeGuide = true,
}: VerificationCardProps) {
  const router = useRouter();
  const reactId = useId();
  const inputId = `serial-number-${reactId}`;
  const headingId = `verify-heading-${reactId}`;
  const formRef = useRef<HTMLFormElement | null>(null);

  const [serial, setSerial] = useState("");
  const [status, setStatus] = useState<"idle" | "loading">("idle");

  // Next.js Activity keeps home mounted while hidden — clear on leave so
  // returning from result / other pages shows an empty field.
  useLayoutEffect(() => {
    return () => {
      setSerial("");
      setStatus("idle");
      formRef.current?.reset();
    };
  }, []);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const value = serial.trim();
    if (!value) {
      toast.error("Please enter a product number.");
      return;
    }
    if (value.length < 6) {
      toast.error("Product numbers are typically at least 6 characters.");
      return;
    }
    const normalized = value.toUpperCase().replace(/\s+/g, "");
    setStatus("loading");
    setSerial("");
    router.push(`/verify/result?barcode=${encodeURIComponent(normalized)}`);
  }

  return (
    <aside
      className={cn(
        "box-border w-full max-w-full overflow-hidden rounded-xl border border-brand-green/50 bg-[#12161c]/80 p-5 shadow-2xl backdrop-blur-md sm:p-6",
        className,
      )}
      aria-labelledby={headingId}
    >
      <div className="mb-4 flex min-w-0 items-start gap-2.5 sm:gap-3">
        <div className="flex shrink-0 flex-col items-center gap-1">
          <span
            className={cn(
              "flex h-9 w-9 items-center justify-center bg-brand-green/20 text-brand-green sm:h-10 sm:w-10",
              showBarcodeGuide ? "rounded-lg" : "rounded-full",
            )}
          >
            <QrCode
              className="h-4 w-4 sm:h-5 sm:w-5"
              strokeWidth={1.75}
              aria-hidden
            />
          </span>
          {showBarcodeGuide && (
            <span className="text-[9px] font-semibold tracking-wide text-brand-mint/90 uppercase">
              Barcode
            </span>
          )}
        </div>
        <div className="min-w-0 pt-0.5">
          <h2
            id={headingId}
            className="text-[15px] font-semibold tracking-wide text-white"
          >
            {verificationContent.title}
          </h2>
          <p className="mt-1 text-xs leading-relaxed text-white/65">
            {verificationContent.instruction}
          </p>
          {showBarcodeGuide && (
            <p className="mt-1.5 text-[11px] leading-snug text-white/45">
              Type the Product No. or use the camera to scan the module label.
            </p>
          )}
        </div>
      </div>

      <form
        ref={formRef}
        onSubmit={onSubmit}
        noValidate
        className="space-y-2"
      >
        <label htmlFor={inputId} className="sr-only">
          Product number
        </label>
        <BarcodeScanner
          onScan={(value) => {
            setSerial(value);
            if (status !== "idle") setStatus("idle");
          }}
          endAdornment={
            <button
              type="submit"
              disabled={status === "loading"}
              className="flex h-11 w-11 shrink-0 items-center justify-center bg-brand-green text-white transition-colors hover:bg-brand-green-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-brand-mint disabled:opacity-70"
              aria-label="Submit product number"
            >
              <ArrowRight className="h-4 w-4" />
            </button>
          }
        >
          <input
            id={inputId}
            name="serial"
            type="text"
            autoComplete="off"
            placeholder={verificationContent.placeholder}
            value={serial}
            onChange={(e) => {
              setSerial(e.target.value);
              if (status !== "idle") setStatus("idle");
            }}
            className="min-w-0 flex-1 bg-transparent px-3 py-2.5 text-sm text-white placeholder:text-white/40 focus:outline-none sm:px-3.5 sm:py-3"
          />
        </BarcodeScanner>
      </form>
    </aside>
  );
}
