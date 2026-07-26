import { getCurrentProfile } from "@/lib/data/profiles";
import { ProfilePageBody } from "@/components/dashboard/profile-page-body";

export default async function AdminProfilePage() {
  const profile = await getCurrentProfile();
  if (!profile) return null;
  return <ProfilePageBody profile={profile} />;
}
