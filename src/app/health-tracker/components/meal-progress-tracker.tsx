'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { sampleMealData } from '@/config/health-data';
import { useState } from 'react';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

export function MealProgressTracker() {
  const [mealData] = useState(sampleMealData);

  const calculateAverageAdherence = () => {
    const sum = mealData.mealAdherence.reduce(
      (acc, day) => acc + day.adherence,
      0,
    );
    return (sum / mealData.mealAdherence.length).toFixed(0);
  };

  return (
    <Card className="bg-white/10 backdrop-blur-md border-white/20 text-white shadow-xl">
      <CardHeader>
        <CardTitle className="text-xl text-white">Meal Plan Progress</CardTitle>
        <CardDescription className="text-white/70">
          Track your adherence to the meal plan
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="p-4 bg-white/5 rounded-lg border border-white/10">
            <div className="text-sm text-white/80">Average Adherence</div>
            <div className="text-3xl font-semibold text-white">
              {calculateAverageAdherence()}%
            </div>
            <Progress
              value={parseInt(calculateAverageAdherence())}
              className="mt-2 bg-white/20"
            />
          </div>
          <div className="p-4 bg-white/5 rounded-lg border border-white/10">
            <div className="text-sm text-white/80">Avg Calories</div>
            <div className="text-3xl font-semibold text-white">
              {mealData.averages.calories}
            </div>
          </div>
          <div className="p-4 bg-white/5 rounded-lg border border-white/10">
            <div className="text-sm text-white/80">Avg Protein (g)</div>
            <div className="text-3xl font-semibold text-white">
              {mealData.averages.protein}
            </div>
          </div>
          <div className="p-4 bg-white/5 rounded-lg border border-white/10">
            <div className="text-sm text-white/80">Avg Carbs (g)</div>
            <div className="text-3xl font-semibold text-white">
              {mealData.averages.carbs}
            </div>
          </div>
        </div>

        <Tabs defaultValue="adherence" className="w-full">
          <TabsList className="grid w-full grid-cols-2 bg-white/10">
            <TabsTrigger
              value="adherence"
              className="data-[state=active]:bg-teal-600 text-white data-[state=active]:text-white"
            >
              Adherence
            </TabsTrigger>
            <TabsTrigger
              value="macros"
              className="data-[state=active]:bg-teal-600 text-white data-[state=active]:text-white"
            >
              Macros
            </TabsTrigger>
          </TabsList>

          <TabsContent value="adherence" className="pt-4">
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={mealData.mealAdherence}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="rgba(255,255,255,0.1)"
                  />
                  <XAxis dataKey="day" stroke="rgba(255,255,255,0.7)" />
                  <YAxis stroke="rgba(255,255,255,0.7)" domain={[0, 100]} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'rgba(0,0,0,0.8)',
                      border: '1px solid #444',
                      color: '#fff',
                    }}
                    labelStyle={{ color: '#fff' }}
                  />
                  <Legend />
                  <Bar
                    dataKey="adherence"
                    name="Adherence (%)"
                    fill="#4ade80"
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>

          <TabsContent value="macros" className="pt-4">
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={mealData.mealAdherence}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="rgba(255,255,255,0.1)"
                  />
                  <XAxis dataKey="day" stroke="rgba(255,255,255,0.7)" />
                  <YAxis stroke="rgba(255,255,255,0.7)" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'rgba(0,0,0,0.8)',
                      border: '1px solid #444',
                      color: '#fff',
                    }}
                    labelStyle={{ color: '#fff' }}
                  />
                  <Legend />
                  <Bar
                    dataKey="protein"
                    name="Protein (g)"
                    fill="#4ade80"
                    radius={[4, 4, 0, 0]}
                  />
                  <Bar
                    dataKey="carbs"
                    name="Carbs (g)"
                    fill="#60a5fa"
                    radius={[4, 4, 0, 0]}
                  />
                  <Bar
                    dataKey="fats"
                    name="Fats (g)"
                    fill="#f472b6"
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
