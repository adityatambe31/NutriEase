"use client";

import React from "react";
import Link from "next/link";
import { environments } from "@/config/environments";

export default function LocalEnvironment() {
  const currentEnv =
    process.env.NEXT_PUBLIC_ENVIRONMENT?.toLowerCase() || "unknown";

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h1 className="text-2xl font-bold text-red-600 mb-4 text-center">
          Production Environment
        </h1>

        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
          <p className="text-yellow-700">
            You are currently in the{" "}
            <strong>{environments[currentEnv]?.label || currentEnv}</strong>{" "}
            environment. This application has yet not been deployed. Please
            contact
            <a
              href="mailto:daksh@dcglobal.co"
              className="text-blue-500 hover:underline ml-1"
            >
              daksh@dcglobal.co
            </a>{" "}
            for more info.
          </p>
        </div>

        <div className="space-y-4">
          <p className="text-sm text-gray-600">
            Please refresh the page or click the button below.
          </p>

          <Link
            href="/"
            className="block w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded text-center transition-colors"
          >
            Try Again
          </Link>
        </div>
      </div>
    </div>
  );
}
