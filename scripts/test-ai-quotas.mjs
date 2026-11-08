
import assert from 'node:assert/strict';
import { randomUUID, createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);

const { loadEnvConfig } = require('@next/env');
const mongoose = require('mongoose');
const ts = require('typescript');

loadEnvConfig(process.cwd());

if (!process.env.MONGODB_URI) {
  throw new Error('MONGODB_URI is missing');
}

// Use a unique temporary database, never the application database.
const testDatabase = `ne_test_${randomUUID().slice(0, 8)}`;

const source = readFileSync('src/lib/ai-limits.ts', 'utf8');

const compiled = ts.transpileModule(source, {
  compilerOptions: {
    module: ts.ModuleKind.CommonJS,
    target: ts.ScriptTarget.ES2022,
    esModuleInterop: true,
  },
}).outputText;

const testModule = { exports: {} };

// Load the actual quota function.
// Only replace its database connection helper so it uses
// our separately connected temporary test database.
function testRequire(name) {
  if (name === '@/lib/mongodb') {
    return {
      connectToDatabase: async () => {
        if (mongoose.connection.readyState !== 1) {
          throw new Error('Test database disconnected');
        }
      },
    };
  }

  return require(name);
}

new Function('module', 'exports', 'require', compiled)(
  testModule,
  testModule.exports,
  testRequire,
);

const { checkDailyAllowance } = testModule.exports;

async function main() {
  const previousLimit = process.env.AI_DAILY_LIMIT;
  process.env.AI_DAILY_LIMIT = '2';

  let connected = false;

  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: testDatabase,
      serverSelectionTimeoutMS: 10000,
    });

    connected = true;

    assert.equal(mongoose.connection.db.databaseName, testDatabase);

    console.log('Connected to isolated temporary database.');

    const userA = 'quota-test-user-A';
    const userB = 'quota-test-user-B';
    const userC = 'quota-test-user-C';

    // Eight simultaneous requests from one account.
    const resultsA = await Promise.all(
      Array.from({ length: 8 }, () =>
        checkDailyAllowance(userA, 'meal'),
      ),
    );

    assert.equal(resultsA.filter(Boolean).length, 2);
    console.log('PASS: User A allowed exactly 2 requests');

    // User A's rejected requests must not consume
    // the remaining global allowance.
    const resultsB = await Promise.all(
      Array.from({ length: 8 }, () =>
        checkDailyAllowance(userB, 'meal'),
      ),
    );

    assert.equal(resultsB.filter(Boolean).length, 2);
    console.log('PASS: User B allowed exactly 2 requests');

    // Global limit is now four.
    const resultC = await checkDailyAllowance(userC, 'meal');

    assert.equal(resultC, false);
    console.log('PASS: Global limit blocks further requests');

    const today = new Date().toISOString().slice(0, 10);

    const collection = mongoose.connection.db.collection(
      'api_usage_limits',
    );

    const document = await collection.findOne({
      _id: `${today}:meal:GLOBAL`,
    });

    assert.ok(document);
    assert.equal(document.count, 4);

    const hashA = createHash('sha256')
      .update(userA)
      .digest('hex');

    const hashB = createHash('sha256')
      .update(userB)
      .digest('hex');

    assert.equal(document.users[hashA], 2);
    assert.equal(document.users[hashB], 2);

    console.log('PASS: MongoDB counters are consistent');

    // Check that recipe limits are tracked separately.
    const recipeAllowed = await checkDailyAllowance(
      userA,
      'recipe',
    );

    assert.equal(recipeAllowed, true);
    console.log('PASS: Recipe allowance is independent');

    // Verify that images have their own global limit.
    const imageResults = await Promise.all(
      Array.from({ length: 15 }, () =>
        checkDailyAllowance(userA, 'image'),
      ),
    );

    assert.equal(imageResults.filter(Boolean).length, 12);
    console.log('PASS: Image allowance capped at 12');

    console.log('\nAll AI quota tests passed.');
  } finally {
    if (connected) {
      // Only remove the randomly created test database.
      try {
        assert.equal(
          mongoose.connection.db.databaseName,
          testDatabase,
        );

        await mongoose.connection.dropDatabase();
        console.log('Temporary test database cleaned up.');
      } finally {
        await mongoose.disconnect();
      }
    }

    if (previousLimit === undefined) {
      delete process.env.AI_DAILY_LIMIT;
    } else {
      process.env.AI_DAILY_LIMIT = previousLimit;
    }
  }
}

main().catch((error) => {
  console.error('Quota test failed:', error.message);
  process.exitCode = 1;
});
