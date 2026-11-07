
import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import { requireUser, sameOrigin, requestTooLarge } from '@/lib/request-guard';
import MealPlan from '@/models/MealPlan';
import { z } from 'zod';

export const runtime = 'nodejs';

const MAX_BODY_BYTES = 350_000;

const createSchema = z
  .object({
    id: z.string().min(1).max(90),
    userSelection: z.record(z.string(), z.unknown()).optional(),
    meals: z.object({
      mealPlan: z.object({
        Days: z.array(z.unknown()).max(7),
      }),
    }),
  })
  .strip();

// Read the request body with an actual size limit.
// This also protects against requests without Content-Length.
async function readLimitedJSON(
  request: Request,
  maxBytes: number,
): Promise<unknown> {
  const reader = request.body?.getReader();

  if (!reader) {
    throw new Error('INVALID_BODY');
  }

  const chunks: Uint8Array[] = [];
  let totalBytes = 0;

  try {
    while (true) {
      const { done, value } = await reader.read();

      if (done) break;

      totalBytes += value.byteLength;

      if (totalBytes > maxBytes) {
        throw new Error('BODY_TOO_LARGE');
      }

      chunks.push(value);
    }
  } finally {
    reader.releaseLock();
  }

  const bytes = new Uint8Array(totalBytes);
  let offset = 0;

  for (const chunk of chunks) {
    bytes.set(chunk, offset);
    offset += chunk.byteLength;
  }

  return JSON.parse(new TextDecoder('utf-8', { fatal: true }).decode(bytes));
}

export async function POST(req: NextRequest) {
  const identity = await requireUser();

  if ('error' in identity) {
    return identity.error;
  }

  if (!sameOrigin(req)) {
    return NextResponse.json(
      { error: 'Invalid origin' },
      { status: 403 },
    );
  }

  if (requestTooLarge(req, MAX_BODY_BYTES)) {
    return NextResponse.json(
      { error: 'Request too large' },
      { status: 413 },
    );
  }

  let data: z.infer<typeof createSchema>;

  try {
    const body = await readLimitedJSON(req, MAX_BODY_BYTES);
    data = createSchema.parse(body);
  } catch (error) {
    if (error instanceof Error && error.message === 'BODY_TOO_LARGE') {
      return NextResponse.json(
        { error: 'Request too large' },
        { status: 413 },
      );
    }

    return NextResponse.json(
      { error: 'Invalid meal plan' },
      { status: 400 },
    );
  }

  try {
    await connectToDatabase();

    // Check for an existing plan before inserting.
    const existing = await MealPlan.exists({
      id: data.id,
      userID: identity.userId,
    });

    if (existing) {
      return NextResponse.json(
        { error: 'Already exists' },
        { status: 409 },
      );
    }

    // The authenticated session determines ownership.
    const plan = await MealPlan.create({
      ...data,
      userID: identity.userId,
      timestamp: new Date(),
    });

    return NextResponse.json(
      { success: true, id: plan.id },
      { status: 201 },
    );
  } catch (error: unknown) {
    // Handle concurrent requests that attempt to create
    // the same meal plan, using the unique MongoDB index.
    if (
      typeof error === 'object' &&
      error !== null &&
      'code' in error &&
      error.code === 11000
    ) {
      return NextResponse.json(
        { error: 'Already exists' },
        { status: 409 },
      );
    }

    console.error('Meal plan save error');

    return NextResponse.json(
      { error: 'Unable to save meal plan' },
      { status: 500 },
    );
  }
}

export async function GET(req: NextRequest) {
  const identity = await requireUser();

  if ('error' in identity) {
    return identity.error;
  }

  try {
    await connectToDatabase();

    const id = req.nextUrl.searchParams.get('id');

    if (id) {
      if (id.length > 90) {
        return NextResponse.json(
          { error: 'Invalid id' },
          { status: 400 },
        );
      }

      const plan = await MealPlan.findOne({
        id,
        userID: identity.userId,
      }).lean();

      return plan
        ? NextResponse.json(plan)
        : NextResponse.json(
            { error: 'Not found' },
            { status: 404 },
          );
    }

    const plans = await MealPlan.find({
      userID: identity.userId,
    })
      .sort({ timestamp: -1 })
      .limit(100)
      .lean();

    return NextResponse.json(plans);
  } catch {
    return NextResponse.json(
      { error: 'Unable to load meal plans' },
      { status: 500 },
    );
  }
}
