import { ArrowRight, Shield, Lock, UserCheck } from "lucide-react";

export default function PrivacyPolicy() {
  return (
    <div className="w-full">
      {/* Hero Section with improved styling */}
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
            Data Protection
          </h1>
          <h3 className="text-2xl md:text-3xl font-semibold mb-4 text-green-300">
            Privacy Policy
          </h3>
          <p className="text-white text-lg md:text-xl opacity-90 max-w-xl mx-auto">
            At NutriEase, we prioritize your privacy and are dedicated to
            safeguarding your personal information.
          </p>
        </div>
      </div>

      {/* Content Section with enhanced styling */}
      <div className="container mx-auto max-w-4xl px-6 py-16 bg-white text-gray-800">
        {/* Summary cards at the top */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <SummaryCard
            icon={<Shield className="w-8 h-8 text-green-600" />}
            title="Secure Protection"
            description="We utilize advanced security protocols to safeguard your personal data"
          />
          <SummaryCard
            icon={<Lock className="w-8 h-8 text-green-600" />}
            title="User Control"
            description="You maintain full control over your information and privacy settings"
          />
          <SummaryCard
            icon={<UserCheck className="w-8 h-8 text-green-600" />}
            title="Clear Communication"
            description="We provide complete transparency about data collection practices"
          />
        </div>

        <div className="space-y-14">
          <PolicySection
            title="Data We Collect"
            content={
              <ul className="list-disc pl-6 space-y-3 text-gray-700">
                <li className="pl-2">
                  <strong className="text-gray-900">
                    Profile Information:
                  </strong>{" "}
                  Name, email, secure password during account creation.
                </li>
                <li className="pl-2">
                  <strong className="text-gray-900">Application Usage:</strong>{" "}
                  How you interact with NutriEase features.
                </li>
                <li className="pl-2">
                  <strong className="text-gray-900">
                    Nutritional Preferences:
                  </strong>{" "}
                  Dietary restrictions, allergies, meal preferences, and health
                  goals.
                </li>
                <li className="pl-2">
                  <strong className="text-gray-900">
                    Technical Information:
                  </strong>{" "}
                  Browser type, IP address, device information, and usage
                  patterns.
                </li>
              </ul>
            }
          />

          <PolicySection
            title="How Your Data Is Used"
            content={
              <div>
                <p className="mb-4 text-gray-700">
                  We utilize your information to deliver the following services:
                </p>
                <ul className="list-disc pl-6 space-y-3 text-gray-700">
                  <li className="pl-2">
                    Create and maintain your personalized meal planning service
                  </li>
                  <li className="pl-2">
                    Customize your nutrition and recipe recommendations
                  </li>
                  <li className="pl-2">
                    Enhance our platform&apos;s features based on user feedback
                  </li>
                  <li className="pl-2">
                    Deliver relevant updates and nutrition insights (with your
                    permission)
                  </li>
                  <li className="pl-2">
                    Address customer support inquiries and improve service
                    quality
                  </li>
                </ul>
              </div>
            }
          />

          <PolicySection
            title="Data Sharing Practices"
            content={
              <div>
                <p className="mb-4 text-gray-700">
                  Your personal information is never sold. We may share data
                  with:
                </p>
                <ul className="list-disc pl-6 space-y-3 text-gray-700">
                  <li className="pl-2">
                    <strong className="text-gray-900">Service Partners:</strong>{" "}
                    Selected third-party providers that support our platform
                    functionality
                  </li>
                  <li className="pl-2">
                    <strong className="text-gray-900">
                      Regulatory Compliance:
                    </strong>{" "}
                    When legally required or to protect our users and systems
                  </li>
                  <li className="pl-2">
                    <strong className="text-gray-900">
                      Corporate Restructuring:
                    </strong>{" "}
                    In the event of a merger, acquisition, or corporate
                    reorganization
                  </li>
                </ul>
              </div>
            }
          />

          <PolicySection
            title="Your Privacy Rights"
            content={
              <div className="bg-gray-50 p-6 rounded-lg border border-gray-100 shadow-sm">
                <p className="mb-4 text-gray-700">
                  As a NutriEase user, you have comprehensive rights regarding
                  your personal information. You can:
                </p>
                <ul className="list-disc pl-6 space-y-3 text-gray-700">
                  <li className="pl-2">
                    Review and update your profile information anytime
                  </li>
                  <li className="pl-2">
                    Request complete deletion of your account data
                  </li>
                  <li className="pl-2">
                    Control communication preferences and notifications
                  </li>
                  <li className="pl-2">
                    Restrict how we process and utilize your information
                  </li>
                </ul>
                <div className="mt-6 flex items-center">
                  <p className="text-gray-700">
                    For privacy inquiries, contact{" "}
                    <a
                      href="mailto:team404@dcglobal.co"
                      className="text-green-600 font-medium hover:underline"
                    >
                      team404@dcglobal.co
                    </a>
                    to exercise these rights.
                  </p>
                  <ArrowRight className="ml-2 w-4 h-4 text-green-600" />
                </div>
              </div>
            }
          />

          <PolicySection
            title="Security Measures"
            content={
              <p className="text-gray-700">
                We implement industry-leading security protocols and encryption
                standards to protect your personal data. While we employ
                comprehensive security measures to safeguard your information
                during transmission and storage, no digital platform can
                guarantee absolute security against all potential threats.
              </p>
            }
          />

          <div className="text-sm text-gray-500 pt-8 border-t border-gray-200">
            <p className="mb-2 font-medium">Last Updated: February 26, 2025</p>
            <p className="italic">
              This privacy policy undergoes regular updates to maintain
              compliance with evolving privacy regulations.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

interface PolicySectionProps {
  title: string;
  content: React.ReactNode;
}

function PolicySection({ title, content }: PolicySectionProps) {
  return (
    <div className="space-y-5">
      <h2 className="text-2xl md:text-3xl font-bold text-gray-900 pb-2 border-b border-gray-200">
        {title}
      </h2>
      <div className="text-gray-700 leading-relaxed">{content}</div>
    </div>
  );
}

interface SummaryCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

function SummaryCard({ icon, title, description }: SummaryCardProps) {
  return (
    <div className="bg-gray-50 p-6 rounded-lg border border-gray-100 transition-all duration-300 hover:shadow-md">
      <div className="flex flex-col items-center text-center">
        <div className="mb-4 p-3 bg-green-50 rounded-full">{icon}</div>
        <h3 className="text-lg font-bold text-gray-900 mb-2">{title}</h3>
        <p className="text-gray-600 text-sm">{description}</p>
      </div>
    </div>
  );
}
