import { useState } from "react";
import { toast } from "sonner";

interface MealPlanFormData {
  age: string;
  height: string;
  weight: string;
  activityLevel: string;
  gender: string;
  dietaryRestrictions: string;
  weightGoal: string;
  culturalPreference: string;
}

export function useMealPlanForm() {
  const [formData, setFormData] = useState<MealPlanFormData>({
    age: "",
    height: "",
    weight: "",
    activityLevel: "",
    gender: "",
    dietaryRestrictions: "",
    weightGoal: "",
    culturalPreference: "Indian",
  });

  const [loading, setLoading] = useState(false);

  const handleInputChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    const missingFields = Object.entries(formData)
      .filter(([, value]) => !value?.trim())
      .map(([key]) => key);

    if (missingFields.length > 0) {
      const labels: Record<string, string> = {
        age: "Age",
        height: "Height",
        weight: "Weight",
        activityLevel: "Activity Level",
        gender: "Gender",
        dietaryRestrictions: "Dietary Restrictions",
        weightGoal: "Weight Goal",
        culturalPreference: "Cultural Preference",
      };

      toast("Please fill in all required fields before generating a meal plan.", {
        description: `Missing: ${missingFields
          .map((field) => labels[field] || field)
          .join(", ")}`,
      });
      return false;
    }
    return true;
  };

  return {
    formData,
    loading,
    setLoading,
    handleInputChange,
    validateForm,
  };
}
