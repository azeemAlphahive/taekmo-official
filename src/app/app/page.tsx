import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Download, Smartphone, ShieldCheck } from "lucide-react";
import { PageHero } from "@/components/layout/PageHero";
import { siteConfig } from "@/data/content";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Download TAEKMO Solar App | Android APK",
  description:
    "Download the official TAEKMO Solar Android app — verify product authenticity, browse modules, and contact sales on the go.",
  path: "/app",
  keywords: [
    "TAEKMO app download",
    "TAEKMO Android APK",
    "TAEKMO mobile app",
  ],
});

function qrSrc(data: string, size: number) {
  return `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&margin=12&data=${encodeURIComponent(data)}`;
}

export default function AppDownloadPage() {
  const apkUrl =
    process.env.NEXT_PUBLIC_ANDROID_APK_URL ?? siteConfig.androidApkUrl;

  return (
    <>
      <PageHero
        eyebrow="MOBILE APP"
        title="Download the TAEKMO App"
        description="Scan the QR code on your Android phone to install the official TAEKMO Solar app — verify panels, browse products, and reach our team."
      />

      <section className="bg-white py-12 sm:py-16 lg:py-20">
        <div className="mx-auto grid max-w-5xl gap-10 px-4 sm:px-6 lg:grid-cols-[1fr_1.1fr] lg:items-center lg:gap-14 lg:px-8">
          <div className="mx-auto w-full max-w-sm rounded-3xl border border-brand-border bg-brand-page p-6 shadow-sm sm:p-8">
            <div className="overflow-hidden rounded-2xl bg-white p-4">
              <Image
                src={qrSrc(apkUrl, 320)}
                alt="QR code to download the TAEKMO Solar Android APK"
                width={320}
                height={320}
                unoptimized
                className="mx-auto h-auto w-full"
                priority
              />
            </div>
            <p className="mt-4 text-center text-sm font-semibold text-brand-ink">
              Scan with your Android camera
            </p>
            <p className="mt-1 text-center text-xs leading-relaxed text-brand-muted">
              Opens the APK download — allow install from this source if asked.
            </p>
            <a
              href={apkUrl}
              download
              className="mt-5 flex h-12 w-full items-center justify-center gap-2 rounded-full bg-brand-green text-sm font-semibold text-white transition-colors hover:bg-brand-green-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-green focus-visible:ring-offset-2"
            >
              <Download className="h-4 w-4" aria-hidden />
              Download Android APK
            </a>
          </div>

          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-brand-green/25 bg-brand-green/10 px-3 py-1.5 text-xs font-semibold tracking-wide text-brand-green uppercase">
              <Smartphone className="h-3.5 w-3.5" aria-hidden />
              Android
            </div>
            <h2 className="mt-4 text-2xl font-bold tracking-tight text-brand-ink sm:text-3xl">
              Official TAEKMO Solar app
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-brand-muted sm:text-base">
              The same experience as our website — product catalogue,
              authenticity verification with barcode scan, contact, and more —
              built for phones.
            </p>

            <ul className="mt-8 space-y-4">
              {[
                "Verify genuine TAEKMO modules by Product No. or barcode",
                "Browse N-type solar panels and project solutions",
                "Contact sales and stay updated from your phone",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm text-brand-ink">
                  <ShieldCheck
                    className="mt-0.5 h-4 w-4 shrink-0 text-brand-green"
                    aria-hidden
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <div className="mt-8 rounded-2xl border border-brand-border bg-brand-page p-4 text-xs leading-relaxed text-brand-muted">
              <p className="font-semibold text-brand-ink">Install tip</p>
              <p className="mt-1">
                On first install, Android may ask to allow installs from your
                browser. iOS App Store build is not published yet — Android APK
                only for now.
              </p>
            </div>

            <p className="mt-6 text-sm text-brand-muted">
              Need help?{" "}
              <Link
                href="/contact"
                className="font-semibold text-brand-green hover:underline"
              >
                Contact support
              </Link>
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
