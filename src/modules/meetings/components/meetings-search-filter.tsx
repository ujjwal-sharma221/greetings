import { useState } from "react";
import { SearchIcon } from "lucide-react";
import { AnimatePresence, motion, type Variants } from "motion/react";

import { cn } from "@/lib/utils";
import { useMeetingsFilter } from "../hooks/use-meetings-filters";

export function MeetingsSearchFilter() {
  const [filters, setFilters] = useMeetingsFilter();

  return (
    <div className="relative">
      <SearchInput
        placeholder="Filter by name"
        className="h-9 text-black"
        value={filters.search}
        onChange={(e) => setFilters({ search: e.target.value })}
      />
      <SearchIcon className="text-muted-foreground absolute top-1/2 right-2 size-4 -translate-y-1/2" />
    </div>
  );
}

type SearchInputProps = React.ComponentPropsWithRef<"input">;
type FieldState = "idle" | "filled";

function SearchInput({
  placeholder,
  onChange,
  className,
  ...props
}: SearchInputProps) {
  const [fieldState, setFieldState] = useState<FieldState>("idle");

  const animatedPlaceholderVariants: Variants = {
    show: {
      x: 0,
      opacity: 1,
      filter: "blur(var(--blur-none))",
    },
    hidden: {
      x: 28,
      opacity: 0,
      filter: "blur(var(--blur-xs))",
    },
  };

  return (
    <div
      className={cn(
        "border-border bg-main-secondary focus-within:border-primary data-[filled=true]:border-border relative inline-flex h-11 w-64 items-center overflow-hidden rounded-xl border shadow-xs transition-colors ease-out",
        "has-disabled:opacity-80 has-disabled:*:cursor-not-allowed",
        className,
      )}
      data-filled={fieldState === "filled"}
    >
      <input
        {...props}
        className={cn(
          "peer caret-primary h-full flex-1 bg-transparent px-3 py-2 outline-none placeholder:sr-only",
          "font-sans text-sm/5.5 font-normal text-black",
        )}
        placeholder={placeholder}
        onChange={(event) => {
          setFieldState(event.target.value.length > 0 ? "filled" : "idle");
          onChange?.(event);
        }}
      />

      <AnimatePresence mode="popLayout" initial={false}>
        {fieldState !== "filled" && (
          <motion.span
            className={cn(
              "pointer-events-none absolute left-3",
              "text-primary-muted/70 font-sans text-sm/5.5 font-normal",
            )}
            variants={animatedPlaceholderVariants}
            initial="hidden"
            animate="show"
            exit="hidden"
            transition={{
              type: "spring",
              duration: 0.6,
              bounce: 0,
            }}
          >
            {placeholder}
          </motion.span>
        )}
      </AnimatePresence>
    </div>
  );
}
