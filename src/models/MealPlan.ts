import mongoose, { Schema } from "mongoose";

const IngredientSchema = new Schema({
  item: String,
  quantity: Number,
  unit: String,
});

const MealOptionSchema = new Schema({
  option: String,
  recipe: String,
  ingredients: [IngredientSchema],
  tips: String,
  nutritionalInformation: [String],
  imageUrl: String,
  cost_per_serving: String,
});

const DaySchema = new Schema({
  DayName: String,
  breakfast: [MealOptionSchema],
  lunch: [MealOptionSchema],
  dinner: [MealOptionSchema],
});

const MealPlanSchema = new Schema({
  userSelection: {
    age: String,
    height: String,
    weight: String,
    activityLevel: String,
    gender: String,
    dietaryRestrictions: String,
    weightGoal: String,
    culturalPreference: String,
  },
  meals: {
    mealPlan: {
      Days: [DaySchema],
    },
  },
  userID: String,
  userEmail: String,
  userName: String,
  id: String,
  timestamp: { type: Date, default: Date.now },
  user: {
    uid: String,
    email: String,
    name: String,
    givenName: String,
    picture: String,
    verifiedEmail: Boolean,
  },
});

export default mongoose.models.MealPlan ||
  mongoose.model("MealPlan", MealPlanSchema);
