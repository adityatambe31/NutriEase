import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import { requireUser, sameOrigin } from '@/lib/request-guard';
import MealPlan from '@/models/MealPlan';

function getId(req: NextRequest) { return decodeURIComponent(req.nextUrl.pathname.split('/').pop() || ''); }
export async function GET(request: NextRequest) {
  const identity = await requireUser();
  if ('error' in identity) return identity.error;
  const id = getId(request);
  if (!id || id.length > 90) return NextResponse.json({ error: 'Invalid id' }, { status: 400 });
  try {
    await connectToDatabase();
    const plan = await MealPlan.findOne({ id, userID: identity.userId }).lean();
    return plan ? NextResponse.json(plan) : NextResponse.json({ error: 'Not found' }, { status: 404 });
  } catch { return NextResponse.json({ error: 'Unable to load meal plan' }, { status: 500 }); }
}
export async function DELETE(request: NextRequest) {
  const identity = await requireUser();
  if ('error' in identity) return identity.error;
  if (!sameOrigin(request)) return NextResponse.json({ error: 'Invalid origin' }, { status: 403 });
  const id = getId(request);
  if (!id || id.length > 90) return NextResponse.json({ error: 'Invalid id' }, { status: 400 });
  try {
    await connectToDatabase();
    const result = await MealPlan.deleteOne({ id, userID: identity.userId });
    return result.deletedCount ? NextResponse.json({ success: true }) : NextResponse.json({ error: 'Not found' }, { status: 404 });
  } catch { return NextResponse.json({ error: 'Unable to delete meal plan' }, { status: 500 }); }
}
