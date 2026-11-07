"use client";

import React from "react";
import Link from "next/link";

export default function LocalEnvironment() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h1 className="text-2xl font-bold text-red-600 mb-4 text-center">
          Staging Environment Unavailable
        </h1>
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
          <p className="text-yellow-700">
            The staging environment is currently <strong>unavailable</strong>.
            Please try again later or contact
            <a
              href="mailto:daksh@dcglobal.co"
              className="text-blue-500 hover:underline ml-1"
            >
              team404@dcglobal.co
            </a>{" "}
            for further assistance.
          </p>
        </div>

        <div className="space-y-4">
          <p className="text-sm text-gray-600">
            You can refresh the page or click the button below to retry.
          </p>

          <Link
            href="https://nutriease.dcglobal.co/"
            className="block w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded text-center transition-colors"
          >
            Home (Production)
          </Link>
        </div>
      </div>
    </div>
  );
}
