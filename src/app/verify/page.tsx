import type { Metadata } from "next";
import { VerifySection } from "@/components/home/VerifySection";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Verify Product",
  description:
    "Verify your TAEKMO module Product No. in the authenticity database.",
};

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
