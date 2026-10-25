import type { Metadata } from "next";
import { Suspense } from "react";
import { redirect } from "next/navigation";
import { buildVerifyResult } from "@/data/verify";
import { VerificationResultView } from "@/components/verify/VerificationResultView";

export const metadata: Metadata = {
  title: "Verification Result",
  description: "TAEKMO product authenticity verification result (demo).",
};

async function ResultContent(props: PageProps<"/verify/result">) {
  const params = await props.searchParams;
  const barcode =
    typeof params.barcode === "string" ? params.barcode.trim() : "";

  if (!barcode || barcode.length < 6) {
    redirect("/verify");
  }

  const result = buildVerifyResult(barcode);

  return <VerificationResultView result={result} />;
}

function ResultFallback() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center bg-brand-ink pt-24 lg:pt-28">
      <p className="text-sm text-white/60">Loading verification result…</p>
    </div>
  );
}

export default function VerificationResultPage(
  props: PageProps<"/verify/result">,
) {
  return (
    <Suspense fallback={<ResultFallback />}>
      <ResultContent {...props} />
    </Suspense>
  );
}
