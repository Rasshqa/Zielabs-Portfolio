// app/products/loading.tsx
// ─────────────────────────────────────────────────────────────────────────────
// Products-specific loading skeleton — lebih presisi karena tahu layout-nya.
// Menampilkan skeleton untuk header + pills + grid 3 kolom.
// ─────────────────────────────────────────────────────────────────────────────

export default function ProductsLoading() {
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-[#050505] pt-32 pb-32 relative overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 md:px-8">

        {/* ── Header Skeleton ───────────────────────────────────── */}
        <div className="max-w-3xl mb-10">
          <div className="mb-6 h-3 w-20 rounded-full bg-zinc-200 dark:bg-zinc-800 animate-pulse" />
          <div className="flex flex-col gap-4">
            <div className="h-14 w-4/5 rounded-2xl bg-zinc-200 dark:bg-zinc-800 animate-pulse md:h-18 lg:h-20" />
            <div className="h-14 w-3/5 rounded-2xl bg-zinc-200 dark:bg-zinc-800 animate-pulse md:h-18 lg:h-20" />
          </div>
          <div className="mt-6 space-y-2 mb-8">
            <div className="h-4 w-full max-w-md rounded-full bg-zinc-200 dark:bg-zinc-800 animate-pulse" />
            <div className="h-4 w-72 rounded-full bg-zinc-200 dark:bg-zinc-800 animate-pulse" />
          </div>
          <div className="h-0.5 w-32 rounded-full bg-zinc-200 dark:bg-zinc-800 animate-pulse" />
        </div>

        {/* ── Category Pills Skeleton ───────────────────────────── */}
        <div className="flex flex-wrap gap-3 mb-10">
          {[80, 96, 72, 88, 64].map((w, i) => (
            <div
              key={i}
              className="h-8 rounded-full bg-zinc-200 dark:bg-zinc-800 animate-pulse"
              style={{ width: `${w}px`, animationDelay: `${i * 0.07}s` }}
            />
          ))}
        </div>

        {/* ── Product Card Grid Skeleton ────────────────────────── */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="rounded-2xl border border-zinc-200 dark:border-white/5 bg-white dark:bg-zinc-900/50 overflow-hidden shadow-sm dark:shadow-none"
            >
              {/* Image */}
              <div
                className="aspect-video w-full bg-zinc-200 dark:bg-zinc-800 animate-pulse"
                style={{ animationDelay: `${i * 0.06}s` }}
              />
              {/* Content */}
              <div className="p-6 space-y-3">
                <div className="h-3 w-24 rounded-full bg-zinc-200 dark:bg-zinc-800 animate-pulse" />
                <div className="h-6 w-4/5 rounded-lg bg-zinc-200 dark:bg-zinc-800 animate-pulse" />
                <div className="space-y-1.5 pt-1">
                  <div className="h-3 w-full rounded-full bg-zinc-200 dark:bg-zinc-800 animate-pulse" />
                  <div className="h-3 w-11/12 rounded-full bg-zinc-200 dark:bg-zinc-800 animate-pulse" />
                  <div className="h-3 w-4/6 rounded-full bg-zinc-200 dark:bg-zinc-800 animate-pulse" />
                </div>
                <div className="flex justify-between items-center pt-3 mt-2 border-t border-zinc-100 dark:border-white/5">
                  <div className="h-4 w-20 rounded-full bg-zinc-200 dark:bg-zinc-800 animate-pulse" />
                  <div className="h-4 w-16 rounded-full bg-zinc-200 dark:bg-zinc-800 animate-pulse" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
