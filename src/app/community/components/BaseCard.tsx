'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface BaseCardProps {
  children: ReactNode;
  featured?: boolean;
  className?: string;
}

export function BaseCard({
  children,
  featured,
  className = '',
}: BaseCardProps) {
  return (
    <motion.div
      whileHover={{ y: -4, scale: 1.01 }}
      className={`
        relative h-full flex flex-col
        bg-gradient-to-br from-white to-white
        backdrop-blur-lg rounded-2xl p-6
        border border-white/10 hover:border-white/20
        shadow-xl shadow-black/5
        transition-all duration-300
        ${featured ? 'ring-2 ring-green-500/50' : ''}
        ${className}
      `}
    >
      {children}
    </motion.div>
  );
}
