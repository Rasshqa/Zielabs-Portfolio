// app/components/admin/AdminSidebar.tsx
// ─────────────────────────────────────────────────────────────────────────────
// Admin Sidebar — selalu dark (di dalam admin/layout.tsx dark context).
// Dibersihkan: bg-zinc-950/90 → bg-zinc-950, border-white/5 dipertahankan
// karena ini memang dark panel. Badge "Admin" diperbaiki dari bg-zinc-800.
// ─────────────────────────────────────────────────────────────────────────────

"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Package,
  Wrench,
  MessageSquareQuote,
  LogOut,
  Tags,
} from "lucide-react";
import { cn } from "@/app/lib/utils";

interface NavItem {
  label: string;
  href: string;
  icon: React.ReactNode;
}

const NAV_ITEMS: NavItem[] = [
  { label: "Dashboard",   href: "/admin",               icon: <LayoutDashboard    className="size-4" /> },
  { label: "Products",    href: "/admin/products",      icon: <Package            className="size-4" /> },
  { label: "Services",    href: "/admin/services",      icon: <Wrench             className="size-4" /> },
  { label: "Testimonials",href: "/admin/testimonials",  icon: <MessageSquareQuote className="size-4" /> },
  { label: "Categories",  href: "/admin/categories",    icon: <Tags               className="size-4" /> },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="sticky top-0 flex h-screen w-64 flex-col border-r border-white/5 bg-zinc-950">
      {/* ── Brand ─────────────────────────────────────── */}
      <div className="flex h-16 items-center gap-3 border-b border-white/5 px-6">
        <Image
          src="/object/logo_zielabs.png"
          alt="Zielabs Logo"
          width={24}
          height={24}
          className="object-contain"
          loading="eager"
          priority
        />
        <span className="text-sm font-bold uppercase tracking-[0.2em] text-zinc-100">
          Zielabs
        </span>
        {/* Badge Admin */}
        <span className="ml-auto rounded-full border border-[#50C878]/20 bg-[#50C878]/10 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider text-[#50C878]">
          Admin
        </span>
      </div>

      {/* ── Navigation ────────────────────────────────── */}
      <nav className="flex-1 space-y-1 px-3 py-4">
        {NAV_ITEMS.map((item) => {
          const isActive =
            pathname === item.href ||
            (item.href !== "/admin" && pathname.startsWith(item.href));

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-150",
                isActive
                  ? "bg-[#50C878]/10 text-[#50C878] shadow-[inset_0_0_0_1px_rgba(80,200,120,0.15)]"
                  : "text-zinc-400 hover:bg-white/5 hover:text-zinc-200"
              )}
            >
              {item.icon}
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* ── Footer (Logout) ───────────────────────────── */}
      <div className="border-t border-white/5 p-3">
        <form action="/admin/logout" method="POST">
          <button
            type="submit"
            className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-zinc-500 transition-colors hover:bg-red-500/10 hover:text-red-400"
          >
            <LogOut className="size-4" />
            Logout
          </button>
        </form>
      </div>
    </aside>
  );
}
