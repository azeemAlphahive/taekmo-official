"use client";

import { useState } from "react";
import { Download, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/Button";
import type { ProductDocument } from "@/types";

interface ProductActionButtonsProps {
  documents: ProductDocument[];
  inquiryHref?: string;
}

export function ProductActionButtons({
  documents,
  inquiryHref = "#inquire",
}: ProductActionButtonsProps) {
  const [message, setMessage] = useState("");
  const datasheet = documents.find((d) => d.type === "datasheet");

  function onDatasheetClick() {
    if (datasheet?.available && datasheet.href) {
      window.open(datasheet.href, "_blank", "noopener,noreferrer");
      return;
    }
    setMessage(
      "Datasheet is not available yet. Contact us and we will share it when published.",
    );
  }

  return (
    <div className="space-y-2">
      <div className="flex flex-col gap-2.5 sm:flex-row">
        {datasheet?.available && datasheet.href ? (
          <Button
            href={datasheet.href}
            variant="primary"
            className="flex-1"
            onClick={() => setMessage("")}
          >
            <Download className="h-4 w-4" aria-hidden />
            Download Datasheet
          </Button>
        ) : (
          <Button
            type="button"
            variant="primary"
            className="flex-1"
            onClick={onDatasheetClick}
            aria-describedby={message ? "datasheet-status" : undefined}
          >
            <Download className="h-4 w-4" aria-hidden />
            Download Datasheet
          </Button>
        )}
        <Button href={inquiryHref} variant="secondary" className="flex-1">
          <MessageSquare className="h-4 w-4" aria-hidden />
          Inquire Now
        </Button>
      </div>
      {message && (
        <p
          id="datasheet-status"
          role="status"
          className="text-xs text-brand-muted"
        >
          {message}
        </p>
      )}
    </div>
  );
}
