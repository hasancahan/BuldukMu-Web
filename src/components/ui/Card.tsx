import React from 'react';
import { motion } from 'framer-motion';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

export function Card({ children, className = '', hover = true }: CardProps) {
  return (
    <motion.div
      whileHover={hover ? { y: -4, scale: 1.02 } : undefined}
      transition={{ duration: 0.2 }}
      className={`bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-white/20 ${className}`}
    >
      {children}
    </motion.div>
  );
}