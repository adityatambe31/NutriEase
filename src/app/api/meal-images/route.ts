import { NextRequest, NextResponse } from 'next/server';
import { createClient } from 'pexels';
import { requireUser } from '@/lib/request-guard';
import { checkDailyAllowance } from '@/lib/ai-limits';
export const runtime = 'nodejs';
export async function GET(request: NextRequest) {
  const identity = await requireUser();
  if ('error' in identity) return identity.error;
  if (process.env.IMAGES_ENABLED !== 'true') return NextResponse.json({ imageUrl: '' });
  const key = process.env.PEXELS_API_KEY;
  if (!key) return NextResponse.json({ imageUrl: '' });
  const meal = request.nextUrl.searchParams.get('meal')?.trim() || '';
  if (meal.length < 2 || meal.length > 100) return NextResponse.json({ error: 'Invalid meal name' }, { status: 400 });
  try {
    if (!await checkDailyAllowance(identity.userId, 'image')) return NextResponse.json({ imageUrl: '', limited: true }, { status: 429 });
    const result = await createClient(key).photos.search({ query: `${meal} food dish`, per_page: 1, orientation: 'landscape' });
    return NextResponse.json({ imageUrl: 'photos' in result ? result.photos[0]?.src.large || '' : '' });
  } catch { return NextResponse.json({ imageUrl: '' }); }
}
