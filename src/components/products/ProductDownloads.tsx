import { Download, FileText } from "lucide-react";
import type { ProductDocument } from "@/types";
import { Button } from "@/components/ui/Button";

interface ProductDownloadsProps {
  documents: ProductDocument[];
}

export function ProductDownloads({ documents }: ProductDownloadsProps) {
  if (documents.length === 0) {
    return (
      <p className="rounded-lg border border-dashed border-brand-border bg-brand-surface/40 px-4 py-10 text-center text-sm text-brand-muted">
        No documents are published for this product yet.
      </p>
    );
  }

  return (
    <ul className="divide-y divide-brand-border overflow-hidden rounded-lg border border-brand-border">
      {documents.map((doc) => (
        <li
          key={doc.id}
          className="flex flex-col gap-3 bg-white px-4 py-4 sm:flex-row sm:items-center sm:justify-between"
        >
          <div className="flex items-start gap-3">
            <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-brand-green/10 text-brand-green">
              <FileText className="h-5 w-5" strokeWidth={1.75} aria-hidden />
            </span>
            <div>
              <p className="text-sm font-semibold text-brand-ink">{doc.title}</p>
              <p className="mt-0.5 text-xs text-brand-muted">{doc.fileName}</p>
              {!doc.available && (
                <p className="mt-1 text-[11px] font-medium text-amber-700">
                  Unavailable — file not published yet
                </p>
              )}
            </div>
          </div>
          {doc.available && doc.href ? (
            <Button
              href={doc.href}
              variant="secondary"
              className="shrink-0 px-4 py-2 text-xs"
            >
              <Download className="h-3.5 w-3.5" aria-hidden />
              Download
            </Button>
          ) : (
            <Button
              type="button"
              variant="secondary"
              className="shrink-0 px-4 py-2 text-xs"
              disabled
              aria-disabled="true"
            >
              Unavailable
            </Button>
          )}
        </li>
      ))}
    </ul>
  );
}
