import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import { requireUser, sameOrigin, requestTooLarge } from '@/lib/request-guard';
import MealPlan from '@/models/MealPlan';
import { z } from 'zod';

const createSchema = z.object({
  id: z.string().min(1).max(90),
  userSelection: z.record(z.unknown()).optional(),
  meals: z.object({ mealPlan: z.object({ Days: z.array(z.unknown()).max(7) }) }),
}).strip();

export async function POST(req: NextRequest) {
  const identity = await requireUser();
  if ('error' in identity) return identity.error;
  if (!sameOrigin(req)) return NextResponse.json({ error: 'Invalid origin' }, { status: 403 });
  if (requestTooLarge(req, 350_000)) return NextResponse.json({ error: 'Request too large' }, { status: 413 });
  try {
    const data = createSchema.parse(await req.json());
    await connectToDatabase();
    const existing = await MealPlan.exists({ id: data.id, userID: identity.userId });
    if (existing) return NextResponse.json({ error: 'Already exists' }, { status: 409 });
    const plan = await MealPlan.create({ ...data, userID: identity.userId, timestamp: new Date() });
    return NextResponse.json({ success: true, id: plan.id }, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) return NextResponse.json({ error: 'Invalid meal plan' }, { status: 400 });
    console.error('Meal plan save error');
    return NextResponse.json({ error: 'Unable to save meal plan' }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  const identity = await requireUser();
  if ('error' in identity) return identity.error;
  try {
    await connectToDatabase();
    const id = req.nextUrl.searchParams.get('id');
    if (id) {
      if (id.length > 90) return NextResponse.json({ error: 'Invalid id' }, { status: 400 });
      const plan = await MealPlan.findOne({ id, userID: identity.userId }).lean();
      return plan ? NextResponse.json(plan) : NextResponse.json({ error: 'Not found' }, { status: 404 });
    }
    const plans = await MealPlan.find({ userID: identity.userId }).sort({ timestamp: -1 }).limit(100).lean();
    return NextResponse.json(plans);
  } catch { return NextResponse.json({ error: 'Unable to load meal plans' }, { status: 500 }); }
}
