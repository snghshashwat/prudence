import { listClientProfiles } from "@/lib/data/profiles";
import { ComposeUpdateForm } from "@/components/admin/compose-update-form";

export default async function NewUpdatePage() {
  const clients = await listClientProfiles();

  return (
    <div>
      <h1 className="font-heading text-2xl font-medium text-navy">
        New Update
      </h1>
      <p className="mt-1 text-sm text-muted-foreground">
        Broadcast to every client, or send a message to just one.
      </p>
      <div className="mt-6">
        <ComposeUpdateForm
          clients={clients.map((c) => ({ id: c.id, full_name: c.full_name }))}
        />
      </div>
    </div>
  );
}
