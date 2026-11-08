
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

const schema = z.object({
  prompt: z.string().min(20).max(5000),
});

export async function POST(request: NextRequest) {
  // Require a valid authenticated session.
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

  // Keep Gemini disabled unless explicitly enabled.
  if (process.env.AI_ENABLED !== 'true') {
    return NextResponse.json(
      {
        error:
          'AI is disabled by default. Configure it safely to enable.',
      },
      { status: 503 },
    );
  }

  const key = process.env.GEMINI_API_KEY;

  if (!key) {
    return NextResponse.json(
      { error: 'AI is not configured' },
      { status: 503 },
    );
  }

  // Validate the request without reading an unlimited body.
  let prompt: string;

  try {
    const body = await readLimitedJson(request, MAX_BODY_BYTES);
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
    // Count the attempt before calling Gemini.
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

    const model = new GoogleGenerativeAI(
      key,
    ).getGenerativeModel({
      model: process.env.GEMINI_MODEL || 'gemini-2.5-flash',
    });

    const result = await model.generateContent({
      contents: [
        {
          role: 'user',
          parts: [{ text: prompt }],
        },
      ],
      generationConfig: {
        maxOutputTokens: 2048,
        responseMimeType: 'application/json',
      },
    });

    const text = result.response.text();

    if (text.length > 100_000) {
      return NextResponse.json(
        { error: 'AI output too large' },
        { status: 502 },
      );
    }

    return NextResponse.json({ text });
  } catch {
    console.error('Meal AI request failed');

    return NextResponse.json(
      { error: 'AI generation unavailable' },
      { status: 502 },
    );
  }
}
