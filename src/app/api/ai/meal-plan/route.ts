
import { NextRequest, NextResponse } from 'next/server';
import { requireUser, sameOrigin } from '@/lib/request-guard';
import { checkDailyAllowance } from '@/lib/ai-limits';
import {
  readLimitedJson,
  RequestBodyTooLargeError,
} from '@/lib/read-limited-json';
import { generateAI } from '@/lib/ai-provider';
import { z } from 'zod';

export const runtime = 'nodejs';

const MAX_BODY_BYTES = 20_000;

const schema = z.object({
  prompt: z.string().min(20).max(5000),
});

export async function POST(request: NextRequest) {
  const identity = await requireUser();

  if ('error' in identity) {
    return identity.error;
  }

  if (!sameOrigin(request)) {
    return NextResponse.json(
      { error: 'Invalid origin' },
      { status: 403 },
    );
  }

  if (process.env.AI_ENABLED !== 'true') {
    return NextResponse.json(
      { error: 'AI is disabled by default' },
      { status: 503 },
    );
  }

  if (
    process.env.AI_PROVIDER !== 'groq' ||
    !process.env.GROQ_API_KEY
  ) {
    return NextResponse.json(
      { error: 'AI is not configured' },
      { status: 503 },
    );
  }

  let prompt: string;

  try {
    const body = await readLimitedJson(
      request,
      MAX_BODY_BYTES,
    );

    prompt = schema.parse(body).prompt;
  } catch (error) {
    if (error instanceof RequestBodyTooLargeError) {
      return NextResponse.json(
        { error: 'Request too large' },
        { status: 413 },
      );
    }

    return NextResponse.json(
      { error: 'Invalid input' },
      { status: 400 },
    );
  }

  try {
    const allowed = await checkDailyAllowance(
      identity.userId,
      'meal',
    );

    if (!allowed) {
      return NextResponse.json(
        { error: 'Daily generation limit reached' },
        { status: 429 },
      );
    }

    const text = await generateAI({
      prompt,
      systemPrompt:
        'You are NutriEase, a meal-planning assistant. ' +
        'Generate meal plans according to the user request. ' +
        'Return only valid JSON without Markdown fences. ' +
        'Use the exact structure requested in the user prompt. ' +
        'Do not invent medical guarantees or claim to provide ' +
        'professional medical advice.',
      maxTokens: 4096,
      jsonMode: true,
    });

    return NextResponse.json({ text });
  } catch {
    console.error('Meal AI request failed');

    return NextResponse.json(
      { error: 'AI generation unavailable' },
      { status: 502 },
    );
  }
}
