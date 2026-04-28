// app/loading.tsx
// ─────────────────────────────────────────────────────────────────────────────
// Global loading UI — ditampilkan oleh Next.js App Router secara otomatis
// saat route baru sedang di-fetch (Suspense boundary di level root).
// Menggunakan skeleton shimmer agar transisi terasa instan dan premium.
// ─────────────────────────────────────────────────────────────────────────────

export default function Loading() {
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-[#050505] pt-32 pb-32 relative overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        {/* Label skeleton */}
        <div className="mb-6 h-3 w-24 rounded-full bg-zinc-200 dark:bg-zinc-800 animate-pulse" />

        {/* Heading skeleton */}
        <div className="flex flex-col gap-4 mb-8">
          <div className="h-12 w-3/4 rounded-2xl bg-zinc-200 dark:bg-zinc-800 animate-pulse md:h-16 lg:h-20" />
          <div className="h-12 w-1/2 rounded-2xl bg-zinc-200 dark:bg-zinc-800 animate-pulse md:h-16 lg:h-20" />
        </div>

        {/* Description skeleton */}
        <div className="space-y-2 mb-12">
          <div className="h-4 w-full max-w-md rounded-full bg-zinc-200 dark:bg-zinc-800 animate-pulse" />
          <div className="h-4 w-80 rounded-full bg-zinc-200 dark:bg-zinc-800 animate-pulse" />
        </div>

        {/* Divider skeleton */}
        <div className="mb-12 h-0.5 w-32 rounded-full bg-zinc-200 dark:bg-zinc-800 animate-pulse" />

        {/* Card grid skeleton */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="rounded-2xl border border-zinc-200 dark:border-white/5 bg-white dark:bg-zinc-900/50 overflow-hidden shadow-sm dark:shadow-none"
              style={{ animationDelay: `${i * 0.05}s` }}
            >
              {/* Image area */}
              <div className="aspect-video w-full bg-zinc-200 dark:bg-zinc-800 animate-pulse" />
              {/* Content area */}
              <div className="p-6 space-y-3">
                <div className="h-3 w-20 rounded-full bg-zinc-200 dark:bg-zinc-800 animate-pulse" />
                <div className="h-5 w-3/4 rounded-full bg-zinc-200 dark:bg-zinc-800 animate-pulse" />
                <div className="space-y-2">
                  <div className="h-3 w-full rounded-full bg-zinc-200 dark:bg-zinc-800 animate-pulse" />
                  <div className="h-3 w-5/6 rounded-full bg-zinc-200 dark:bg-zinc-800 animate-pulse" />
                  <div className="h-3 w-4/6 rounded-full bg-zinc-200 dark:bg-zinc-800 animate-pulse" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
