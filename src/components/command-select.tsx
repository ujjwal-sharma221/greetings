import { useState } from "react";

import {
  CommandEmpty,
  CommandInput,
  CommandItem,
  CommandList,
  CommandResponsiveDialog,
} from "./ui/command";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { ChevronsUpDownIconAnimated } from "./animated-icons/chevrons-up-down-animated";

interface CommandSelectProps {
  value: string;
  className?: string;
  placeholder?: string;
  isSearchable?: boolean;
  onSelect: (value: string) => void;
  onSearch?: (value: string) => void;
  options: Array<{ id: string; value: string; children: React.ReactNode }>;
}

export function CommandSelect({
  value,
  className,
  placeholder = "Select an option",
  isSearchable,
  options,
  onSelect,
  onSearch,
}: CommandSelectProps) {
  const [open, setOpen] = useState(false);
  const selectedOption = options.find((opt) => opt.value === value);

  return (
    <>
      <Button
        onClick={() => setOpen(true)}
        type="button"
        variant="outline"
        className={cn(
          "h-9 justify-between px-2 font-normal",
          !selectedOption && "text-muted-foreground",
          className,
        )}
      >
        <div>{selectedOption?.children ?? placeholder}</div>
        <ChevronsUpDownIconAnimated />
      </Button>
      <CommandResponsiveDialog
        shouldFilter={!onSearch}
        open={open}
        onOpenChange={setOpen}
      >
        <CommandInput placeholder="search..." onValueChange={onSearch} />
        <CommandList className="w-[40rem]">
          <CommandEmpty>
            <span className="text-muted-foreground text-sm">
              No options found
            </span>
          </CommandEmpty>
          {options.map((opt) => (
            <CommandItem
              key={opt.id}
              onSelect={() => {
                onSelect(opt.value);
                setOpen(false);
              }}
            >
              {opt.children}
            </CommandItem>
          ))}
        </CommandList>
      </CommandResponsiveDialog>
    </>
  );
}
