'use server';

import { signOut } from '@/auth/auth-config';

export async function handleSignOut() {
  await signOut();
}
