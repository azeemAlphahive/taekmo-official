import type { Metadata } from "next";
import { LegalDocumentView } from "@/components/legal/LegalDocumentView";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Terms & Conditions | TAEKMO Solar",
  description:
    "TAEKMO Terms & Conditions for use of the official website and TAEKMO Solar mobile app.",
  path: "/terms",
  keywords: ["TAEKMO terms", "TAEKMO terms and conditions"],
});

export default function TermsPage() {
  return <LegalDocumentView slug="terms" />;
}
