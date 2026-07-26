"use client";

import { useActionState } from "react";
import { updateProfile, type ProfileActionState } from "@/lib/actions/profile";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const initialState: ProfileActionState = { error: null };

export function ProfileForm({
  fullName,
  email,
  phone,
  companyName,
}: {
  fullName: string;
  email: string;
  phone: string | null;
  companyName: string | null;
}) {
  const [state, formAction, pending] = useActionState(
    updateProfile,
    initialState
  );

  return (
    <form action={formAction} className="max-w-md space-y-4">
      <div className="space-y-1.5">
        <Label htmlFor="full_name">Full name</Label>
        <Input id="full_name" name="full_name" defaultValue={fullName} required />
      </div>
      <div className="space-y-1.5">
        <Label htmlFor="email">Email</Label>
        <Input id="email" value={email} disabled />
      </div>
      <div className="space-y-1.5">
        <Label htmlFor="phone">Phone</Label>
        <Input id="phone" name="phone" defaultValue={phone ?? ""} />
      </div>
      <div className="space-y-1.5">
        <Label htmlFor="company_name">Company</Label>
        <Input
          id="company_name"
          name="company_name"
          defaultValue={companyName ?? ""}
        />
      </div>
      {state.error && <p className="text-sm text-destructive">{state.error}</p>}
      {state.success && (
        <p className="text-sm text-status-completed">Profile updated.</p>
      )}
      <Button
        type="submit"
        disabled={pending}
        className="bg-primary text-primary-foreground hover:bg-primary/90"
      >
        {pending ? "Saving..." : "Save changes"}
      </Button>
    </form>
  );
}
