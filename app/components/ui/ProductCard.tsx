// app/components/ui/ProductCard.tsx
// ─────────────────────────────────────────────────────────────────────────────
// Theme-aware ProductCard — semua warna menggunakan dark: variants.
//
// Light Mode: bg-white, border-zinc-200, shadow-sm, text-zinc-900
// Dark Mode : bg-zinc-950/90 glassmorphism, border-white/5, text-zinc-100
// ─────────────────────────────────────────────────────────────────────────────

"use client";

import Link from "next/link";
import Image from "next/image";
import TiltCard from "./TiltCard";
import { motion } from "framer-motion";

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

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <TiltCard>
      <div className="group relative flex h-full flex-col overflow-hidden rounded-2xl bg-white dark:bg-zinc-950/80 backdrop-blur-md border border-zinc-200 dark:border-white/5 shadow-sm dark:shadow-none transition-all duration-500 hover:border-[#50C878]/40 dark:hover:border-[#50C878]/30 hover:shadow-md dark:hover:shadow-none">

        {/* ── Animated Gradient Border (visible on hover) ── */}
        <div className="absolute inset-0 z-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
          <div className="absolute -inset-[2px] rounded-[18px] bg-gradient-to-r from-[#50C878]/40 via-transparent to-[#2660A4]/40 blur-sm dark:from-[#50C878]/50 dark:to-[#2660A4]/50" />
        </div>

        {/* ── Inner content container ── */}
        <div className="relative z-10 flex h-full flex-col bg-white dark:bg-zinc-950/90 rounded-2xl overflow-hidden">
          {/* ── Ambient glow overlay ── */}
          <div
            className="pointer-events-none absolute -inset-px opacity-0 bg-[radial-gradient(ellipse_at_top,rgba(80,200,120,0.06),transparent_70%)] dark:bg-[radial-gradient(ellipse_at_top,rgba(80,200,120,0.1),transparent_70%)] group-hover:opacity-100 transition-opacity duration-700"
            aria-hidden="true"
          />

          {/* ── Thumbnail ── */}
          <div className="relative aspect-video w-full overflow-hidden bg-zinc-100 dark:bg-zinc-900 border-b border-zinc-200 dark:border-white/5">
            {product.imageUrl ? (
              <Image
                src={product.imageUrl}
                alt={product.title}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center bg-zinc-100 dark:bg-zinc-900 noise-bg">
                <span className="text-zinc-400 dark:text-zinc-700 text-xs uppercase tracking-widest select-none">
                  No Preview
                </span>
              </div>
            )}
          </div>

          {/* ── Content ── */}
          <div className="flex flex-1 flex-col p-8 relative">
            <span className="mb-3 text-xs font-bold uppercase tracking-widest text-[#50C878]">
              {product.category.name}
            </span>

            <h3 className="mb-3 text-2xl font-bold leading-snug text-zinc-900 dark:text-zinc-100 group-hover:text-zinc-950 dark:group-hover:text-white transition-colors duration-200 truncate">
              {product.title}
            </h3>

            {/* Description dengan fade effect di bawah jika terlalu panjang */}
            <div className="relative mb-6 flex-1 max-h-[4.5rem] overflow-hidden">
              <p className="text-sm leading-relaxed text-zinc-500 dark:text-zinc-400 group-hover:text-zinc-600 dark:group-hover:text-zinc-300 transition-colors">
                {product.description}
              </p>
              {/* Gradient fade — memudar ke background card */}
              <div
                className="pointer-events-none absolute bottom-0 inset-x-0 h-8 bg-gradient-to-t from-white dark:from-zinc-950/90 to-transparent"
                aria-hidden="true"
              />
            </div>

            <div className="flex flex-wrap items-center gap-4 pt-5 border-t border-zinc-200 dark:border-white/5 min-h-[60px]">
              {product.liveUrl && (
                <Link
                  href={product.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="inline-flex items-center gap-2 text-sm font-medium text-zinc-500 dark:text-zinc-400 hover:text-[#50C878] transition-colors duration-200 link-underline"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="size-4" aria-hidden="true">
                    <path fillRule="evenodd" d="M4.22 11.78a.75.75 0 0 1 0-1.06L9.44 5.5H5.75a.75.75 0 0 1 0-1.5h5.5a.75.75 0 0 1 .75.75v5.5a.75.75 0 0 1-1.5 0V6.56l-5.22 5.22a.75.75 0 0 1-1.06 0Z" clipRule="evenodd" />
                  </svg>
                  Live Demo
                </Link>
              )}

              <Link
                href={`/products/${product.slug}`}
                className="ml-auto inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500 hover:text-[#50C878] transition-colors duration-200"
              >
                Details
                <motion.svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  className="size-4"
                  aria-hidden="true"
                  whileHover={{ x: 3 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <path fillRule="evenodd" d="M6.22 4.22a.75.75 0 0 1 1.06 0l3.25 3.25a.75.75 0 0 1 0 1.06l-3.25 3.25a.75.75 0 0 1-1.06-1.06L8.94 8 6.22 5.28a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
                </motion.svg>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </TiltCard>
  );
}
