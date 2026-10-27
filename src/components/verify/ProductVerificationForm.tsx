"use client";

import {
  FormEvent,
  useEffect,
  useId,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { QrCode, RefreshCw, Search } from "lucide-react";
import { BarcodeScanner } from "@/components/verify/BarcodeScanner";
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
  const formRef = useRef<HTMLFormElement | null>(null);

  const [barcode, setBarcode] = useState("");
  // Defer Math.random() to client effect — Next 16 blocks random during prerender.
  const [captchaCode, setCaptchaCode] = useState("");
  const [captchaInput, setCaptchaInput] = useState("");
  const [fieldErrors, setFieldErrors] = useState<{
    barcode?: string;
    captcha?: string;
  }>({});
  const [status, setStatus] = useState<"idle" | "loading">("idle");

  const captchaPattern = captchaCode ? captchaNoise(captchaCode) : [];

  useEffect(() => {
    setCaptchaCode(createCaptchaCode());
  }, []);

  // Next.js Activity keeps /verify mounted while hidden. Always clear on hide
  // so returning (back button or "Verify another") shows an empty form.
  useLayoutEffect(() => {
    return () => {
      setBarcode("");
      setCaptchaInput("");
      setCaptchaCode(createCaptchaCode());
      setFieldErrors({});
      setStatus("idle");
      formRef.current?.reset();
    };
  }, []);

  function refreshCaptcha() {
    const next = createCaptchaCode();
    setCaptchaCode(next);
    setCaptchaInput("");
    setFieldErrors((prev) => ({ ...prev, captcha: undefined }));
  }

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const code = barcode.trim();
    const captcha = captchaInput.trim().toUpperCase();
    const errors: { barcode?: string; captcha?: string } = {};

    if (!code) {
      errors.barcode = "Please input the product number.";
    } else if (code.length < 6) {
      errors.barcode = "Product number should be at least 6 characters.";
    }

    if (!captcha) {
      errors.captcha = "Please enter the verification code.";
    } else if (captcha !== captchaCode) {
      errors.captcha = "Verification code does not match.";
    }

    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      toast.error("Please fix the highlighted fields and try again.");
      if (errors.captcha === "Verification code does not match.") {
        setCaptchaCode(createCaptchaCode());
        setCaptchaInput("");
      }
      return;
    }

    const normalized = code.toUpperCase().replace(/\s+/g, "");
    setFieldErrors({});
    setStatus("loading");
    router.push(`/verify/result?barcode=${encodeURIComponent(normalized)}`);
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
            Enter the Product No. from your module label and the on-screen
            verification code.
          </p>
          <p className="mt-2 text-[11px] leading-snug text-white/45">
            Product No. is the unique code on the module (e.g.
            2604D72F2882009720).
          </p>
        </div>
      </div>

      <form
        ref={formRef}
        onSubmit={onSubmit}
        noValidate
        className="space-y-4"
      >
        <div>
          <label
            htmlFor={barcodeId}
            className="mb-1.5 block text-xs font-semibold tracking-wide text-white/80 uppercase"
          >
            Product No.
          </label>
          <BarcodeScanner
            rowClassName={fieldErrors.barcode ? "border-red-400/70" : undefined}
            onScan={(value) => {
              setBarcode(value);
              setFieldErrors((prev) => ({ ...prev, barcode: undefined }));
            }}
          >
            <input
              id={barcodeId}
              name="barcode"
              type="text"
              autoComplete="off"
              placeholder="e.g. 2604D72F2882009720"
              value={barcode}
              onChange={(e) => {
                setBarcode(e.target.value);
                setFieldErrors((prev) => ({ ...prev, barcode: undefined }));
              }}
              aria-invalid={Boolean(fieldErrors.barcode)}
              aria-describedby={
                fieldErrors.barcode ? `${barcodeId}-error` : undefined
              }
              className="h-11 min-w-0 flex-1 bg-transparent px-3.5 text-sm text-white outline-none placeholder:text-white/35"
            />
          </BarcodeScanner>
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

        <div className="space-y-2.5 border-t border-white/10 pt-4">
          <p className="text-[11px] leading-relaxed text-white/55">
            Type the Product No. or tap the camera icon to scan the barcode on
            the module label.
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
        </div>
      </form>
    </aside>
  );
}
