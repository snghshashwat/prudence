"use client";

import { useActionState } from "react";
import { CheckCircle2, Send } from "lucide-react";
import { submitEnquiry, type EnquiryState } from "@/lib/actions/enquiry";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { PhoneField } from "@/components/marketing/phone-field";

const initialState: EnquiryState = { error: null };

const interests = [
  { value: "nri", label: "NRI Services" },
  { value: "family_business", label: "Family Business" },
  { value: "accounting_cfo", label: "Accounting & CFO" },
  { value: "other", label: "Something else" },
];

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return <p className="text-xs text-destructive">{message}</p>;
}

export function ContactForm() {
  const [state, formAction, pending] = useActionState(
    submitEnquiry,
    initialState
  );

  if (state.success) {
    return (
      <div className="rounded-xl border border-border bg-card p-8 text-center">
        <div className="mx-auto flex size-12 items-center justify-center rounded-full bg-status-completed/10">
          <CheckCircle2 className="size-6 text-status-completed" />
        </div>
        <h3 className="mt-4 font-heading text-xl font-medium text-navy">
          Thank you, we have your enquiry
        </h3>
        <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-muted-foreground">
          One of our advisors will be in touch shortly to arrange a
          confidential discovery conversation. Nothing is shared outside the
          engagement team.
        </p>
      </div>
    );
  }

  const fe = state.fieldErrors ?? {};

  return (
    <form
      action={formAction}
      className="rounded-xl border border-border bg-card p-6 sm:p-8"
    >
      {/* Honeypot: hidden from people, tempting to bots. */}
      <div className="absolute left-[-9999px]" aria-hidden="true">
        <label htmlFor="company_website">Company website</label>
        <input
          id="company_website"
          name="company_website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div className="space-y-1.5">
          <Label htmlFor="full_name">Full name</Label>
          <Input
            id="full_name"
            name="full_name"
            required
            autoComplete="name"
            aria-invalid={Boolean(fe.full_name)}
          />
          <FieldError message={fe.full_name} />
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="enq-email">Email</Label>
          <Input
            id="enq-email"
            name="email"
            type="email"
            required
            autoComplete="email"
            aria-invalid={Boolean(fe.email)}
          />
          <FieldError message={fe.email} />
        </div>

        <PhoneField />

        <div className="space-y-1.5">
          <Label htmlFor="interest">I need help with</Label>
          {/* Native select: submits reliably and needs no JS. */}
          <select
            id="interest"
            name="interest"
            defaultValue="nri"
            className={cn(
              "h-9 w-full rounded-lg border border-input bg-background px-3 text-sm",
              "focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none"
            )}
          >
            {interests.map((i) => (
              <option key={i.value} value={i.value}>
                {i.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="mt-5 space-y-1.5">
        <Label htmlFor="message">How can we help?</Label>
        <Textarea
          id="message"
          name="message"
          rows={5}
          required
          minLength={20}
          placeholder="A short description of your situation. Please don't include passwords, account numbers, or other sensitive details."
          aria-invalid={Boolean(fe.message)}
        />
        <FieldError message={fe.message} />
      </div>

      {state.error && (
        <p className="mt-4 rounded-lg border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive">
          {state.error}
        </p>
      )}

      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs leading-relaxed text-muted-foreground">
          Your details are used only to respond to this enquiry.
        </p>
        <Button
          type="submit"
          size="lg"
          disabled={pending}
          className="h-11 shrink-0 gap-2 bg-primary px-6 text-primary-foreground hover:bg-primary/90"
        >
          <Send className="size-4" />
          {pending ? "Sending..." : "Send enquiry"}
        </Button>
      </div>
    </form>
  );
}
