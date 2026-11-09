import { createHash } from 'node:crypto';
import { connectToDatabase } from '@/lib/mongodb';
import mongoose from 'mongoose';

type AIFeature = 'meal' | 'recipe' | 'image';

const COLLECTION_NAME = 'api_usage_limits';

const GLOBAL_LIMITS: Record<AIFeature, number> = {
  meal: 4,
  recipe: 4,
  image: 48,
};

function getUserLimit(feature: AIFeature): number {
  if (feature === 'image') {
    return 24;
  }

  const requested = Number(process.env.AI_DAILY_LIMIT ?? 2);

  if (!Number.isFinite(requested)) {
    return 2;
  }

  return Math.min(3, Math.max(1, Math.floor(requested)));
}

/**
 * Atomically reserves one AI request allowance.
 *
 * Both global and per-user counters are stored in one document.
 * Requests count as attempts, even if the external provider fails.
 *
 * Returns false when either limit has been reached.
 * Database errors are thrown so callers fail closed.
 */
export async function checkDailyAllowance(
  userId: string,
  feature: AIFeature,
): Promise<boolean> {
  if (!userId) {
    return false;
  }

  await connectToDatabase();

  const db = mongoose.connection.db;

  if (!db) {
    throw new Error('MongoDB connection unavailable');
  }

  const collection = db.collection(COLLECTION_NAME);

  const today = new Date().toISOString().slice(0, 10);
  const documentId = `${today}:${feature}:GLOBAL`;

  const userHash = createHash('sha256').update(userId).digest('hex');

  const userField = `users.${userHash}`;

  const userLimit = getUserLimit(feature);
  const globalLimit = GLOBAL_LIMITS[feature];

  const expiresAt = new Date(Date.now() + 3 * 24 * 60 * 60 * 1000);

  // MongoDB will automatically remove expired quota documents.
  await collection.createIndex({ expiresAt: 1 }, { expireAfterSeconds: 0 });

  // Ensure the daily document exists.
  // Upsert is safe to call concurrently.
  await collection.updateOne(
    { _id: documentId as never },
    {
      $setOnInsert: {
        count: 0,
        users: {},
        expiresAt,
      },
    },
    { upsert: true },
  );

  // Both counters increment together or neither increments.
  // MongoDB guarantees atomic updates within one document.
  const result = await collection.updateOne(
    {
      _id: documentId as never,
      count: { $lt: globalLimit },
      $or: [
        { [userField]: { $exists: false } },
        { [userField]: { $lt: userLimit } },
      ],
    },
    {
      $inc: {
        count: 1,
        [userField]: 1,
      },
    },
  );

  return result.modifiedCount === 1;
}
