import { getCurrentProfile } from "@/lib/data/profiles";
import { SettingsPageBody } from "@/components/dashboard/settings-page-body";

export default async function CustomerSettingsPage() {
  const profile = await getCurrentProfile();
  if (!profile) return null;
  return <SettingsPageBody profile={profile} />;
}
