import { connectToDatabase } from '@/lib/mongodb';
import mongoose from 'mongoose';

/** Atomic MongoDB-backed allowance; counts attempts, not successes (fail closed). */
export async function checkDailyAllowance(userId: string, feature: 'meal' | 'recipe' | 'image') {
  await connectToDatabase();
  const requested = Number(process.env.AI_DAILY_LIMIT || 2);
  const dailyLimit = Math.min(3, Math.max(1, Number.isFinite(requested) ? requested : 2));
  const limit = feature === 'image' ? 12 : dailyLimit;
  const today = new Date().toISOString().slice(0, 10);
  const key = `${today}:${feature}:${userId}`;
  const collection = mongoose.connection.db!.collection('api_usage_limits');
  await collection.createIndex({ expiresAt: 1 }, { expireAfterSeconds: 0 });
  // Insert a unique quota document once. A conditional increment prevents race-based overuse.
  try {
    await collection.insertOne({ _id: key as never, count: 0, expiresAt: new Date(Date.now() + 3 * 86400000) });
  } catch (error: unknown) {
    if (!(typeof error === 'object' && error && 'code' in error && error.code === 11000)) throw error;
  }
  // Global ceiling mitigates coordinated usage across many accounts.
  const globalKey = `${today}:${feature}:GLOBAL`;
  const globalLimit = feature === 'image' ? 12 : 4;
  try {
    await collection.insertOne({ _id: globalKey as never, count: 0, expiresAt: new Date(Date.now() + 3 * 86400000) });
  } catch (error: unknown) {
    if (!(typeof error === 'object' && error && 'code' in error && error.code === 11000)) throw error;
  }
  const global = await collection.updateOne({ _id: globalKey as never, count: { $lt: globalLimit } }, { $inc: { count: 1 } });
  if (global.modifiedCount !== 1) return false;
  const result = await collection.updateOne({ _id: key as never, count: { $lt: limit } }, { $inc: { count: 1 } });
  return result.modifiedCount === 1;
}
