"use client";

import { useRef } from "react";
import { Trash2 } from "lucide-react";
import { updateServiceStatus, removeService } from "@/lib/actions/clientServices";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { TableCell, TableRow } from "@/components/ui/table";
import type { ServiceStatus } from "@/lib/types/domain";

export function ServiceStatusRow({
  id,
  clientId,
  serviceName,
  category,
  status,
  notes,
}: {
  id: string;
  clientId: string;
  serviceName: string;
  category: string;
  status: ServiceStatus;
  notes: string | null;
}) {
  const formRef = useRef<HTMLFormElement>(null);

  return (
    <TableRow>
      <TableCell className="font-medium">{serviceName}</TableCell>
      <TableCell className="text-muted-foreground">{category}</TableCell>
      <TableCell colSpan={2}>
        <form ref={formRef} action={updateServiceStatus} className="flex items-center gap-2">
          <input type="hidden" name="id" value={id} />
          <input type="hidden" name="client_id" value={clientId} />
          <Select
            name="status"
            defaultValue={status}
            onValueChange={() => formRef.current?.requestSubmit()}
          >
            <SelectTrigger size="sm" className="w-36">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="not_started">Not Started</SelectItem>
              <SelectItem value="in_progress">In Progress</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
            </SelectContent>
          </Select>
          <Input
            name="notes"
            defaultValue={notes ?? ""}
            placeholder="Add a note..."
            className="h-8 flex-1 text-sm"
            onBlur={() => formRef.current?.requestSubmit()}
          />
        </form>
      </TableCell>
      <TableCell>
        <form action={removeService}>
          <input type="hidden" name="id" value={id} />
          <input type="hidden" name="client_id" value={clientId} />
          <Button
            type="submit"
            variant="ghost"
            size="icon-sm"
            className="text-muted-foreground hover:text-destructive"
          >
            <Trash2 className="size-4" />
          </Button>
        </form>
      </TableCell>
    </TableRow>
  );
}
