"use client";

import { toast } from "sonner";
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
  const datasheet = documents.find((d) => d.type === "datasheet");

  function onDatasheetClick() {
    if (datasheet?.available && datasheet.href) {
      window.open(datasheet.href, "_blank", "noopener,noreferrer");
      return;
    }
    toast.message(
      "Datasheet is not available yet. Contact us and we will share it when published.",
    );
  }

  return (
    <div className="flex flex-col gap-2.5 sm:flex-row">
      {datasheet?.available && datasheet.href ? (
        <Button href={datasheet.href} variant="primary" className="flex-1">
          <Download className="h-4 w-4" aria-hidden />
          Download Datasheet
        </Button>
      ) : (
        <Button
          type="button"
          variant="primary"
          className="flex-1"
          onClick={onDatasheetClick}
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
  );
}
