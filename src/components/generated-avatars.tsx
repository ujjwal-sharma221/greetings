import { createAvatar } from "@dicebear/core";
import { dylan, initials } from "@dicebear/collection";

import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

interface GeneratedAvatarProps {
  seed: string;
  className?: string;
  variants: "initials" | "dylan";
}

export function GeneratedAvatar({
  seed,
  variants,
  className,
}: GeneratedAvatarProps) {
  let avatar;

  if (variants === "dylan") {
    avatar = createAvatar(dylan, { seed });
  } else {
    avatar = createAvatar(initials, { seed, fontWeight: 500, fontSize: 42 });
  }

  return (
    <Avatar className={cn(className)}>
      <AvatarImage src={avatar.toDataUri()} alt="avatar" />
      <AvatarFallback>{seed.charAt(0).toUpperCase()}</AvatarFallback>
    </Avatar>
  );
}
