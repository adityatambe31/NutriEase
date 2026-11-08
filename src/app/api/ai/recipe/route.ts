
import { NextRequest, NextResponse } from 'next/server';
import { requireUser, sameOrigin } from '@/lib/request-guard';
import { checkDailyAllowance } from '@/lib/ai-limits';
import {
  readLimitedJson,
  RequestBodyTooLargeError,
} from '@/lib/read-limited-json';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { z } from 'zod';

export const runtime = 'nodejs';

const MAX_BODY_BYTES = 20_000;

const recipeSchema = z.object({
  recipe: z.string().min(2).max(180),
});

export async function POST(request: NextRequest) {
  // Require an authenticated account.
  const identity = await requireUser();

  if ('error' in identity) {
    return identity.error;
  }

  // Reject requests from other origins.
  if (!sameOrigin(request)) {
    return NextResponse.json(
      { error: 'Invalid origin' },
      { status: 403 },
    );
  }

  // Keep AI disabled until explicitly enabled.
  if (process.env.AI_ENABLED !== 'true') {
    return NextResponse.json(
      { error: 'AI is disabled by default' },
      { status: 503 },
    );
  }

  // Chefy can share the primary Gemini key.
  const key =
    process.env.GEMINI_API_KEY_COOK ||
    process.env.GEMINI_API_KEY;

  if (!key) {
    return NextResponse.json(
      { error: 'AI is not configured' },
      { status: 503 },
    );
  }

  // Enforce the actual request-body size and validate input.
  let recipe: string;

  try {
    const body = await readLimitedJson(request, MAX_BODY_BYTES);
    recipe = recipeSchema.parse(body).recipe;
  } catch (error) {
    if (error instanceof RequestBodyTooLargeError) {
      return NextResponse.json(
        { error: 'Request too large' },
        { status: 413 },
      );
    }

    return NextResponse.json(
      { error: 'Invalid recipe' },
      { status: 400 },
    );
  }

  try {
    // Count the attempt before contacting Gemini.
    const allowed = await checkDailyAllowance(
      identity.userId,
      'recipe',
    );

    if (!allowed) {
      return NextResponse.json(
        { error: 'Daily recipe limit reached' },
        { status: 429 },
      );
    }

    const model = new GoogleGenerativeAI(
      key,
    ).getGenerativeModel({
      model: process.env.GEMINI_MODEL || 'gemini-2.5-flash',
    });

    const result = await model.generateContent({
      contents: [
        {
          role: 'user',
          parts: [
            {
              text:
                `Provide a concise, safe cooking recipe for: ${recipe}. ` +
                'Include ingredients, steps and approximate time. ' +
                'No unrelated content.',
            },
          ],
        },
      ],
      generationConfig: {
        maxOutputTokens: 2048,
      },
    });

    return NextResponse.json({
      text: result.response.text().slice(0, 25_000),
    });
  } catch {
    console.error('Recipe AI request failed');

    return NextResponse.json(
      { error: 'Recipe unavailable' },
      { status: 502 },
    );
  }
}
