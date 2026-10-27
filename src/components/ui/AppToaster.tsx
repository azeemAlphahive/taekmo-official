"use client";

import { Toaster } from "sonner";

export function AppToaster() {
  return (
    <Toaster
      position="top-center"
      richColors
      closeButton
      style={{ zIndex: 9999 }}
      toastOptions={{
        classNames: {
          toast:
            "!z-[9999] border border-white/10 bg-[#12161c] text-white shadow-xl",
          title: "text-sm font-medium text-white",
          description: "text-xs text-white/65",
          closeButton: "border-white/15 bg-white/5 text-white hover:bg-white/10",
        },
      }}
    />

  );
}
