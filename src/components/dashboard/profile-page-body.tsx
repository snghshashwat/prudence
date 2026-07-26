import { SectionCard, PageHeader } from "@/components/dashboard/section-card";
import { ProfileForm } from "@/components/dashboard/profile-form";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { CLIENT_TYPE_LABELS, type ClientType } from "@/lib/types/domain";

type ProfileLike = {
  full_name: string;
  email: string;
  phone: string | null;
  company_name: string | null;
  client_type: ClientType | null;
  role: "admin" | "customer";
  created_at: string;
};

export function ProfilePageBody({
  profile,
  servicesCount,
}: {
  profile: ProfileLike;
  servicesCount?: number;
}) {
  const initials = profile.full_name
    .split(" ")
    .map((p) => p[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className="max-w-3xl space-y-6">
      <PageHeader
        title="Profile"
        description="Your details as they appear to the Prudence Advisory team."
      />

      <section className="rounded-xl border border-border bg-card p-6">
        <div className="flex flex-wrap items-center gap-5">
          <Avatar className="size-16">
            <AvatarFallback className="bg-deep text-lg text-white">
              {initials || "?"}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <h2 className="font-heading text-xl font-medium text-navy">
              {profile.full_name}
            </h2>
            <p className="text-sm text-muted-foreground">{profile.email}</p>
            <div className="mt-2 flex flex-wrap gap-2">
              <Badge variant="secondary">
                {profile.role === "admin" ? "Administrator" : "Client"}
              </Badge>
              {profile.client_type && (
                <Badge variant="outline">
                  {CLIENT_TYPE_LABELS[profile.client_type]}
                </Badge>
              )}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-2">
            {typeof servicesCount === "number" && (
              <div>
                <p className="font-heading text-2xl text-navy">
                  {servicesCount}
                </p>
                <p className="text-xs text-muted-foreground">Services</p>
              </div>
            )}
            <div>
              <p className="font-heading text-2xl text-navy">
                {new Date(profile.created_at).getFullYear()}
              </p>
              <p className="text-xs text-muted-foreground">Client since</p>
            </div>
          </div>
        </div>
      </section>

      <SectionCard
        title="Contact details"
        description="Keep these current so we can reach you quickly."
      >
        <ProfileForm
          fullName={profile.full_name}
          email={profile.email}
          phone={profile.phone}
          companyName={profile.company_name}
        />
      </SectionCard>
    </div>
  );
}
