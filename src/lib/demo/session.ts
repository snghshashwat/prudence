import "server-only";
import { cookies } from "next/headers";
import { hasRealSupabaseConfig } from "@/lib/env";

// Cookie-based demo session, lets the frontend (and a link sent to someone
// for review) be explored end to end with no Supabase project connected.
// Not real auth: one-click, no password, state lives in-memory (see
// lib/demo/store.ts) and resets on server restart.
//
// SECURITY: this bypasses authentication entirely, so it only turns on
// when BOTH are true:
//   1. NEXT_PUBLIC_ENABLE_DEMO=true is explicitly set, and
//   2. no real Supabase project is connected (checked via the same env
//      vars lib/supabase/server.ts needs).
// Condition 2 is the real safety rail, not condition 1. A flag someone
// forgets to unset is a certainty, not a risk to plan around; this way,
// the moment a real Supabase project is connected (real customer data
// becomes reachable), the demo bypass switches itself off, flag or no
// flag. See proxy.ts for the mirrored check on the middleware side.
const DEMO_COOKIE = "demo_role";

export type DemoRole = "admin" | "customer";

export function isDemoEnabled() {
  if (process.env.NEXT_PUBLIC_ENABLE_DEMO !== "true") return false;
  return !hasRealSupabaseConfig();
}

export async function getDemoRole(): Promise<DemoRole | null> {
  if (!isDemoEnabled()) return null;

  const store = await cookies();
  const value = store.get(DEMO_COOKIE)?.value;
  return value === "admin" || value === "customer" ? value : null;
}

export async function setDemoRole(role: DemoRole) {
  if (!isDemoEnabled()) throw new Error("Demo mode is disabled.");

  const store = await cookies();
  store.set(DEMO_COOKIE, role, {
    path: "/",
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
  });
}

export async function clearDemoRole() {
  const store = await cookies();
  store.delete(DEMO_COOKIE);
}
