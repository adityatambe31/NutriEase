import {
  CalendarDays,
  HeartPulse,
  Users,
  ChefHat,
} from 'lucide-react';

export const services = [
    {
      title: 'Meal Planner',
      description: 'Create personalized meal plans tailored to your preferences and goals.',
      icon: CalendarDays,
      image: '/assets/services/meal-planner.jpg',
      color: 'bg-emerald-500',
      features: [
        'AI-powered recipe suggestions',
        'Weekly meal scheduling',
        'Grocery list generation',
        'Nutritional tracking',
        'Budget-friendly options'
      ],
      path: '/planner'
    },
    {
      title: 'Health Tracker',
      description: 'Monitor your nutrition and health goals with comprehensive tracking.',
      icon: HeartPulse,
      image: '/assets/services/health-tracker.jpg',
      color: 'bg-blue-500',
      features: [
        'Calorie monitoring',
        'Nutrient analysis',
        'Progress tracking',
        'Health insights',
        'Goal setting'
      ],
      path: '/health-tracker'
    },
    {
      title: 'Community',
      description: 'Connect with fellow food enthusiasts and share your culinary journey.',
      icon: Users,
      image: '/assets/services/community.jpg',
      color: 'bg-purple-500',
      features: [
        'Recipe sharing',
        'Discussion forums',
        'Expert advice',
        'Success stories',
        'Live events'
      ],
      path: '/community'
    },
    {
      title: 'Cooking Assistant',
      description: 'Get real-time guidance and tips for your cooking adventures.',
      icon: ChefHat,
      image: '/assets/services/cooking-assistant.jpg',
      color: 'bg-orange-500',
      features: [
        'Step-by-step instructions',
        'Ingredient substitutions',
        'Cooking techniques',
        'Timer management',
        'Voice commands'
      ],
      path: '/assistant'
    }
  ];

export const serviceDetails = [
    {
      title: 'Meal Planner: Your Personal Diet Assistant',
      content: `Our AI-powered Meal Planner revolutionizes how you approach food and nutrition. 
      Get personalized weekly meal plans based on your dietary preferences, restrictions, and goals. 
      The planner considers your budget, cooking time, and nutritional needs to create balanced, 
      achievable meal schedules. Features include automatic grocery list generation, recipe 
      customization, and calorie tracking.`,
      image: '/static/meal-planner-detail.jpeg'
    },
    {
      title: 'Health Tracker: Monitor Your Progress',
      content: `Take control of your health journey with our comprehensive Health Tracker. 
      Track your daily nutrition intake, monitor macronutrients, and visualize your progress 
      over time. Our analytics provide valuable insights into your eating habits and help 
      identify areas for improvement. Set personalized goals and receive regular progress 
      reports to stay motivated.`,
      image: '/static/health-tracker-detail.jpeg'
    },
    {
      title: 'Community: Connect and Share',
      content: `Join a vibrant community of food enthusiasts, health experts, and fellow users. 
      Share your favorite recipes, participate in discussions, and get inspired by success stories. 
      Our community features include recipe forums, live cooking events, expert Q&A sessions, 
      and monthly challenges to keep you engaged and motivated.`,
      image: '/static/community-detail.jpeg'
    },
    {
      title: 'Cooking Assistant: Your Kitchen Companion',
      content: `Never feel lost in the kitchen again with our intelligent Cooking Assistant. 
      Get step-by-step guidance, learn new cooking techniques, and discover ingredient substitutions. 
      The assistant helps with portion sizing, timing management, and even provides voice-guided 
      instructions to make your cooking experience seamless and enjoyable.`,
      image: '/static/cooking-assistant-detail.jpeg'
    }
  ];