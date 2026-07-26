import { LoginForm } from "@/components/auth/login-form";
import { DemoLoginButtons } from "@/components/auth/demo-login-buttons";
import { GoogleButton } from "@/components/auth/google-button";

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;

  return (
    <div>
      <h1 className="font-heading text-2xl font-medium text-navy">
        Welcome back
      </h1>
      <p className="mt-1 text-sm text-muted-foreground">
        Log in to your Prudence Advisory account.
      </p>

      {error && (
        <p className="mt-4 rounded-lg border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive">
          {error}
        </p>
      )}

      <div className="mt-6 space-y-2">
        <GoogleButton />
        <DemoLoginButtons />
      </div>

      <div className="my-6 flex items-center gap-3">
        <div className="h-px flex-1 bg-border" />
        <span className="text-xs text-muted-foreground uppercase">
          Or with email
        </span>
        <div className="h-px flex-1 bg-border" />
      </div>

      <LoginForm />
    </div>
  );
}
