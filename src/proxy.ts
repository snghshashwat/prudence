import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
import { hasRealSupabaseConfig } from "@/lib/env";

const PROTECTED_PREFIXES = ["/dashboard", "/admin"];
const AUTH_PATHS = ["/login", "/signup"];

export async function proxy(request: NextRequest) {
  const response = NextResponse.next({ request });
  const { pathname } = request.nextUrl;
  const isProtected = PROTECTED_PREFIXES.some((p) => pathname.startsWith(p));
  const isAuthPath = AUTH_PATHS.some((p) => pathname.startsWith(p));

  // Demo session (see lib/demo/session.ts), lets a link sent to someone
  // for review be explored end to end with no Supabase project connected.
  // Short-circuits before any Supabase call so it also works fully offline.
  //
  // SECURITY: mirrors isDemoEnabled() exactly, keep the two in sync. A
  // stale demo_role cookie must not grant access once the flag is off, and
  // the flag itself must not grant access once a real Supabase project is
  // connected, that's the actual safety rail, not the flag.
  const demoEnabled =
    process.env.NEXT_PUBLIC_ENABLE_DEMO === "true" && !hasRealSupabaseConfig();
  const demoRole = demoEnabled
    ? request.cookies.get("demo_role")?.value
    : undefined;
  if (demoRole === "admin" || demoRole === "customer") {
    if (isAuthPath) {
      const url = request.nextUrl.clone();
      url.pathname = demoRole === "admin" ? "/admin" : "/dashboard";
      return NextResponse.redirect(url);
    }
    return response;
  }

  if (!isProtected && !isAuthPath) {
    return response;
  }

  // No real Supabase project connected yet (e.g. a marketing-only deploy,
  // or .env.local still has the placeholder key from scaffolding).
  // createServerClient throws synchronously on an empty URL/key, and would
  // hang or fail against a placeholder one, either way 500-ing every visit
  // to /login or /signup, not just the parts of the app that actually need
  // a database. Treat "not really configured" as "not logged in": auth
  // pages render normally, protected pages redirect to login, nothing
  // crashes.
  if (!hasRealSupabaseConfig()) {
    if (isProtected) {
      const url = request.nextUrl.clone();
      url.pathname = "/login";
      return NextResponse.redirect(url);
    }
    return response;
  }

  let supabaseResponse = response;
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          );
          supabaseResponse = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user && isProtected) {
    const url = request.nextUrl.clone();
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }

  if (user && isAuthPath) {
    const url = request.nextUrl.clone();
    url.pathname = "/dashboard";
    return NextResponse.redirect(url);
  }

  return supabaseResponse;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|logo.svg|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
