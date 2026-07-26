"use client";

import { useMemo, useState } from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import {
  countries,
  flagEmoji,
  PRIORITY_CODES,
  type Country,
} from "@/lib/data/countries";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

// Priority countries first, then the rest alphabetically.
const ordered: Country[] = [
  ...PRIORITY_CODES.map((c) => countries.find((x) => x.code === c)!).filter(
    Boolean
  ),
  ...countries
    .filter((c) => !PRIORITY_CODES.includes(c.code))
    .sort((a, b) => a.name.localeCompare(b.name)),
];

const DEFAULT = ordered[0];

export function PhoneField() {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<Country>(DEFAULT);
  const [query, setQuery] = useState("");

  // Match on country name, ISO code, or dial code, with or without the
  // leading "+", so "+971", "971", "uae", and "united arab" all work.
  const results = useMemo(() => {
    const q = query.trim().toLowerCase().replace(/^\+/, "");
    if (!q) return ordered;
    return ordered.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        c.code.toLowerCase().includes(q) ||
        c.dial.startsWith(q)
    );
  }, [query]);

  const priority = results.filter((c) => PRIORITY_CODES.includes(c.code));
  const rest = results.filter((c) => !PRIORITY_CODES.includes(c.code));

  const renderItem = (c: Country) => (
    <CommandItem
      key={`${c.code}-${c.dial}`}
      // Value feeds cmdk's own matching; we filter ourselves, but this
      // keeps keyboard selection unique per row.
      value={`${c.name} ${c.code} ${c.dial}`}
      onSelect={() => {
        setSelected(c);
        setOpen(false);
        setQuery("");
      }}
      className="gap-2"
    >
      <span aria-hidden="true">{flagEmoji(c.code)}</span>
      <span className="flex-1 truncate">{c.name}</span>
      <span className="text-muted-foreground tabular-nums">+{c.dial}</span>
      {selected.code === c.code && <Check className="size-4 text-navy" />}
    </CommandItem>
  );

  return (
    <div className="space-y-1.5">
      <Label htmlFor="enq-phone">
        Phone{" "}
        <span className="font-normal text-muted-foreground">(optional)</span>
      </Label>

      {/* The server reads these two fields and joins them. Without JS the
          hidden input still carries the default dial code, so the number is
          never lost. */}
      <input type="hidden" name="phone_dial" value={selected.dial} />

      <div className="flex gap-2">
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              type="button"
              variant="outline"
              role="combobox"
              aria-expanded={open}
              aria-label={`Country code: ${selected.name} plus ${selected.dial}`}
              className="h-9 shrink-0 justify-between gap-1.5 px-2.5 font-normal"
            >
              <span aria-hidden="true">{flagEmoji(selected.code)}</span>
              <span className="tabular-nums">+{selected.dial}</span>
              <ChevronsUpDown className="size-3.5 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent
            align="start"
            className="w-[min(20rem,calc(100vw-2rem))] p-0"
          >
            <Command shouldFilter={false}>
              <CommandInput
                placeholder="Search country or code..."
                value={query}
                onValueChange={setQuery}
              />
              <CommandList className="max-h-64">
                <CommandEmpty>No country found.</CommandEmpty>
                {priority.length > 0 && (
                  <CommandGroup heading="Frequently used">
                    {priority.map(renderItem)}
                  </CommandGroup>
                )}
                {rest.length > 0 && (
                  <CommandGroup heading="All countries">
                    {rest.map(renderItem)}
                  </CommandGroup>
                )}
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>

        <Input
          id="enq-phone"
          name="phone"
          type="tel"
          inputMode="tel"
          autoComplete="tel-national"
          placeholder="Phone number"
          className={cn("flex-1")}
        />
      </div>
    </div>
  );
}
