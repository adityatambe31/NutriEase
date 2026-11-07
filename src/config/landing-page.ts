import {
  ChartBarSquareIcon,
  ClockIcon,
  CursorArrowRaysIcon,
  FaceSmileIcon,
  HeartIcon,
  ShoppingCartIcon,
} from '@heroicons/react/24/solid';

// Header
export const header = [
  {
    headerBrandName: { name: 'NutriEase', path: '#' },
    headerItems: [
      { name: 'Home', path: '/' },
      { name: 'About', path: '/about' },
    ],
  },
];

// Hero
export const hero = [
  {
    heading: 'NutriEase',
    subHeading: 'Smart Bites, Better Lives.',
    description:
      'Say goodbye to unhealthy snacks and last-minute takeout. Our AI technology creates custom meal plans tailored to your lifestyle, so you can eat smart without the stress. Healthy eating made easy, affordable, and delicious.',
    button: [
      {
        title: 'Get My Plan',
        linkTo: '/planner',
      },
    ],
  },
];
//Section Title
export const section = [
  {
    preTitle: 'NutriEase Benefits',
    title: 'Why should you use this meal planning tool?',
    content:
      'Smart Meal Planning for Busy Lives – Eat Well, Save Time, Stay on Budget.',
  },
  {
    pretitle: 'Your Meal Planning Solution',
    title: 'Eat Smart, Save Time – Meet NutriEase!',
    content:
      'Watch how NutriEase simplifies meal planning, saves you money, and keeps you healthy—all with zero hassle!',
  },
  {
    pretitle: 'Get in Touch',
    title: "Have Questions? We're Here to Help!",
    content:
      "Whether you need support, have feedback, or just want to say hello, reach out to us anytime. We'd love to hear from you!",
  },
];

//Benefits
export const benefit = [
  {
    title: 'Why NutriEase is the Smart Choice',
    desc: 'NutriEase helps you eat healthier without the hassle. Save time, stay on budget, and enjoy balanced meals effortlessly.',
    image: 'static/benefit_1.svg',
    bullets: [
      {
        title: 'Designed for Busy Lifestyles',
        desc: 'Get customized meal plans based on your dietary requirements, allergies, and health goals.',
        icon: FaceSmileIcon,
      },
      {
        title: 'Eat Well & Save More',
        desc: 'Get nutritious, budget-friendly meal plans that help you avoid rising grocery costs and expensive takeout while maintaining a healthy diet.',
        icon: ChartBarSquareIcon,
      },
      {
        title: 'Convenience Without Compromise',
        desc: 'No more time-consuming meal prep! NutriEase provides quick, delicious, and well-balanced options to fit your schedule and health goals.',
        icon: CursorArrowRaysIcon,
      },
    ],
  },
  {
    title: 'Effortless Meal Planning, Maximum Nutrition',
    desc: 'NutriEase simplifies meal prep with smart planning, ensuring you enjoy nutritious, hassle-free meals every day.',
    image: 'static/benefit_2.svg',
    bullets: [
      {
        title: 'Smart Grocery Shopping',
        desc: 'Optimized shopping lists reduce food waste and help you buy only what you need, saving money and time.',
        icon: ShoppingCartIcon,
      },
      {
        title: 'Quick & Easy Recipes',
        desc: 'Simple, step-by-step recipes designed for busy individuals, making healthy eating more convenient.',
        icon: ClockIcon,
      },
      {
        title: 'Balanced & Nutritious Meals',
        desc: 'No more guesswork! Get well-portioned meals packed with essential nutrients to keep you energized.',
        icon: HeartIcon,
      },
    ],
  },
];
// Video
export const video = [
  {
    title: 'Eat Smart, Save Time – Meet NutriEase!',
    description:
      'Watch how NutriEase simplifies meal planning, saves you money, and keeps you healthy—all with zero hassle!',
    videoId: 'dQw4w9WgXcQ',
    thumbnail: 'static/placeholder.svg',
  },
];

export const footer = [
  {
    footerBrandName: { name: 'NutriEase', path: '/' },
    footerTeamName: { name: 'Team404', path: 'https://team404.dcglobal.co/' },
    footerTeamLogo: {
      alt: 'Team404 Logo',
      path: '/assets/logo-team.svg',
    },
    footerItems: [
      { name: 'Privacy Policy', path: '/privacy-policy' },
      { name: 'Terms of Service', path: '/terms-of-service' },
      { name: 'Contact', path: '/contact' },
    ],
  },
];

export const contact = [
  {
    section: {
      id: 'contact',
    },
    form: {
      name: {
        label: 'Name',
        placeholder: 'Enter your name',
      },
      email: {
        label: 'Email',
        placeholder: 'Enter your email',
      },
      message: {
        label: 'Message',
        placeholder: 'Enter your message',
      },
      submitButton: {
        text: 'Send Message',
        loadingText: 'Sending...',
      },
    },
  },
];
