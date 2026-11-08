
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import ts from 'typescript';

const require = createRequire(import.meta.url);

const source = readFileSync(
  'src/lib/meal-plan-validation.ts',
  'utf8',
);

const compiled = ts.transpileModule(source, {
  compilerOptions: {
    module: ts.ModuleKind.CommonJS,
    target: ts.ScriptTarget.ES2022,
    esModuleInterop: true,
  },
}).outputText;

const testModule = { exports: {} };

new Function('module', 'exports', 'require', compiled)(
  testModule,
  testModule.exports,
  require,
);

const { validateMealPlan } = testModule.exports;

const days = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday',
];

function meal(name) {
  return {
    option: name,
    recipe: `Prepare ${name}.`,
    ingredients: [
      { item: 'Rice', quantity: 100, unit: 'g' },
    ],
  };
}

const valid = {
  Days: days.map((day) => ({
    DayName: day,
    breakfast: [meal('Oatmeal')],
    lunch: [meal('Rice and dal')],
    dinner: [meal('Vegetables and paneer')],
  })),
};

assert.doesNotThrow(() => validateMealPlan(valid));
console.log('PASS: Complete seven-day plan accepted');

const missingDay = structuredClone(valid);
missingDay.Days.pop();

assert.throws(() => validateMealPlan(missingDay));
console.log('PASS: Missing day rejected');

const missingMeal = structuredClone(valid);
missingMeal.Days[2].lunch = [];

assert.throws(() => validateMealPlan(missingMeal));
console.log('PASS: Missing lunch rejected');

const invalidIngredient = structuredClone(valid);
invalidIngredient.Days[0].breakfast[0].ingredients = [];

assert.throws(() => validateMealPlan(invalidIngredient));
console.log('PASS: Missing ingredients rejected');

const duplicateDay = structuredClone(valid);
duplicateDay.Days[6].DayName = 'Monday';

assert.throws(() => validateMealPlan(duplicateDay));
console.log('PASS: Duplicate weekday rejected');

console.log('\nAll meal validation tests passed.');
