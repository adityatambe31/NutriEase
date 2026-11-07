'use client';

import { cn } from '@/lib/utils';
import Image from 'next/image';
import { useMemo, useState } from 'react';
import { FaRegUserCircle } from 'react-icons/fa';

const AVATAR_COLORS = [
  'bg-blue-500',
  'bg-green-500',
  'bg-yellow-500',
  'bg-red-500',
  'bg-purple-500',
  'bg-pink-500',
  'bg-indigo-500',
  'bg-orange-500',
  'bg-teal-500',
  'bg-cyan-500',
];

type UserAvatarProps = {
  src: string | null | undefined;
  alt: string;
  size?: number;
  className?: string;
  showFallbackIcon?: boolean;
};

export function UserAvatar({
  src,
  alt,
  size = 32,
  className,
  showFallbackIcon = true,
}: UserAvatarProps) {
  const [isError, setIsError] = useState(false);

  const shouldShowFallback = isError || !src;

  const initials = useMemo(() => {
    if (!alt) return '';

    return alt
      .split(' ')
      .map((part) => part[0])
      .filter(Boolean)
      .join('')
      .toUpperCase()
      .substring(0, 2);
  }, [alt]);

  const bgColorClass = useMemo(() => {
    if (!alt) return AVATAR_COLORS[0];

    const charSum = alt
      .split('')
      .reduce((sum, char) => sum + char.charCodeAt(0), 0);

    return AVATAR_COLORS[charSum % AVATAR_COLORS.length];
  }, [alt]);

  return (
    <div
      style={{ width: size, height: size }}
      className={cn(
        'relative overflow-hidden rounded-full flex items-center justify-center ring-1 ring-black/5 dark:ring-white/10',
        shouldShowFallback ? bgColorClass : 'bg-gray-100 dark:bg-gray-800',
        className,
      )}
    >
      {shouldShowFallback && showFallbackIcon ? (
        initials ? (
          <span
            className="text-white font-medium select-none"
            style={{
              fontSize: Math.max(size * 0.4, 12),
              lineHeight: 1,
            }}
          >
            {initials}
          </span>
        ) : (
          <FaRegUserCircle
            className="text-white/90"
            style={{ fontSize: Math.max(size * 0.75, 16) }}
          />
        )
      ) : (
        <Image
          src={src || '/assets/user-avatar-fallback.svg'}
          alt={alt}
          width={size}
          height={size}
          className="rounded-full object-cover h-full w-full"
          onError={() => setIsError(true)}
          priority
        />
      )}
    </div>
  );
}
