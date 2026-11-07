"use client";

import { useState, useEffect } from "react";

interface LoadingScreenProps {
  text?: string;
  dots?: boolean;
}

export function LoadingScreen({
  text = "Loading",
  dots = true,
}: LoadingScreenProps) {
  const [dotCount, setDotCount] = useState(1);

  useEffect(() => {
    if (!dots) return;

    const interval = setInterval(() => {
      setDotCount((prev) => (prev >= 3 ? 1 : prev + 1));
    }, 500);

    return () => clearInterval(interval);
  }, [dots]);

  const displayText = dots ? `${text}${".".repeat(dotCount)}` : text;

  return (
    <div
      className="fixed left-0 top-0 z-50 flex h-screen w-screen flex-col items-center justify-center bg-white/80 backdrop-blur-sm"
      key="loader"
    >
      <div className="flex flex-col items-center space-y-6 px-8 py-6">
        {/* Logo or brand icon could go here */}
        <div className="relative h-24 w-24">
          {/* Main spinner */}
          <div className="absolute h-full w-full rounded-full border-4 border-gray-200">
            <div className="animate-spin absolute h-full w-full rounded-full border-4 border-t-orange-500 border-l-red-500 border-r-orange-400 border-b-transparent"></div>
          </div>

          <div className="absolute left-1/2 top-1/2 h-16 w-16 -translate-x-1/2 -translate-y-1/2 rounded-full border-4 border-gray-100">
            <div className="animate-spin absolute h-full w-full rounded-full border-4 border-t-red-500 border-l-orange-500 border-r-transparent border-b-red-400" style={{ animationDirection: 'reverse' }}></div>
          </div>

          {/* Food icon at center */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-2xl">
            🍽️
          </div>
        </div>

        <div className="flex flex-col items-center">
          <h3 className="mb-2 text-xl font-semibold text-gray-800">
            {displayText}
          </h3>
          <p className="text-center text-sm text-gray-500">
            Preparing your nutritious experience
          </p>
        </div>

        {/* Progress bar */}
        <div className="h-1 w-48 overflow-hidden rounded-full bg-gray-200">
          <div className="h-full w-full bg-gradient-to-r from-orange-500 to-red-500" 
               style={{ animation: 'pulseWidth 1.5s ease-in-out infinite' }}></div>
        </div>
      </div>
    </div>
  );
}