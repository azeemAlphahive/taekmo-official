import type { Metadata } from "next";
import { Suspense } from "react";
import { connection } from "next/server";
import { redirect } from "next/navigation";
import { lookupPanelByProductNo } from "@/data/verify";
import { DismissVerifyToasts } from "@/components/verify/DismissVerifyToasts";
import {
  VerificationNotFoundView,
  VerificationResultView,
} from "@/components/verify/VerificationResultView";

import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "TAEKMO Verification Result",
  description:
    "Official TAEKMO product authenticity verification result for your solar module Product No.",
  path: "/verify/result",
  keywords: ["TAEKMO verification result"],
  noIndex: true,
});

async function ResultContent(props: PageProps<"/verify/result">) {
  await connection();
  const params = await props.searchParams;
  const barcode =
    typeof params.barcode === "string" ? params.barcode.trim() : "";

  if (!barcode || barcode.length < 6) {
    redirect("/verify");
  }

  const result = await lookupPanelByProductNo(barcode);

  if (!result) {
    return (
      <VerificationNotFoundView
        code={barcode.toUpperCase().replace(/\s+/g, "")}
      />
    );
  }

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
    <>
      <DismissVerifyToasts />
      <Suspense fallback={<ResultFallback />}>
        <ResultContent {...props} />
      </Suspense>
    </>
  );
}
