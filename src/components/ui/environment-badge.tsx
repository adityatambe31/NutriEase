import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectGroup,
} from "@radix-ui/react-select";
import { cn } from "@/lib/utils";
import { environments } from "@/config/environments";

export function EnvironmentBadge() {
  const currentEnv = process.env.NEXT_PUBLIC_ENVIRONMENT || "dev";
  const envConfig = environments[currentEnv.toLowerCase()];

  if (!envConfig) return null;

  const handleEnvironmentChange = (value: string) => {
    const selectedEnv = environments[value];
    if (selectedEnv?.url) {
      window.location.href = selectedEnv.url;
    }
  };

  return (
    <Select onValueChange={handleEnvironmentChange} defaultValue={currentEnv}>
      <SelectTrigger
        aria-label="Select Environment"
        className={cn(
          "rounded-full bg-white px-4 py-1.5 text-sm min-w-[120px]",
          "inline-flex items-center justify-between",
          "cursor-pointer transition-all duration-200",
          "hover:bg-gray-50 border border-gray-200",
          "focus:ring-2 focus:ring-offset-2 focus:ring-gray-200",
          "shadow-sm"
        )}
      >
        <div className="flex items-center gap-2">
          <span
            className={cn("w-2 h-2 rounded-full", envConfig.activeDotColor)}
          />
          <span className="font-semibold">{envConfig.label}</span>
        </div>
      </SelectTrigger>

      <SelectContent
        className="rounded-lg border-none shadow-lg bg-white p-2"
        align="start"
        sideOffset={4}
        position="popper"
        collisionPadding={10}
        side="bottom"
      >
        <SelectGroup>
          {Object.entries(environments).map(([key, env]) => (
            <SelectItem
              key={key}
              value={env.label}
              className={cn(
                "px-3 py-2.5 my-0.5 rounded-md",
                "transition-all duration-200 hover:bg-gray-50",
                key === currentEnv && "bg-gray-50/75"
              )}
            >
              <div className="flex flex-col gap-1.5 min-w-[200px]">
                <div className="flex items-center gap-2">
                  <span
                    className={cn(
                      "w-2 h-2 rounded-full",
                      key === currentEnv ? env.activeDotColor : env.dotColor
                    )}
                  />
                  <span
                    className={cn(
                      "text-sm",
                      key === currentEnv ? "font-bold" : "font-medium"
                    )}
                  >
                    {env.label}
                  </span>
                </div>
                {/* Description */}
                <p className="text-xs text-gray-500 pl-4 line-clamp-2">
                  {env.description}
                </p>
              </div>
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
