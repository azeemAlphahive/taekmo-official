import type { Metadata } from "next";
import { VerifySection } from "@/components/home/VerifySection";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Verify Product",
  description:
    "Verify your TAEKMO product serial number. Demo mode until live verification is connected.",
};

export default function VerifyPage() {
  return (
    <div>
      <VerifySection fullPage />

      <section className="border-t border-brand-border bg-white py-12 sm:py-14">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
          <h2 className="text-xl font-bold text-brand-ink">Need help?</h2>
          <p className="mt-2 text-sm text-brand-muted">
            If your serial number does not look familiar, contact support and we
            will assist once live verification is available.
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
