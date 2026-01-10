import { cn } from "@/lib/utils";
import * as AvatarPrimitive from "@radix-ui/react-avatar";

export const ProfileAvatar = ({
  url,
  name,
  size = "md",
  className,
  numOfChars = 1,
}: {
  name: string;
  url?: string;
  size?: "sm" | "md" | "lg";
  className?: string;
  numOfChars?: number;
}) => {
  return (
    <AvatarPrimitive.Root
      className={cn(
        "flex items-center justify-center overflow-hidden rounded-md",
        size === "sm" && "h-6 w-6",
        size === "md" && "h-8 w-8",
        size === "lg" && "h-10 w-10",
        className
      )}
    >
      <AvatarPrimitive.Image
        src={url}
        alt={name}
        className="h-full w-full object-cover"
      />

      <AvatarPrimitive.Fallback
        className="h-full w-full flex items-center justify-center bg-blue-600 text-white font-medium"
      >
        {name.substring(0, numOfChars).toUpperCase()}
      </AvatarPrimitive.Fallback>
    </AvatarPrimitive.Root>
  );
};
