import Image from "next/image";
import Link from "next/link";
import {
  Salad,
  Heart,
  Leaf,
  Receipt,
  BarChart,
  Target,
  LucideAward,
  Users,
  GraduationCap,
} from "lucide-react";

export default function About() {
  return (
    <div className="w-full">
      {/* Hero Section */}
      <div className="relative w-full h-[45vh] flex items-center justify-center text-white">
        <div
          className="absolute inset-0 bg-cover bg-center bg-fixed"
          style={{
            backgroundImage: "url(/LandingBG.jpg)",
            filter: "brightness(0.8)",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-black/50"></div>
        </div>
        <div className="relative z-10 text-center max-w-3xl px-6">
          <h1 className="text-4xl md:text-5xl font-bold mb-3 tracking-tight">
            About NutriEase
          </h1>
          <h3 className="text-2xl md:text-3xl font-semibold mb-4 text-green-300">
            Smart Bites, Better Lives
          </h3>
          <p className="text-white text-lg md:text-xl opacity-90 max-w-xl mx-auto">
            We&apos;re on a mission to make healthy eating accessible, affordable,
            and sustainable for everyone.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto max-w-5xl px-6 py-16 bg-white text-gray-800">
        {/* Problem Statement */}
        <section className="mb-20">
          <div className="flex flex-col md:flex-row gap-10 items-center">
            <div className="md:w-1/2">
              <h2 className="text-3xl font-bold text-gray-900 mb-5">
                The Problem We&apos;re Solving
              </h2>
              <p className="text-gray-700 mb-4 leading-relaxed">
                Many individuals struggle with planning their meals due to time
                constraints, dietary restrictions, and budget considerations.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Our platform aims to simplify meal planning by offering
                personalized 7-day meal plans that are healthy, budget-friendly,
                and nutritious.
              </p>
            </div>
            <div className="md:w-1/2">
              <div className="rounded-lg overflow-hidden shadow-lg">
                <Image
                  src="/static/about-meal-struggle.jpeg"
                  alt="Person struggling with meal planning"
                  width={600}
                  height={400}
                  className="w-full object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Why We Chose This Problem */}
        <section className="bg-gray-50 p-8 rounded-xl mb-20">
          <h2 className="text-2xl font-bold text-gray-900 mb-5">
            Why We Chose This Problem
          </h2>
          <p className="text-gray-700 mb-4">
            Effective meal planning is essential for maintaining a healthy
            lifestyle. However, existing solutions often lack customization and
            accurate cost estimates.
          </p>
          <p className="text-gray-700">
            Our platform addresses these gaps by providing tailored meal plans
            that consider individual user preferences and constraints.
          </p>
        </section>

        {/* Our Approach */}
        <section className="mb-20">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            Our Approach
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-10">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <Target className="text-green-600 mr-2 h-5 w-5" />
                User Input Collection
              </h3>
              <p className="text-gray-700 mb-3">
                We developed a web-based Meal Planner that collects user inputs
                such as:
              </p>
              <ul className="list-disc pl-5 space-y-2 text-gray-700">
                <li>Weight goals</li>
                <li>Activity levels</li>
                <li>
                  Dietary restrictions (allergies, vegetarian, vegan, etc.)
                </li>
                <li>Cultural preferences</li>
                <li>Age</li>
                <li>Height</li>
              </ul>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <BarChart className="text-green-600 mr-2 h-5 w-5" />
                Meal Plan Generation
              </h3>
              <p className="text-gray-700 mb-3">
                Using this information, our platform generates a 7-day meal plan
                that includes:
              </p>
              <ul className="list-disc pl-5 space-y-2 text-gray-700">
                <li>Cost per serving estimates</li>
                <li>List of required ingredients with quantities</li>
                <li>Approximate pricing per serving</li>
                <li>Nutritional breakdown</li>
              </ul>
            </div>
          </div>

          <div className="bg-green-50 p-6 rounded-lg border border-green-100">
            <div className="flex items-start">
              <Leaf className="text-green-600 mr-4 mt-1 h-6 w-6 flex-shrink-0" />
              <p className="text-gray-700">
                Additionally, users can input available ingredients from their
                pantry or refrigerator, allowing the AI model to suggest meals
                that utilize these items, promoting cost savings and reducing
                food waste.
              </p>
            </div>
          </div>
        </section>

        {/* Technical Stack */}
        <section className="mb-20">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            Technical Stack
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <TechStackCard title="Frontend" tech="Next.js, Tailwind CSS" />
            <TechStackCard title="Backend" tech="Firebase → MongoDB" />
            <TechStackCard title="AI Models" tech="Gemini AI, OpenAI" />
            <TechStackCard title="Security" tech="Cloudflare, Azure Security" />
          </div>
        </section>

        {/* API Documentation */}
        <section className="mb-20">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">
            API Documentation
          </h2>

          <div className="space-y-4">
            <ApiDocItem
              title="User Authentication"
              description="Secure login via Firebase Authentication"
            />
            <ApiDocItem
              title="Meal Plan Generation"
              description="AI-powered API generating personalized 7-day meal plans"
            />
            <ApiDocItem
              title="Ingredient Pricing API"
              description="Fetches estimated ingredient prices from a database"
            />
            <ApiDocItem
              title="Nutritional Information API"
              description="Provides detailed nutritional breakdown per meal"
            />
          </div>
        </section>

        {/* Usage Guide */}
        <section className="mb-20">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Usage Guide</h2>

          <div className="relative">
            <div className="absolute h-full w-0.5 bg-green-200 left-3.5 top-0 z-0"></div>
            <div className="space-y-8 relative z-10">
              <UsageStep
                number="1"
                title="Home Page"
                description="Users land on the homepage."
              />
              <UsageStep
                number="2"
                title="User Authentication"
                description="Users create an account or log in via Firebase Authentication."
              />
              <UsageStep
                number="3"
                title="Form Submission"
                description="Users fill out a form with personal dietary details."
              />
              <UsageStep
                number="4"
                title="Meal Plan Generation"
                description="A customized 7-day meal plan is generated based on the provided details."
              />
              <UsageStep
                number="5"
                title="Review & Adjustments"
                description="Users can review the meal plan and adjust preferences if needed."
              />
              <UsageStep
                number="6"
                title="Ingredient & Cost Breakdown"
                description="The platform provides a breakdown of required ingredients, their quantities, and estimated pricing."
              />
            </div>
          </div>
        </section>

        {/* Security Considerations */}
        <section className="mb-20 bg-gray-50 p-8 rounded-xl">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Security Considerations
          </h2>

          <div className="space-y-4">
            <SecurityItem
              title="Cloudflare"
              description="Protects against DDoS attacks and enhances website performance."
            />
            <SecurityItem
              title="Azure Security Services"
              description="Monitors and secures user data to prevent breaches."
            />
            <SecurityItem
              title="Secure API Calls"
              description="Data encryption to prevent unauthorized access."
            />
          </div>
        </section>

        {/* Achievements */}
        <section className="mb-20">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Achievements
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
              <div className="flex items-start">
                <div className="mr-4 p-3 bg-blue-50 rounded-full">
                  <GraduationCap className="h-8 w-8 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    Microsoft Startup Recognition
                  </h3>
                  <p className="text-gray-700">
                    Our project has been recognized by Microsoft&apos;s startup
                    program, providing us with resources and support to enhance
                    our platform.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
              <div className="flex items-start">
                <div className="mr-4 p-3 bg-green-50 rounded-full">
                  <LucideAward className="h-8 w-8 text-green-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    Funding
                  </h3>
                  <p className="text-gray-700">
                    We have secured funding from Microsoft to further develop
                    and scale our solution.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SDG Alignment */}
        <section className="mb-20">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            Alignment with Sustainable Development Goals (SDGs)
          </h2>

          <div className="space-y-6">
            <SdgItem
              number="2"
              title="Zero Hunger"
              description="By providing personalized meal plans that consider nutritional needs and budget constraints, we aim to improve food security and promote sustainable agriculture."
            />
            <SdgItem
              number="3"
              title="Good Health and Well-being"
              description="Our platform encourages healthy eating habits, contributing to overall well-being and the prevention of diet-related diseases."
            />
            <SdgItem
              number="12"
              title="Responsible Consumption and Production"
              description="By suggesting meals based on available ingredients, we help reduce food waste and promote efficient use of resources."
            />
          </div>
        </section>

        {/* Future Improvements */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            Future Improvements
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FutureItem
              icon={<Receipt />}
              title="Real-time Ingredient Price Tracking"
              description="Integrate with grocery stores to provide up-to-date pricing."
            />
            <FutureItem
              icon={<Heart />}
              title="Fitness App Integration"
              description="Sync with fitness applications for a holistic health approach."
            />
            <FutureItem
              icon={<Salad />}
              title="AI-based Recipe Suggestions"
              description="Offer recipes based on user preferences and available ingredients."
            />
            <FutureItem
              icon={<Users />}
              title="Community Features"
              description="Enable users to share meal plans and recipes for enhanced engagement."
            />
          </div>
        </section>

        {/* Call to Action */}
        <div className="text-center mt-16 p-8 bg-green-50 rounded-xl">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Join the NutriEase Community
          </h2>
          <p className="text-gray-700 mb-6 max-w-2xl mx-auto">
            Be part of our journey to revolutionize meal planning and contribute
            to a healthier, more sustainable future.
          </p>
          <Link
            href="/signup"
            className="inline-block bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-8 rounded-lg transition duration-200"
          >
            Start Your Free Trial
          </Link>
        </div>
      </div>
    </div>
  );
}

function TechStackCard({ title, tech }: { title: string; tech: string }) {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md border border-gray-100 text-center">
      <h3 className="text-gray-900 font-semibold mb-2">{title}</h3>
      <p className="text-gray-600 text-sm">{tech}</p>
    </div>
  );
}

function ApiDocItem({ title, description }: { title: string; description: string }) {
  return (
    <div className="flex items-start p-4 bg-white rounded-lg shadow-sm border border-gray-100">
      <div className="mr-4 p-2 bg-gray-50 rounded-full">
        <div className="h-2 w-2 rounded-full bg-green-500"></div>
      </div>
      <div>
        <h3 className="font-medium text-gray-900 mb-1">{title}</h3>
        <p className="text-gray-600 text-sm">{description}</p>
      </div>
    </div>
  );
}

function UsageStep({ number, title, description }: { number: string; title: string; description: string }) {
  return (
    <div className="flex items-start">
      <div className="mr-5 flex-shrink-0">
        <div className="flex items-center justify-center w-7 h-7 bg-green-500 text-white rounded-full font-bold text-sm">
          {number}
        </div>
      </div>
      <div>
        <h3 className="font-medium text-gray-900 mb-1">{title}</h3>
        <p className="text-gray-600">{description}</p>
      </div>
    </div>
  );
}

function SecurityItem({ title, description }: { title: string; description: string }) {
  return (
    <div className="flex items-start">
      <div className="mr-3 mt-1 text-green-600">
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path
            fillRule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
            clipRule="evenodd"
          />
        </svg>
      </div>
      <div>
        <h3 className="font-medium text-gray-900 mb-1">{title}</h3>
        <p className="text-gray-600 text-sm">{description}</p>
      </div>
    </div>
  );
}

function SdgItem({ number, title, description }: { number: string; title: string; description: string }) {
  return (
    <div className="flex items-start">
      <div className="mr-4 flex-shrink-0">
        <div className="flex items-center justify-center w-10 h-10 bg-green-100 text-green-800 rounded-full font-bold text-lg border-2 border-green-200">
          {number}
        </div>
      </div>
      <div>
        <h3 className="font-semibold text-gray-900 mb-2">
          Goal {number}: {title}
        </h3>
        <p className="text-gray-700">{description}</p>
      </div>
    </div>
  );
}

function FutureItem({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
      <div className="flex items-center mb-3">
        <div className="mr-3 text-green-600">{icon}</div>
        <h3 className="font-semibold text-gray-900">{title}</h3>
      </div>
      <p className="text-gray-600 text-sm">{description}</p>
    </div>
  );
}
