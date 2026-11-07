'use client';

import { useServices } from '@/app/services/hooks/use-service';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function ServicesPage() {
  const { services, serviceDetails } = useServices();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Our Services
            </h1>
            <p className="text-xl text-gray-600">
              Discover our comprehensive suite of tools designed to make your
              healthy eating journey easier and more enjoyable.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <motion.div
                  key={service.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-xl shadow-lg overflow-hidden"
                >
                  <div className="relative h-48">
                    <div
                      className={`absolute inset-0 ${service.color} opacity-90`}
                    />
                    <div className="relative z-10 h-full flex items-center justify-center text-white p-6">
                      <div className="text-center">
                        <Icon className="w-12 h-12 mx-auto mb-4" />
                        <h3 className="text-2xl font-bold mb-2">
                          {service.title}
                        </h3>
                        <p className="text-white/90">{service.description}</p>
                      </div>
                    </div>
                  </div>

                  <div className="p-6">
                    <ul className="space-y-3 mb-6">
                      {service.features.map((feature) => (
                        <li
                          key={feature}
                          className="flex items-center text-gray-700"
                        >
                          <svg
                            className="w-4 h-4 mr-2 text-green-500"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                          {feature}
                        </li>
                      ))}
                    </ul>

                    <Link
                      href={service.path}
                      className={`inline-flex items-center px-4 py-2 rounded-lg ${service.color} 
                        text-white hover:opacity-90 transition-opacity`}
                    >
                      Learn More
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </Link>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Detailed Service Explanations */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-16">
            Understanding Our Services
          </h2>

          {serviceDetails.map((detail, index) => (
            <motion.div
              key={detail.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              className={`flex flex-col ${
                index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
              } gap-8 mb-20 items-center`}
            >
              <div className="md:w-1/2">
                <div className="relative h-[300px] rounded-xl overflow-hidden shadow-lg">
                  <Image
                    src={detail.image}
                    alt={detail.title}
                    fill
                    className="object-cover"
                  />
                </div>
              </div>

              <div className="md:w-1/2">
                <h3 className="text-2xl font-bold mb-4 text-gray-900">
                  {detail.title}
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  {detail.content}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">
            Ready to Start Your Journey?
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Join thousands of users who have transformed their eating habits
            with our comprehensive tools.
          </p>
          <Link
            href="/auth/signup"
            className="inline-flex items-center px-6 py-3 rounded-lg bg-green-600 
              text-white hover:bg-green-700 transition-colors"
          >
            Get Started Now
            <ArrowRight className="ml-2 w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  );
}
