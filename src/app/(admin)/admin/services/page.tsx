import { listServiceCatalog } from "@/lib/data/services";
import { toggleServiceActive } from "@/lib/actions/services";
import { PageHeader } from "@/components/dashboard/section-card";
import { Badge } from "@/components/ui/badge";
import { PILLAR_LABELS, type Pillar } from "@/lib/types/domain";

export default async function AdminServiceCatalogPage() {
  const services = await listServiceCatalog();
  const activeCount = services.filter((s) => s.is_active).length;

  const byPillar = services.reduce<Record<string, typeof services>>((acc, s) => {
    (acc[s.pillar] ??= []).push(s);
    return acc;
  }, {});

  return (
    <div className="space-y-6">
      <PageHeader
        title="Service Catalog"
        description="Every service Prudence Advisory offers, grouped by practice area. Deactivate a service to hide it from new assignments."
        action={
          <Badge variant="secondary">
            {activeCount} of {services.length} active
          </Badge>
        }
      />

      <div className="space-y-8">
        {(Object.keys(byPillar) as Pillar[]).map((pillar) => {
          const byCategory = byPillar[pillar].reduce<
            Record<string, typeof services>
          >((acc, s) => {
            (acc[s.category] ??= []).push(s);
            return acc;
          }, {});

          return (
            <div key={pillar}>
              <h2 className="font-heading text-lg font-medium text-navy">
                {PILLAR_LABELS[pillar]}
              </h2>
              <div className="mt-3 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                {Object.entries(byCategory).map(([category, items]) => (
                  <div
                    key={category}
                    className="rounded-xl border border-border bg-card p-4"
                  >
                    <p className="text-sm font-medium text-navy">{category}</p>
                    <ul className="mt-3 space-y-2.5">
                      {items.map((s) => (
                        <li
                          key={s.id}
                          className="flex items-start justify-between gap-2"
                        >
                          <span
                            className={
                              s.is_active
                                ? "text-sm text-muted-foreground"
                                : "text-sm text-muted-foreground/50 line-through"
                            }
                          >
                            {s.name}
                          </span>
                          <form action={toggleServiceActive} className="shrink-0">
                            <input type="hidden" name="id" value={s.id} />
                            <input
                              type="hidden"
                              name="is_active"
                              value={String(!s.is_active)}
                            />
                            {/* A dozen-plus of these render on screen at
                                once, so "on" is a neutral dark fill rather
                                than a color, since a whole grid of colored
                                toggles would draw the eye everywhere at
                                once, which is the same as drawing it
                                nowhere. */}
                            <button
                              type="submit"
                              aria-label={
                                s.is_active
                                  ? `Deactivate ${s.name}`
                                  : `Activate ${s.name}`
                              }
                              title={s.is_active ? "Deactivate" : "Activate"}
                              className={
                                s.is_active
                                  ? "relative h-5 w-9 rounded-full bg-foreground/70 transition-colors after:absolute after:top-0.5 after:left-0.5 after:size-4 after:translate-x-4 after:rounded-full after:bg-background after:transition-transform after:content-['']"
                                  : "relative h-5 w-9 rounded-full bg-border transition-colors after:absolute after:top-0.5 after:left-0.5 after:size-4 after:rounded-full after:bg-background after:transition-transform after:content-['']"
                              }
                            />
                          </form>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
