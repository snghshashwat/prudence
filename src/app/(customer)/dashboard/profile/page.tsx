import { getCurrentProfile } from "@/lib/data/profiles";
import { listClientServicesFor } from "@/lib/data/clientServices";
import { ProfilePageBody } from "@/components/dashboard/profile-page-body";

export default async function CustomerProfilePage() {
  const profile = await getCurrentProfile();
  if (!profile) return null;

  const services = await listClientServicesFor(profile.id);

  return <ProfilePageBody profile={profile} servicesCount={services.length} />;
}
