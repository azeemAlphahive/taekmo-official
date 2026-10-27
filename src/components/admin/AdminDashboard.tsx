"use client";

import { FormEvent, useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  FileUp,
  LoaderCircle,
  LogOut,
  Mail,
  Package,
  Settings2,
  ShieldCheck,
  Trash2,
  Users,
} from "lucide-react";
import { cn } from "@/lib/utils";

type Tab = "panels" | "settings" | "contact" | "newsletter";

interface Stats {
  total: number;
  latestImportAt: string | null;
  latestSourceFile: string | null;
}

interface EmailSettings {
  notifyEmail: string;
  fromName: string;
  fromEmail: string;
  hasResendKey: boolean;
}

interface ContactRow {
  id: string;
  name: string;
  email: string;
  message: string;
  subject: string | null;
  status: string;
  adminNote: string | null;
  createdAt: string;
}

interface SubscriberRow {
  id: string;
  email: string;
  status: string;
  createdAt: string;
}

const inputClass =
  "h-10 w-full rounded-lg border border-white/15 bg-white/5 px-3 text-sm text-white outline-none placeholder:text-white/35 focus:border-brand-green focus:ring-1 focus:ring-brand-green";

const tabs: { id: Tab; label: string; icon: typeof Package }[] = [
  { id: "panels", label: "Panels", icon: Package },
  { id: "settings", label: "Email settings", icon: Settings2 },
  { id: "contact", label: "Contact", icon: Mail },
  { id: "newsletter", label: "Newsletter", icon: Users },
];

export function AdminDashboard() {
  const router = useRouter();
  const [tab, setTab] = useState<Tab>("panels");
  const [stats, setStats] = useState<Stats | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [uploadStatus, setUploadStatus] = useState<"idle" | "uploading">(
    "idle",
  );

  const [settings, setSettings] = useState<EmailSettings | null>(null);
  const [settingsSaving, setSettingsSaving] = useState(false);

  const [messages, setMessages] = useState<ContactRow[]>([]);
  const [subscribers, setSubscribers] = useState<SubscriberRow[]>([]);

  const handleUnauthorized = useCallback(() => {
    router.replace("/admin/login");
  }, [router]);

  const loadStats = useCallback(async () => {
    try {
      const res = await fetch("/api/admin/stats");
      if (res.status === 401) {
        handleUnauthorized();
        return;
      }
      if (!res.ok) return;
      setStats((await res.json()) as Stats);
    } catch {
      /* ignore */
    }
  }, [handleUnauthorized]);

  const loadSettings = useCallback(async () => {
    try {
      const res = await fetch("/api/admin/settings");
      if (res.status === 401) {
        handleUnauthorized();
        return;
      }
      if (!res.ok) return;
      setSettings((await res.json()) as EmailSettings);
    } catch {
      /* ignore */
    }
  }, [handleUnauthorized]);

  const loadMessages = useCallback(async () => {
    try {
      const res = await fetch("/api/admin/contact");
      if (res.status === 401) {
        handleUnauthorized();
        return;
      }
      if (!res.ok) return;
      const data = (await res.json()) as { messages: ContactRow[] };
      setMessages(data.messages);
    } catch {
      /* ignore */
    }
  }, [handleUnauthorized]);

  const loadSubscribers = useCallback(async () => {
    try {
      const res = await fetch("/api/admin/newsletter");
      if (res.status === 401) {
        handleUnauthorized();
        return;
      }
      if (!res.ok) return;
      const data = (await res.json()) as { subscribers: SubscriberRow[] };
      setSubscribers(data.subscribers);
    } catch {
      /* ignore */
    }
  }, [handleUnauthorized]);

  useEffect(() => {
    void loadStats();
  }, [loadStats]);

  useEffect(() => {
    if (tab === "settings") void loadSettings();
    if (tab === "contact") void loadMessages();
    if (tab === "newsletter") void loadSubscribers();
  }, [tab, loadSettings, loadMessages, loadSubscribers]);

  async function onLogout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.replace("/admin/login");
    router.refresh();
  }

  async function onUpload(e: FormEvent) {
    e.preventDefault();
    if (!file) {
      toast.error("Choose a PDF file first.");
      return;
    }

    setUploadStatus("uploading");
    const toastId = toast.loading(
      "Parsing PDF and saving panels to the database…",
    );

    try {
      const form = new FormData();
      form.append("file", file);
      const res = await fetch("/api/admin/import-pdf", {
        method: "POST",
        body: form,
      });

      let data: {
        message?: string;
        upserted?: number;
        sampleProductNo?: string;
        sourceFile?: string;
        debug?: { textLength?: number; preview?: string };
      } = {};
      try {
        data = (await res.json()) as typeof data;
      } catch {
        toast.error(
          `Upload failed (HTTP ${res.status}). The server may have timed out — try again.`,
          { id: toastId },
        );
        setUploadStatus("idle");
        return;
      }

      if (res.status === 401) {
        toast.dismiss(toastId);
        handleUnauthorized();
        return;
      }

      if (!res.ok) {
        const hint =
          data.debug?.preview && data.debug.preview.trim()
            ? ` Preview: ${data.debug.preview.slice(0, 180)}…`
            : data.debug?.textLength === 0
              ? " (PDF had no readable text.)"
              : "";
        toast.error((data.message || "Upload failed.") + hint, { id: toastId });
        setUploadStatus("idle");
        return;
      }

      toast.success(
        `Saved ${data.upserted ?? 0} panels from ${data.sourceFile ?? "PDF"}. Sample: ${data.sampleProductNo ?? "—"}`,
        { id: toastId },
      );
      setFile(null);
      setUploadStatus("idle");
      void loadStats();
    } catch {
      toast.error(
        "Network error while uploading. Check that the server is running and try again.",
        { id: toastId },
      );
      setUploadStatus("idle");
    }
  }

  async function onSaveSettings(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!settings) return;
    setSettingsSaving(true);
    try {
      const res = await fetch("/api/admin/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(settings),
      });
      const data = (await res.json()) as { message?: string } & Partial<EmailSettings>;
      if (res.status === 401) {
        handleUnauthorized();
        return;
      }
      if (!res.ok) {
        toast.error(data.message || "Could not save settings.");
        return;
      }
      setSettings((prev) =>
        prev
          ? {
              ...prev,
              notifyEmail: data.notifyEmail ?? prev.notifyEmail,
              fromName: data.fromName ?? prev.fromName,
              fromEmail: data.fromEmail ?? prev.fromEmail,
            }
          : prev,
      );
      toast.success("Email settings saved.");
    } catch {
      toast.error("Network error while saving settings.");
    } finally {
      setSettingsSaving(false);
    }
  }

  async function updateMessage(
    id: string,
    patch: Partial<Pick<ContactRow, "status" | "adminNote" | "name" | "email" | "message">>,
  ) {
    const res = await fetch("/api/admin/contact", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, ...patch }),
    });
    if (res.status === 401) {
      handleUnauthorized();
      return;
    }
    if (!res.ok) {
      const data = (await res.json()) as { message?: string };
      toast.error(data.message || "Update failed.");
      return;
    }
    toast.success("Message updated.");
    void loadMessages();
  }

  async function deleteMessage(id: string) {
    if (!window.confirm("Delete this contact message?")) return;
    const res = await fetch(`/api/admin/contact?id=${encodeURIComponent(id)}`, {
      method: "DELETE",
    });
    if (res.status === 401) {
      handleUnauthorized();
      return;
    }
    if (!res.ok) {
      toast.error("Delete failed.");
      return;
    }
    toast.success("Message deleted.");
    void loadMessages();
  }

  async function updateSubscriber(
    id: string,
    patch: Partial<Pick<SubscriberRow, "status" | "email">>,
  ) {
    const res = await fetch("/api/admin/newsletter", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, ...patch }),
    });
    if (res.status === 401) {
      handleUnauthorized();
      return;
    }
    if (!res.ok) {
      const data = (await res.json()) as { message?: string };
      toast.error(data.message || "Update failed.");
      return;
    }
    toast.success("Subscriber updated.");
    void loadSubscribers();
  }

  async function deleteSubscriber(id: string) {
    if (!window.confirm("Delete this subscriber?")) return;
    const res = await fetch(
      `/api/admin/newsletter?id=${encodeURIComponent(id)}`,
      { method: "DELETE" },
    );
    if (res.status === 401) {
      handleUnauthorized();
      return;
    }
    if (!res.ok) {
      toast.error("Delete failed.");
      return;
    }
    toast.success("Subscriber deleted.");
    void loadSubscribers();
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:py-14">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-[11px] font-semibold tracking-[0.2em] text-brand-mint uppercase">
            Private admin
          </p>
          <h1 className="mt-2 text-2xl font-bold tracking-tight text-white sm:text-3xl">
            TAEKMO console
          </h1>
          <p className="mt-2 max-w-lg text-sm text-white/55">
            Manage panel imports, contact inbox, newsletter list, and email
            delivery settings.
          </p>
        </div>
        <button
          type="button"
          onClick={() => void onLogout()}
          className="inline-flex items-center gap-2 rounded-lg border border-white/15 px-3 py-2 text-sm text-white/80 transition-colors hover:border-white/30 hover:text-white"
        >
          <LogOut className="h-4 w-4" aria-hidden />
          Sign out
        </button>
      </div>

      <div className="mt-8 flex flex-wrap gap-2 border-b border-white/10 pb-3">
        {tabs.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => setTab(item.id)}
            className={cn(
              "inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition-colors",
              tab === item.id
                ? "bg-brand-green/20 text-brand-mint"
                : "text-white/60 hover:bg-white/5 hover:text-white",
            )}
          >
            <item.icon className="h-4 w-4" aria-hidden />
            {item.label}
          </button>
        ))}
      </div>

      {tab === "panels" && (
        <>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl border border-white/10 bg-white/5 p-5">
              <div className="flex items-center gap-2 text-brand-mint">
                <Package className="h-4 w-4" aria-hidden />
                <p className="text-xs font-semibold tracking-wide uppercase">
                  Panels in database
                </p>
              </div>
              <p className="mt-3 text-3xl font-bold text-white">
                {stats ? stats.total.toLocaleString() : "—"}
              </p>
            </div>
            <div className="rounded-xl border border-white/10 bg-white/5 p-5">
              <div className="flex items-center gap-2 text-brand-mint">
                <ShieldCheck className="h-4 w-4" aria-hidden />
                <p className="text-xs font-semibold tracking-wide uppercase">
                  Latest import
                </p>
              </div>
              <p className="mt-3 text-sm font-medium text-white">
                {stats?.latestSourceFile || "No imports yet"}
              </p>
              <p className="mt-1 text-xs text-white/45">
                {stats?.latestImportAt
                  ? new Date(stats.latestImportAt).toLocaleString()
                  : "—"}
              </p>
            </div>
          </div>

          <form
            onSubmit={(e) => void onUpload(e)}
            className="mt-8 rounded-2xl border border-white/10 bg-[#121a16] p-5 sm:p-6"
          >
            <h2 className="text-lg font-semibold text-white">Upload PDF</h2>
            <p className="mt-1 text-sm text-white/55">
              Select a TAEKMO Flash Testing Report (`.pdf`). Existing Product
              Nos. are updated safely.
            </p>

            <label
              htmlFor="admin-pdf"
              className={cn(
                "mt-5 flex cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-white/20 bg-white/5 px-4 py-10 text-center transition-colors hover:border-brand-green/50 hover:bg-brand-green/5",
              )}
            >
              <FileUp className="h-8 w-8 text-brand-mint" aria-hidden />
              <span className="text-sm font-medium text-white">
                {file ? file.name : "Choose PDF file"}
              </span>
              <span className="text-xs text-white/45">
                Drag & drop is not required — click to browse
              </span>
              <input
                id="admin-pdf"
                type="file"
                accept="application/pdf,.pdf"
                className="sr-only"
                onChange={(e) => {
                  setFile(e.target.files?.[0] ?? null);
                  setUploadStatus("idle");
                }}
              />
            </label>

            <button
              type="submit"
              disabled={uploadStatus === "uploading" || !file}
              className="mt-5 flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-brand-green text-sm font-semibold text-white transition-colors hover:bg-brand-green-dark disabled:cursor-not-allowed disabled:opacity-60"
            >
              {uploadStatus === "uploading" ? (
                <>
                  <LoaderCircle className="h-4 w-4 animate-spin" aria-hidden />
                  Importing…
                </>
              ) : (
                <>
                  <FileUp className="h-4 w-4" aria-hidden />
                  Extract &amp; save to database
                </>
              )}
            </button>
          </form>
        </>
      )}

      {tab === "settings" && (
        <form
          onSubmit={(e) => void onSaveSettings(e)}
          className="mt-8 space-y-4 rounded-2xl border border-white/10 bg-[#121a16] p-5 sm:p-6"
        >
          <h2 className="text-lg font-semibold text-white">Email settings</h2>
          <p className="text-sm text-white/55">
            These values are stored in the database. Set{" "}
            <code className="text-brand-mint">RESEND_API_KEY</code> in{" "}
            <code className="text-brand-mint">.env</code> to send mail.
          </p>
          {settings && (
            <p
              className={cn(
                "text-xs",
                settings.hasResendKey ? "text-brand-mint" : "text-amber-300",
              )}
            >
              {settings.hasResendKey
                ? "Resend API key detected."
                : "RESEND_API_KEY missing — forms still save to DB, but emails are skipped."}
            </p>
          )}

          <div>
            <label className="mb-1.5 block text-xs font-semibold tracking-wide text-white/70 uppercase">
              Notify email (inbox)
            </label>
            <input
              className={inputClass}
              value={settings?.notifyEmail ?? ""}
              onChange={(e) =>
                setSettings((s) =>
                  s ? { ...s, notifyEmail: e.target.value } : s,
                )
              }
              placeholder="you@company.com"
            />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-xs font-semibold tracking-wide text-white/70 uppercase">
                From name
              </label>
              <input
                className={inputClass}
                value={settings?.fromName ?? ""}
                onChange={(e) =>
                  setSettings((s) =>
                    s ? { ...s, fromName: e.target.value } : s,
                  )
                }
                placeholder="TAEKMO"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-semibold tracking-wide text-white/70 uppercase">
                From email
              </label>
              <input
                className={inputClass}
                value={settings?.fromEmail ?? ""}
                onChange={(e) =>
                  setSettings((s) =>
                    s ? { ...s, fromEmail: e.target.value } : s,
                  )
                }
                placeholder="onboarding@resend.dev"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={settingsSaving || !settings}
            className="flex h-11 items-center justify-center rounded-lg bg-brand-green px-5 text-sm font-semibold text-white hover:bg-brand-green-dark disabled:opacity-60"
          >
            {settingsSaving ? "Saving…" : "Save settings"}
          </button>
        </form>
      )}

      {tab === "contact" && (
        <div className="mt-8 space-y-4">
          <div className="flex items-center justify-between gap-3">
            <h2 className="text-lg font-semibold text-white">
              Contact messages ({messages.length})
            </h2>
            <button
              type="button"
              onClick={() => void loadMessages()}
              className="text-xs text-brand-mint hover:underline"
            >
              Refresh
            </button>
          </div>
          {messages.length === 0 ? (
            <p className="rounded-xl border border-white/10 bg-white/5 p-5 text-sm text-white/55">
              No messages yet.
            </p>
          ) : (
            messages.map((m) => (
              <article
                key={m.id}
                className="rounded-xl border border-white/10 bg-[#121a16] p-4 sm:p-5"
              >
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <p className="font-medium text-white">{m.name}</p>
                    <p className="text-xs text-white/50">{m.email}</p>
                    {m.subject && (
                      <p className="mt-1 text-xs text-brand-mint">{m.subject}</p>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <select
                      value={m.status}
                      onChange={(e) =>
                        void updateMessage(m.id, { status: e.target.value })
                      }
                      className="h-9 rounded-lg border border-white/15 bg-white/5 px-2 text-xs text-white"
                    >
                      <option value="new">new</option>
                      <option value="read">read</option>
                      <option value="archived">archived</option>
                    </select>
                    <button
                      type="button"
                      onClick={() => void deleteMessage(m.id)}
                      className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-white/15 text-red-300 hover:bg-red-500/10"
                      aria-label="Delete message"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
                <p className="mt-3 whitespace-pre-wrap text-sm text-white/75">
                  {m.message}
                </p>
                <label className="mt-3 block text-[10px] font-semibold tracking-wide text-white/45 uppercase">
                  Admin note
                </label>
                <textarea
                  defaultValue={m.adminNote ?? ""}
                  rows={2}
                  className="mt-1 w-full rounded-lg border border-white/15 bg-white/5 px-3 py-2 text-sm text-white outline-none focus:border-brand-green"
                  onBlur={(e) => {
                    const next = e.target.value.trim();
                    if (next === (m.adminNote ?? "")) return;
                    void updateMessage(m.id, { adminNote: next });
                  }}
                />
                <p className="mt-2 text-[11px] text-white/40">
                  {new Date(m.createdAt).toLocaleString()}
                </p>
              </article>
            ))
          )}
        </div>
      )}

      {tab === "newsletter" && (
        <div className="mt-8 space-y-4">
          <div className="flex items-center justify-between gap-3">
            <h2 className="text-lg font-semibold text-white">
              Subscribers ({subscribers.length})
            </h2>
            <button
              type="button"
              onClick={() => void loadSubscribers()}
              className="text-xs text-brand-mint hover:underline"
            >
              Refresh
            </button>
          </div>
          {subscribers.length === 0 ? (
            <p className="rounded-xl border border-white/10 bg-white/5 p-5 text-sm text-white/55">
              No subscribers yet.
            </p>
          ) : (
            <div className="overflow-x-auto rounded-xl border border-white/10">
              <table className="min-w-full text-left text-sm text-white/80">
                <thead className="bg-white/5 text-xs uppercase tracking-wide text-white/45">
                  <tr>
                    <th className="px-4 py-3 font-semibold">Email</th>
                    <th className="px-4 py-3 font-semibold">Status</th>
                    <th className="px-4 py-3 font-semibold">Joined</th>
                    <th className="px-4 py-3 font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {subscribers.map((s) => (
                    <tr key={s.id} className="border-t border-white/10">
                      <td className="px-4 py-3">
                        <input
                          className="h-9 w-full min-w-[180px] rounded-md border border-white/10 bg-transparent px-2 text-sm text-white"
                          defaultValue={s.email}
                          onBlur={(e) => {
                            const next = e.target.value.trim().toLowerCase();
                            if (!next || next === s.email) return;
                            void updateSubscriber(s.id, { email: next });
                          }}
                        />
                      </td>
                      <td className="px-4 py-3">
                        <select
                          value={s.status}
                          onChange={(e) =>
                            void updateSubscriber(s.id, {
                              status: e.target.value,
                            })
                          }
                          className="h-9 rounded-md border border-white/15 bg-white/5 px-2 text-xs text-white"
                        >
                          <option value="active">active</option>
                          <option value="unsubscribed">unsubscribed</option>
                        </select>
                      </td>
                      <td className="px-4 py-3 text-xs text-white/45">
                        {new Date(s.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-4 py-3">
                        <button
                          type="button"
                          onClick={() => void deleteSubscriber(s.id)}
                          className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-white/15 text-red-300 hover:bg-red-500/10"
                          aria-label="Delete subscriber"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
