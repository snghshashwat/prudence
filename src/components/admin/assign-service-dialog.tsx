"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { assignService } from "@/lib/actions/clientServices";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { PILLAR_LABELS, type Pillar } from "@/lib/types/domain";

type ServiceOption = {
  id: string;
  name: string;
  category: string;
  pillar: Pillar;
};

export function AssignServiceDialog({
  clientId,
  services,
}: {
  clientId: string;
  services: ServiceOption[];
}) {
  const [open, setOpen] = useState(false);

  const grouped = services.reduce<Record<string, ServiceOption[]>>((acc, s) => {
    (acc[s.pillar] ??= []).push(s);
    return acc;
  }, {});

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
          <Plus className="size-4" />
          Assign Service
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Assign a service</DialogTitle>
        </DialogHeader>
        <form
          action={async (formData) => {
            await assignService(formData);
            setOpen(false);
          }}
          className="space-y-4"
        >
          <input type="hidden" name="client_id" value={clientId} />
          <div className="space-y-1.5">
            <Label htmlFor="service_id">Service</Label>
            <Select name="service_id" required>
              <SelectTrigger id="service_id" className="w-full">
                <SelectValue placeholder="Select a service" />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(grouped).map(([pillar, items]) => (
                  <div key={pillar}>
                    <p className="px-2 py-1.5 text-xs font-semibold text-muted-foreground">
                      {PILLAR_LABELS[pillar as Pillar]}
                    </p>
                    {items.map((s) => (
                      <SelectItem key={s.id} value={s.id}>
                        {s.name}
                      </SelectItem>
                    ))}
                  </div>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="status">Initial status</Label>
            <Select name="status" defaultValue="not_started">
              <SelectTrigger id="status" className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="not_started">Not Started</SelectItem>
                <SelectItem value="in_progress">In Progress</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <DialogFooter>
            <Button type="submit" className="bg-primary text-primary-foreground hover:bg-primary/90">
              Assign
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
