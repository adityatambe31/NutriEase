'use client';

import dynamic from 'next/dynamic';

export const AuthButton = dynamic(
  () =>
    import('@/components/layout/auth-button.client').then((mod) => ({
      default: mod.AuthButtonClient,
    })),
  { ssr: false },
);

export const MobileAuthButton = dynamic(
  () =>
    import('@/components/layout/auth-button.client').then((mod) => ({
      default: mod.MobileAuthButtonClient,
    })),
  { ssr: false },
);
