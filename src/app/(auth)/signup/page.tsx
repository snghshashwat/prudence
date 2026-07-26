import { SignupForm } from "@/components/auth/signup-form";
import { GoogleButton } from "@/components/auth/google-button";

export default function SignupPage() {
  return (
    <div>
      <h1 className="font-heading text-2xl font-medium text-navy">
        Create your account
      </h1>
      <p className="mt-1 text-sm text-muted-foreground">
        Set up client access to your Prudence Advisory dashboard.
      </p>

      <div className="mt-6">
        <GoogleButton label="Sign up with Google" />
      </div>

      <div className="my-6 flex items-center gap-3">
        <div className="h-px flex-1 bg-border" />
        <span className="text-xs text-muted-foreground uppercase">
          Or with email
        </span>
        <div className="h-px flex-1 bg-border" />
      </div>

      <SignupForm />
    </div>
  );
}
