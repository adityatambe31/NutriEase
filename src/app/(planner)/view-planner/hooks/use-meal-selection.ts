import { useState } from "react";
import { MealOption } from "@/types/meal-plan";

export const useMealSelection = () => {
  const [selectedMeal, setSelectedMeal] = useState<MealOption | null>(null);

  const selectMeal = (meal: MealOption) => {
    setSelectedMeal(meal);
  };

  const clearSelectedMeal = () => {
    setSelectedMeal(null);
  };

  return {
    selectedMeal,
    selectMeal,
    clearSelectedMeal,
  };
};
