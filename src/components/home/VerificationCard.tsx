"use client";

import { FormEvent, useId, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, QrCode } from "lucide-react";
import { verificationContent } from "@/data/content";
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
  const feedbackId = `serial-feedback-${reactId}`;
  const headingId = `verify-heading-${reactId}`;

  /** Prefill for local UI testing — any valid model-style barcode. */
  const [serial, setSerial] = useState("BC-650-DEMO01");
  const [status, setStatus] = useState<"idle" | "error" | "loading">("idle");
  const [message, setMessage] = useState("");

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const value = serial.trim();
    if (!value) {
      setStatus("error");
      setMessage("Please enter a serial number.");
      return;
    }
    if (value.length < 6) {
      setStatus("error");
      setMessage("Serial numbers are typically at least 6 characters.");
      return;
    }
    setStatus("loading");
    setMessage("");
    router.push(`/verify/result?barcode=${encodeURIComponent(value)}`);
  }

  return (
    <aside
      className={cn(
        "w-full rounded-xl border border-brand-green/50 bg-[#12161c]/80 p-5 shadow-2xl backdrop-blur-md sm:p-6",
        className,
      )}
      aria-labelledby={headingId}
    >
      <div className="mb-4 flex items-start gap-3">
        <div className="flex flex-col items-center gap-1">
          <span
            className={cn(
              "flex h-10 w-10 items-center justify-center bg-brand-green/20 text-brand-green",
              showBarcodeGuide ? "rounded-lg" : "rounded-full",
            )}
          >
            <QrCode className="h-5 w-5" strokeWidth={1.75} aria-hidden />
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
              Barcode guide: use the serial / barcode printed on the module
              label.
            </p>
          )}
        </div>
      </div>

      <form onSubmit={onSubmit} noValidate className="space-y-2">
        <label htmlFor={inputId} className="sr-only">
          Product serial number
        </label>
        <div className="flex overflow-hidden rounded-lg border border-white/20 bg-white/5 focus-within:border-brand-green focus-within:ring-1 focus-within:ring-brand-green">
          <input
            id={inputId}
            name="serial"
            type="text"
            autoComplete="off"
            placeholder={verificationContent.placeholder}
            value={serial}
            onChange={(e) => {
              setSerial(e.target.value);
              if (status !== "idle") {
                setStatus("idle");
                setMessage("");
              }
            }}
            aria-invalid={status === "error"}
            aria-describedby={message ? feedbackId : undefined}
            className="min-w-0 flex-1 bg-transparent px-3.5 py-3 text-sm text-white placeholder:text-white/40 focus:outline-none"
          />
          <button
            type="submit"
            disabled={status === "loading"}
            className="flex w-11 shrink-0 items-center justify-center bg-brand-green text-white transition-colors hover:bg-brand-green-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-brand-mint disabled:opacity-70"
            aria-label="Submit serial number"
          >
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
        {message && (
          <p
            id={feedbackId}
            role="alert"
            className="text-[11px] leading-snug text-red-300"
          >
            {message}
          </p>
        )}
      </form>
    </aside>
  );
}
