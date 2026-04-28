// app/providers.tsx
// ─────────────────────────────────────────────────────────────────────────────
// Server-safe wrapper untuk semua client-side providers.
// Dirender di app/layout.tsx untuk membungkus seluruh aplikasi.
// ThemeProvider dari next-themes mengelola kelas .dark/.light di <html>.
// ─────────────────────────────────────────────────────────────────────────────

"use client";

import { ThemeProvider } from "next-themes";

interface ProvidersProps {
  children: React.ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  return (
    <ThemeProvider
      // Gunakan atribut 'class' agar Tailwind dark: variants bekerja
      attribute="class"
      // Default ke light mode sesuai brief desain
      defaultTheme="light"
      // Nonaktifkan deteksi sistem agar konsisten dengan desain brand
      enableSystem={false}
      // Nonaktifkan transisi CSS saat hydration untuk menghindari flash
      disableTransitionOnChange={false}
    >
      {children}
    </ThemeProvider>
  );
}
