// Shared "is a real Supabase project actually connected" check, used by
// both lib/demo/session.ts and proxy.ts to decide whether the demo bypass
// is safe to allow and whether middleware should attempt a real auth call.
//
// Plain env-var presence isn't enough: this repo's .env.local ships with
// NEXT_PUBLIC_SUPABASE_ANON_KEY defaulted to the literal placeholder value
// from .env.local.example, not a real key. A real Supabase anon key is a
// JWT (three base64 segments joined by dots); the placeholder isn't, so
// checking its shape catches the untouched-scaffolding case without
// blocking a real local Supabase CLI instance, which does have a real
// (if locally-issued) JWT key, from being treated as configured.
export function hasRealSupabaseConfig() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return false;
  const looksLikeJwt = key.split(".").length === 3;
  return looksLikeJwt;
}
