import "server-only";
import { cookies } from "next/headers";

// Cookie-based demo session, lets the frontend be tested end-to-end with
// no Supabase project configured. Not real auth: one-click, no password,
// state lives in-memory (see lib/demo/store.ts) and resets on server
// restart.
//
// SECURITY: this bypasses authentication entirely, so it is opt-in via
// NEXT_PUBLIC_ENABLE_DEMO and force-disabled in production builds. Every
// read of the demo role goes through `getDemoRole()`, so flipping the flag
// off closes the bypass everywhere at once.
const DEMO_COOKIE = "demo_role";

export type DemoRole = "admin" | "customer";

export function isDemoEnabled() {
  if (process.env.NODE_ENV === "production") return false;
  return process.env.NEXT_PUBLIC_ENABLE_DEMO === "true";
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
