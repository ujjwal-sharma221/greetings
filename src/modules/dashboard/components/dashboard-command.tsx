import { Dispatch, SetStateAction } from "react";

import {
  CommandResponsiveDialog,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";

interface DashboardCommandProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

export function DashboardCommand({ open, setOpen }: DashboardCommandProps) {
  return (
    <CommandResponsiveDialog open={open} onOpenChange={setOpen}>
      <CommandInput placeholder="Find a meeting or agent" />
      <CommandList>
        <CommandItem>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi
          deserunt consectetur beatae sunt accusamus inventore quibusdam
          explicabo odio, cumque dignissimos qui architecto consequatur dolores,
          natus neque ad iure aliquam error
        </CommandItem>
      </CommandList>
    </CommandResponsiveDialog>
  );
}
