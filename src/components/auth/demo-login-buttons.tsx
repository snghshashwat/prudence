import { Users, ShieldCheck, TriangleAlert } from "lucide-react";
import { quickDemoLogin } from "@/lib/actions/auth";
import { isDemoEnabled } from "@/lib/demo/session";
import { Button } from "@/components/ui/button";

// One-click logins for testing the frontend without a Supabase project.
// Renders only when demo mode is explicitly enabled and never in
// production, see lib/demo/session.ts. The server action re-checks too.
export function DemoLoginButtons() {
  if (!isDemoEnabled()) return null;

  return (
    <div className="space-y-2 rounded-lg border border-dashed border-border bg-muted p-3">
      <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
        <TriangleAlert className="size-3.5 text-muted-foreground" />
        Demo mode: no password, sample data only.
      </p>
      <form action={quickDemoLogin.bind(null, "customer")}>
        <Button
          type="submit"
          variant="outline"
          className="w-full justify-start gap-2"
        >
          <Users className="size-4" />
          Continue as Customer (Demo)
        </Button>
      </form>
      <form action={quickDemoLogin.bind(null, "admin")}>
        <Button
          type="submit"
          variant="outline"
          className="w-full justify-start gap-2"
        >
          <ShieldCheck className="size-4" />
          Continue as Admin (Demo)
        </Button>
      </form>
    </div>
  );
}
