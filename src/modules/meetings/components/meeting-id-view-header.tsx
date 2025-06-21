import Link from "next/link";
import { MoreVerticalIcon, SlashIcon } from "lucide-react";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { XIconAnimated } from "@/components/animated-icons/x-animated";
import { SquarePenIconAnimated } from "@/components/animated-icons/square-pen-animated-icon";

interface MeetingIdViewHeaderProps {
  meetingId: string;
  meetingName: string;
  onEdit: () => void;
  onRemove: () => void;
}

export function MeetingIdViewHeader({
  meetingId,
  meetingName,
  onEdit,
  onRemove,
}: MeetingIdViewHeaderProps) {
  return (
    <div className="flex items-center justify-between">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild className="text-xl font-medium">
              <Link href="/meetings">My Meeings</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator className="text-muted-foreground text-xl font-medium [&>svg]:size-4">
            <SlashIcon />
          </BreadcrumbSeparator>
          <BreadcrumbItem>
            <BreadcrumbLink
              asChild
              className="text-foreground text-xl font-medium"
            >
              <Link href={`/meetings/${meetingId}`}>{meetingName}</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost">
            <MoreVerticalIcon />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem className="text-black" onClick={onEdit}>
            <SquarePenIconAnimated size={4} />
            Edit
          </DropdownMenuItem>
          <DropdownMenuItem className="text-black" onClick={onRemove}>
            <XIconAnimated size={4} />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
