import { SectionCard, PageHeader } from "@/components/dashboard/section-card";
import {
  AppearanceSetting,
  NotificationForm,
  PasswordForm,
} from "@/components/dashboard/settings-forms";
import { siteConfig } from "@/lib/site-config";

type ProfileLike = {
  email: string;
  notify_service_updates: boolean;
  notify_announcements: boolean;
  notify_email: boolean;
  created_at: string;
};

export function SettingsPageBody({ profile }: { profile: ProfileLike }) {
  return (
    <div className="max-w-3xl space-y-6">
      <PageHeader
        title="Settings"
        description="Appearance, notifications, and account security."
      />

      <SectionCard
        title="Appearance"
        description="Choose how Prudence Advisory looks on this device."
      >
        <AppearanceSetting />
      </SectionCard>

      <SectionCard
        title="Notifications"
        description="Control what you're told about, and how."
      >
        <NotificationForm
          serviceUpdates={profile.notify_service_updates}
          announcements={profile.notify_announcements}
          emailCopies={profile.notify_email}
        />
      </SectionCard>

      <SectionCard
        title="Account"
        description="Your sign-in details."
        footer={
          <p className="text-xs text-muted-foreground">
            Need to change your email address? Contact us at{" "}
            {siteConfig.contact.email}.
          </p>
        }
      >
        <dl className="grid gap-4 sm:grid-cols-2">
          <div>
            <dt className="text-xs tracking-wide text-muted-foreground uppercase">
              Email
            </dt>
            <dd className="mt-1 text-sm">{profile.email}</dd>
          </div>
          <div>
            <dt className="text-xs tracking-wide text-muted-foreground uppercase">
              Member since
            </dt>
            <dd className="mt-1 text-sm">
              {new Date(profile.created_at).toLocaleDateString("en-IN", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </dd>
          </div>
        </dl>
      </SectionCard>

      <SectionCard
        title="Security"
        description="Update the password used to sign in."
      >
        <PasswordForm />
      </SectionCard>
    </div>
  );
}
