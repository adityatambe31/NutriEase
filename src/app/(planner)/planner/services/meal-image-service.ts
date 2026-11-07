import { MealOption, MealPlan } from "@/types/meal-plan";

export async function fetchImageForMeal(meal: MealOption): Promise<MealOption> {
  try {
    const response = await fetch(
      `/api/meal-images?meal=${encodeURIComponent(meal.option)}`
    );
    const data = await response.json();
    return {
      ...meal,
      imageUrl: data.imageUrl || "",
    };
  } catch (error) {
    console.error(`Error fetching image for ${meal.option}:`, error);
    return {
      ...meal,
      imageUrl: "",
    };
  }
}

export async function fetchMealImagesForPlan(
  mealPlan: MealPlan
): Promise<MealPlan> {
  try {
    const updatedDays = await Promise.all(
      mealPlan.Days.map(async (day) => {
        const [breakfast, lunch, dinner] = await Promise.all([
          Promise.all(day.breakfast.map(fetchImageForMeal)),
          Promise.all(day.lunch.map(fetchImageForMeal)),
          Promise.all(day.dinner.map(fetchImageForMeal)),
        ]);

        return {
          ...day,
          breakfast,
          lunch,
          dinner,
        };
      })
    );

    console.log("Images fetched successfully");
    return {
      ...mealPlan,
      Days: updatedDays,
    };
  } catch (error) {
    console.error("Error fetching images for meal plan:", error);
    return mealPlan;
  }
}
