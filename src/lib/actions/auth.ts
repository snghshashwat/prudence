"use server";

import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { createClient } from "@/lib/supabase/server";
import {
  clearDemoRole,
  isDemoEnabled,
  setDemoRole,
  type DemoRole,
} from "@/lib/demo/session";

export type AuthActionState = { error: string | null };

// One-click login for frontend testing without a Supabase project, see
// lib/demo/session.ts and lib/demo/store.ts. Remove once real accounts are
// the only way in.
export async function quickDemoLogin(role: DemoRole) {
  // Re-check server-side: never trust that the button was only rendered
  // when demo mode is on.
  if (!isDemoEnabled()) redirect("/login");

  await setDemoRole(role);
  redirect(role === "admin" ? "/admin" : "/dashboard");
}

export async function signIn(
  _prevState: AuthActionState,
  formData: FormData
): Promise<AuthActionState> {
  const email = String(formData.get("email") ?? "");
  const password = String(formData.get("password") ?? "");

  const supabase = await createClient();
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error || !data.user) {
    return { error: error?.message ?? "Unable to sign in." };
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", data.user.id)
    .single();

  redirect(profile?.role === "admin" ? "/admin" : "/dashboard");
}

export async function signUp(
  _prevState: AuthActionState,
  formData: FormData
): Promise<AuthActionState> {
  const fullName = String(formData.get("full_name") ?? "");
  const email = String(formData.get("email") ?? "");
  const password = String(formData.get("password") ?? "");

  if (password.length < 8) {
    return { error: "Password must be at least 8 characters." };
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: { data: { full_name: fullName } },
  });

  if (error) {
    return { error: error.message };
  }

  redirect("/dashboard");
}

/**
 * Google (Gmail) sign-in. Requires the Google provider to be enabled in the
 * Supabase dashboard with a client ID/secret; until then Supabase returns a
 * "provider is not enabled" error, which we surface as-is.
 */
export async function signInWithGoogle(): Promise<AuthActionState> {
  // signInWithOAuth builds the redirect URL locally and won't fail when
  // Supabase is unreachable, so without this guard an unconfigured project
  // sends the user to a dead URL and a browser error page.
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";
  if (!url || !key || key.includes("placeholder")) {
    return {
      error:
        "Google sign-in isn't connected yet. Add your Supabase project and Google OAuth credentials to enable it.",
    };
  }

  const supabase = await createClient();
  const headerList = await headers();
  const origin =
    headerList.get("origin") ??
    process.env.NEXT_PUBLIC_SITE_URL ??
    "http://localhost:3000";

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: `${origin}/auth/callback`,
      queryParams: { access_type: "offline", prompt: "consent" },
    },
  });

  if (error) return { error: error.message };
  if (!data.url) return { error: "Could not start Google sign-in." };

  redirect(data.url);
}

export async function signOut() {
  await clearDemoRole();
  try {
    const supabase = await createClient();
    await supabase.auth.signOut();
  } catch {
    // Supabase may not be configured yet while testing in demo mode.
  }
  redirect("/login");
}
