import { Suspense } from "react";
import { AdminLoginForm } from "@/components/admin/AdminLoginForm";

export default function AdminLoginPage() {
  return (
    <div className="flex min-h-full items-center justify-center px-4 py-16">
      <div className="w-full max-w-md rounded-2xl border border-white/10 bg-[#121a16] p-6 shadow-2xl sm:p-8">
        <p className="text-[11px] font-semibold tracking-[0.2em] text-brand-mint uppercase">
          TAEKMO
        </p>
        <h1 className="mt-2 text-2xl font-bold tracking-tight text-white">
          Admin sign in
        </h1>
        <p className="mt-2 text-sm text-white/55">
          Sign in to upload panel reports and manage verification data.
        </p>
        <div className="mt-8">
          <Suspense
            fallback={
              <p className="text-sm text-white/50">Loading sign-in…</p>
            }
          >
            <AdminLoginForm />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
