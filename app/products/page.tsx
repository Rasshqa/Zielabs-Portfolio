// app/products/page.tsx
// ─────────────────────────────────────────────────────────────────────────────
// Server Component: fetch data, render static header.
// Semua interaktivitas (category filter) diserahkan ke ProductsClient.
// ─────────────────────────────────────────────────────────────────────────────

import type { Metadata } from "next";
import { getProducts, getCategories } from "@/app/actions/product.actions";
import TextReveal from "@/app/components/ui/TextReveal";
import FadeUp from "@/app/components/ui/FadeUp";
import ProductsClient from "./ProductsClient";

export const metadata: Metadata = {
  title: "Products",
  description: "Portofolio produk digital yang direkayasa oleh Zielabs.",
};

export default async function ProductsPage() {
  const [productsResult, categoriesResult] = await Promise.all([
    getProducts(),
    getCategories(),
  ]);

  const products = (productsResult.data ?? []).map((p) => ({
    id: p.id,
    title: p.title,
    slug: p.slug,
    description: p.description,
    imageUrl: p.imageUrl ?? null,
    liveUrl: p.liveUrl ?? null,
    category: {
      id: p.category.id,
      name: p.category.name,
      slug: p.category.slug,
    },
  }));

  const categories = categoriesResult.data ?? [];

  return (
    <main className="min-h-screen bg-zinc-50 dark:bg-[#050505] pt-32 pb-32 noise-bg relative overflow-hidden">
      <div className="scanlines" />
      {/* Ambient glow — dark mode only */}
      <div className="hidden dark:block absolute top-0 right-0 -mr-40 -mt-40 h-[600px] w-[600px] rounded-full bg-[#50C878]/5 blur-[120px] pointer-events-none" />

      {/* ── Static Header (Server Rendered) ───────────────────────── */}
      <section className="mx-auto max-w-7xl px-4 md:px-8 mb-4 relative z-10">
        <div className="max-w-3xl">
          <FadeUp delay={0.1}>
            <p className="mb-6 text-xs font-bold uppercase tracking-[0.4em] text-[#50C878]">
              Portfolio
            </p>
          </FadeUp>

          <h1 className="text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 md:text-6xl lg:text-7xl flex flex-col items-start gap-2">
            <TextReveal delay={0.1}>Digital Products</TextReveal>
            <TextReveal delay={0.2}>
              <span className="text-zinc-400 dark:text-zinc-600">We&apos;ve Built</span>
            </TextReveal>
          </h1>

          <FadeUp delay={0.3}>
            <p className="mt-8 max-w-xl text-base leading-relaxed text-zinc-500 dark:text-zinc-400">
              Setiap produk adalah bukti dari komitmen kami terhadap engineering excellence,
              scalable architecture, dan premium user experience.
            </p>
            <div className="mt-8 h-[2px] w-32 bg-gradient-to-r from-[#50C878] to-transparent" />
          </FadeUp>
        </div>
      </section>

      {/* ── Interactive Filter + Grid (Client Component) ──────────── */}
      <section className="relative z-10">
        <ProductsClient products={products} categories={categories} />
      </section>
    </main>
  );
}
