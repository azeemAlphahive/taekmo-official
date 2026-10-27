"use client";

import { FormEvent, useState } from "react";
import { toast } from "sonner";
import { LoaderCircle } from "lucide-react";
import { Button } from "@/components/ui/Button";

export function ContactForm() {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [statusText, setStatusText] = useState("");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (loading) return;

    const form = e.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();
    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    if (!name || !emailOk || !message) {
      const msg =
        "Please enter your name, a valid email, and a message.";
      setStatus("error");
      setStatusText(msg);
      toast.error(msg);
      return;
    }

    setLoading(true);
    setStatus("idle");
    setStatusText("");
    const toastId = toast.loading("Sending your message…");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message }),
      });

      let payload: {
        message?: string;
        emailSkipped?: boolean;
        emailError?: string | null;
      } = {};
      try {
        payload = (await res.json()) as typeof payload;
      } catch {
        /* non-JSON error page */
      }

      if (!res.ok) {
        const msg =
          payload.message ||
          `Could not send message (error ${res.status}). Please try again.`;
        setStatus("error");
        setStatusText(msg);
        toast.error(msg, { id: toastId });
        return;
      }

      const okMsg = payload.emailError
        ? "Message saved. Email could not be delivered yet — check EMAIL_FROM (use onboarding@resend.dev until your domain is verified)."
        : payload.emailSkipped
          ? "Message saved. Email delivery is not configured yet."
          : "Message sent. We will get back to you soon.";

      setStatus("success");
      setStatusText(okMsg);
      toast.success(okMsg, { id: toastId });
      form.reset();
    } catch {
      const msg = "Network error. Please try again.";
      setStatus("error");
      setStatusText(msg);
      toast.error(msg, { id: toastId });
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={(e) => void onSubmit(e)}
      noValidate
      className="grid gap-4 rounded-lg border border-brand-border bg-white p-5 sm:p-6"
    >
      <div>
        <label
          htmlFor="contact-name"
          className="mb-1.5 block text-xs font-semibold text-brand-ink"
        >
          Full name
        </label>
        <input
          id="contact-name"
          name="name"
          type="text"
          autoComplete="name"
          disabled={loading}
          className="w-full rounded-md border border-brand-border px-3 py-2.5 text-sm outline-none focus:border-brand-green focus:ring-1 focus:ring-brand-green disabled:opacity-60"
        />
      </div>
      <div>
        <label
          htmlFor="contact-email"
          className="mb-1.5 block text-xs font-semibold text-brand-ink"
        >
          Email
        </label>
        <input
          id="contact-email"
          name="email"
          type="email"
          autoComplete="email"
          disabled={loading}
          className="w-full rounded-md border border-brand-border px-3 py-2.5 text-sm outline-none focus:border-brand-green focus:ring-1 focus:ring-brand-green disabled:opacity-60"
        />
      </div>
      <div>
        <label
          htmlFor="contact-message"
          className="mb-1.5 block text-xs font-semibold text-brand-ink"
        >
          Message
        </label>
        <textarea
          id="contact-message"
          name="message"
          rows={5}
          disabled={loading}
          className="w-full resize-y rounded-md border border-brand-border px-3 py-2.5 text-sm outline-none focus:border-brand-green focus:ring-1 focus:ring-brand-green disabled:opacity-60"
        />
      </div>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <Button type="submit" variant="primary" disabled={loading}>
          {loading ? (
            <>
              <LoaderCircle className="h-4 w-4 animate-spin" aria-hidden />
              Sending…
            </>
          ) : (
            "Send Message"
          )}
        </Button>
        {status !== "idle" && statusText ? (
          <p
            role="status"
            className={
              status === "success"
                ? "text-sm text-brand-green"
                : "text-sm text-red-600"
            }
          >
            {statusText}
          </p>
        ) : null}
      </div>
    </form>
  );
}
