import type { Metadata } from "next";
import { LegalDocumentView } from "@/components/legal/LegalDocumentView";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Disclaimer | TAEKMO Solar",
  description:
    "TAEKMO Disclaimer — important notices about product information, warranties, and online content.",
  path: "/disclaimer",
  keywords: ["TAEKMO disclaimer", "TAEKMO product information"],
});

export default function DisclaimerPage() {
  return <LegalDocumentView slug="disclaimer" />;
}
