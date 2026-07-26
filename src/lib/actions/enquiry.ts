"use server";

import { headers } from "next/headers";
import { z } from "zod";
import { createClient } from "@/lib/supabase/server";
import { getDemoRole, isDemoEnabled } from "@/lib/demo/session";
import { addDemoEnquiry } from "@/lib/demo/store";

export type EnquiryState = {
  error: string | null;
  fieldErrors?: Record<string, string>;
  success?: boolean;
};

const schema = z.object({
  full_name: z.string().trim().min(2, "Please enter your name.").max(120),
  email: z.string().trim().email("Please enter a valid email address.").max(255),
  phone: z
    .string()
    .trim()
    .max(30)
    .regex(/^[0-9\s().-]*$/, "Please enter digits only.")
    .optional()
    .or(z.literal("")),
  phone_dial: z.string().trim().regex(/^[0-9]{1,4}$/).optional().or(z.literal("")),
  interest: z.enum(["nri", "family_business", "accounting_cfo", "other"]),
  message: z
    .string()
    .trim()
    .min(20, "Please give us a little more detail (at least 20 characters).")
    .max(4000),
});

// Very small in-memory throttle. Enough to blunt casual abuse of a public
// endpoint; a deployment behind a real WAF or an edge rate limiter should
// rely on that instead, since this resets on restart and is per-instance.
const RATE_LIMIT = 5;
const WINDOW_MS = 10 * 60 * 1000;
const hits = new Map<string, number[]>();

function rateLimited(key: string) {
  const now = Date.now();
  const recent = (hits.get(key) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(key, recent);
  return recent.length > RATE_LIMIT;
}

export async function submitEnquiry(
  _prev: EnquiryState,
  formData: FormData
): Promise<EnquiryState> {
  // Honeypot: a field hidden from humans. Bots fill everything in, so a
  // non-empty value means we silently accept and discard.
  if (String(formData.get("company_website") ?? "").length > 0) {
    return { error: null, success: true };
  }

  const parsed = schema.safeParse({
    full_name: formData.get("full_name"),
    email: formData.get("email"),
    phone: formData.get("phone"),
    phone_dial: formData.get("phone_dial"),
    interest: formData.get("interest"),
    message: formData.get("message"),
  });

  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const key = String(issue.path[0]);
      fieldErrors[key] ??= issue.message;
    }
    return { error: "Please check the highlighted fields.", fieldErrors };
  }

  const headerList = await headers();
  const ip =
    headerList.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    headerList.get("x-real-ip") ??
    "unknown";

  if (rateLimited(ip)) {
    return {
      error: "Too many enquiries from this connection. Please try again later.",
    };
  }

  const row = {
    full_name: parsed.data.full_name,
    email: parsed.data.email,
    // Store one E.164-ish string; the dial code is meaningless on its own.
    phone: parsed.data.phone
      ? `+${parsed.data.phone_dial || "91"} ${parsed.data.phone}`.trim()
      : null,
    interest: parsed.data.interest,
    message: parsed.data.message,
  };

  if (isDemoEnabled() || (await getDemoRole())) {
    addDemoEnquiry(row);
    return { error: null, success: true };
  }

  // createClient() throws synchronously on an empty URL/key, so check first
  // rather than crashing this deployment's main conversion form.
  if (
    !process.env.NEXT_PUBLIC_SUPABASE_URL ||
    !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  ) {
    return {
      error:
        "This form isn't connected yet. Please reach out using the contact details above instead.",
    };
  }

  const supabase = await createClient();
  const { error } = await supabase.from("contact_enquiries").insert(row);

  if (error) {
    return {
      error: "Something went wrong sending your enquiry. Please try again.",
    };
  }

  return { error: null, success: true };
}
