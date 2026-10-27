"use client";

import { FormEvent, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { Lock, LogIn } from "lucide-react";
import { cn } from "@/lib/utils";

const inputClass =
  "h-11 w-full rounded-lg border border-white/15 bg-white/5 px-3.5 text-sm text-white outline-none placeholder:text-white/35 focus:border-brand-green focus:ring-1 focus:ring-brand-green";

export function AdminLoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      const data = (await res.json()) as { message?: string };
      if (!res.ok) {
        toast.error(data.message || "Login failed.");
        return;
      }
      toast.success("Signed in.");
      const next = searchParams.get("next") || "/admin";
      router.replace(next.startsWith("/admin") ? next : "/admin");
      router.refresh();
    } catch {
      toast.error("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4" noValidate>
      <div>
        <label
          htmlFor="admin-username"
          className="mb-1.5 block text-xs font-semibold tracking-wide text-white/70 uppercase"
        >
          Username
        </label>
        <input
          id="admin-username"
          name="username"
          autoComplete="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className={inputClass}
          required
        />
      </div>
      <div>
        <label
          htmlFor="admin-password"
          className="mb-1.5 block text-xs font-semibold tracking-wide text-white/70 uppercase"
        >
          Password
        </label>
        <input
          id="admin-password"
          name="password"
          type="password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={inputClass}
          required
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className={cn(
          "flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-brand-green text-sm font-semibold text-white transition-colors hover:bg-brand-green-dark disabled:opacity-70",
        )}
      >
        {loading ? (
          "Signing in…"
        ) : (
          <>
            <LogIn className="h-4 w-4" aria-hidden />
            Sign in
          </>
        )}
      </button>

      <p className="flex items-center justify-center gap-1.5 text-[11px] text-white/40">
        <Lock className="h-3 w-3" aria-hidden />
        Private admin access only
      </p>
    </form>
  );
}
