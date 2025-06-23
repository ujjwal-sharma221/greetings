import { createAvatar } from "@dicebear/core";
import { dylan, initials } from "@dicebear/collection";

interface AvatarProps {
  seed: string;
  variant: "dylan" | "initials";
}

export const generateAvatarUri = ({ seed, variant }: AvatarProps) => {
  let avatar;

  if (variant === "dylan") {
    avatar = createAvatar(dylan, { seed });
  } else
    avatar = createAvatar(initials, { seed, fontWeight: 500, fontSize: 42 });

  return avatar.toDataUri();
};
