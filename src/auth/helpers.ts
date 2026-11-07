'use server';

import { signIn as naSignIn, signOut as naSignOut } from '@/auth/auth-config';

export async function signIn() {
  await naSignIn();
}

export async function signOut() {
  await naSignOut();
  document.cookie.split(';').forEach((cookie) => {
    document.cookie = cookie
      .replace(/^ +/, '')
      .replace(/=.*/, `=;expires=${new Date(0).toUTCString()};path=/`);
  });
  localStorage.removeItem('user');
  sessionStorage.clear();
}
