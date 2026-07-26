import type { NextConfig } from "next";

// Security response headers.
//
// No CSP here yet: Next's dev overlay and inlined runtime need either
// 'unsafe-inline'/'unsafe-eval' or a nonce, and a CSP that permits those is
// mostly theatre. Add a nonce-based CSP via proxy.ts when hardening for
// production, that needs testing against Supabase + next/font, so it is
// deliberately out of scope rather than half-done.
const securityHeaders = [
  // Don't let the site be framed, clickjacking on an authed dashboard.
  { key: "X-Frame-Options", value: "DENY" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), payment=()",
  },
  // HSTS is ignored over plain HTTP, so it's safe to send in dev too.
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
];

const nextConfig: NextConfig = {
  poweredByHeader: false,
  async headers() {
    return [
      { source: "/:path*", headers: securityHeaders },
      // Authenticated areas must never be indexed or cached by a shared proxy.
      {
        source: "/dashboard/:path*",
        headers: [
          { key: "X-Robots-Tag", value: "noindex, nofollow" },
          { key: "Cache-Control", value: "private, no-store" },
        ],
      },
      {
        source: "/admin/:path*",
        headers: [
          { key: "X-Robots-Tag", value: "noindex, nofollow" },
          { key: "Cache-Control", value: "private, no-store" },
        ],
      },
    ];
  },
};

export default nextConfig;
