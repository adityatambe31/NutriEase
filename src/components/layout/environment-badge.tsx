'use client';

import { environments } from '@/config/environments';
import { cn } from '@/lib/utils';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
} from '@radix-ui/react-select';
import React from 'react';

export function EnvironmentBadge() {
  const currentEnv = process.env.NEXT_PUBLIC_ENVIRONMENT?.toLowerCase();
  const envConfig = currentEnv ? environments[currentEnv] : null;
  if (!envConfig) return null;

  const handleEnvironmentChange = async (value: string) => {
    const selectedEnv = environments[value.toLowerCase()];
    if (!selectedEnv) return;

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 3000);

      // Execute fetch without storing the result
      await fetch(selectedEnv.url, {
        method: 'HEAD',
        credentials: 'omit',
        signal: controller.signal,
        mode: 'no-cors',
      });

      clearTimeout(timeoutId);

      // In no-cors mode, we can't reliably check status codes
      // So we assume success if we get a response
      window.location.href = selectedEnv.url;
    } catch (error) {
      // Any error (network error, CORS issue, timeout) means the URL is down
      console.error(`Error checking URL availability: ${error}`);
      console.warn(`Environment URL is unavailable: ${selectedEnv.url}`);

      // Use fallback URL for any error case
      window.location.href = selectedEnv.fallbackUrl;
    }
  };

  return (
    <Select onValueChange={handleEnvironmentChange} defaultValue={currentEnv}>
      <SelectTrigger
        aria-label="Select Environment"
        className={cn(
          'rounded-full px-4 py-1.5 text-sm min-w-[120px]',
          'inline-flex items-center justify-between',
          'cursor-pointer transition-all duration-200',
          'hover:bg-gray-300 border border-gray-200',
          'focus:ring-2 focus:ring-offset-2 focus:ring-gray-200',
          'shadow-xs',
          envConfig.activeDotColor,
        )}
      >
        <div className="flex items-center justify-center w-full gap-2">
          <span className="font-semibold text-center flex-1">
            {envConfig.label}
          </span>
        </div>
      </SelectTrigger>

      <SelectContent
        className="rounded-lg border-none shadow-lg z-50 bg-white p-2"
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
              value={key}
              className={cn(
                'px-3 py-2.5 my-0.5 rounded-md',
                'transition-all duration-200 hover:bg-gray-100',
                key === currentEnv && 'bg-gray-50/75',
              )}
            >
              <div className="flex flex-col gap-1.5 min-w-[200px]">
                <div className="flex items-center gap-2">
                  <span
                    className={cn(
                      'w-3 h-3 rounded-full',
                      key === currentEnv ? env.activeDotColor : env.dotColor,
                    )}
                  />
                  <span
                    className={cn(
                      'text-sm',
                      key === currentEnv ? 'font-bold pl-1' : 'font-medium',
                    )}
                  >
                    {env.label}
                  </span>
                </div>
                {/* Description */}
                <p className="text-xs text-gray-500 pl-6 line-clamp-2">
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
