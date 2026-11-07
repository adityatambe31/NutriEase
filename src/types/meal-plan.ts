// Global type definitions for the food planner app

export interface Ingredient {
    item: string;
    quantity: number;
    unit: string;
  }
  
  export interface NutritionalInformation {
    calories: string;
    protein: string;
    carbs: string;
  }
  
  export interface MealOption {
    option: string;
    recipe: string;
    ingredients: Ingredient[];
    tips: string;
    nutritionalInformation: NutritionalInformation[];
    imageUrl?: string;
    cost_per_serving?: string;
  }
  
  export interface MealPlanDay {
    DayName: string;
    breakfast: MealOption[];
    lunch: MealOption[];
    dinner: MealOption[];
  }
  
  export interface MealPlan {
    Days: MealPlanDay[];
    nutritionalInformation?: NutritionalInformation[];
  }
  
  export interface UserSelection {
    age: number | string;
    height: string;
    weight: string;
    activityLevel: string;
    gender: string;
    dietaryRestrictions: string;
    weightGoal: string;
    culturalPreference: string;
  }
  
  export interface User {
    userID?: string;
    userEmail: string;
    givenName?: string;
    picture?: string;
    id?: string;
    email?: string;
    name?: string;
    given_name?: string;
    verified_email?: boolean;
  }
  
  export interface MealData {
    userSelection: UserSelection;
    meals: {
      mealPlan: MealPlan;
    };
    user: User;
    id: string;
    timestamp: {
      seconds: number;
      nanoseconds: number;
    };
  }
  
  export interface MealPlanFormData {
    age: string;
    height: string;
    weight: string;
    activityLevel: string;
    gender: string;
    dietaryRestrictions: string;
    weightGoal: string;
    culturalPreference: string;
  }