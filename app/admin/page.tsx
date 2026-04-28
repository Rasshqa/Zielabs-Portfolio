// app/admin/page.tsx
// ─────────────────────────────────────────────────────────────────────────────
// Admin Dashboard — selalu dark (dikontrol oleh admin/layout.tsx).
// Komponen StatCard dan tabel menggunakan warna zinc yang konsisten.
// ─────────────────────────────────────────────────────────────────────────────

import { redirect } from "next/navigation";
import { isAuthenticated } from "@/app/lib/auth";
import { Package, Wrench, MessageSquareQuote, FolderOpen, CheckCircle } from "lucide-react";
import { prisma } from "@/app/lib/db";

interface StatCardProps {
  label: string;
  value: number;
  icon: React.ReactNode;
}

function StatCard({ label, value, icon }: StatCardProps) {
  return (
    <div className="flex items-center gap-4 rounded-2xl border border-white/5 bg-zinc-900/60 p-6 backdrop-blur-md transition-all duration-300 hover:border-[#50C878]/20 hover:bg-zinc-900">
      <div className="flex size-12 items-center justify-center rounded-xl bg-[#50C878]/10 text-[#50C878] flex-shrink-0">
        {icon}
      </div>
      <div>
        <p className="text-2xl font-bold text-zinc-100">{value}</p>
        <p className="text-xs uppercase tracking-wider text-zinc-500">{label}</p>
      </div>
    </div>
  );
}

export default async function AdminDashboardPage() {
  const authed = await isAuthenticated();
  if (!authed) redirect("/admin/login");

  const [productCount, serviceCount, testimonialCount, categoryCount] =
    await Promise.all([
      prisma.product.count(),
      prisma.service.count(),
      prisma.testimonial.count(),
      prisma.category.count(),
    ]);

  return (
    <div>
      {/* ── Header ──────────────────────────────────────── */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-zinc-100">Dashboard</h1>
        <p className="mt-1 text-sm text-zinc-500">
          Selamat datang di panel administrasi Zielabs.
        </p>
      </div>

      {/* ── Stats Grid ──────────────────────────────────── */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Products"     value={productCount}     icon={<Package          className="size-5" />} />
        <StatCard label="Services"     value={serviceCount}     icon={<Wrench           className="size-5" />} />
        <StatCard label="Testimonials" value={testimonialCount} icon={<MessageSquareQuote className="size-5" />} />
        <StatCard label="Categories"   value={categoryCount}    icon={<FolderOpen       className="size-5" />} />
      </div>

      {/* ── System Status ────────────────────────────────── */}
      <div className="mt-8 rounded-2xl border border-white/5 bg-zinc-900/60 p-6 backdrop-blur-md">
        <h2 className="mb-5 text-xs font-semibold uppercase tracking-widest text-zinc-400">
          Status Sistem
        </h2>
        <div className="space-y-3">
          {[
            { label: "Database", value: "Supabase PostgreSQL (Connected)" },
            { label: "Server",   value: "Next.js 16 — App Router" },
            { label: "Storage",  value: "Supabase Storage Bucket" },
          ].map((item) => (
            <div key={item.label} className="flex items-center gap-3 text-sm">
              <CheckCircle className="size-4 text-[#50C878] flex-shrink-0" />
              <span className="text-zinc-500 w-36">{item.label}:</span>
              <span className="text-zinc-300">{item.value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
