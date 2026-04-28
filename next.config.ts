// next.config.ts
// ─────────────────────────────────────────────────────────────────────────────
// Konfigurasi Next.js dengan enterprise-grade security headers.
//
// HEADERS YANG DIIMPLEMENTASIKAN:
// - X-Frame-Options: Mencegah clickjacking (situs tidak bisa di-embed di iframe)
// - X-Content-Type-Options: Mencegah MIME-type sniffing
// - Referrer-Policy: Batasi informasi referrer yang dikirim ke third-party
// - X-DNS-Prefetch-Control: Aktifkan DNS prefetching untuk performa
// - Strict-Transport-Security: Force HTTPS (HSTS) - 1 tahun
// - Permissions-Policy: Batasi API browser yang bisa diakses (camera, mic, dll)
// - Content-Security-Policy: Whitelist sumber resource yang diizinkan
//   Mengizinkan: Google Fonts, Supabase storage, avatar services (pravatar, ui-avatars)
// ─────────────────────────────────────────────────────────────────────────────

import type { NextConfig } from "next";

// ── Content Security Policy ────────────────────────────────────────────────
// Dibangun modular agar mudah di-maintain.
const ContentSecurityPolicy = `
  default-src 'self';
  script-src 'self' 'unsafe-eval' 'unsafe-inline';
  style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
  font-src 'self' https://fonts.gstatic.com;
  img-src 'self' data: blob: https://*.supabase.co https://*.supabase.in https://i.pravatar.cc https://ui-avatars.com https://images.unsplash.com https://avatars.githubusercontent.com;
  connect-src 'self' https://*.supabase.co https://*.supabase.in;
  media-src 'self';
  object-src 'none';
  frame-ancestors 'none';
  base-uri 'self';
  form-action 'self';
  upgrade-insecure-requests;
`
  // Hapus newlines dan spasi berlebih untuk header yang valid
  .replace(/\s{2,}/g, " ")
  .trim();

// ── Security Headers ───────────────────────────────────────────────────────
const securityHeaders = [
  // Mencegah situs di-embed di iframe (clickjacking protection)
  {
    key: "X-Frame-Options",
    value: "DENY",
  },
  // Mencegah browser "menebak" content-type (MIME sniffing protection)
  {
    key: "X-Content-Type-Options",
    value: "nosniff",
  },
  // Batasi referrer information ke strict-origin saat cross-origin
  {
    key: "Referrer-Policy",
    value: "strict-origin-when-cross-origin",
  },
  // Aktifkan DNS prefetching untuk performa
  {
    key: "X-DNS-Prefetch-Control",
    value: "on",
  },
  // Force HTTPS selama 1 tahun, termasuk subdomain
  // CATATAN: Aktifkan ini hanya setelah production deploy dengan HTTPS
  {
    key: "Strict-Transport-Security",
    value: "max-age=31536000; includeSubDomains",
  },
  // Batasi akses ke API browser yang sensitif
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), interest-cohort=()",
  },
  // Content Security Policy
  {
    key: "Content-Security-Policy",
    value: ContentSecurityPolicy,
  },
];

const nextConfig: NextConfig = {
  // ── Security Headers ─────────────────────────────────────────────
  async headers() {
    return [
      {
        // Terapkan ke semua halaman dan API routes
        source: "/:path*",
        headers: securityHeaders,
      },
    ];
  },

  // ── Image Optimization ────────────────────────────────────────────
  // Izinkan gambar dari domain eksternal yang digunakan di aplikasi
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.supabase.co",
      },
      {
        protocol: "https",
        hostname: "**.supabase.in",
      },
      {
        protocol: "https",
        hostname: "i.pravatar.cc",
      },
      {
        protocol: "https",
        hostname: "ui-avatars.com",
      },
    ],
  },
};

export default nextConfig;
