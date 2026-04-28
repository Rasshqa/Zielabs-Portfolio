// app/services/page.tsx
// ─────────────────────────────────────────────────────────────────────────────
// Theme-aware Services page. Semua hardcoded dark classes sudah diganti.
// Light: bg-zinc-50, card bg-white border-zinc-200 shadow-sm, text-zinc-900
// Dark : bg-zinc-950, card bg-zinc-950/60 border-white/5, text-zinc-100
// ─────────────────────────────────────────────────────────────────────────────

import type { Metadata } from "next";
import { Globe, Smartphone, ShoppingCart, Cloud, Monitor, Network } from "lucide-react";
import { getServices } from "@/app/actions/service.actions";
import TextReveal from "@/app/components/ui/TextReveal";
import TiltCard from "@/app/components/ui/TiltCard";
import FadeUp from "@/app/components/ui/FadeUp";

export const metadata: Metadata = {
  title: "Services",
  description: "Layanan pengembangan produk digital end-to-end dari Zielabs.",
};

const ICON_MAP: Record<string, React.ReactNode> = {
  Globe: <Globe className="size-8" />,
  Smartphone: <Smartphone className="size-8" />,
  ShoppingCart: <ShoppingCart className="size-8" />,
  Cloud: <Cloud className="size-8" />,
  Monitor: <Monitor className="size-8" />,
  Network: <Network className="size-8" />,
};

export default async function ServicesPage() {
  const result = await getServices();
  const services = result.data ?? [];

  return (
    <main className="min-h-screen bg-zinc-50 dark:bg-[#050505] pt-32 pb-32 noise-bg relative overflow-hidden">
      <div className="scanlines" />
      {/* Ambient glow — hanya terlihat di dark mode */}
      <div className="hidden dark:block absolute top-0 left-0 -ml-40 -mt-40 h-[600px] w-[600px] rounded-full bg-[#2660A4]/5 blur-[120px] pointer-events-none" />

      {/* ── Header ─────────────────────────────────────────────── */}
      <div className="mx-auto max-w-7xl px-4 md:px-8 mb-20 relative z-10">
        <FadeUp delay={0.1}>
          <p className="mb-6 text-xs font-bold uppercase tracking-[0.4em] text-[#50C878]">
            What We Do
          </p>
        </FadeUp>
        <h1 className="text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 md:text-6xl lg:text-7xl flex flex-col items-start gap-2">
          <TextReveal delay={0.1}>Solusi Digital</TextReveal>
          <TextReveal delay={0.2}>
            <span className="text-zinc-400 dark:text-zinc-600">End-to-End</span>
          </TextReveal>
        </h1>
        <FadeUp delay={0.3}>
          <p className="mt-8 max-w-xl text-base leading-relaxed text-zinc-500 dark:text-zinc-400">
            Dari ideasi hingga deployment, kami menyediakan layanan komprehensif
            untuk membangun produk digital yang reliable dan scalable.
          </p>
          <div className="mt-8 h-[2px] w-32 bg-gradient-to-r from-[#50C878] to-transparent" />
        </FadeUp>
      </div>

      {/* ── Grid ───────────────────────────────────────────────── */}
      <section className="mx-auto max-w-7xl px-4 md:px-8 relative z-10">
        {services.length === 0 ? (
          <FadeUp delay={0.2}>
            <div className="flex flex-col items-center justify-center py-24 text-center border border-zinc-200 dark:border-white/5 rounded-3xl glass-card mt-12">
              <span className="text-6xl select-none opacity-20 mb-6 drop-shadow-[0_0_15px_rgba(80,200,120,0.3)] text-[#50C878]">⬡</span>
              <h3 className="text-xl font-bold text-zinc-700 dark:text-zinc-200 mb-2 uppercase tracking-widest">
                No Services Found
              </h3>
              <p className="text-zinc-500 text-sm">
                Layanan sedang dipersiapkan dan belum ditambahkan ke database.
              </p>
            </div>
          </FadeUp>
        ) : (
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {services.map((service, idx) => (
              <FadeUp key={service.id} delay={0.1 * (idx + 1)}>
                <TiltCard>
                  <div className="group h-full rounded-3xl border border-zinc-200 dark:border-white/5 bg-white dark:bg-zinc-950/60 shadow-sm dark:shadow-none p-10 transition-all duration-500 hover:border-[#50C878]/40 dark:hover:border-[#50C878]/30 hover:shadow-md dark:hover:shadow-none overflow-hidden relative">
                    {/* Hover glow overlay */}
                    <div className="absolute -inset-px bg-gradient-to-br from-[#50C878]/8 dark:from-[#50C878]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl pointer-events-none" />

                    <div className="relative z-10">
                      {/* Icon */}
                      <div className="mb-8 flex size-16 items-center justify-center rounded-2xl bg-[#50C878]/10 text-[#50C878] transition-all duration-500 group-hover:scale-110 group-hover:bg-[#50C878] group-hover:text-zinc-950 group-hover:shadow-[0_0_25px_rgba(80,200,120,0.4)]">
                        {ICON_MAP[service.icon ?? "Globe"] ?? <Globe className="size-8" />}
                      </div>

                      {/* Title */}
                      <h3 className="mb-4 text-2xl font-bold text-zinc-900 dark:text-zinc-100 group-hover:text-zinc-950 dark:group-hover:text-white transition-colors">
                        {service.title}
                      </h3>

                      {/* Description */}
                      <p className="text-base leading-relaxed text-zinc-500 dark:text-zinc-400 group-hover:text-zinc-600 dark:group-hover:text-zinc-300 transition-colors">
                        {service.description}
                      </p>
                    </div>
                  </div>
                </TiltCard>
              </FadeUp>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
