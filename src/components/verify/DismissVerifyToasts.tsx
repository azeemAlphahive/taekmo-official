"use client";

import { useEffect } from "react";
import { toast } from "sonner";

/** Clears any leftover verify-form toasts when the result page mounts. */
export function DismissVerifyToasts() {
  useEffect(() => {
    toast.dismiss();
  }, []);

  return null;
}
