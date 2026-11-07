export const mealPlan = {
  mealPlan: {
    nameofDay: {
      breakfast: [
        {
          option: "option1",
          recipe: "recipeName",
          ingredients: [
            {
              item: "itemName",
              quantity: 1,
              unit: "unit",
              estimatedPrice: 0,
            },
          ],
          instructions: "Instruction on how to cook in about 2 - 3 lines",
          estimatedCostPerServing: 0.95,
        },
        {
          option: "option2",
          recipe: "recipeName",
          ingredients: [
            {
              item: "itemName",
              quantity: 1,
              unit: "unit",
              estimatedPrice: 0,
            },
          ],
          instructions: "Instruction on how to cook in about 2 - 3 lines",
          estimatedCostPerServing: 0.95,
        },
      ],
      lunch: [
        {
          option: "option1",
          recipe: "recipeName",
          ingredients: [
            {
              item: "itemName",
              quantity: 1,
              unit: "unit",
              estimatedPrice: 0,
            },
          ],
          instructions: "Instruction on how to cook in about 2 - 3 lines",
          estimatedCostPerServing: 0.95,
        },
        {
          option: "option2",
          recipe: "recipeName",
          ingredients: [
            {
              item: "itemName",
              quantity: 1,
              unit: "unit",
              estimatedPrice: 0,
            },
          ],
          instructions: "Instruction on how to cook in about 2 - 3 lines",
          estimatedCostPerServing: 0.95,
        },
      ],
      dinner: [
        {
          option: "option1",
          recipe: "recipeName",
          ingredients: [
            {
              item: "itemName",
              quantity: 1,
              unit: "unit",
              estimatedPrice: 0,
            },
          ],
          instructions: "Instruction on how to cook in about 2 - 3 lines",
          estimatedCostPerServing: 0.95,
        },
        {
          option: "option2",
          recipe: "recipeName",
          ingredients: [
            {
              item: "itemName",
              quantity: 1,
              unit: "unit",
              estimatedPrice: 0,
            },
          ],
          instructions: "Instruction on how to cook in about 2 - 3 lines",
          estimatedCostPerServing: 0.95,
        },
      ],
      snacks: [
        { item: "itemName", estimatedPrice: 1.0 },
        { item: "itemName", estimatedPrice: 0.75 },
      ],
    },
  },
  whereToFindGoodDeals: ["StoreName", "Walmart", "Costco (for bulk buying)"],
  important:
    "The prices listed are estimates only and may vary significantly depending on your location, the store you shop at, and the time of year. Always check your local store flyers and online resources for the most accurate, up-to-date pricing information before purchasing. Prices change constantly and vary by location, so you must verify prices at your local stores.",
};


/*
const FINAL_PROMPT = `
 Generate a meal plan for a ${formData.age}-year-old ${formData.gender} who is ${formData.height} cm tall, weighs ${formData.weight} kg, has an activity level of ${formData.activityLevel}, follows a ${formData.dietaryRestrictions} diet, and has a goal to ${formData.weightGoal}. Provide the meal plan in JSON format provided for all seven days` 
 mealPlan = {
  mealPlan: {
    nameofDay: {
      breakfast: [
        {
          option: "option1",
          recipe: "recipeName",
          ingredients: [
            {
              item: "itemName",
              quantity: 1,
              unit: "unit",
              estimatedPrice: 0,
            },
          ],
          instructions: "Instruction on how to cook in about 2 - 3 lines",
          estimatedCostPerServing: 0.95,
        },
        {
          option: "option2",
          recipe: "recipeName",
          ingredients: [
            {
              item: "itemName",
              quantity: 1,
              unit: "unit",
              estimatedPrice: 0,
            },
          ],
          instructions: "Instruction on how to cook in about 2 - 3 lines",
          estimatedCostPerServing: 0.95,
        },
      ],
      lunch: [
        {
          option: "option1",
          recipe: "recipeName",
          ingredients: [
            {
              item: "itemName",
              quantity: 1,
              unit: "unit",
              estimatedPrice: 0,
            },
          ],
          instructions: "Instruction on how to cook in about 2 - 3 lines",
          estimatedCostPerServing: 0.95,
        },
        {
          option: "option2",
          recipe: "recipeName",
          ingredients: [
            {
              item: "itemName",
              quantity: 1,
              unit: "unit",
              estimatedPrice: 0,
            },
          ],
          instructions: "Instruction on how to cook in about 2 - 3 lines",
          estimatedCostPerServing: 0.95,
        },
      ],
      dinner: [
        {
          option: "option1",
          recipe: "recipeName",
          ingredients: [
            {
              item: "itemName",
              quantity: 1,
              unit: "unit",
              estimatedPrice: 0,
            },
          ],
          instructions: "Instruction on how to cook in about 2 - 3 lines",
          estimatedCostPerServing: 0.95,
        },
        {
          option: "option2",
          recipe: "recipeName",
          ingredients: [
            {
              item: "itemName",
              quantity: 1,
              unit: "unit",
              estimatedPrice: 0,
            },
          ],
          instructions: "Instruction on how to cook in about 2 - 3 lines",
          estimatedCostPerServing: 0.95,
        },
      ],
      snacks: [
        { item: "itemName", estimatedPrice: 1.0 },
        { item: "itemName", estimatedPrice: 0.75 },
      ],
    },
  },
  whereToFindGoodDeals: ["StoreName", "Walmart", "Costco (for bulk buying)"],
  important:
    "The prices listed are estimates only and may vary significantly depending on your location, the store you shop at, and the time of year. Always check your local store flyers and online resources for the most accurate, up-to-date pricing information before purchasing. Prices change constantly and vary by location, so you must verify prices at your local stores.",
};



    */