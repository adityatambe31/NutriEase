import { NextRequest, NextResponse } from 'next/server';
import { requireUser, sameOrigin, requestTooLarge } from '@/lib/request-guard';
import { checkDailyAllowance } from '@/lib/ai-limits';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { z } from 'zod';

export const runtime = 'nodejs';
export async function POST(request: NextRequest) {
  const identity = await requireUser();
  if ('error' in identity) return identity.error;
  if (!sameOrigin(request)) return NextResponse.json({ error: 'Invalid origin' }, { status: 403 });
  if (requestTooLarge(request)) return NextResponse.json({ error: 'Request too large' }, { status: 413 });
  if (process.env.AI_ENABLED !== 'true') return NextResponse.json({ error: 'AI is disabled by default' }, { status: 503 });
  const key = process.env.GEMINI_API_KEY_COOK || process.env.GEMINI_API_KEY;
  if (!key) return NextResponse.json({ error: 'AI is not configured' }, { status: 503 });
  let recipe: string;
  try { recipe = z.object({ recipe: z.string().min(2).max(180) }).parse(await request.json()).recipe; }
  catch { return NextResponse.json({ error: 'Invalid recipe' }, { status: 400 }); }
  try {
    if (!await checkDailyAllowance(identity.userId, 'recipe')) return NextResponse.json({ error: 'Daily recipe limit reached' }, { status: 429 });
    const model = new GoogleGenerativeAI(key).getGenerativeModel({ model: process.env.GEMINI_MODEL || 'gemini-2.5-flash' });
    const result = await model.generateContent({ contents: [{ role: 'user', parts: [{ text: `Provide a concise, safe cooking recipe for: ${recipe}. Include ingredients, steps and approximate time. No unrelated content.` }] }], generationConfig: { maxOutputTokens: 2048 } });
    return NextResponse.json({ text: result.response.text().slice(0, 25000) });
  } catch { console.error('Recipe AI request failed'); return NextResponse.json({ error: 'Recipe unavailable' }, { status: 502 }); }
}
