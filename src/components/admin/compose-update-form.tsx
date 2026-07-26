"use client";

import { useActionState } from "react";
import { composeUpdate, type ComposeUpdateState } from "@/lib/actions/updates";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const initialState: ComposeUpdateState = { error: null };

export function ComposeUpdateForm({
  clients,
}: {
  clients: { id: string; full_name: string }[];
}) {
  const [state, formAction, pending] = useActionState(
    composeUpdate,
    initialState
  );

  return (
    <form action={formAction} className="max-w-xl space-y-4">
      <div className="space-y-1.5">
        <Label htmlFor="title">Title</Label>
        <Input id="title" name="title" required />
      </div>
      <div className="space-y-1.5">
        <Label htmlFor="body">Message</Label>
        <Textarea id="body" name="body" rows={5} required />
      </div>
      <div className="space-y-1.5">
        <Label htmlFor="target_client_id">Send to</Label>
        <Select name="target_client_id" defaultValue="all">
          <SelectTrigger id="target_client_id" className="w-full">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Broadcast to all clients</SelectItem>
            {clients.map((c) => (
              <SelectItem key={c.id} value={c.id}>
                {c.full_name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      {state.error && <p className="text-sm text-destructive">{state.error}</p>}
      <Button
        type="submit"
        disabled={pending}
        className="bg-primary text-primary-foreground hover:bg-primary/90"
      >
        {pending ? "Sending..." : "Send Update"}
      </Button>
    </form>
  );
}
