"use client";

import { FormEvent, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/Button";

interface ProductInquiryFormProps {
  productName: string;
}

export function ProductInquiryForm({ productName }: ProductInquiryFormProps) {
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const note = String(data.get("message") ?? "").trim();
    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    if (!name || !emailOk || !note) {
      toast.error(
        "Please provide your name, a valid email, and a short message.",
      );
      return;
    }

    setLoading(true);
    const toastId = toast.loading("Sending inquiry…");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          message: note,
          subject: `Product inquiry: ${productName}`,
        }),
      });
      const payload = (await res.json()) as {
        message?: string;
        emailSkipped?: boolean;
      };
      if (!res.ok) {
        toast.error(payload.message || "Could not send inquiry.", {
          id: toastId,
        });
        return;
      }
      toast.success(
        payload.emailSkipped
          ? "Inquiry saved. Email delivery is not configured yet (add RESEND_API_KEY)."
          : "Inquiry sent. We will follow up soon.",
        { id: toastId },
      );
      form.reset();
    } catch {
      toast.error("Network error. Please try again.", { id: toastId });
    } finally {
      setLoading(false);
    }
  }

  return (
    <section
      id="inquire"
      className="rounded-lg border border-brand-border bg-[#f8faf9] p-5 sm:p-6"
      aria-labelledby="inquire-heading"
    >
      <h2
        id="inquire-heading"
        className="text-lg font-bold tracking-tight text-brand-ink"
      >
        Inquire about {productName}
      </h2>
      <p className="mt-1 text-sm text-brand-muted">
        Share your project details and we will follow up.
      </p>

      <form
        onSubmit={(e) => void onSubmit(e)}
        noValidate
        className="mt-5 grid gap-4 sm:grid-cols-2"
      >
        <div className="sm:col-span-1">
          <label
            htmlFor="inquire-name"
            className="mb-1.5 block text-xs font-semibold text-brand-ink"
          >
            Full name
          </label>
          <input
            id="inquire-name"
            name="name"
            type="text"
            autoComplete="name"
            className="w-full rounded-md border border-brand-border bg-white px-3 py-2.5 text-sm text-brand-ink outline-none transition-colors focus:border-brand-green focus:ring-1 focus:ring-brand-green"
          />
        </div>
        <div className="sm:col-span-1">
          <label
            htmlFor="inquire-email"
            className="mb-1.5 block text-xs font-semibold text-brand-ink"
          >
            Email
          </label>
          <input
            id="inquire-email"
            name="email"
            type="email"
            autoComplete="email"
            className="w-full rounded-md border border-brand-border bg-white px-3 py-2.5 text-sm text-brand-ink outline-none transition-colors focus:border-brand-green focus:ring-1 focus:ring-brand-green"
          />
        </div>
        <div className="sm:col-span-2">
          <label
            htmlFor="inquire-message"
            className="mb-1.5 block text-xs font-semibold text-brand-ink"
          >
            Message
          </label>
          <textarea
            id="inquire-message"
            name="message"
            rows={4}
            className="w-full resize-y rounded-md border border-brand-border bg-white px-3 py-2.5 text-sm text-brand-ink outline-none transition-colors focus:border-brand-green focus:ring-1 focus:ring-brand-green"
          />
        </div>
        <div className="sm:col-span-2">
          <Button type="submit" variant="primary" disabled={loading}>
            {loading ? "Sending…" : "Send Inquiry"}
          </Button>
        </div>
      </form>
    </section>
  );
}
