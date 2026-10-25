"use client";

import { FormEvent, useState } from "react";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "error" | "demo">("idle");
  const [message, setMessage] = useState("");

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const note = String(data.get("message") ?? "").trim();
    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    if (!name || !emailOk || !note) {
      setStatus("error");
      setMessage("Please enter your name, a valid email, and a message.");
      return;
    }

    setStatus("demo");
    setMessage(
      "Demo only — your message was not sent. Email/CRM integration is not connected yet.",
    );
    form.reset();
  }

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      className="grid gap-4 rounded-lg border border-brand-border bg-white p-5 sm:p-6"
    >
      <div>
        <label htmlFor="contact-name" className="mb-1.5 block text-xs font-semibold text-brand-ink">
          Full name
        </label>
        <input
          id="contact-name"
          name="name"
          type="text"
          autoComplete="name"
          className="w-full rounded-md border border-brand-border px-3 py-2.5 text-sm outline-none focus:border-brand-green focus:ring-1 focus:ring-brand-green"
        />
      </div>
      <div>
        <label htmlFor="contact-email" className="mb-1.5 block text-xs font-semibold text-brand-ink">
          Email
        </label>
        <input
          id="contact-email"
          name="email"
          type="email"
          autoComplete="email"
          className="w-full rounded-md border border-brand-border px-3 py-2.5 text-sm outline-none focus:border-brand-green focus:ring-1 focus:ring-brand-green"
        />
      </div>
      <div>
        <label htmlFor="contact-message" className="mb-1.5 block text-xs font-semibold text-brand-ink">
          Message
        </label>
        <textarea
          id="contact-message"
          name="message"
          rows={5}
          className="w-full resize-y rounded-md border border-brand-border px-3 py-2.5 text-sm outline-none focus:border-brand-green focus:ring-1 focus:ring-brand-green"
        />
      </div>
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
        <Button type="submit" variant="primary">
          Send Message
        </Button>
        {message && (
          <p
            role={status === "error" ? "alert" : "status"}
            className={cn(
              "text-xs",
              status === "error" ? "text-red-600" : "text-brand-green",
            )}
          >
            {message}
          </p>
        )}
      </div>
    </form>
  );
}
