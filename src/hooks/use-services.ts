import {
  Activity,
  CalendarDays,
  ChefHat,
  HandPlatter,
  LucideIcon,
  Users,
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

interface Service {
  name: string;
  path: string;
  description: string;
  icon: LucideIcon;
  color: string;
  bgColor: string;
}

export function useServices() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [currentPath, setCurrentPath] = useState<string>('');

  const handleServiceClick = async (path: string) => {
    setIsLoading(true);
    setCurrentPath(path);
    // Add a small delay to show loading state
    await new Promise((resolve) => setTimeout(resolve, 1000));
    router.push(path);

    try {
      // Your existing navigation/loading logic
    } finally {
      setIsLoading(false);
      setCurrentPath('');
    }
  };

  const services: Service[] = [
    {
      name: 'Meal Planner',
      path: '/planner',
      description: 'Plan your meals with AI assistance',
      icon: CalendarDays,
      color: 'text-blue-500',
      bgColor: 'bg-blue-50',
    },
    {
      name: 'Health Tracker',
      path: '/health-tracker',
      description: 'Monitor your nutrition goals',
      icon: Activity,
      color: 'text-green-500',
      bgColor: 'bg-green-50',
    },
    {
      name: 'Community',
      path: '/community',
      description: 'Connect with food enthusiasts',
      icon: Users,
      color: 'text-purple-500',
      bgColor: 'bg-purple-50',
    },
    {
      name: 'Cooking Assistant',
      path: '/assistant',
      description: 'Get AI-powered cooking help',
      icon: ChefHat,
      color: 'text-orange-500',
      bgColor: 'bg-orange-50',
    },
    {
      name: 'View all Services',
      path: '/services',
      description: 'Learn about all the services we offer',
      icon: HandPlatter,
      color: 'text-yellow-500',
      bgColor: 'bg-yellow-50',
    },
  ];

  return {
    services,
    isLoading,
    currentPath,
    handleServiceClick,
  };
}
