
import mongoose, { Schema } from 'mongoose';

// Ingredient Schema
const IngredientSchema = new Schema({
  item: String,
  quantity: Number,
  unit: String,
});

// Meal Option Schema
const MealOptionSchema = new Schema({
  option: String,
  recipe: String,
  ingredients: [IngredientSchema],
  tips: String,
  nutritionalInformation: [String],
  imageUrl: String,
  cost_per_serving: String,
});

// Day Schema
const DaySchema = new Schema({
  DayName: String,
  breakfast: [MealOptionSchema],
  lunch: [MealOptionSchema],
  dinner: [MealOptionSchema],
});

// Main Meal Plan Schema
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

  // Ownership: always set by the authenticated server-side session.
  userID: {
    type: String,
    required: true,
    index: true,
  },

  userEmail: String,
  userName: String,

  // Unique within each user's meal plans.
  id: {
    type: String,
    required: true,
  },

  timestamp: {
    type: Date,
    default: Date.now,
  },

  user: {
    uid: String,
    email: String,
    name: String,
    givenName: String,
    picture: String,
    verifiedEmail: Boolean,
  },
});

// Prevent duplicate meal-plan IDs for the same user.
MealPlanSchema.index(
  { userID: 1, id: 1 },
  { unique: true },
);

// Reuse the existing model during Next.js hot reloads.
const MealPlan =
  mongoose.models.MealPlan ||
  mongoose.model('MealPlan', MealPlanSchema);

export default MealPlan;
