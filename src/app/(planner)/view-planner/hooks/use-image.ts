"use client";

import { useState, useEffect } from "react";

interface MealImageResult {
  imageUrl: string;
  loading: boolean;
  error: string | null;
}

export const useMealImage = (mealName: string): MealImageResult => {
  const [imageUrl, setImageUrl] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchImage = async () => {
      if (!mealName) {
        setLoading(false);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const response = await fetch(
          `/api/meal-images?meal=${encodeURIComponent(mealName)}`
        );
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || "Failed to fetch image");
        }

        if (data.imageUrl) {
          setImageUrl(data.imageUrl);
        } else {
          setError("No image found");
          setImageUrl("");
        }
      } catch (error) {
        setError(
          error instanceof Error ? error.message : "Error fetching image"
        );
        setImageUrl("");
      } finally {
        setLoading(false);
      }
    };

    fetchImage();
  }, [mealName]);

  return { imageUrl, loading, error };
};
