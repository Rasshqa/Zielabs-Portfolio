// app/components/ui/ThemeToggle.tsx
// ─────────────────────────────────────────────────────────────────────────────
// Client Component: tombol toggle Light/Dark mode.
// Menggunakan Framer Motion AnimatePresence untuk transisi ikon yang mulus.
// Spring config: stiffness 300, damping 20 — cukup responsif, tidak bouncy.
// ─────────────────────────────────────────────────────────────────────────────

"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// Spring transition yang elegan — tidak terlalu memantul (sesuai estetika Luxury)
const iconTransition = {
  type: "spring" as const,
  stiffness: 300,
  damping: 20,
};

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  // Hindari hydration mismatch: render setelah mounted
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Render placeholder button saat belum mounted agar tidak ada layout shift
  if (!mounted) {
    return (
      <div className="size-9 rounded-full" aria-hidden="true" />
    );
  }

  const isDark = theme === "dark";

  return (
    <button
      id="theme-toggle"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
      title={isDark ? "Light Mode" : "Dark Mode"}
      className="relative flex size-9 items-center justify-center rounded-full border border-zinc-200 dark:border-white/10 bg-white dark:bg-zinc-900 text-zinc-500 dark:text-zinc-400 transition-all duration-300 hover:border-[#50C878]/50 hover:text-[#50C878] dark:hover:text-[#50C878] hover:shadow-[0_0_12px_rgba(80,200,120,0.2)] overflow-hidden"
    >
      <AnimatePresence mode="wait" initial={false}>
        {isDark ? (
          // Dark mode aktif → tampilkan ikon Moon
          <motion.div
            key="moon"
            initial={{ opacity: 0, rotate: -90, scale: 0.5 }}
            animate={{ opacity: 1, rotate: 0, scale: 1 }}
            exit={{ opacity: 0, rotate: 90, scale: 0.5 }}
            transition={iconTransition}
            className="absolute"
          >
            <Moon className="size-4" />
          </motion.div>
        ) : (
          // Light mode aktif → tampilkan ikon Sun
          <motion.div
            key="sun"
            initial={{ opacity: 0, rotate: 90, scale: 0.5 }}
            animate={{ opacity: 1, rotate: 0, scale: 1 }}
            exit={{ opacity: 0, rotate: -90, scale: 0.5 }}
            transition={iconTransition}
            className="absolute"
          >
            <Sun className="size-4" />
          </motion.div>
        )}
      </AnimatePresence>
    </button>
  );
}
