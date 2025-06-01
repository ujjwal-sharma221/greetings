import { useRouter } from "next/navigation";
import { CircleUserRoundIcon, CreditCard, LogOutIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { authClient } from "@/lib/auth-client";
import { GeneratedAvatar } from "@/components/generated-avatars";

export function DashboardUserButton() {
  const router = useRouter();
  const { data, isPending } = authClient.useSession();

  if (isPending) return <UserButtonSkeleton />;

  if (!data?.user) return null;

  const onLogout = async () => {
    authClient.signOut({
      fetchOptions: {
        onSuccess: () => router.push("/sign-in"),
      },
    });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="gap-0 rounded-full border border-zinc-800 bg-white py-0 ps-0 text-zinc-800">
          <div className="me-0.5 flex aspect-square h-full p-1.5">
            {data.user.image ? (
              <img
                src={data.user.image}
                alt="Avatar"
                width={25}
                height={25}
                className="shrink-0 rounded-full"
              />
            ) : (
              <GeneratedAvatar
                seed={data.user.name}
                variants="initials"
                className="size-6 shrink-0 rounded-full"
              />
            )}
          </div>
          <span className="">{data.user.name}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-60">
        <DropdownMenuLabel className="flex items-start gap-3">
          {data.user.image ? (
            <img
              src={data.user.image}
              alt="Avatar"
              width={32}
              height={32}
              className="shrink-0 rounded-full"
            />
          ) : (
            <CircleUserRoundIcon size={16} aria-hidden="true" />
          )}
          <div className="flex w-full flex-col">
            <span className="text-foreground truncate text-sm font-semibold">
              {data.user.name}
            </span>
            <span className="text-muted-foreground truncate text-xs font-normal">
              {data.user.email}
            </span>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem className="w-full">
            <CreditCard size={16} className="opacity-60" aria-hidden="true" />
            <span>Billing</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />

        <DropdownMenuItem onClick={onLogout}>
          <LogOutIcon size={16} className="opacity-60" aria-hidden="true" />
          <span>Logout</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function UserButtonSkeleton() {
  return (
    <Button
      disabled
      className="w-full animate-pulse rounded-full"
      variant="default"
      aria-label="Open account menu"
    >
      <CircleUserRoundIcon size={16} aria-hidden="true" />
    </Button>
  );
}
