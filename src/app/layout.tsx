import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ScrollToTop } from "@/components/layout/ScrollToTop";
import { AppToaster } from "@/components/ui/AppToaster";
import { JsonLd } from "@/components/seo/JsonLd";
import { siteConfig } from "@/data/content";
import {
  organizationJsonLd,
  seoKeywords,
  websiteJsonLd,
} from "@/lib/seo";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  viewportFit: "cover",
  themeColor: "#099c2d",
};

export const metadata: Metadata = {
  title: {
    default:
      "TAEKMO Solar | Official Website — N-Type Solar Panels & Solutions",
    template: `%s | TAEKMO Solar`,
  },
  description: siteConfig.description,
  applicationName: "TAEKMO Solar",
  authors: [{ name: "TAEKMO", url: siteConfig.url }],
  creator: "TAEKMO",
  publisher: "TAEKMO",
  category: "Solar Energy",
  keywords: [...seoKeywords],
  metadataBase: new URL(siteConfig.url),
  alternates: {
    canonical: siteConfig.url,
  },
  // Icons live in /public only — avoid app/icon.png metadata routes (Turbopack refresh loop on Next 16).
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-32.png", type: "image/png", sizes: "32x32" },
      { url: "/favicon-16.png", type: "image/png", sizes: "16x16" },
      { url: "/icon.png", type: "image/png", sizes: "512x512" },
    ],
    apple: [{ url: "/apple-icon.png", type: "image/png", sizes: "180x180" }],
  },
  openGraph: {
    title: "TAEKMO Solar | Official Website",
    description: siteConfig.description,
    url: siteConfig.url,
    siteName: "TAEKMO Solar",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/images/hero/solar-farm.jpg",
        width: 1920,
        height: 1080,
        alt: "TAEKMO solar farm — clean energy modules",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "TAEKMO Solar | Official Website",
    description: siteConfig.description,
    images: ["/images/hero/solar-farm.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${inter.variable} h-full overflow-x-hidden antialiased`}>
      <body className="relative flex min-h-full w-full flex-col overflow-x-hidden bg-white font-sans text-brand-ink">
        <JsonLd data={[organizationJsonLd(), websiteJsonLd()]} />
        <Header />
        <main className="relative w-full max-w-full flex-1 overflow-x-hidden">
          {children}
        </main>
        <Footer />
        <ScrollToTop />
        <AppToaster />
      </body>
    </html>
  );
}
