// For Test ONLY
// Contact: team404@dcglobal.co for more info

'use client';

import { signIn } from '@/auth/helpers';
import { Button } from '@/components/ui/button';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function AuthButton() {
  const session = useSession();
  const router = useRouter();

  return session?.data?.user ? (
    <Button onClick={() => router.push('/auth/signout')}>
      {session.data?.user?.name} : Sign Out
    </Button>
  ) : (
    <Button onClick={async () => await signIn()}>Sign In</Button>
  );
}
