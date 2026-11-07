'use client';

import { useState } from 'react';
import { toast } from 'sonner';

interface HealthMetrics {
  age: string;
  height: string;
  weight: string;
  gender: string;
}

interface HealthDataPoint {
  date: string;
  weight: number;
  height: number;
  bmi: number;
}

interface HealthData {
  currentMetrics: HealthMetrics;
  history: HealthDataPoint[];
  idealBMI?: {
    min: number;
    max: number;
  };
}

export function useHealthTracker(initialData: HealthData) {
  const [healthData, setHealthData] = useState<HealthData>(initialData);
  const [loading, setLoading] = useState(false);

  const calculateBMI = (weight: number, height: number): number => {
    if (!weight || !height) return 0;
    const heightInMeters = height / 100;
    return parseFloat((weight / (heightInMeters * heightInMeters)).toFixed(1));
  };

  const getIdealBMIRange = (age: number, gender: string) => {
    if (age < 25) {
      return gender === 'Male'
        ? { min: 19, max: 24 }
        : { min: 18.5, max: 23.5 };
    } else if (age < 35) {
      return gender === 'Male' ? { min: 20, max: 25 } : { min: 19, max: 24 };
    } else if (age < 45) {
      return gender === 'Male' ? { min: 21, max: 26 } : { min: 20, max: 25 };
    } else {
      return gender === 'Male' ? { min: 22, max: 27 } : { min: 21, max: 26 };
    }
  };

  const generateFutureProjections = (
    currentWeight: number,
    goalBMI: number,
    height: number,
    days = 30,
  ): HealthDataPoint[] => {
    const heightInMeters = height / 100;
    const goalWeight = goalBMI * (heightInMeters * heightInMeters);
    const weightDiff = goalWeight - currentWeight;
    const weightChangePerDay = weightDiff / days;

    const projections: HealthDataPoint[] = [];
    const currentDate = new Date();  // Changed from let to const

    for (let i = 0; i <= days; i += 5) {
      const projectedWeight = currentWeight + weightChangePerDay * i;
      const projectedBMI = projectedWeight / (heightInMeters * heightInMeters);

      const projectionDate = new Date(currentDate);
      projectionDate.setDate(currentDate.getDate() + i);

      projections.push({
        date: projectionDate.toISOString().split('T')[0],
        weight: parseFloat(projectedWeight.toFixed(1)),
        height: height,
        bmi: parseFloat(projectedBMI.toFixed(1)),
      });
    }

    return projections;
  };

  const updateMetrics = (newMetrics: HealthMetrics) => {
    setLoading(true);
    try {
      const currentDate = new Date().toISOString().split('T')[0];
      const height = parseFloat(newMetrics.height);
      const weight = parseFloat(newMetrics.weight);
      const age = parseInt(newMetrics.age);
      const gender = newMetrics.gender;

      // Validate inputs
      if (isNaN(height) || isNaN(weight) || isNaN(age)) {
        throw new Error('Invalid input values');
      }

      // Calculate ideal BMI range
      const idealBMI = getIdealBMIRange(age, gender);
      const targetBMI = (idealBMI.min + idealBMI.max) / 2;

      // Generate future projections
      const projections = generateFutureProjections(weight, targetBMI, height);

      setHealthData((prev) => ({
        ...prev,
        currentMetrics: { ...prev.currentMetrics, ...newMetrics },
        history: [
          ...prev.history,
          {
            date: currentDate,
            weight: weight,
            height: height,
            bmi: calculateBMI(weight, height),
          },
          ...projections,
        ],
        idealBMI,
      }));

      // Use plain string for toast message
      toast.success(
        `Metrics updated successfully! \nIdeal BMI range for your profile: ${idealBMI.min.toFixed(
          1,
        )} - ${idealBMI.max.toFixed(1)}`,
      );
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      toast.error(`Failed to update metrics: ${errorMessage}`);
      console.error('Metric update failed:', error);
    } finally {
      setLoading(false);
    }
  };

  return {
    healthData,
    loading,
    updateMetrics,
    calculateBMI,
  };
}
