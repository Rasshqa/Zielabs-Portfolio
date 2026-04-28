// app/products/[slug]/loading.tsx
// ─────────────────────────────────────────────────────────────────────────────
// Loading skeleton untuk product detail page.
// ─────────────────────────────────────────────────────────────────────────────

export default function ProductDetailLoading() {
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-[#050505] pt-28 pb-32 relative overflow-hidden">
      <div className="mx-auto max-w-5xl px-4 md:px-8">

        {/* Back button skeleton */}
        <div className="h-5 w-36 rounded-full bg-zinc-200 dark:bg-zinc-800 animate-pulse mb-10" />

        {/* Badge skeleton */}
        <div className="h-7 w-28 rounded-full bg-zinc-200 dark:bg-zinc-800 animate-pulse mb-5" />

        {/* Title skeleton */}
        <div className="flex flex-col gap-3 mb-8">
          <div className="h-12 w-3/4 rounded-2xl bg-zinc-200 dark:bg-zinc-800 animate-pulse lg:h-14" />
          <div className="h-12 w-1/2 rounded-2xl bg-zinc-200 dark:bg-zinc-800 animate-pulse lg:h-14" />
        </div>

        {/* CTA button skeleton */}
        <div className="h-10 w-36 rounded-full bg-zinc-200 dark:bg-zinc-800 animate-pulse mb-12" />

        {/* Hero image skeleton */}
        <div className="w-full aspect-video rounded-3xl bg-zinc-200 dark:bg-zinc-800 animate-pulse mb-14" />

        {/* Body grid */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Description */}
          <div className="lg:col-span-2 rounded-3xl border border-zinc-200 dark:border-white/5 bg-white dark:bg-zinc-900/40 p-8 shadow-sm dark:shadow-none">
            <div className="h-3 w-28 rounded-full bg-zinc-200 dark:bg-zinc-800 animate-pulse mb-6" />
            <div className="space-y-3">
              {[100, 95, 88, 93, 80, 70].map((w, i) => (
                <div
                  key={i}
                  className="h-4 rounded-full bg-zinc-200 dark:bg-zinc-800 animate-pulse"
                  style={{ width: `${w}%`, animationDelay: `${i * 0.05}s` }}
                />
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="flex flex-col gap-5">
            {[1, 2, 3].map((n) => (
              <div
                key={n}
                className="rounded-3xl border border-zinc-200 dark:border-white/5 bg-white dark:bg-zinc-900/40 p-6 shadow-sm dark:shadow-none"
              >
                <div className="flex items-center gap-2 mb-4">
                  <div className="size-4 rounded-full bg-zinc-200 dark:bg-zinc-800 animate-pulse" />
                  <div className="h-3 w-20 rounded-full bg-zinc-200 dark:bg-zinc-800 animate-pulse" />
                </div>
                <div className="flex flex-wrap gap-2">
                  {[60, 72, 55, 68].slice(0, n === 1 ? 4 : 1).map((w, i) => (
                    <div
                      key={i}
                      className="h-6 rounded-full bg-zinc-200 dark:bg-zinc-800 animate-pulse"
                      style={{ width: `${w}px` }}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
