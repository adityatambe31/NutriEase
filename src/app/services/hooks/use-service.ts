import { serviceDetails, services } from '@/config/services.config';
import { LucideIcon } from 'lucide-react';
import { useMemo, useState } from 'react';

export interface Service {
  title: string;
  description: string;
  icon: LucideIcon;
  image: string;
  color: string;
  features: string[];
  path: string;
}

export interface ServiceDetail {
  title: string;
  content: string;
  image: string;
}

export const useServices = () => {
  const [activeService, setActiveService] = useState<string | null>(null);

  const getServiceByTitle = useMemo(
    () => (title: string) => {
      return services.find((service) => service.title === title);
    },
    [],
  );

  const getServiceDetailByTitle = useMemo(
    () => (title: string) => {
      return serviceDetails.find((detail) => detail.title.startsWith(title));
    },
    [],
  );

  return {
    services,
    serviceDetails,
    activeService,
    setActiveService,
    getServiceByTitle,
    getServiceDetailByTitle,
  };
};
