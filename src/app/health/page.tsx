'use client';

import { LoadingOverlay } from '@/components/ui/loading-overlay';
import { initialHealthData } from '@/config/health-data';
import { motion } from 'framer-motion';

import { HealthAnalyticsChart } from './components/health-analytics-chart';
import { MealProgressTracker } from './components/meal-progress-tracker';
import { UserMetrics } from './components/user-metrics';
import { useHealthTracker } from './hooks/use-health-tracker';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: 'spring',
      stiffness: 100,
    },
  },
};

export default function HealthTracker() {
  const { healthData, loading, updateMetrics, calculateBMI } =
    useHealthTracker(initialHealthData);

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-slate-800">
      <LoadingOverlay isLoading={loading} />
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/PlannerBG.jpg')] bg-cover bg-fixed bg-center opacity-10" />
        <div className="absolute inset-0 bg-gradient-to-br from-teal-500/10 to-blue-500/10" />
      </div>

      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12 z-10"
      >
        <motion.div variants={itemVariants} className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-teal-400 via-cyan-300 to-blue-500 mb-4">
            Health Dashboard
          </h1>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Track your fitness journey and maintain your healthy lifestyle
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <motion.div
            variants={itemVariants}
            className="lg:col-span-4 space-y-6"
          >
            <UserMetrics
              metrics={healthData.currentMetrics}
              updateMetrics={updateMetrics}
            />
          </motion.div>
          <motion.div
            variants={itemVariants}
            className="lg:col-span-8 space-y-6"
          >
            <div className="bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 p-1">
              <HealthAnalyticsChart healthData={healthData.history} />
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="lg:col-span-12">
            <div className="bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 p-1">
              <MealProgressTracker />
            </div>
          </motion.div>
        </div>
        <motion.div
          variants={itemVariants}
          className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-4"
        >
          {[
            {
              label: 'Current Weight',
              value: `${healthData.currentMetrics.weight} kg`,
            },
            {
              label: 'Current BMI',
              value: calculateBMI(
                Number(healthData.currentMetrics.weight),
                Number(healthData.currentMetrics.height),
              ),
            },
            {
              label: 'Height',
              value: `${healthData.currentMetrics.height} cm`,
            },
            { label: 'Progress', value: 'On Track', status: 'positive' },
          ].map((stat, index) => (
            <div
              key={index}
              className="bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10 p-4"
            >
              <p className="text-gray-400 text-sm">{stat.label}</p>
              <p
                className={`text-2xl font-semibold ${
                  stat.status === 'positive' ? 'text-teal-400' : 'text-white'
                }`}
              >
                {stat.value}
              </p>
            </div>
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
}
