"use client";

import { Search } from "lucide-react";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { useSidebar } from "@/components/ui/sidebar";
import { DashboardCommand } from "./dashboard-command";
import { PanelLeftCloseIconAnimated } from "@/components/animated-icons/panel-left-close-animated";
import { PanelLeftOpenIconAnimated } from "@/components/animated-icons/panel-left-open-animated";

export function DashboardNavbar() {
  const { state, toggleSidebar, isMobile } = useSidebar();
  const [commandOpen, setCommandOpen] = useState(false);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setCommandOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  return (
    <>
      <DashboardCommand open={commandOpen} setOpen={setCommandOpen} />
      <nav className="flex items-center gap-x-2 border px-4 py-3">
        <Button className="size-9" variant="outline" onClick={toggleSidebar}>
          {state === "collapsed" || isMobile ? (
            <PanelLeftOpenIconAnimated />
          ) : (
            <PanelLeftCloseIconAnimated />
          )}
        </Button>
        <Button
          className="h-9 w-[240px] items-center justify-start font-normal"
          size="sm"
          variant="outline"
          onClick={() => setCommandOpen((open) => !open)}
        >
          <Search />
          Search
          <kbd className="bg-muted pointer-events-none mt-1 ml-auto inline-flex h-5 items-center gap-1 rounded border px-1.5 font-mono text-[10px] font-medium opacity-75 select-none">
            <span className="text-xs">⌘</span>K
          </kbd>
        </Button>
      </nav>
    </>
  );
}
