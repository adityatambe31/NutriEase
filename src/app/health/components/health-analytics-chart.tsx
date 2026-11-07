'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

interface HealthData {
  date: string;
  weight: number;
  bmi: number;
}

export function HealthAnalyticsChart({
  healthData,
}: {
  healthData: HealthData[];
}) {
  const currentIndex = healthData.findIndex(
    (data) => new Date(data.date) >= new Date(),
  );

  return (
    <Card className="bg-white/10 backdrop-blur-md border-white/20 text-white shadow-xl">
      <CardHeader>
        <CardTitle className="text-xl text-white">Health Analytics</CardTitle>
        <CardDescription className="text-white/70">
          Track your progress over time
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="weight" className="w-full">
          <TabsList className="grid w-full grid-cols-3 bg-white/10">
            <TabsTrigger
              value="weight"
              className="data-[state=active]:bg-teal-600 text-white data-[state=active]:text-white"
            >
              Weight
            </TabsTrigger>
            <TabsTrigger
              value="bmi"
              className="data-[state=active]:bg-teal-600 text-white data-[state=active]:text-white"
            >
              BMI
            </TabsTrigger>
            <TabsTrigger
              value="combined"
              className="data-[state=active]:bg-teal-600 text-white data-[state=active]:text-white"
            >
              Combined
            </TabsTrigger>
          </TabsList>

          <TabsContent value="weight" className="pt-4">
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={healthData}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="rgba(255,255,255,0.1)"
                  />
                  <XAxis dataKey="date" stroke="rgba(255,255,255,0.7)" />
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

                  {/* Historical Data */}
                  <Line
                    type="monotone"
                    data={healthData.slice(0, currentIndex + 1)}
                    dataKey="weight"
                    name="Actual Weight"
                    stroke="#4ade80"
                    strokeWidth={2}
                    dot={{ r: 4 }}
                    activeDot={{ r: 8 }}
                  />

                  {/* Projected Data */}
                  <Line
                    type="monotone"
                    data={healthData.slice(currentIndex)}
                    dataKey="weight"
                    name="Projected Weight"
                    stroke="#4ade80"
                    strokeWidth={2}
                    strokeDasharray="5 5"
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>

          <TabsContent value="bmi" className="pt-4">
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={healthData}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="rgba(255,255,255,0.1)"
                  />
                  <XAxis dataKey="date" stroke="rgba(255,255,255,0.7)" />
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
                  <Line
                    type="monotone"
                    dataKey="bmi"
                    stroke="#60a5fa"
                    strokeWidth={2}
                    activeDot={{ r: 8 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>

          <TabsContent value="combined" className="pt-4">
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={healthData}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="rgba(255,255,255,0.1)"
                  />
                  <XAxis dataKey="date" stroke="rgba(255,255,255,0.7)" />
                  <YAxis yAxisId="left" stroke="rgba(255,255,255,0.7)" />
                  <YAxis
                    yAxisId="right"
                    orientation="right"
                    stroke="rgba(255,255,255,0.7)"
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'rgba(0,0,0,0.8)',
                      border: '1px solid #444',
                      color: '#fff',
                    }}
                    labelStyle={{ color: '#fff' }}
                  />
                  <Legend />
                  <Line
                    yAxisId="left"
                    type="monotone"
                    dataKey="weight"
                    name="Weight (kg)"
                    stroke="#4ade80"
                    strokeWidth={2}
                    activeDot={{ r: 8 }}
                  />
                  <Line
                    yAxisId="right"
                    type="monotone"
                    dataKey="bmi"
                    name="BMI"
                    stroke="#60a5fa"
                    strokeWidth={2}
                    activeDot={{ r: 8 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
