"use client";

import { useEffect, useState } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { toast } from "react-hot-toast";
import { MealData } from "@/types/meal-plan";
import MealPlanComponent from "@/app/(planner)/view-planner/components/view-planner";
import UserInfo from "@/app/(planner)/view-planner/components/user-info";
import { useParams } from "next/navigation";

export default function Home() {
  const params = useParams();
  const [mealData, setMealData] = useState<MealData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!params || !params.mealID) {
      setLoading(false);
      return;
    }

    const mealID = params.mealID as string;

    const fetchMealData = async () => {
      try {
        const response = await fetch(`/api/meal-plans/${mealID}`);

        if (!response.ok) {
          toast("No meal plan found!");
          return;
        }

        const data = await response.json();
        setMealData(data as MealData);
      } catch (error) {
        console.error("Error fetching meal data:", error);
        toast("Failed to load meal plan. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchMealData();
  }, [params]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <AiOutlineLoading3Quarters className="animate-spin text-blue-500 text-4xl" />
      </div>
    );
  }

  if (!mealData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg text-red-500">Meal plan not found.</p>
      </div>
    );
  }

  const { meals, userSelection, user } = mealData;

  return (
    <div className="meal-plan-container">
      <div className="relative bg-cover bg-center bg-[url('/LandingBG.jpg')] bg-blend-multiply bg-fixed text-white py-16 min-h-[650px] hidden md:block">
        <div className="bg-black/50 absolute inset-0"></div>
      </div>
      <div className="bg-white mt-4">
        <div className="relative max-w-5xl mx-auto md:mt-[-600px]">
          <div className="shadow-xl rounded-xl bg-gray-200 border-gray-300 relative z-10">
            <UserInfo userSelection={userSelection} user={user} />
          </div>
          <MealPlanComponent meals={meals.mealPlan} />
        </div>
      </div>
    </div>
  );
}
