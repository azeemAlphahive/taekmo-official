import type { Metadata } from "next";
import { LegalDocumentView } from "@/components/legal/LegalDocumentView";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Privacy Policy | TAEKMO Solar",
  description:
    "TAEKMO Privacy Policy — how we collect, use, and protect information on our website and mobile app.",
  path: "/privacy",
  keywords: ["TAEKMO privacy policy", "TAEKMO data protection"],
});

export default function PrivacyPage() {
  return <LegalDocumentView slug="privacy" />;
}
