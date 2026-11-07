import { auth } from '@/auth/auth-config';
import { NextResponse } from 'next/server';

export async function requireUser() {
  const session = await auth();
  const id = session?.user?.id;
  if (!id) return { error: NextResponse.json({ error: 'Sign in required' }, { status: 401 }) } as const;
  return { userId: id } as const;
}

export function sameOrigin(request: Request) {
  const origin = request.headers.get('origin');
  if (!origin) return false; // Fail closed for browser and scripted unsafe requests.
  try {
    const expected = new URL(request.url);
    const provided = new URL(origin);
    return provided.host === expected.host && provided.protocol === expected.protocol;
  } catch { return false; }
}

export function requestTooLarge(request: Request, maxBytes = 20_000): boolean {
  const header = request.headers.get('content-length');

  if (!header) return false; // Actual body size must still be checked when reading.

  const size = Number(header);

  return !Number.isSafeInteger(size) || size < 0 || size > maxBytes;
}