
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import ts from 'typescript';

const source = readFileSync('src/lib/read-limited-json.ts', 'utf8');

const compiled = ts.transpileModule(source, {
  compilerOptions: {
    module: ts.ModuleKind.CommonJS,
    target: ts.ScriptTarget.ES2022,
  },
}).outputText;


const testModule = { exports: {} };

new Function('module', 'exports', 'require', compiled)(
  testModule,
  testModule.exports,
  () => {
    throw new Error('Unexpected import');
  },
);

const {
  readLimitedJson,
  RequestBodyTooLargeError,
} = testModule.exports;

function makeRequest(body, contentLength) {
  const headers = { 'Content-Type': 'application/json' };

  if (contentLength !== undefined) {
    headers['Content-Length'] = String(contentLength);
  }

  return new Request('http://localhost:3000/api/ai/recipe', {
    method: 'POST',
    headers,
    body,
  });
}

async function run() {
  const valid = makeRequest(JSON.stringify({ recipe: 'Vegetable pulao' }));
  const parsed = await readLimitedJson(valid, 20_000);
  assert.equal(parsed.recipe, 'Vegetable pulao');
  console.log('PASS: Valid JSON accepted');

  const oversized = makeRequest(
    JSON.stringify({ recipe: 'A'.repeat(25_000) }),
  );

  await assert.rejects(
    readLimitedJson(oversized, 20_000),
    RequestBodyTooLargeError,
  );
  console.log('PASS: Oversized body rejected without Content-Length');

  const declaredOversized = makeRequest(
    JSON.stringify({ recipe: 'Rice' }),
    25_000,
  );

  await assert.rejects(
    readLimitedJson(declaredOversized, 20_000),
    RequestBodyTooLargeError,
  );
  console.log('PASS: Oversized Content-Length rejected');

  const invalid = makeRequest('{invalid-json');

  await assert.rejects(
    readLimitedJson(invalid, 20_000),
    SyntaxError,
  );
  console.log('PASS: Invalid JSON rejected');

  console.log('\nAll request-size tests passed.');
}

run().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
