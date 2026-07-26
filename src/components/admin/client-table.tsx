"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Search, Users, ArrowRight } from "lucide-react";
import { EmptyState } from "@/components/dashboard/empty-state";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { CLIENT_TYPE_LABELS, type ClientType } from "@/lib/types/domain";

export type ClientRow = {
  id: string;
  full_name: string;
  email: string;
  company_name: string | null;
  client_type: ClientType | null;
  created_at: string;
  service_count: number;
};

export function ClientTable({ clients }: { clients: ClientRow[] }) {
  const [query, setQuery] = useState("");
  const [type, setType] = useState<string>("all");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return clients.filter((c) => {
      const matchesQuery =
        !q ||
        c.full_name.toLowerCase().includes(q) ||
        c.email.toLowerCase().includes(q) ||
        (c.company_name ?? "").toLowerCase().includes(q);
      const matchesType = type === "all" || c.client_type === type;
      return matchesQuery && matchesType;
    });
  }, [clients, query, type]);

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-3">
        <div className="relative min-w-56 flex-1">
          <Search className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by name, email, or company..."
            className="pl-9"
            aria-label="Search clients"
          />
        </div>
        <Select value={type} onValueChange={setType}>
          <SelectTrigger className="w-48" aria-label="Filter by category">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All categories</SelectItem>
            {(Object.keys(CLIENT_TYPE_LABELS) as ClientType[]).map((t) => (
              <SelectItem key={t} value={t}>
                {CLIENT_TYPE_LABELS[t]}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="rounded-xl border border-border bg-card">
        {filtered.length === 0 ? (
          <div className="p-6">
            <EmptyState
              icon={Users}
              title={clients.length === 0 ? "No clients yet" : "No matches"}
              description={
                clients.length === 0
                  ? "Clients will appear here once they sign up."
                  : "Try a different search term or category filter."
              }
            />
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Services</TableHead>
                <TableHead>Joined</TableHead>
                <TableHead />
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((c) => (
                <TableRow key={c.id} className="group">
                  <TableCell className="font-medium">
                    <Link
                      href={`/admin/clients/${c.id}`}
                      className="text-navy hover:underline"
                    >
                      {c.full_name}
                    </Link>
                    {c.company_name && (
                      <span className="block text-xs text-muted-foreground">
                        {c.company_name}
                      </span>
                    )}
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {c.email}
                  </TableCell>
                  <TableCell>
                    {c.client_type ? (
                      <Badge variant="secondary">
                        {CLIENT_TYPE_LABELS[c.client_type]}
                      </Badge>
                    ) : (
                      <span className="text-muted-foreground">-</span>
                    )}
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {c.service_count}
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {new Date(c.created_at).toLocaleDateString("en-IN")}
                  </TableCell>
                  <TableCell>
                    <Link
                      href={`/admin/clients/${c.id}`}
                      aria-label={`Open ${c.full_name}`}
                      className="text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100 hover:text-navy"
                    >
                      <ArrowRight className="size-4" />
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </div>

      <p className="text-xs text-muted-foreground">
        Showing {filtered.length} of {clients.length} clients
      </p>
    </div>
  );
}
