// app/admin/layout.tsx
// ─────────────────────────────────────────────────────────────────────────────
// Admin layout — selalu dark (bg-zinc-950) terlepas dari tema global.
// Ini adalah keputusan desain: admin panel = professional dark workspace.
// Menggunakan class langsung (bukan var) agar tidak terpengaruh ThemeProvider publik.
// ─────────────────────────────────────────────────────────────────────────────

import { redirect } from "next/navigation";
import { isAuthenticated } from "@/app/lib/auth";
import AdminSidebar from "@/app/components/admin/AdminSidebar";

export const metadata = {
  title: "Admin — Zielabs",
  robots: { index: false, follow: false },
};

export default async function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const authed = await isAuthenticated();

  if (!authed) {
    // Login page — tanpa sidebar, dark bg penuh
    return (
      <div className="min-h-screen bg-zinc-950 text-zinc-100">
        {children}
      </div>
    );
  }

  return (
    // Admin selalu dark: bg-zinc-950, teks zinc-100
    // Tidak menggunakan Tailwind dark: variant karena admin memang selalu gelap
    <div className="flex min-h-screen bg-zinc-950 text-zinc-100">
      <AdminSidebar />
      <main className="flex-1 overflow-y-auto">
        <div className="mx-auto max-w-7xl px-6 py-8">{children}</div>
      </main>
    </div>
  );
}
