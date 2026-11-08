
import Image from "next/image";
import { cn } from "@/lib/utils";

interface TeamLogoProps {
  className?: string;
}

export default function TeamLogo({ className }: TeamLogoProps) {
  return (
    <div
      className={cn(
        "relative flex h-16 w-32 items-center justify-center",
        className
      )}
    >
      <Image
        src="/assets/logo-team.svg"
        alt="Team 404 Logo"
        fill
        sizes="128px"
        className="object-contain p-2"
        priority
      />
    </div>
  );
}
