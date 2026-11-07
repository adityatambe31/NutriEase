'use client';

import { motion } from 'framer-motion';
import { IoRestaurant } from 'react-icons/io5';

export default function ChefLoadingAnimation() {
  return (
    <div className="p-6 bg-white/10 backdrop-blur-md rounded-xl border border-white/20 text-white">
      <div className="flex flex-col items-center">
        <div className="relative w-20 h-20 mb-4">
          {/* Animated cooking pot */}
          <motion.div
            className="absolute inset-0 w-full h-full rounded-full bg-gradient-to-br from-blue-500 to-blue-600"
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.8, 1, 0.8]
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          
          {/* Animated steam */}
          <div className="absolute top-1 left-1/2 transform -translate-x-1/2 -translate-y-full">
            <motion.div
              className="w-1.5 h-3 bg-white/60 rounded-full mb-1"
              animate={{
                y: [0, -8, -4],
                opacity: [0, 1, 0]
              }}
              transition={{
                duration: 1.2,
                repeat: Infinity,
                ease: "easeOut",
                delay: 0.2
              }}
            />
            <motion.div
              className="w-1.5 h-3 bg-white/60 rounded-full ml-2"
              animate={{
                y: [0, -10, -5],
                opacity: [0, 1, 0]
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeOut"
              }}
            />
            <motion.div
              className="w-1.5 h-3 bg-white/60 rounded-full ml-4"
              animate={{
                y: [0, -8, -4],
                opacity: [0, 1, 0]
              }}
              transition={{
                duration: 1.8,
                repeat: Infinity,
                ease: "easeOut",
                delay: 0.4
              }}
            />
          </div>
          
          {/* Chef hat icon */}
          <div className="absolute inset-0 flex items-center justify-center text-white text-2xl">
            <IoRestaurant />
          </div>
        </div>
        
        <h3 className="text-lg font-medium text-white mb-2">Chef is preparing your dish</h3>
        <div className="flex gap-1.5">
          <motion.div
            className="h-2 w-2 rounded-full bg-blue-400"
            animate={{ scale: [1, 1.3, 1] }}
            transition={{ duration: 0.6, repeat: Infinity, repeatDelay: 0.2 }}
          />
          <motion.div
            className="h-2 w-2 rounded-full bg-blue-400"
            animate={{ scale: [1, 1.3, 1] }}
            transition={{ duration: 0.6, repeat: Infinity, repeatDelay: 0.2, delay: 0.2 }}
          />
          <motion.div
            className="h-2 w-2 rounded-full bg-blue-400"
            animate={{ scale: [1, 1.3, 1] }}
            transition={{ duration: 0.6, repeat: Infinity, repeatDelay: 0.2, delay: 0.4 }}
          />
        </div>
      </div>
    </div>
  );
}