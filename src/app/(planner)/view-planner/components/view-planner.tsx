"use client";
import React from "react";
import { MealPlan, MealOption, MealPlanDay } from "@/types/meal-plan";
import { motion } from "framer-motion";
import { useMealSelection } from "@/app/(planner)/view-planner/hooks/use-meal-selection";
import { useNavigation } from "@/app/(planner)/view-planner/hooks/use-navigation";
import MealCard from "@/app/(planner)/view-planner/components/meal-card";
import { FiX, FiList, FiInfo } from "react-icons/fi";
import {
  MdFastfood,
  MdRestaurantMenu,
  MdLightbulbOutline,
} from "react-icons/md";
import {
  GiMeat,
  GiWheat,
  GiFruitBowl,
  GiHotMeal,
  GiKnifeFork,
} from "react-icons/gi";

interface MealPlanComponentProps {
  meals: MealPlan;
}

const getMealOption = (
  day: MealPlanDay,
  mealType: string,
  optionIndex: number
): MealOption => {
  // Define a default meal option
  const defaultOption: MealOption = {
    option: "No option available",
    recipe: "No recipe available",
    ingredients: [],
    tips: "",
    nutritionalInformation: [],
  };

  // Safely access the meal options
  try {
    const mealTypeKey = mealType as keyof MealPlanDay;
    const options = day[mealTypeKey];

    // Check if options exist and are an array
    if (options && Array.isArray(options) && options.length > optionIndex) {
      return options[optionIndex] as unknown as MealOption;
    }
    return defaultOption;
  } catch (error) {
    console.error(
      `Error accessing meal option: ${mealType}[${optionIndex}]`,
      error
    );
    return defaultOption;
  }
};

export default function MealPlanComponent({ meals }: MealPlanComponentProps) {
  const { selectedMeal, selectMeal, clearSelectedMeal } = useMealSelection();
  const { scrollToDay } = useNavigation();
  const mealTypes = ["breakfast", "lunch", "dinner"];
  if (!meals || !meals.Days || !Array.isArray(meals.Days)) {
    return (
      <div className="p-4 text-center text-red-500">Invalid meal plan data</div>
    );
  }

  return (
    <div className="py-2 sm:py-6 flex justify-center mt-[10px] sm:mt-[20px]">
      <div className="py-2 sm:py-6 rounded-xl w-full max-w-7xl px-2 sm:px-6">
        {/* Days Header - Hidden on Small Screens, Styled for Large Screens */}
        <div className="hidden lg:flex justify-center gap-4 mb-6 bg-gradient-to-r from-teal-100 to-cyan-100 rounded-xl p-4 shadow-sm sticky top-2 z-10">
          {meals.Days.map((day, index) => (
            <motion.button
              key={index}
              className="px-4 py-2 text-gray-700 font-semibold transition-all hover:bg-teal-500 hover:scale-105 hover:rounded-lg hover:text-white"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => scrollToDay(index)}
            >
              {day.DayName || `Day ${index + 1}`}
            </motion.button>
          ))}
        </div>

        {/* Mobile Day Navigation */}
        <div className="lg:hidden flex overflow-x-auto pb-2 mb-4 gap-2 px-2">
          {meals.Days.map((day, index) => (
            <button
              key={index}
              className="px-3 py-1 text-sm whitespace-nowrap bg-teal-100 text-teal-700 rounded-lg flex-shrink-0"
              onClick={() => scrollToDay(index)}
            >
              {day.DayName || `Day ${index + 1}`}
            </button>
          ))}
        </div>

        {/* Meal Card image and name with some info */}
        {meals.Days.map((day, index) => (
          <div
            key={index}
            id={`day-${index}`}
            className="bg-white rounded-2xl shadow-lg mb-8 p-4 sm:p-6 md:p-8 lg:p-10 xl:p-12 border border-gray-200 hover:shadow-xl transition-shadow duration-300"
          >
            <h3 className="text-2xl font-bold text-teal-700 mb-6 pb-2 border-b border-gray-200">
              {day.DayName || `Day ${index + 1}`}
            </h3>

            {/* Option 1 */}
            <h5 className="text-md sm:text-lg md:text-xl font-semibold text-teal-700 leading-6 mb-4 text-center bg-teal-50 py-2 rounded-lg">
              Option 1
            </h5>
            <div className="grid grid-cols-1 gap-5 items-stretch max-w-xs mx-auto sm:max-w-none sm:grid-cols-3">
              {mealTypes.map((mealType, mealIndex) => {
                const option = getMealOption(day, mealType, 0);
                return (
                  <MealCard
                    key={mealIndex}
                    mealType={mealType}
                    option={option}
                    onSelect={selectMeal}
                  />
                );
              })}
            </div>

            {/* Option 2 */}
            <h5 className="text-md sm:text-lg md:text-xl font-semibold text-teal-700 leading-6 mt-10 mb-4 text-center bg-teal-50 py-2 rounded-lg">
              Option 2
            </h5>
            <div className="grid grid-cols-1 gap-4 items-stretch max-w-xs mx-auto sm:max-w-none sm:grid-cols-3">
              {mealTypes.map((mealType, mealIndex) => {
                const option = getMealOption(day, mealType, 1);
                return (
                  <MealCard
                    key={mealIndex}
                    mealType={mealType}
                    option={option}
                    onSelect={selectMeal}
                  />
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Meal details modal */}
      {selectedMeal && (
        <div
          className="fixed inset-0 bg-gradient-to-br from-teal-900/70 to-slate-900/80 backdrop-blur-sm flex items-center justify-center p-4 z-50"
          onClick={clearSelectedMeal}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.4, ease: "easeInOut", delay: 0.1 }}
            layout
            className="bg-white bg-opacity-98 rounded-lg shadow-2xl p-6 sm:p-7 max-w-sm sm:max-w-md md:max-w-lg w-full relative border border-teal-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 hover:bg-gray-100 p-2 rounded-full transition-colors"
              onClick={clearSelectedMeal}
            >
              <FiX />
            </button>

            {/* Meal Title with Icon */}
            <h3 className="text-lg sm:text-xl font-bold text-teal-700 flex items-center gap-2 mb-3 pb-2 border-b border-gray-100">
              <MdFastfood className="text-teal-600 text-lg sm:text-xl" />
              {selectedMeal.option}
            </h3>

            {/* Recipe Description */}
            <p className="text-sm sm:text-base text-gray-700 flex items-center gap-2 bg-teal-50 p-3 rounded-md">
              <MdRestaurantMenu className="text-teal-500 text-lg sm:text-xl flex-shrink-0" />
              {selectedMeal.recipe}
            </p>

            {/* Ingredients Section */}
            <h4 className="font-medium text-teal-800 flex items-center gap-2 mt-4">
              <FiList className="text-teal-600 text-base" />
              Ingredients:
            </h4>
            <div className="flex flex-wrap gap-2 mt-2">
              {selectedMeal.ingredients.map((ingredient, k) => {
                if (ingredient.item && ingredient.item.includes(",")) {
                  const itemsList = ingredient.item
                    .split(",")
                    .map((i) => i.trim());
                  return itemsList.map((item, i) => (
                    <span
                      key={`${k}-${i}`}
                      className="px-2 py-1 bg-teal-50 text-teal-700 text-xs font-medium rounded-md shadow-sm border border-teal-100"
                    >
                      {ingredient.quantity && i === 0
                        ? `${ingredient.quantity} ${ingredient.unit || ""} `
                        : ""}
                      {item}
                    </span>
                  ));
                }
                return (
                  <span
                    key={k}
                    className="px-2 py-1 bg-teal-50 text-teal-700 text-xs font-medium rounded-md shadow-sm border border-teal-100"
                  >
                    {ingredient.quantity} {ingredient.unit} {ingredient.item}
                  </span>
                );
              })}
            </div>

            {/* Tips Section */}
            <h4 className="font-medium text-teal-800 flex items-center gap-2 mt-5">
              <MdLightbulbOutline className="text-yellow-500 text-base" />
              Tips:
            </h4>
            <div className="flex flex-wrap gap-2 mt-2">
              {selectedMeal.tips.split(". ").map((tip, k) => {
                if (!tip.trim()) return null;
                return (
                  <span
                    key={k}
                    className="px-2 py-1 bg-yellow-50 text-yellow-700 text-xs font-medium rounded-md shadow-sm border border-yellow-100"
                  >
                    {tip}
                  </span>
                );
              })}
            </div>

            {/* Nutritional Information */}
            <div className="mt-6 text-sm bg-gray-50 p-4 rounded-lg shadow-md border border-gray-200">
              <h4 className="font-semibold text-teal-700 flex items-center gap-2 mb-4">
                <FiInfo className="text-teal-500 text-md" />
                Nutritional Information
              </h4>

              <div className="flex flex-row flex-wrap gap-3">
                {selectedMeal.nutritionalInformation.map((info, index) => {
                  if (!info) return null;
                  const infoStr = info as unknown as string;

                  if (typeof infoStr === "string" && infoStr.includes(",")) {
                    const nutrientItems = infoStr
                      .split(",")
                      .map((item) => item.trim())
                      .filter((item) => item);

                    return nutrientItems.map((nutrientItem, itemIndex) => {
                      let icon;
                      if (nutrientItem.toLowerCase().includes("kcal")) {
                        icon = <GiHotMeal className="text-red-500 text-lg" />;
                      } else if (
                        nutrientItem.toLowerCase().includes("protein")
                      ) {
                        icon = <GiMeat className="text-orange-500 text-lg" />;
                      } else if (nutrientItem.toLowerCase().includes("carb")) {
                        icon = <GiWheat className="text-blue-500 text-lg" />;
                      } else if (nutrientItem.toLowerCase().includes("fat")) {
                        icon = (
                          <GiFruitBowl className="text-gray-500 text-lg" />
                        );
                      } else {
                        icon = (
                          <GiKnifeFork className="text-green-500 text-lg" />
                        );
                      }

                      return (
                        <div
                          key={`${index}-${itemIndex}`}
                          className="bg-white p-3 rounded-lg shadow-sm hover:shadow-md transition duration-200 ease-in-out border-l-4 border-l-teal-400 min-w-[140px]"
                        >
                          <div className="flex items-center gap-2">
                            {icon}
                            <span className="text-xs font-medium text-gray-600">
                              {nutrientItem}
                            </span>
                          </div>
                        </div>
                      );
                    });
                  }

                  // Single-item scenario
                  return (
                    <div
                      key={index}
                      className="bg-white p-3 rounded-lg shadow-sm hover:shadow-md transition duration-200 ease-in-out border-l-4 border-l-teal-400 min-w-[140px]"
                    >
                      <div className="flex items-center gap-2">
                        <GiKnifeFork className="text-green-500 text-lg" />
                        <span className="text-xs font-medium text-gray-600">
                          {infoStr}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
