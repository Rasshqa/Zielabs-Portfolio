// app/products/ProductsClient.tsx
// ─────────────────────────────────────────────────────────────────────────────
// Client Component: interaktif category filter + staggered product grid.
// Menerima data lengkap dari Server Component (products/page.tsx) dan
// menghandle state filter tanpa perlu refetch ke server.
// ─────────────────────────────────────────────────────────────────────────────

"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ProductCard from "@/app/components/ui/ProductCard";

interface Category {
  id: number;
  name: string;
  slug: string;
}

interface Product {
  id: number;
  title: string;
  slug: string;
  description: string;
  imageUrl: string | null;
  liveUrl: string | null;
  category: Category;
}

interface ProductsClientProps {
  products: Product[];
  categories: Category[];
}

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.05 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30, filter: "blur(4px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  },
};

const ALL_SLUG = "__all__";

export default function ProductsClient({ products, categories }: ProductsClientProps) {
  const [activeCategory, setActiveCategory] = useState<string>(ALL_SLUG);

  const filtered =
    activeCategory === ALL_SLUG
      ? products
      : products.filter((p) => p.category.slug === activeCategory);

  return (
    <>
      {/* ── Category Pills ─────────────────────────────────────────── */}
      <div className="mx-auto max-w-7xl px-4 md:px-8 mt-12 mb-10">
        <div className="flex flex-wrap gap-3">
          {/* Pill "Semua" */}
          <button
            onClick={() => setActiveCategory(ALL_SLUG)}
            className={[
              "rounded-full px-5 py-2 text-xs font-bold uppercase tracking-widest transition-all duration-300",
              activeCategory === ALL_SLUG
                ? "border border-[#50C878]/50 bg-[#50C878]/10 text-[#50C878] shadow-[0_0_15px_rgba(80,200,120,0.15)]"
                : "border border-zinc-200 dark:border-white/10 bg-zinc-100 dark:bg-zinc-900/50 text-zinc-500 dark:text-zinc-400 hover:border-[#50C878]/40 hover:text-[#50C878] hover:bg-[#50C878]/5",
            ].join(" ")}
          >
            Semua ({products.length})
          </button>

          {/* Pill per kategori */}
          {categories.map((cat) => {
            const count = products.filter((p) => p.category.slug === cat.slug).length;
            const isActive = activeCategory === cat.slug;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.slug)}
                className={[
                  "rounded-full px-5 py-2 text-xs font-bold uppercase tracking-widest transition-all duration-300",
                  isActive
                    ? "border border-[#50C878]/50 bg-[#50C878]/10 text-[#50C878] shadow-[0_0_15px_rgba(80,200,120,0.15)]"
                    : "border border-zinc-200 dark:border-white/10 bg-zinc-100 dark:bg-zinc-900/50 text-zinc-500 dark:text-zinc-400 hover:border-[#50C878]/40 hover:text-[#50C878] hover:bg-[#50C878]/5",
                ].join(" ")}
              >
                {cat.name} <span className="opacity-60">({count})</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* ── Product Grid ───────────────────────────────────────────── */}
      {filtered.length === 0 ? (
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center py-24 text-center border border-zinc-200 dark:border-white/5 rounded-3xl"
          >
            <span className="text-5xl select-none opacity-20 mb-4 text-[#50C878]">⬡</span>
            <p className="text-zinc-500 text-sm">
              Tidak ada produk dalam kategori ini.
            </p>
          </motion.div>
        </div>
      ) : (
        <AnimatePresence mode="wait">
          <motion.ul
            key={activeCategory}
            role="list"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit={{ opacity: 0 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-7xl mx-auto px-4 md:px-8 list-none p-0 m-0"
          >
            {filtered.map((product) => (
              <motion.li key={product.id} variants={itemVariants}>
                <ProductCard product={product} />
              </motion.li>
            ))}
          </motion.ul>
        </AnimatePresence>
      )}
    </>
  );
}
