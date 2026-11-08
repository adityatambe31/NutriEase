import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { chatSession } from "../actions/ai-model";
import { useSession } from "next-auth/react"; 
import {
  Ingredient,
  MealPlan,
  MealPlanFormData,
} from "@/types/meal-plan";
import { fetchMealImagesForPlan } from "../services/meal-image-service";
import { validateMealPlan } from '@/lib/meal-plan-validation';

/**
 * Custom hook that provides meal plan generation and storage functionality.
 * Handles interaction with AI model for meal plan creation and MongoDB for persistence.
 *
 * @returns {Object} Functions and state for meal plan generation and persistence
 */
export function useMealPlanService() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [loading, setLoading] = useState(false);
  const [generatedPlan] = useState<MealPlan | null>(null);

  type PromptMode = "standard" | "compact";

  /**
   * Converts a nutrition string into an array of strings for MongoDB compatibility
   *
   * @param {string} nutritionStr - The raw nutrition information string
   * @returns {string[]} Array of nutrition strings
   */
  const parseNutritionInfo = (nutritionStr: string | undefined): string[] => {
    if (!nutritionStr) return ["No nutritional information available"];

    // Handle reference nutrition info (e.g., "Refer to Tuesday's...")
    if (nutritionStr.toLowerCase().includes("refer to")) {
      return ["See referenced meal for nutritional information"];
    }

    // If it's a string that looks like JSON, clean it up
    if (
      (nutritionStr.startsWith("[") && nutritionStr.endsWith("]")) ||
      (nutritionStr.startsWith("{") && nutritionStr.endsWith("}"))
    ) {
      try {
        const parsed = JSON.parse(nutritionStr);

        if (Array.isArray(parsed)) {
          // Convert array items to strings
          return parsed.map((item) =>
            typeof item === "object"
              ? Object.entries(item)
                  // eslint-disable-next-line @typescript-eslint/no-unused-vars
                  .filter(([_, value]) => value !== "N/A" && value !== "")
                  .map(([k, v]) => `${k}: ${v}`)
                  .join(", ")
              : String(item)
          );
        } else if (typeof parsed === "object") {
          // If it's an object with a details property, use that
          if (parsed.details) {
            return [parsed.details];
          }
          // Otherwise format the object properties
          return [
            Object.entries(parsed)
              // eslint-disable-next-line @typescript-eslint/no-unused-vars
              .filter(([_, value]) => value !== "N/A" && value !== "")
              .map(([k, v]) => `${k}: ${v}`)
              .join(", "),
          ];
        }

        // Fallback
        return [JSON.stringify(parsed)];
      } catch {
        // If parsing failed, just use the original string
        return [nutritionStr];
      }
    }

    // Return as array of strings as required by MongoDB schema
    return [nutritionStr];
  };

  /**
   * Generates a personalized meal plan by sending user preferences to an AI model.
   *
   * @param {MealPlanFormData} formData - User preferences and dietary requirements
   * @returns {Promise<string>} The raw meal plan response from the AI
   * @throws {Error} If AI generation fails
   */
  const generateMealPlan = async (
    formData: MealPlanFormData,
    mode: PromptMode = "standard"
  ): Promise<string> => {
    const FINAL_PROMPT = `
Create exactly seven days of practical meals for this user:
Age: ${formData.age}; gender: ${formData.gender}; height: ${formData.height} cm;
weight: ${formData.weight} kg; activity: ${formData.activityLevel};
diet: ${formData.dietaryRestrictions}; goal: ${formData.weightGoal};
cuisine preference: ${formData.culturalPreference}.

Return ONLY a valid JSON object with one top-level property: "mealPlan".
"mealPlan" must be an array of exactly seven day objects, ordered Monday through Sunday.
Each day must have "day", "breakfast", "lunch", "dinner".
Each of the three meal properties must be an array containing EXACTLY one meal object.
Each meal object must contain:
- "name": a specific meal name (string)
- "recipe": brief but useful preparation instructions (string)
- "ingredients": an array of 1 to 5 objects, each with "item" (string),
  "quantity" (positive number), and "unit" (string)
- "nutrition": brief approximate calories and protein (string)
- "meal_prep_tips": one practical tip (string)
- "estimated_cost_per_serving": approximate price in CAD (string)

Shape example for ONE day only (do not return just this example):
{"mealPlan":[{"day":"Monday","breakfast":[{"name":"Vegetable Poha","recipe":"Rinse poha, sauté vegetables, and combine.","ingredients":[{"item":"Poha","quantity":80,"unit":"g"}],"nutrition":"About 300 kcal, 8 g protein","meal_prep_tips":"Chop vegetables ahead.","estimated_cost_per_serving":"CAD 2.50"}],"lunch":[],"dinner":[]}]}

In your ACTUAL response, fill all breakfast, lunch, and dinner arrays for
ALL seven days. Do not leave empty arrays, use placeholders, or refer to
another day. Follow dietary restrictions strictly. Use sensible approximations;
do not make medical claims. Return JSON only, no prose or Markdown.
`;
    try {
      setLoading(true);

      const result = await chatSession.sendMessage(FINAL_PROMPT);

      if (
        !result ||
        !result.response ||
        typeof result.response.text !== "function"
      ) {
        throw new Error("No response from AI");
      }

      const mealPlan = result.response.text();

      if (!mealPlan) {
        throw new Error("AI did not return a valid meal plan");
      }

      const trimmed = mealPlan.trim();
      const looksComplete = trimmed.endsWith("}") || trimmed.endsWith("]");
      if (!looksComplete && mode === "standard") {
        console.warn("Primary response appears truncated. Retrying with compact prompt.");
        throw new Error("AI output incomplete; retry manually if desired.");
      }

      // Do not log user preferences or generated nutrition data.
      return mealPlan;
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : String(error);

      const normalizedMessage = errorMessage.toLowerCase();
      let userFriendlyMessage = "Failed to generate meal plan. Please try again.";

      if (normalizedMessage.includes("429") || normalizedMessage.includes("quota")) {
        userFriendlyMessage =
          "Gemini API quota exceeded. Enable billing/increase quota in Google AI Studio or try again later.";
      } else if (
        normalizedMessage.includes("api key") ||
        normalizedMessage.includes("permission") ||
        normalizedMessage.includes("unauthorized")
      ) {
        userFriendlyMessage =
          "Gemini API key is invalid or lacks permission for this model. Check your API key/project settings.";
      }

console.error("Error generating meal plan:", error);
throw new Error(userFriendlyMessage === "Failed to generate meal plan. Please try again."
  ? errorMessage
  : userFriendlyMessage);
    } finally {
      setLoading(false);
    }

  };





  function convertNutritionInfo(info: unknown): string[] {
    if (!info) return [];

    if (typeof info === "string") {
      try {
        const parsed = JSON.parse(info);
        if (Array.isArray(parsed)) {
          return parsed.map((item) => {
            if (typeof item === "object" && item !== null) {
              return Object.entries(item)
                .map(([k, v]) => `${k}: ${v}`)
                .join(", ");
            }
            return String(item);
          });
        } else if (typeof parsed === "object" && parsed !== null) {
          return [
            Object.entries(parsed)
              .map(([k, v]) => `${k}: ${v}`)
              .join(", "),
          ];
        }
        return [String(parsed)];
      } catch {
        return [info];
      }
    }

    if (Array.isArray(info)) {
      return info.flatMap((v) => convertNutritionInfo(v));
    }

    if (typeof info === "object" && info !== null) {
      return [
        Object.entries(info)
          .map(([k, v]) => `${k}: ${v}`)
          .join(", "),
      ];
    }

    return [String(info)];
  }

  const fetchImagesForMealPlan = async (
    mealPlan: MealPlan
  ): Promise<MealPlan> => {
    try {
      if (!mealPlan || !mealPlan.Days) {
        console.error(
          "Invalid meal plan structure for image fetching:",
          mealPlan
        );
        return mealPlan;
      }

      console.log("Fetching images for meal plan...");
      const planWithImagesRaw = await fetchMealImagesForPlan(mealPlan);

      const planWithImages: MealPlan = {
        // @ts-expect-error: Type mismatch due to nutritionalInformation being derived as string[] instead of NutritionalInformation[]
        Days: planWithImagesRaw.Days.map((day) => ({
          DayName: day.DayName,
          breakfast: day.breakfast.map((meal) => ({
            ...meal,
            tips: meal.tips || "No preparation tips available",
            nutritionalInformation: convertNutritionInfo(
              meal.nutritionalInformation
            ),
          })),
          lunch: day.lunch.map((meal) => ({
            ...meal,
            tips: meal.tips || "No preparation tips available",
            nutritionalInformation: convertNutritionInfo(
              meal.nutritionalInformation
            ),
          })),
          dinner: day.dinner.map((meal) => ({
            ...meal,
            tips: meal.tips || "No preparation tips available",
            nutritionalInformation: convertNutritionInfo(
              meal.nutritionalInformation
            ),
          })),
        })),
        nutritionalInformation: mealPlan.nutritionalInformation,
      };

      console.log(
        "Sample nutritional info:",
        planWithImages.Days[0]?.breakfast[0]?.nutritionalInformation
      );

      return planWithImages;
    } catch (error) {
      console.error("Error fetching images for meal plan:", error);
      return mealPlan;
    }
  };

  /**
   * Processes and saves the AI-generated meal plan to MongoDB.
   * Handles JSON cleaning, parsing, data transformation, and storage.
   *
   * @param {string} mealPlan - Raw AI-generated meal plan in JSON format
   * @param {MealPlanFormData} formData - User preferences and dietary requirements
   * @param {boolean} shouldRedirect - Whether to redirect after saving
   * @returns {Promise<string>} Document ID of the saved meal plan
   * @throws {Error} If parsing or saving fails
   */
  const saveAIMeal = async (
    mealPlan: string,
    formData: MealPlanFormData,
    shouldRedirect = true,
    retryCount = 0
  ): Promise<string> => {
    if (!mealPlan) {
      throw new Error("No meal plan data received");
    }

    try {
      setLoading(true);
      // Step 1: Clean up the raw AI response to extract valid JSON
      let cleanedMealPlan = mealPlan.trim();

      if (cleanedMealPlan.includes("```json")) {
        const match = cleanedMealPlan.match(/```json\s*([\s\S]*?)\s*```/);
        if (match && match[1]) {
          cleanedMealPlan = match[1].trim();
        }
      }

      if (
        !cleanedMealPlan.startsWith("[") &&
        !cleanedMealPlan.startsWith("{")
      ) {
        const jsonMatch = cleanedMealPlan.match(/(\[[\s\S]*\]|\{[\s\S]*\})/);
        if (jsonMatch) {
          cleanedMealPlan = jsonMatch[0];
        }
      }

      console.log(
        "Cleaned meal plan:",
        cleanedMealPlan.substring(0, 100) + "..."
      );

      // Step 2: Fix common JSON formatting issues
      cleanedMealPlan = cleanedMealPlan
        .replace(/\u2019/g, "'") // Replace curly apostrophes
        .replace(/\u201C|\u201D/g, '"') // Replace curly quotes
        .replace(/^\uFEFF/, ""); // Remove BOM

      // Step 3: Parse the JSON
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      let mealData: any;
      try {
        mealData = JSON.parse(cleanedMealPlan);
      } catch (parseError: unknown) {
        // Attempt to salvage valid JSON if model included trailing text.
        const arrayStart = cleanedMealPlan.indexOf("[");
        const arrayEnd = cleanedMealPlan.lastIndexOf("]");
        const objectStart = cleanedMealPlan.indexOf("{");
        const objectEnd = cleanedMealPlan.lastIndexOf("}");

        try {
          if (arrayStart !== -1 && arrayEnd > arrayStart) {
            mealData = JSON.parse(cleanedMealPlan.slice(arrayStart, arrayEnd + 1));
          } else if (objectStart !== -1 && objectEnd > objectStart) {
            mealData = JSON.parse(cleanedMealPlan.slice(objectStart, objectEnd + 1));
          }
        } catch {
          // Ignore and continue with original error handling below.
        }

        if (mealData) {
          // Successfully recovered JSON from mixed output.
          console.warn("Recovered JSON from model output with extra trailing text.");
        } else {
        const errorMessage =
          parseError instanceof Error ? parseError.message : String(parseError);
        console.error("JSON parsing error:", parseError);

        // Parsing failure details are not logged to protect user data.

        const normalizedError = errorMessage.toLowerCase();
        const isTruncatedJson =
          normalizedError.includes("unterminated") ||
          normalizedError.includes("unexpected end") ||
          normalizedError.includes("end of json");

        if (isTruncatedJson) {
          if (retryCount < 1) {
            toast.info("AI response was cut off. Please try again later.");
            throw new Error("AI response was incomplete. Please retry manually.");
          }

          throw new Error(
            "AI response was truncated before JSON completed. Please try again."
          );
        }

        toast.error("Failed to parse meal plan data");
        throw new Error(`Failed to parse meal plan JSON: ${errorMessage}`);
        }
      }

     // Step 4: Validate user authentication
     if (status === "loading") {
      // Wait briefly for session to load
      await new Promise(resolve => setTimeout(resolve, 500));
    }
    
    if (status !== "authenticated" || !session?.user) {
      console.warn("Authentication required to save a plan");
      toast.error("Please log in to save your meal plan", {
        action: {
          label: "Login",
          onClick: () => router.push("/auth/signin")
        }
      });
      throw new Error("Authentication required");
    }
    
    const user = session.user;

    const docID = Date.now().toString();

      // Step 5: Transform the raw AI data into the expected schema format
      const normalizeDayEntries = (data: unknown): unknown[] => {
        if (!data) return [];

        if (Array.isArray(data)) return data;

        if (typeof data === "string") {
          try {
            const parsed = JSON.parse(data);
            return normalizeDayEntries(parsed);
          } catch {
            return [];
          }
        }

        if (typeof data === "object") {
          const obj = data as Record<string, unknown>;

          if (Array.isArray(obj.meal_plan)) return obj.meal_plan;
          if (Array.isArray(obj.mealPlan)) return obj.mealPlan;
          if (Array.isArray(obj.days)) return obj.days;

          // Some models return day maps instead of arrays.
          if (obj.meal_plan && typeof obj.meal_plan === "object") {
            const values = Object.values(obj.meal_plan as Record<string, unknown>);
            if (values.length > 0) return values;
          }

          // Single-day object fallback.
          const hasMealSections =
            "breakfast" in obj || "lunch" in obj || "dinner" in obj || "meals" in obj;
          if (hasMealSections) return [obj];
        }

        return [];
      };

      const sourceDays = normalizeDayEntries(mealData);

      console.debug("Meal data top-level keys:",
        typeof mealData === "object" && mealData !== null
          ? Object.keys(mealData as Record<string, unknown>)
          : typeof mealData
      );
      console.log("Detected source day count:", sourceDays.length);

      const transformedMealData = {
        mealPlan: {
          Days: sourceDays.length > 0
            ? // eslint-disable-next-line @typescript-eslint/no-explicit-any
              sourceDays.map((day: any, index: number) => {
                const normalizeIngredient = (ingredient: unknown): Ingredient => {
                  if (typeof ingredient === "string") {
                    return {
                      item: ingredient,
                      quantity: 1,
                      unit: "serving",
                    };
                  }

                  if (typeof ingredient === "object" && ingredient !== null) {
                    const ing = ingredient as Record<string, unknown>;
                    const rawQuantity = ing.quantity;
                    const rawUnit = typeof ing.unit === "string" ? ing.unit.trim() : "";

                    let quantity = 1;
                    if (typeof rawQuantity === "number" && Number.isFinite(rawQuantity)) {
                      quantity = rawQuantity;
                    } else if (typeof rawQuantity === "string") {
                      const numericMatch = rawQuantity.match(/\d+(?:\.\d+)?/);
                      if (numericMatch) {
                        quantity = Number(numericMatch[0]);
                      }
                    }

                    let unit = rawUnit || "serving";
                    if (!rawUnit && typeof rawQuantity === "string") {
                      const inferredUnit = rawQuantity
                        .replace(/\d+(?:\.\d+)?/g, "")
                        .trim();
                      if (inferredUnit) {
                        unit = inferredUnit;
                      }
                    }

                    return {
                      item:
                        (typeof ing.item === "string" && ing.item) ||
                        (typeof ing.name === "string" && ing.name) ||
                        "",
                      quantity,
                      unit,
                    };
                  }

                  return {
                    item: String(ingredient),
                    quantity: 1,
                    unit: "serving",
                  };
                };

                /**
                 * Converts various meal formats into a standardized array format.
                 * Handles both array inputs and object inputs with nested structures.
                 *
                 * @param {string} mealType - The type of meal (breakfast, lunch, dinner)
                 * @returns {Array} Standardized array of meal options
                 */
                const convertToArray = (mealType: string) => {
                  const pickCaseInsensitive = (
                    source: Record<string, unknown> | undefined,
                    key: string
                  ) => {
                    if (!source) return undefined;
                    const direct = source[key];
                    if (direct !== undefined) return direct;
                    const foundKey = Object.keys(source).find(
                      (k) => k.toLowerCase() === key.toLowerCase()
                    );
                    return foundKey ? source[foundKey] : undefined;
                  };

                  const mealSource =
                    pickCaseInsensitive(day.meals, mealType) ||
                    pickCaseInsensitive(day, mealType);

                  if (!mealSource) return [];

                  if (Array.isArray(mealSource)) {
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    return mealSource.map((meal: any) => ({
                      option: meal.name || meal.meal_name || mealType,
                      recipe: meal.recipe || "",
                      ingredients: Array.isArray(meal.ingredients)
                        ? meal.ingredients.map((ingredient: unknown) =>
                            normalizeIngredient(ingredient)
                          )
                        : typeof meal.ingredients === "string"
                        ? meal.ingredients
                            .split(",")
                            .map((part: string) => part.trim())
                            .filter(Boolean)
                            .map(
                              (item: string) =>
                                ({
                                  item,
                                  quantity: 1,
                                  unit: "serving",
                                } as Ingredient)
                            )
                        : [],

                      tips:
                        meal.meal_prep_tips || meal.meal_prep || meal.prep_tips || "",
                      nutritionalInformation: convertNutritionInfo(
                        meal.nutrition || meal.nutritional_info
                      ),
                      cost_per_serving:
                        meal.estimated_cost_per_serving ||
                        meal.cost ||
                        meal.cost_per_serving ||
                        "",
                      imageUrl: "",
                    }));
                  }

                  if (typeof mealSource === "object") {
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    const mealOptions = mealSource as Record<string, any>;
                    const optionKeys = Object.keys(mealOptions).filter((key) =>
                      key.toLowerCase().startsWith("option")
                    );

                    // Some model outputs return a single meal object directly
                    // (without option1/option2 wrapper). Treat that as one option.
                    if (optionKeys.length === 0) {
                      const singleOption = mealOptions;
                      const nutritionStr = (
                        singleOption.nutrition ||
                        singleOption.nutritional_info ||
                        ""
                      ).toString();

                      const hasMealLikeFields =
                        Boolean(singleOption.recipe) ||
                        Boolean(singleOption.ingredients) ||
                        Boolean(singleOption.name) ||
                        Boolean(singleOption.meal_name);

                      if (hasMealLikeFields) {
                        return [
                          {
                            option:
                              singleOption.name ||
                              singleOption.meal_name ||
                              `${mealType} option`,
                            recipe:
                              singleOption.recipe ||
                              `Balanced ${mealType} meal tailored for your goals.`,
                            ingredients: Array.isArray(singleOption.ingredients)
                              ? singleOption.ingredients.map((ingredient: unknown) =>
                                  normalizeIngredient(ingredient)
                                )
                              : typeof singleOption.ingredients === "string"
                              ? [
                                  {
                                    item: singleOption.ingredients,
                                    quantity: 1,
                                    unit: "serving",
                                  } as Ingredient,
                                ]
                              : [],
                            tips:
                              singleOption.meal_prep_tips ||
                              singleOption.prep_tips ||
                              singleOption.meal_prep ||
                              "",
                            nutritionalInformation: parseNutritionInfo(nutritionStr),
                            cost_per_serving:
                              singleOption.estimated_cost_per_serving ||
                              singleOption.cost_per_serving ||
                              singleOption.cost ||
                              "",
                            imageUrl: "",
                          },
                        ];
                      }
                    }

                    return optionKeys
                      .map((key) => {
                        const option = mealOptions[key];

                        const nutritionStr = (
                          option.nutrition ||
                          option.nutritional_info ||
                          ""
                        ).toString();

                        return {
                          option: option.name || option.meal_name || key,
                          recipe: option.recipe || "",
                          ingredients: Array.isArray(option.ingredients)
                            ? option.ingredients.map((ingredient: unknown) =>
                                normalizeIngredient(ingredient)
                              )
                            : typeof option.ingredients === "string"
                            ? [
                                {
                                  item: option.ingredients,
                                  quantity: 1,
                                  unit: "serving",
                                } as Ingredient,
                              ]
                            : [],
                          tips:
                            option.meal_prep_tips || option.prep_tips || option.meal_prep || "",
                          nutritionalInformation:
                            parseNutritionInfo(nutritionStr),
                          cost_per_serving:
                            option.estimated_cost_per_serving ||
                            option.cost_per_serving ||
                            option.cost ||
                            "",
                        };
                      });
                  }
                  return [];
                };

                // Create standardized day structure
                return {
                  DayName: day.day || day.DayName || `Day ${index + 1}`,
                  breakfast: convertToArray("breakfast"),
                  lunch: convertToArray("lunch"),
                  dinner: convertToArray("dinner"),
                  snacks: convertToArray("snacks"),
                };
              })
            : [],
        },
      };

      if (transformedMealData.mealPlan.Days.length === 0) {
        throw new Error(
          "AI response format was valid JSON, but no meal days could be parsed. Please try again."
        );
      }

      const totalExtractedMeals = transformedMealData.mealPlan.Days.reduce(
        (sum, day) =>
          sum +
          (Array.isArray(day.breakfast) ? day.breakfast.length : 0) +
          (Array.isArray(day.lunch) ? day.lunch.length : 0) +
          (Array.isArray(day.dinner) ? day.dinner.length : 0),
        0
      );

      if (totalExtractedMeals === 0) {
        if (retryCount < 1) {
          toast.info(
            "The meal plan was empty. Please try again."
          );
          throw new Error("AI response was incomplete. Please retry manually.");
        }

        throw new Error(
          "Meal plan was generated but contained no meals. Please try again."
        );
      }

      validateMealPlan(transformedMealData.mealPlan);

      const planWithImages = await fetchImagesForMealPlan(
        transformedMealData.mealPlan as unknown as MealPlan
      );

      // Step 6: Save the transformed data to MongoDB
      const response = await fetch("/api/meal-plans", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: docID,
          userSelection: formData,
          meals: {
            mealPlan: planWithImages,
          },
          userID: user.id,
          userEmail: user.email,
          userName: user.name,
          timestamp: new Date().toISOString(),
          user: {
            uid: user.id,
            email: user.email,
            name: user.name,
            picture: user.image,
          },
        }),
      });

      // Step 7: Handle response and errors
      if (!response.ok) {
        const errorData = await response
          .json()
          .catch(() => ({ message: "Unknown error" }));
        throw new Error(
          `Failed to save meal plan to database: ${
            errorData.message || response.statusText
          }`
        );
      }

      toast.success("Meal plan saved successfully!");

      if (shouldRedirect) {
        await router.push(`/view-planner/${docID}`);
      }

      return docID;
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : String(error);
      console.error("Error saving meal plan:", error);
      toast.error(errorMessage || "Failed to save meal plan");
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return {
    generateMealPlan,
    saveAIMeal,
    fetchImagesForMealPlan,
    generatedPlan,
    loading,
  };
}
