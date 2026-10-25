import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ScrollToTop } from "@/components/layout/ScrollToTop";
import { siteConfig } from "@/data/content";
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
};

export const metadata: Metadata = {
  title: {
    default: `${siteConfig.name} Solar — Clean Energy for a Brighter Tomorrow`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  metadataBase: new URL(siteConfig.url),
  openGraph: {
    title: `${siteConfig.name} Solar`,
    description: siteConfig.description,
    url: siteConfig.url,
    siteName: siteConfig.name,
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/images/hero/solar-farm.jpg",
        width: 1920,
        height: 1080,
        alt: "TAEKMO solar farm at sunset",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} Solar`,
    description: siteConfig.description,
    images: ["/images/hero/solar-farm.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${inter.variable} h-full overflow-x-hidden antialiased`}>
      <body className="relative flex min-h-full w-full flex-col overflow-x-hidden bg-white font-sans text-brand-ink">
        <Header />
        <main className="relative w-full max-w-full flex-1 overflow-x-hidden">{children}</main>
        <Footer />
        <ScrollToTop />
      </body>
    </html>
  );
}
