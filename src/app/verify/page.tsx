import { VerifySection } from "@/components/home/VerifySection";
import { Button } from "@/components/ui/Button";
import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "Verify TAEKMO Product | Official Authenticity Check",
  description:
    "Verify your TAEKMO solar module Product No. or barcode in the official authenticity database. Confirm genuine TAEKMO panels before installation.",
  path: "/verify",
  keywords: [
    "verify TAEKMO",
    "TAEKMO authenticity",
    "TAEKMO barcode check",
    "genuine TAEKMO panel",
  ],
});

export default function VerifyPage() {
  return (
    <div>
      <VerifySection fullPage />

      <section className="border-t border-brand-border bg-white py-12 sm:py-14">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
          <h2 className="text-xl font-bold text-brand-ink">Need help?</h2>
          <p className="mt-2 text-sm text-brand-muted">
            If your Product No. is not found, contact support with a clear photo
            of the module label.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Button href="/support" variant="secondary">
              Support Center
            </Button>
            <Button href="/contact" variant="primary">
              Contact Us
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
