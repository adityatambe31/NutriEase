'use client';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { toast } from 'sonner';

interface Metrics {
  age: string;
  height: string;
  weight: string;
  gender: string;
}

interface UserMetricsProps {
  metrics: Metrics;
  updateMetrics: (metrics: Metrics) => void;
}

export function UserMetrics({ metrics, updateMetrics }: UserMetricsProps) {
  const [formData, setFormData] = useState(metrics);

  const handleInputChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  type HandleSubmitEvent = React.FormEvent<HTMLFormElement>;

  const handleSubmit = (e: HandleSubmitEvent) => {
    e.preventDefault();

    if (!formData.height || !formData.weight) {
      toast.error('Please enter both height and weight');
      return;
    }

    updateMetrics(formData);
    toast.success('Health metrics updated successfully');
  };

  const calculateBMI = () => {
    if (!formData.height || !formData.weight) return '--';
    const heightInMeters = parseFloat(formData.height) / 100;
    const bmi = (
      parseFloat(formData.weight) /
      (heightInMeters * heightInMeters)
    ).toFixed(1);

    let category;
    const bmiValue = parseFloat(bmi);
    if (bmiValue < 18.5) category = 'Underweight';
    else if (bmiValue < 25) category = 'Normal weight';
    else if (bmiValue < 30) category = 'Overweight';
    else category = 'Obese';

    return `${bmi} (${category})`;
  };

  return (
    <Card className="bg-white/10 backdrop-blur-md border-white/20 text-white shadow-xl">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl text-white">Your Metrics</CardTitle>
        <CardDescription className="text-white/70">
          Update your current health metrics
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-white/90 text-sm font-medium block">
                Age
              </label>
              <input
                type="text"
                placeholder="Enter your age"
                value={formData.age}
                onChange={(e) => handleInputChange('age', e.target.value)}
                className="w-full bg-white/10 border border-white/20 text-white rounded-lg px-4 py-3 
                          placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-teal-500/50 
                          focus:border-transparent transition-all duration-300"
                inputMode="numeric"
                pattern="\d*"
              />
            </div>

            <div className="space-y-2">
              <label className="text-white/90 text-sm font-medium block">
                Height (cm)
              </label>
              <input
                type="text"
                placeholder="Enter your height"
                value={formData.height}
                onChange={(e) => handleInputChange('height', e.target.value)}
                className="w-full bg-white/10 border border-white/20 text-white rounded-lg px-4 py-3 
                          placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-teal-500/50 
                          focus:border-transparent transition-all duration-300"
                inputMode="numeric"
                pattern="\d*"
              />
            </div>

            <div className="space-y-2">
              <label className="text-white/90 text-sm font-medium block">
                Weight (kg)
              </label>
              <input
                type="text"
                placeholder="Enter your weight"
                value={formData.weight}
                onChange={(e) => handleInputChange('weight', e.target.value)}
                className="w-full bg-white/10 border border-white/20 text-white rounded-lg px-4 py-3 
                          placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-teal-500/50 
                          focus:border-transparent transition-all duration-300"
                inputMode="numeric"
                pattern="\d*"
              />
            </div>

            <div className="space-y-2">
              <label className="text-white/90 text-sm font-medium block">
                Gender
              </label>
              <div className="flex gap-3">
                {['Male', 'Female', 'Other'].map((gender) => (
                  <motion.button
                    key={gender}
                    type="button"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`relative py-2 px-4 rounded-xl flex-1 text-center transition-all
                      ${
                        formData.gender === gender
                          ? `bg-gradient-to-br from-teal-500 to-cyan-500 text-white shadow-lg`
                          : 'bg-white/10 text-white hover:bg-white/20'
                      }
                      focus:outline-none focus:ring-2 focus:ring-white/30`}
                    onClick={() => handleInputChange('gender', gender)}
                  >
                    {gender}
                  </motion.button>
                ))}
              </div>
            </div>

            <div className="mt-4 p-4 bg-white/5 rounded-lg border border-white/10">
              <div className="text-sm text-white/80">Current BMI</div>
              <div className="text-xl font-semibold text-white">
                {calculateBMI()}
              </div>
            </div>

            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-teal-600 to-cyan-600 text-white py-6 rounded-xl hover:from-teal-500 hover:to-cyan-500 transition-all"
            >
              Update Metrics
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
