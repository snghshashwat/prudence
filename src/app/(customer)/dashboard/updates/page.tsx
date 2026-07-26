import { getCurrentProfile } from "@/lib/data/profiles";
import { listUpdatesForClient } from "@/lib/data/updates";
import { UpdateFeed } from "@/components/dashboard/update-feed";

export default async function CustomerUpdatesPage() {
  const profile = await getCurrentProfile();
  if (!profile) return null;

  const updates = await listUpdatesForClient(profile.id);

  return (
    <div>
      <h1 className="font-heading text-2xl font-medium text-navy">Updates</h1>
      <p className="mt-1 text-sm text-muted-foreground">
        Announcements and messages from your Prudence Advisory team.
      </p>
      <div className="mt-6 max-w-2xl">
        <UpdateFeed
          updates={updates.map((u) => ({
            ...u,
            targeted: u.target_client_id !== null,
          }))}
        />
      </div>
    </div>
  );
}
