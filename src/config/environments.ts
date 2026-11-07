export interface EnvironmentConfig {
  [key: string]: {
    label: string;
    dotColor: string;
    activeDotColor: string;
    description: string;
    fallbackUrl: string;
    url: string;
  };
}

const devUrl = process.env.NEXT_PUBLIC_APP_URL_DEV || 'http://localhost:3000';
const prodUrl =
  process.env.NEXT_PUBLIC_APP_URL_PROD ||
  'https://your-project-name.vercel.app';
const stagingUrl = process.env.NEXT_PUBLIC_APP_URL_STAGING;

const envMap: EnvironmentConfig = {
  dev: {
    label: 'Development',
    dotColor: 'bg-yellow-500',
    activeDotColor: 'bg-yellow-500',
    description: 'Local dev with full control.',
    fallbackUrl: '/docs/local-environment',
    url: devUrl,
  },
  prod: {
    label: 'Production',
    dotColor: 'bg-green-500',
    activeDotColor: 'bg-green-500',
    description: 'Live environment.',
    fallbackUrl: '/docs/production-environment',
    url: prodUrl,
  },
};

if (stagingUrl) {
  envMap.staging = {
    label: 'Staging',
    dotColor: 'bg-blue-400',
    activeDotColor: 'bg-blue-400',
    description: 'Pre-production testing.',
    fallbackUrl: '/docs/staging-environment',
    url: stagingUrl,
  };
}

export const environments: EnvironmentConfig = envMap;
