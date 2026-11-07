import { ArrowRight, FileText, Scale, AlertCircle } from "lucide-react";

export default function TermsOfService() {
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
            User Agreement
          </h1>
          <h3 className="text-2xl md:text-3xl font-semibold mb-4 text-green-300">
            Terms of Service
          </h3>
          <p className="text-white text-lg md:text-xl opacity-90 max-w-xl mx-auto">
            Please read these terms carefully before using NutriEase&apos;s meal
            planning services.
          </p>
        </div>
      </div>

      {/* Content Section with enhanced styling */}
      <div className="container mx-auto max-w-4xl px-6 py-16 bg-white text-gray-800">
        {/* Summary cards at the top */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <SummaryCard
            icon={<FileText className="w-8 h-8 text-green-600" />}
            title="Service Agreement"
            description="Terms that govern your use of the NutriEase platform"
          />
          <SummaryCard
            icon={<Scale className="w-8 h-8 text-green-600" />}
            title="User Responsibilities"
            description="Your rights and obligations when using our services"
          />
          <SummaryCard
            icon={<AlertCircle className="w-8 h-8 text-green-600" />}
            title="Important Notices"
            description="Key disclaimers and limitations regarding our platform"
          />
        </div>

        <div className="space-y-14">
          <PolicySection
            title="Acceptance of Terms"
            content={
              <div>
                <p className="mb-4 text-gray-700">
                  By accessing or using NutriEase, you agree to be bound by
                  these Terms of Service (&quot;Terms&quot;). If you disagree
                  with any part of the terms, you may not access the service.
                </p>
                <p className="text-gray-700">
                  These Terms apply to all visitors, users, and others who wish
                  to access or use NutriEase. By accessing or using the Service,
                  you agree to be bound by these Terms. If you disagree with any
                  part of the terms, you may not access the Service.
                </p>
              </div>
            }
          />

          <PolicySection
            title="Description of Service"
            content={
              <div>
                <p className="mb-4 text-gray-700">
                  NutriEase provides a platform for personalized meal planning,
                  including:
                </p>
                <ul className="list-disc pl-6 space-y-3 text-gray-700">
                  <li className="pl-2">
                    7-day meal planning based on user preferences and dietary
                    needs
                  </li>
                  <li className="pl-2">
                    Recipe suggestions and nutritional information
                  </li>
                  <li className="pl-2">
                    Cost estimates for meals and shopping lists
                  </li>
                  <li className="pl-2">
                    Recommendations based on available ingredients
                  </li>
                  <li className="pl-2">
                    User accounts to save preferences and meal history
                  </li>
                </ul>
              </div>
            }
          />

          <PolicySection
            title="User Accounts"
            content={
              <div>
                <p className="mb-4 text-gray-700">
                  When creating an account with NutriEase, you agree to the
                  following:
                </p>
                <ul className="list-disc pl-6 space-y-3 text-gray-700">
                  <li className="pl-2">
                    <strong className="text-gray-900">Account Security:</strong>{" "}
                    You are responsible for safeguarding the password used to
                    access the Service and for any activities occurring under
                    your account.
                  </li>
                  <li className="pl-2">
                    <strong className="text-gray-900">
                      Accurate Information:
                    </strong>{" "}
                    You must provide accurate, current, and complete information
                    during registration and maintain this information.
                  </li>
                  <li className="pl-2">
                    <strong className="text-gray-900">
                      Account Termination:
                    </strong>{" "}
                    We reserve the right to suspend or terminate your account if
                    any information provided is inaccurate, false, or violates
                    our Terms.
                  </li>
                  <li className="pl-2">
                    <strong className="text-gray-900">
                      One Account Per User:
                    </strong>{" "}
                    Each user may maintain only one active account.
                  </li>
                </ul>
              </div>
            }
          />

          <PolicySection
            title="User Content"
            content={
              <div>
                <p className="mb-4 text-gray-700">
                  When you create, upload, or share content through NutriEase:
                </p>
                <ul className="list-disc pl-6 space-y-3 text-gray-700">
                  <li className="pl-2">
                    You retain all rights to your content, but grant us a
                    license to use, reproduce, and display it to provide our
                    services.
                  </li>
                  <li className="pl-2">
                    You are responsible for ensuring your content doesn&apos;t
                    violate any third-party rights.
                  </li>
                  <li className="pl-2">
                    We reserve the right to remove any content that violates
                    these Terms or that we find objectionable.
                  </li>
                </ul>
              </div>
            }
          />

          <PolicySection
            title="Intellectual Property"
            content={
              <div className="bg-gray-50 p-6 rounded-lg border border-gray-100 shadow-sm">
                <p className="mb-4 text-gray-700">
                  NutriEase and its content, features, and functionality are
                  owned by us and protected by copyright, trademark, and other
                  intellectual property laws.
                </p>
                <ul className="list-disc pl-6 space-y-3 text-gray-700">
                  <li className="pl-2">
                    Our trademarks and trade dress may not be used without our
                    prior written permission.
                  </li>
                  <li className="pl-2">
                    You may not duplicate, copy, or reuse any portion of our
                    HTML/CSS, JavaScript, visual design elements, or concepts
                    without express written permission.
                  </li>
                  <li className="pl-2">
                    All recipes and meal plans generated are for personal use
                    only and may not be commercially redistributed.
                  </li>
                </ul>
              </div>
            }
          />

          <PolicySection
            title="Payment Terms"
            content={
              <div>
                <p className="mb-4 text-gray-700">
                  NutriEase offers both free and premium subscription options:
                </p>
                <ul className="list-disc pl-6 space-y-3 text-gray-700">
                  <li className="pl-2">
                    <strong className="text-gray-900">
                      Subscription Fees:
                    </strong>{" "}
                    Premium features require payment of subscription fees
                    clearly indicated before purchase.
                  </li>
                  <li className="pl-2">
                    <strong className="text-gray-900">
                      Automatic Renewal:
                    </strong>{" "}
                    Subscriptions automatically renew unless canceled at least
                    24 hours before the current period ends.
                  </li>
                  <li className="pl-2">
                    <strong className="text-gray-900">Refund Policy:</strong>{" "}
                    Refunds are processed according to our Refund Policy,
                    available on request.
                  </li>
                  <li className="pl-2">
                    <strong className="text-gray-900">Price Changes:</strong> We
                    may modify subscription fees with advance notice. Changes
                    will apply at the next billing cycle.
                  </li>
                </ul>
                <div className="mt-6 flex items-center">
                  <p className="text-gray-700">
                    For billing inquiries, contact{" "}
                    <a
                      href="mailto:team404@dcglobal.co"
                      className="text-green-600 font-medium hover:underline"
                    >
                      team404@dcglobal.co
                    </a>
                  </p>
                  <ArrowRight className="ml-2 w-4 h-4 text-green-600" />
                </div>
              </div>
            }
          />

          <PolicySection
            title="Disclaimers"
            content={
              <div>
                <p className="mb-4 text-gray-700">
                  While we strive for accuracy, please note the following
                  important disclaimers:
                </p>
                <ul className="list-disc pl-6 space-y-3 text-gray-700">
                  <li className="pl-2">
                    <strong className="text-gray-900">
                      Nutritional Information:
                    </strong>{" "}
                    We provide approximate nutritional data that should not
                    replace professional medical advice.
                  </li>
                  <li className="pl-2">
                    <strong className="text-gray-900">Price Estimates:</strong>{" "}
                    Cost estimates are approximations and may vary by location
                    and retailer.
                  </li>
                  <li className="pl-2">
                    <strong className="text-gray-900">Medical Advice:</strong>{" "}
                    Our service does not provide medical or dietary advice.
                    Consult healthcare professionals for specific dietary needs.
                  </li>
                  <li className="pl-2">
                    <strong className="text-gray-900">Availability:</strong> We
                    do not guarantee uninterrupted or error-free service.
                  </li>
                </ul>
              </div>
            }
          />

          <PolicySection
            title="Limitation of Liability"
            content={
              <p className="text-gray-700">
                In no event shall NutriEase, its directors, employees, partners,
                agents, suppliers, or affiliates be liable for any indirect,
                incidental, special, consequential, or punitive damages,
                including loss of profits, data, or other intangible losses,
                resulting from your access to or use of or inability to access
                or use the Service. We are not liable for any actions you take
                based on meal plans or nutritional information provided through
                our platform. Your use of the service is at your sole risk.
              </p>
            }
          />

          <PolicySection
            title="Termination"
            content={
              <div>
                <p className="mb-4 text-gray-700">
                  We may terminate or suspend your account and access to the
                  Service immediately, without prior notice or liability, for
                  any reason, including:
                </p>
                <ul className="list-disc pl-6 space-y-3 text-gray-700">
                  <li className="pl-2">Breaching the Terms</li>
                  <li className="pl-2">Providing false information</li>
                  <li className="pl-2">Engaging in fraudulent activity</li>
                  <li className="pl-2">
                    Using the service for unauthorized commercial purposes
                  </li>
                </ul>
                <p className="mt-4 text-gray-700">
                  Upon termination, your right to use the Service will cease
                  immediately.
                </p>
              </div>
            }
          />

          <PolicySection
            title="Governing Law"
            content={
              <p className="text-gray-700">
                These Terms shall be governed by and construed in accordance
                with the laws of the United States, without regard to its
                conflict of law provisions. Any disputes relating to these Terms
                shall be subject to the exclusive jurisdiction of the courts
                located within the United States.
              </p>
            }
          />

          <PolicySection
            title="Changes to Terms"
            content={
              <p className="text-gray-700">
                We reserve the right to modify or replace these Terms at any
                time. If a revision is material, we will provide at least 30
                days&apos; notice prior to any new terms taking effect. What
                constitutes a material change will be determined at our sole
                discretion. By continuing to access or use our Service after any
                revisions become effective, you agree to be bound by the revised
                terms.
              </p>
            }
          />

          <div className="text-sm text-gray-500 pt-8 border-t border-gray-200">
            <p className="mb-2 font-medium">Last Updated: February 26, 2025</p>
            <p className="italic">
              By using NutriEase, you acknowledge that you have read these Terms
              of Service, understood them, and agree to be bound by them.
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
