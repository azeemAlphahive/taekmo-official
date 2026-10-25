"use client";

import { FormEvent, useId, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { QrCode, RefreshCw, Search } from "lucide-react";
import { cn } from "@/lib/utils";

function createCaptchaCode(): string {
  const alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let code = "";
  for (let i = 0; i < 4; i += 1) {
    code += alphabet[Math.floor(Math.random() * alphabet.length)];
  }
  return code;
}

function captchaNoise(seed: string) {
  return Array.from({ length: 10 }, (_, i) => {
    const n = seed.charCodeAt(i % seed.length) + i * 17;
    return {
      left: `${10 + (n % 80)}%`,
      top: `${18 + ((n * 5) % 60)}%`,
      rotate: `${(n % 40) - 20}deg`,
      width: `${18 + (n % 16)}px`,
    };
  });
}

const inputClass =
  "h-11 w-full rounded-lg border border-white/20 bg-white/5 px-3.5 text-sm text-white outline-none transition-colors placeholder:text-white/35 focus:border-brand-green focus:ring-1 focus:ring-brand-green";

export function ProductVerificationForm({ className }: { className?: string }) {
  const router = useRouter();
  const uid = useId();
  const barcodeId = `barcode-${uid}`;
  const captchaId = `captcha-${uid}`;
  const feedbackId = `verify-feedback-${uid}`;

  /** Prefill for local UI testing — barcode + captcha match. */
  const [barcode, setBarcode] = useState("BC-650-DEMO01");
  const [captchaCode, setCaptchaCode] = useState("K7P2");
  const [captchaInput, setCaptchaInput] = useState("K7P2");
  const [fieldErrors, setFieldErrors] = useState<{
    barcode?: string;
    captcha?: string;
  }>({});
  const [status, setStatus] = useState<"idle" | "error" | "loading">("idle");
  const [message, setMessage] = useState("");

  const captchaPattern = captchaNoise(captchaCode);

  function clearStatus() {
    if (status !== "idle") {
      setStatus("idle");
      setMessage("");
    }
  }

  function refreshCaptcha() {
    const next = createCaptchaCode();
    setCaptchaCode(next);
    // Keep autofilled for testing so submit stays one-click
    setCaptchaInput(next);
    setFieldErrors((prev) => ({ ...prev, captcha: undefined }));
    clearStatus();
  }

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const code = barcode.trim();
    const captcha = captchaInput.trim().toUpperCase();
    const errors: { barcode?: string; captcha?: string } = {};

    if (!code) {
      errors.barcode = "Please input the product barcode.";
    } else if (code.length < 6) {
      errors.barcode = "Barcode should be at least 6 characters.";
    }

    if (!captcha) {
      errors.captcha = "Please enter the verification code.";
    } else if (captcha !== captchaCode) {
      errors.captcha = "Verification code does not match.";
    }

    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      setStatus("error");
      setMessage("Please fix the highlighted fields and try again.");
      if (errors.captcha === "Verification code does not match.") {
        const next = createCaptchaCode();
        setCaptchaCode(next);
        setCaptchaInput(next);
      }
      return;
    }

    setFieldErrors({});
    setStatus("loading");
    setMessage("Looking up product record…");
    router.push(`/verify/result?barcode=${encodeURIComponent(code)}`);
  }

  return (
    <aside
      className={cn(
        "w-full max-w-md rounded-xl border border-white/15 bg-[#12161c]/85 p-5 shadow-2xl backdrop-blur-md sm:p-6",
        className,
      )}
      aria-labelledby={`verify-form-title-${uid}`}
    >
      <div className="mb-5 flex items-start gap-3 border-b border-white/10 pb-5">
        <div className="flex flex-col items-center gap-1">
          <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-brand-green/20 text-brand-green">
            <QrCode className="h-5 w-5" strokeWidth={1.75} aria-hidden />
          </span>
          <span className="text-[9px] font-semibold tracking-wide text-brand-mint uppercase">
            Guide
          </span>
        </div>
        <div>
          <h2
            id={`verify-form-title-${uid}`}
            className="text-lg font-semibold text-white"
          >
            Verification form
          </h2>
          <p className="mt-1 text-xs leading-relaxed text-white/65">
            Enter the barcode from your module label and the on-screen
            verification code.
          </p>
          <p className="mt-2 text-[11px] leading-snug text-white/45">
            Barcode guide: find the number string on the front or back of the
            module.
          </p>
        </div>
      </div>

      <form onSubmit={onSubmit} noValidate className="space-y-4">
        <div>
          <label
            htmlFor={barcodeId}
            className="mb-1.5 block text-xs font-semibold tracking-wide text-white/80 uppercase"
          >
            Product barcode
          </label>
          <input
            id={barcodeId}
            name="barcode"
            type="text"
            autoComplete="off"
            placeholder="Enter product barcode"
            value={barcode}
            onChange={(e) => {
              setBarcode(e.target.value);
              setFieldErrors((prev) => ({ ...prev, barcode: undefined }));
              clearStatus();
            }}
            aria-invalid={Boolean(fieldErrors.barcode)}
            aria-describedby={
              fieldErrors.barcode ? `${barcodeId}-error` : undefined
            }
            className={cn(
              inputClass,
              fieldErrors.barcode && "border-red-400/70 focus:border-red-400",
            )}
          />
          {fieldErrors.barcode && (
            <p
              id={`${barcodeId}-error`}
              className="mt-1.5 text-[11px] text-red-300"
              role="alert"
            >
              {fieldErrors.barcode}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor={captchaId}
            className="mb-1.5 block text-xs font-semibold tracking-wide text-white/80 uppercase"
          >
            Verification code
          </label>
          <div className="grid grid-cols-[1fr_auto_auto] items-start gap-2">
            <input
              id={captchaId}
              name="captcha"
              type="text"
              autoComplete="off"
              inputMode="text"
              placeholder="Enter code"
              value={captchaInput}
              onChange={(e) => {
                setCaptchaInput(e.target.value);
                setFieldErrors((prev) => ({ ...prev, captcha: undefined }));
                clearStatus();
              }}
              aria-invalid={Boolean(fieldErrors.captcha)}
              aria-describedby={
                fieldErrors.captcha ? `${captchaId}-error` : undefined
              }
              className={cn(
                inputClass,
                fieldErrors.captcha && "border-red-400/70 focus:border-red-400",
              )}
            />

            <div
              className="relative flex h-11 w-[100px] items-center justify-center overflow-hidden rounded-lg border border-white/15 bg-gradient-to-br from-white/15 via-white/5 to-brand-green/10 shadow-inner backdrop-blur-sm select-none sm:w-[108px]"
              aria-hidden
            >
              {captchaPattern.map((line, index) => (
                <span
                  key={`${captchaCode}-${index}`}
                  className="absolute h-px bg-brand-mint/30"
                  style={{
                    left: line.left,
                    top: line.top,
                    width: line.width,
                    transform: `rotate(${line.rotate})`,
                  }}
                />
              ))}
              <span className="relative z-10 font-mono text-sm font-bold tracking-[0.28em] text-brand-mint">
                {captchaCode}
              </span>
            </div>

            <button
              type="button"
              onClick={refreshCaptcha}
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/20 text-white/70 transition-colors hover:border-brand-green hover:text-brand-mint focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-green"
              aria-label="Refresh verification code"
            >
              <RefreshCw className="h-4 w-4" strokeWidth={1.75} />
            </button>
          </div>
          {fieldErrors.captcha && (
            <p
              id={`${captchaId}-error`}
              className="mt-1.5 text-[11px] text-red-300"
              role="alert"
            >
              {fieldErrors.captcha}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={status === "loading"}
          className="flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-brand-green text-sm font-semibold tracking-wide text-white transition-colors hover:bg-brand-green-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-mint focus-visible:ring-offset-2 focus-visible:ring-offset-brand-ink disabled:opacity-70"
        >
          <Search className="h-4 w-4" aria-hidden />
          {status === "loading" ? "Searching…" : "Search"}
        </button>

        {message && (
          <p
            id={feedbackId}
            role={status === "error" ? "alert" : "status"}
            className={cn(
              "text-center text-xs leading-relaxed",
              status === "error" ? "text-red-300" : "text-brand-mint/90",
            )}
          >
            {message}
          </p>
        )}

        <div className="space-y-2.5 border-t border-white/10 pt-4">
          <p className="text-[11px] leading-relaxed text-white/55">
            The product barcode is a string of numbers on the front or back of
            the module, as shown below.
          </p>
          <div className="overflow-hidden rounded-lg border border-white/10 bg-white/5">
            <Image
              src="/images/verify/barcode-example.svg"
              alt="Example barcode label on a TAEKMO module"
              width={480}
              height={160}
              className="h-auto w-full opacity-90"
            />
          </div>
          <p className="text-[10px] leading-relaxed text-white/40">
            Try barcode <span className="text-brand-mint">TM-6A2B-84592173</span>{" "}
            + the on-screen code. Demo lookup only.
          </p>
        </div>
      </form>
    </aside>
  );
}
