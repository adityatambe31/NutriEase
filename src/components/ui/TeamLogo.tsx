import Image from "next/image";
import { cn } from "@/lib/utils";

interface TeamLogoProps {
  className?: string;
}

export default function TeamLogo({ className }: TeamLogoProps) {
  return (
    <div className={cn("relative flex items-center justify-center", className)}>
      <Image
        src="/assets/logo-team.svg"
        alt="Team 404 Logo"
        fill
        className="object-contain p-2"
        priority
      />
    </div>
  );
}
