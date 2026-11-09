import { MealOption, MealPlan } from '@/types/meal-plan';

type ImageResponse = {
  imageUrl?: string;
  limited?: boolean;
  error?: string;
};

export async function fetchImageForMeal(meal: MealOption): Promise<MealOption> {
  // Never replace an existing image unnecessarily.
  if (meal.imageUrl?.trim()) {
    return meal;
  }

  try {
    const response = await fetch(
      `/api/meal-images?meal=${encodeURIComponent(meal.option)}`,
    );

    if (!response.ok) {
      console.warn(
        `Image request failed for ${meal.option}: ${response.status}`,
      );
      return meal;
    }

    const data: ImageResponse = await response.json();

    return {
      ...meal,
      imageUrl: data.imageUrl || meal.imageUrl || '',
    };
  } catch (error) {
    console.warn(`Unable to fetch image for ${meal.option}:`, error);
    return meal;
  }
}

export async function fetchMealImagesForPlan(
  mealPlan: MealPlan,
): Promise<MealPlan> {
  const imageCache = new Map<string, string>();
  let quotaReached = false;
  let imagesFetched = 0;
  let imagesMissing = 0;

  const getImage = async (meal: MealOption): Promise<MealOption> => {
    if (meal.imageUrl?.trim()) {
      return meal;
    }

    const key = meal.option.trim().toLowerCase();

    if (!key || quotaReached) {
      imagesMissing++;
      return meal;
    }

    const cached = imageCache.get(key);

    if (cached !== undefined) {
      if (!cached) imagesMissing++;

      return {
        ...meal,
        imageUrl: cached || meal.imageUrl || '',
      };
    }

    try {
      const response = await fetch(
        `/api/meal-images?meal=${encodeURIComponent(meal.option)}`,
      );

      if (response.status === 429) {
        quotaReached = true;
        imagesMissing++;
        console.warn('Daily image quota reached.');
        return meal;
      }

      if (!response.ok) {
        imagesMissing++;
        console.warn(
          `Image request failed: ${meal.option} (${response.status})`,
        );
        return meal;
      }

      const data: ImageResponse = await response.json();
      const imageUrl = data.imageUrl || '';

      imageCache.set(key, imageUrl);

      if (imageUrl) {
        imagesFetched++;
      } else {
        imagesMissing++;
      }

      return {
        ...meal,
        imageUrl: imageUrl || meal.imageUrl || '',
      };
    } catch (error) {
      imagesMissing++;
      console.warn(`Image lookup failed for ${meal.option}:`, error);
      return meal;
    }
  };

  // Process sequentially to avoid flooding the image API.
  const updatedDays = [];

  for (const day of mealPlan.Days) {
    const breakfast = [];
    const lunch = [];
    const dinner = [];

    for (const meal of day.breakfast) {
      breakfast.push(await getImage(meal));
    }

    for (const meal of day.lunch) {
      lunch.push(await getImage(meal));
    }

    for (const meal of day.dinner) {
      dinner.push(await getImage(meal));
    }

    updatedDays.push({
      ...day,
      breakfast,
      lunch,
      dinner,
    });
  }

  console.log('Meal image processing complete:', {
    imagesFetched,
    imagesMissing,
    quotaReached,
  });

  return {
    ...mealPlan,
    Days: updatedDays,
  };
}
