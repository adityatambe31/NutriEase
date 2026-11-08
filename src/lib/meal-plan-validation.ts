
import { z } from 'zod';

const DAYS = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday',
] as const;

const ingredientSchema = z.object({
  item: z.string().trim().min(1),
  quantity: z.number().finite().positive(),
  unit: z.string().trim().min(1),
});

const mealSchema = z.object({
  option: z.string().trim().min(1),
  recipe: z.string().trim().min(1),
  ingredients: z.array(ingredientSchema).min(1),
});

const daySchema = z.object({
  DayName: z.string().trim(),
  breakfast: z.array(mealSchema).min(1),
  lunch: z.array(mealSchema).min(1),
  dinner: z.array(mealSchema).min(1),
});

const mealPlanSchema = z.object({
  Days: z.array(daySchema).length(7),
});

/**
 * Validates the transformed meal plan before
 * image fetching or MongoDB persistence.
 *
 * Throws when the plan is incomplete or malformed.
 */
export function validateMealPlan(plan: unknown): void {
  const result = mealPlanSchema.safeParse(plan);

  if (!result.success) {
    throw new Error(
      'AI returned an incomplete meal plan. Please try again later.',
    );
  }

  const names = result.data.Days.map(
    (day) => day.DayName.toLowerCase(),
  );

  const expected = DAYS.map((day) => day.toLowerCase());

  if (
    new Set(names).size !== 7 ||
    expected.some((day) => !names.includes(day))
  ) {
    throw new Error(
      'AI meal plan must include Monday through Sunday.',
    );
  }
}
