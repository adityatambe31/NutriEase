'use client';

import { useMealPlanForm } from '@/app/(planner)/planner/hooks/use-meal-plan-form';
import { useMealPlanService } from '@/app/(planner)/planner/hooks/use-mealplan-service';
import { LoadingOverlay } from '@/components/ui/loading-overlay';
import { motion } from 'framer-motion';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';
import { toast } from 'sonner';





export default function Planner() {
  const { status } = useSession();
  const router = useRouter();
  const { formData, loading, setLoading, handleInputChange, validateForm } =
    useMealPlanForm();
  const { generateMealPlan, saveAIMeal } = useMealPlanService();

  useEffect(() => {
    const currentUrl = encodeURIComponent(window.location.pathname);

    if (status === 'unauthenticated') {
      toast.error('You must be logged in to access the meal planner', {
        action: {
          label: 'Login',

          onClick: () => router.push(`/auth/signin?callbackUrl=${currentUrl}`),
        },
      });
      router.push(`/auth/signin?callbackUrl=${currentUrl}`);
    }
  }, [status, router]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      const mealPlan = await generateMealPlan(formData);
      await saveAIMeal(mealPlan, formData);
    } catch (error) {
      console.error('Error:', error);
      toast.error('Failed to generate meal plan', {
        description: (error as Error).message || 'Please try again later.',
      });
    } finally {
      setLoading(false);
    }
  };
  if (status === 'loading') {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <LoadingOverlay isLoading={true} />
      </div>
    );
  }

  // Don't render the form if not authenticated
  if (status === 'unauthenticated') {
    return null;
  }

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-[url('/PlannerBG.jpg')] bg-cover bg-fixed bg-center">
      <LoadingOverlay isLoading={loading} />
      <div className="absolute inset-0 bg-gradient-to-br from-black/60 to-black/40 backdrop-filter backdrop-blur-[2px]"></div>
      <div className="relative w-full max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12 z-10">
        {/* Card container with glass morphism effect */}
        <div className="bg-white/10 backdrop-blur-xl rounded-2xl shadow-2xl overflow-hidden border border-white/20">
          {/* Header section */}
          <div className="bg-gradient-to-r from-teal-900/80 to-indigo-900/80 px-6 py-8 sm:py-10 text-center">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-2">
              Smart Bites{' '}
              <span className="text-yellow-300">AI Meal Planner</span>
            </h2>
            <p className="text-white/80 text-sm sm:text-base max-w-2xl mx-auto">
              Personalize your nutrition journey with AI-powered meal
              recommendations tailored to your lifestyle
            </p>
          </div>

          {/* Form body */}
          <form
            onSubmit={handleSubmit}
            className="px-4 sm:px-6 lg:px-8 py-6 sm:py-8"
          >
            <div className="space-y-8">
              {/* Basic Info Section */}
              <section>
                <h3 className="text-white text-lg font-medium mb-5 pb-2 border-b border-white/20">
                  Personal Details
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                  {/* Age Input */}
                  <motion.div
                    className="space-y-2"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <label className="text-white/90 text-sm font-medium flex items-center gap-2">
                      <span className=" w-6 h-6 bg-teal-600/30 rounded-full flex items-center justify-center text-xs">
                        1
                      </span>
                      Age
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="Enter your age"
                        value={formData.age}
                        onChange={(e) =>
                          handleInputChange('age', e.target.value)
                        }
                        className="w-full bg-white/10 border border-white/20 text-white rounded-lg px-4 py-3 
                                  placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-teal-500/50 
                                  focus:border-transparent transition-all duration-300"
                        inputMode="numeric"
                        pattern="\d*"
                      />
                    </div>
                  </motion.div>

                  {/* Height Input */}
                  <motion.div
                    className="space-y-2"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.1 }}
                  >
                    <label className="text-white/90 text-sm font-medium flex items-center gap-2">
                      <span className=" w-6 h-6 bg-teal-600/30 rounded-full flex items-center justify-center text-xs">
                        2
                      </span>
                      Height (cm)
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="Enter your height"
                        value={formData.height}
                        onChange={(e) =>
                          handleInputChange('height', e.target.value)
                        }
                        className="w-full bg-white/10 border border-white/20 text-white rounded-lg px-4 py-3 
                                  placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-teal-500/50 
                                  focus:border-transparent transition-all duration-300"
                        inputMode="numeric"
                        pattern="\d*"
                      />
                    </div>
                  </motion.div>

                  {/* Weight Input */}
                  <motion.div
                    className="space-y-2"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.2 }}
                  >
                    <label className="text-white/90 text-sm font-medium flex items-center gap-2">
                      <span className=" w-6 h-6 bg-teal-600/30 rounded-full flex items-center justify-center text-xs">
                        3
                      </span>
                      Weight (kg)
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="Enter your weight"
                        value={formData.weight}
                        onChange={(e) =>
                          handleInputChange('weight', e.target.value)
                        }
                        className="w-full bg-white/10 border border-white/20 text-white rounded-lg px-4 py-3 
                                  placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-teal-500/50 
                                  focus:border-transparent transition-all duration-300"
                        inputMode="numeric"
                        pattern="\d*"
                      />
                    </div>
                  </motion.div>
                </div>
              </section>

              {/* Preferences Section */}
              <section>
                <h3 className="text-white text-lg font-medium mb-5 pb-2 border-b border-white/20">
                  Personal Preferences
                </h3>

                {/* Gender Selection - Modern toggle buttons */}
                <div className="mb-6">
                  <label className="text-white/90 text-sm font-medium mb-3 block">
                    Gender
                  </label>
                  <div className="flex flex-wrap gap-3">
                    {['Male', 'Female', 'Other'].map((gender, index) => (
                      <motion.button
                        key={gender}
                        type="button"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2 + index * 0.1 }}
                        className={`relative py-2.5 px-5 rounded-full transition-all duration-300 
                          ${
                            formData.gender === gender
                              ? 'bg-gradient-to-r from-teal-500 to-cyan-500 text-white shadow-lg shadow-teal-500/20'
                              : 'bg-white/10 border border-white/20 text-white/80 hover:bg-white/20'
                          }
                          focus:outline-none focus:ring-2 focus:ring-teal-400/50`}
                        onClick={() => handleInputChange('gender', gender)}
                      >
                        {gender}
                        {formData.gender === gender && (
                          <motion.span
                            layoutId="genderIndicator"
                            className="absolute inset-0 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-full -z-10"
                          />
                        )}
                      </motion.button>
                    ))}
                  </div>
                </div>

                {/* Activity Level - Modern card selection */}
                <div className="mb-8">
                  <label className="text-white/90 text-sm font-medium mb-3 block">
                    Activity Level
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {[
                      {
                        key: 'Sedentary',
                        icon: '🛋️',
                        desc: 'Little to no exercise',
                      },
                      {
                        key: 'Lightly Active',
                        icon: '🚶',
                        desc: 'Light exercise 1-3 days/week',
                      },
                      {
                        key: 'Moderately Active',
                        icon: '🏃‍♂️',
                        desc: 'Moderate exercise 3-5 days/week',
                      },
                      {
                        key: 'Very Active',
                        icon: '🏋️',
                        desc: 'Hard exercise 6-7 days/week',
                      },
                      {
                        key: 'Super Active',
                        icon: '⚡',
                        desc: 'Very intense exercise daily',
                      },
                    ].map((level, index) => (
                      <motion.button
                        key={level.key}
                        type="button"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 + index * 0.1 }}
                        className={`flex flex-col items-center justify-center p-3 rounded-xl transition-all duration-300
                          border ${
                            formData.activityLevel === level.key
                              ? 'border-teal-400 bg-teal-900/30'
                              : 'border-white/10 bg-white/5 hover:bg-white/10'
                          }
                          focus:outline-none`}
                        onClick={() =>
                          handleInputChange('activityLevel', level.key)
                        }
                      >
                        <span className="text-2xl mb-2">{level.icon}</span>
                        <span className="font-medium text-white">
                          {level.key}
                        </span>
                        <span className="text-xs text-white/60 mt-1">
                          {level.desc}
                        </span>
                      </motion.button>
                    ))}
                  </div>
                </div>

                {/* Weight Goal - Slider/Visual selection */}
                <div className="mb-8">
                  <label className="text-white/90 text-sm font-medium mb-3 block">
                    Weight Goal
                  </label>
                  <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
                    {['Lose', 'Maintain', 'Gain'].map((goal, index) => {
                      const bgColor =
                        goal === 'Lose'
                          ? 'from-red-500 to-red-600'
                          : goal === 'Maintain'
                            ? 'from-green-500 to-green-600'
                            : 'from-amber-500 to-orange-600';

                      return (
                        <motion.button
                          key={goal}
                          type="button"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.3 + index * 0.1 }}
                          className={`relative flex-1 py-3 px-4 rounded-xl min-w-[120px] text-center transition-all
                            ${
                              formData.weightGoal === goal
                                ? `bg-gradient-to-br ${bgColor} text-white shadow-lg`
                                : 'bg-white/10 text-white hover:bg-white/20'
                            }
                            focus:outline-none focus:ring-2 focus:ring-white/30`}
                          onClick={() => handleInputChange('weightGoal', goal)}
                        >
                          <span className="block text-lg mb-1">
                            {goal === 'Lose'
                              ? '⬇️'
                              : goal === 'Maintain'
                                ? '⚖️'
                                : '⬆️'}
                          </span>
                          <span className="font-medium">{goal}</span>
                        </motion.button>
                      );
                    })}
                  </div>
                </div>
              </section>

              {/* Dietary Section */}
              <section>
                <h3 className="text-white text-lg font-medium mb-5 pb-2 border-b border-white/20">
                  Dietary Preferences
                </h3>

                {/* Dietary Restrictions - Modern chip selection */}
                <div className="mb-6">
                  <label className="text-white/90 text-sm font-medium mb-3 block">
                    Dietary Restrictions
                  </label>
                  <div className="flex flex-wrap gap-3">
                    {['Vegan', 'Vegetarian', 'Gluten-Free', 'None'].map(
                      (restriction, index) => (
                        <motion.button
                          key={restriction}
                          type="button"
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.2 + index * 0.1 }}
                          className={`py-2.5 px-4 rounded-lg transition-all
                          ${
                            formData.dietaryRestrictions === restriction
                              ? 'bg-gradient-to-r from-emerald-500 to-green-500 text-white'
                              : 'bg-white/10 text-white hover:bg-white/20'
                          }
                          focus:outline-none`}
                          onClick={() =>
                            handleInputChange(
                              'dietaryRestrictions',
                              restriction,
                            )
                          }
                        >
                          {restriction === 'Vegan' && '🌱 '}
                          {restriction === 'Vegetarian' && '🥗 '}
                          {restriction === 'Gluten-Free' && '🌾 '}
                          {restriction === 'None' && '✓ '}
                          {restriction}
                        </motion.button>
                      ),
                    )}
                  </div>
                </div>

                {/* Cultural Preference - Modern select */}
                <div>
                  <label className="text-white/90 text-sm font-medium mb-3 block">
                    Cultural Preference
                  </label>
                  <div className="relative">
                    <select
                      value={formData.culturalPreference}
                      onChange={(e) =>
                        handleInputChange('culturalPreference', e.target.value)
                      }
                      className="w-full appearance-none bg-white/10 border border-white/20 text-white rounded-lg 
                                px-4 py-3 pr-10 focus:outline-none focus:ring-2 focus:ring-teal-500/50
                                focus:border-transparent transition-all"
                    >
                      {[
                        'Indian',
                        'Mexican',
                        'Italian',
                        'Chinese',
                        'Japanese',
                        'Mediterranean',
                        'Middle Eastern',
                        'African',
                        'Thai',
                        'Korean',
                        'American',
                        'Latin American',
                        'Caribbean',
                        'Greek',
                        'French',
                      ].map((cuisine) => (
                        <option
                          key={cuisine}
                          value={cuisine}
                          className="bg-gray-800 text-white"
                        >
                          {cuisine}
                        </option>
                      ))}
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none text-white">
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </section>

              {/* Submit Button - Modern floating action button */}
              <div className="flex justify-end pt-4">
                <motion.button
                  type="submit"
                  onClick={(e) => handleSubmit(e)}
                  disabled={loading}
                  className="px-6 py-3 bg-gradient-to-r from-teal-500 to-cyan-500 text-white font-medium rounded-lg
                   shadow-lg shadow-teal-500/30 hover:shadow-xl hover:shadow-teal-500/40
                   focus:outline-none focus:ring-2 focus:ring-teal-500 disabled:opacity-50
                   flex items-center gap-2 transition-all duration-300"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {loading ? (
                    <>
                      <svg
                        className="animate-spin h-5 w-5 text-white"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                          fill="none"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        />
                      </svg>
                      <span>Processing</span>
                    </>
                  ) : (
                    <>
                      <span>Generate AI Meal Plan</span>
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13 5l7 7-7 7M5 12h15"
                        />
                      </svg>
                    </>
                  )}
                </motion.button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}