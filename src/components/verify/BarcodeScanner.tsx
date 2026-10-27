"use client";

import {
  useEffect,
  useId,
  useLayoutEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { usePathname } from "next/navigation";
import { ScanBarcode, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface BarcodeScannerProps {
  onScan: (value: string) => void;
  /** Product No. input rendered inside the field row. */
  children: ReactNode;
  /** Optional control after the scan button (e.g. submit). */
  endAdornment?: ReactNode;
  className?: string;
  rowClassName?: string;
}

export function BarcodeScanner({
  onScan,
  children,
  endAdornment,
  className,
  rowClassName,
}: BarcodeScannerProps) {
  const pathname = usePathname();
  const reactId = useId().replace(/:/g, "");
  const readerId = `barcode-reader-${reactId}`;
  const [open, setOpen] = useState(false);
  const [error, setError] = useState("");
  const [starting, setStarting] = useState(false);
  const openRef = useRef(false);
  const scannerRef = useRef<{
    stop: () => Promise<unknown>;
    clear: () => Promise<void> | void;
  } | null>(null);
  const handledRef = useRef(false);
  const onScanRef = useRef(onScan);

  openRef.current = open;
  onScanRef.current = onScan;

  function closeScanner() {
    setOpen(false);
    setError("");
    setStarting(false);
  }

  useLayoutEffect(() => {
    return () => {
      if (openRef.current) {
        setOpen(false);
        setError("");
        setStarting(false);
      }
    };
  }, []);

  const pathMounted = useRef(false);
  useEffect(() => {
    if (!pathMounted.current) {
      pathMounted.current = true;
      return;
    }
    closeScanner();
  }, [pathname]);

  useEffect(() => {
    if (!open) return;

    function onVisibility() {
      if (document.visibilityState === "hidden") closeScanner();
    }
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, [open]);

  useEffect(() => {
    if (!open) return;

    let cancelled = false;
    handledRef.current = false;
    setStarting(true);
    setError("");

    async function stopScanner() {
      const scanner = scannerRef.current;
      scannerRef.current = null;
      if (!scanner) return;
      try {
        await scanner.stop();
        await scanner.clear();
      } catch {
        /* already stopped */
      }
    }

    async function startWithCamera(
      Html5Qrcode: typeof import("html5-qrcode").Html5Qrcode,
      cameraConfig: MediaTrackConstraints | string,
    ) {
      const scanner = new Html5Qrcode(readerId, { verbose: false });
      scannerRef.current = scanner;

      await scanner.start(
        cameraConfig,
        {
          fps: 12,
          qrbox: (viewW, viewH) => {
            const width = Math.min(viewW * 0.88, 280);
            const height = Math.min(viewH * 0.42, 110);
            return { width, height };
          },
          aspectRatio: 1.333,
          disableFlip: false,
        },
        (decoded) => {
          if (handledRef.current) return;
          const value = decoded.trim();
          if (!value) return;
          handledRef.current = true;
          void stopScanner().then(() => {
            setOpen(false);
            setStarting(false);
            onScanRef.current(value.toUpperCase());
          });
        },
        () => {
          /* ignore frame miss */
        },
      );
    }

    async function start() {
      try {
        await new Promise((r) => requestAnimationFrame(() => r(undefined)));
        if (cancelled) return;

        const el = document.getElementById(readerId);
        if (!el) throw new Error("Scanner viewport missing");

        const { Html5Qrcode } = await import("html5-qrcode");
        if (cancelled) return;

        try {
          await startWithCamera(Html5Qrcode, { facingMode: "environment" });
        } catch {
          if (cancelled) return;
          await stopScanner();
          await startWithCamera(Html5Qrcode, { facingMode: "user" });
        }

        if (!cancelled) setStarting(false);
      } catch {
        if (!cancelled) {
          setStarting(false);
          setError(
            "Camera access failed. Allow camera permission or type the Product No. manually.",
          );
        }
      }
    }

    void start();

    return () => {
      cancelled = true;
      void stopScanner();
    };
  }, [open, readerId]);

  return (
    <div className={cn("w-full", className)}>
      <div
        className={cn(
          "flex overflow-hidden rounded-lg border border-white/20 bg-white/5 focus-within:border-brand-green focus-within:ring-1 focus-within:ring-brand-green",
          rowClassName,
        )}
      >
        {children}
        <button
          type="button"
          onClick={() => (open ? closeScanner() : setOpen(true))}
          className={cn(
            "inline-flex h-11 w-11 shrink-0 items-center justify-center border-l border-white/15 text-brand-mint transition-colors hover:bg-brand-green/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-green focus-visible:ring-inset",
            open && "bg-brand-green/15 text-white",
          )}
          aria-label={open ? "Close barcode scanner" : "Scan barcode with camera"}
          aria-expanded={open}
        >
          {open ? (
            <X className="h-4 w-4" strokeWidth={1.75} aria-hidden />
          ) : (
            <ScanBarcode className="h-5 w-5" strokeWidth={1.75} aria-hidden />
          )}
        </button>
        {endAdornment}
      </div>

      {open && (
        <div
          className="mt-3 overflow-hidden rounded-xl border border-brand-green/35 bg-black/35"
          role="region"
          aria-label="Barcode scanner"
        >
          <div className="flex items-center justify-between gap-2 border-b border-white/10 px-3 py-2">
            <p className="text-[11px] text-white/60">
              Point the camera at the module label
            </p>
            <button
              type="button"
              onClick={closeScanner}
              className="inline-flex h-7 w-7 items-center justify-center rounded-full border border-white/15 text-white/65 hover:text-white"
              aria-label="Close scanner"
            >
              <X className="h-3.5 w-3.5" aria-hidden />
            </button>
          </div>

          <div className="p-3">
            <div className="barcode-scanner-shell relative aspect-[16/10] w-full overflow-hidden rounded-lg border border-white/10 bg-black">
              <div
                id={readerId}
                className="barcode-scanner-reader absolute inset-0 h-full w-full"
              />
              {starting && !error && (
                <div className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center bg-black/55">
                  <p className="text-xs font-medium text-white/80">
                    Starting camera…
                  </p>
                </div>
              )}
            </div>

            {error ? (
              <p
                className="mt-2 text-center text-[11px] leading-relaxed text-red-300"
                role="alert"
              >
                {error}
              </p>
            ) : (
              <p className="mt-2 text-center text-[11px] text-white/45">
                Hold steady — scanning starts automatically
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
