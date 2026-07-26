"use client";

import { useActionState } from "react";
import { useTheme } from "next-themes";
import { Sun, Moon, Monitor, Check } from "lucide-react";
import {
  updateNotificationPrefs,
  changePassword,
  type SettingsActionState,
} from "@/lib/actions/settings";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { useMounted } from "@/lib/use-mounted";

const initialState: SettingsActionState = { error: null };

const THEMES = [
  { value: "light", label: "Light", icon: Sun },
  { value: "dark", label: "Dark", icon: Moon },
  { value: "system", label: "System", icon: Monitor },
];

export function AppearanceSetting() {
  const { theme, setTheme } = useTheme();
  // The active theme is unknown during SSR, don't mark any option selected
  // until after hydration, or the server and client markup disagree.
  const mounted = useMounted();

  return (
    <div className="grid gap-3 sm:grid-cols-3">
      {THEMES.map((t) => {
        const active = mounted && theme === t.value;
        return (
          <button
            key={t.value}
            type="button"
            onClick={() => setTheme(t.value)}
            aria-pressed={active}
            className={cn(
              "flex items-center gap-3 rounded-lg border p-4 text-left transition-all",
              active
                ? "border-navy bg-secondary ring-1 ring-navy/20"
                : "border-border hover:border-navy/25 hover:bg-secondary"
            )}
          >
            <t.icon className="size-5 text-navy" />
            <span className="flex-1 text-sm font-medium">{t.label}</span>
            {active && <Check className="size-4 text-navy" />}
          </button>
        );
      })}
    </div>
  );
}

function Toggle({
  name,
  label,
  description,
  defaultChecked,
}: {
  name: string;
  label: string;
  description: string;
  defaultChecked: boolean;
}) {
  return (
    <label className="flex cursor-pointer items-start justify-between gap-4 rounded-lg border border-border p-4 transition-colors hover:bg-secondary/50">
      <span>
        <span className="block text-sm font-medium text-foreground">
          {label}
        </span>
        <span className="mt-0.5 block text-sm text-muted-foreground">
          {description}
        </span>
      </span>
      <input
        type="checkbox"
        name={name}
        defaultChecked={defaultChecked}
        className="peer sr-only"
      />
      <span className="relative mt-0.5 h-6 w-11 shrink-0 rounded-full bg-border transition-colors peer-checked:bg-foreground/70 after:absolute after:top-0.5 after:left-0.5 after:size-5 after:rounded-full after:bg-white after:transition-transform after:content-[''] peer-checked:after:translate-x-5" />
    </label>
  );
}

export function NotificationForm({
  serviceUpdates,
  announcements,
  emailCopies,
}: {
  serviceUpdates: boolean;
  announcements: boolean;
  emailCopies: boolean;
}) {
  const [state, formAction, pending] = useActionState(
    updateNotificationPrefs,
    initialState
  );

  return (
    <form action={formAction} className="space-y-3">
      <Toggle
        name="notify_service_updates"
        label="Service status changes"
        description="Notify me when a service I've availed changes status."
        defaultChecked={serviceUpdates}
      />
      <Toggle
        name="notify_announcements"
        label="Firm announcements"
        description="Broadcast updates from the Prudence Advisory team."
        defaultChecked={announcements}
      />
      <Toggle
        name="notify_email"
        label="Email copies"
        description="Also send a copy of each notification to my email address."
        defaultChecked={emailCopies}
      />
      {state.error && <p className="text-sm text-destructive">{state.error}</p>}
      {state.success && (
        <p className="text-sm text-status-completed">Preferences saved.</p>
      )}
      <Button
        type="submit"
        disabled={pending}
        className="bg-primary text-primary-foreground hover:bg-primary/90"
      >
        {pending ? "Saving..." : "Save preferences"}
      </Button>
    </form>
  );
}

export function PasswordForm() {
  const [state, formAction, pending] = useActionState(
    changePassword,
    initialState
  );

  return (
    <form action={formAction} className="max-w-md space-y-4">
      <div className="space-y-1.5">
        <Label htmlFor="password">New password</Label>
        <Input
          id="password"
          name="password"
          type="password"
          minLength={8}
          required
          autoComplete="new-password"
        />
      </div>
      <div className="space-y-1.5">
        <Label htmlFor="confirm_password">Confirm new password</Label>
        <Input
          id="confirm_password"
          name="confirm_password"
          type="password"
          minLength={8}
          required
          autoComplete="new-password"
        />
      </div>
      {state.error && <p className="text-sm text-destructive">{state.error}</p>}
      {state.success && (
        <p className="text-sm text-status-completed">Password updated.</p>
      )}
      <Button type="submit" disabled={pending} variant="outline">
        {pending ? "Updating..." : "Update password"}
      </Button>
    </form>
  );
}
