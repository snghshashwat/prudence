import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // Authenticated and auth-flow routes should never be crawled.
      disallow: ["/dashboard/", "/admin/", "/auth/", "/login", "/signup"],
    },
  };
}
