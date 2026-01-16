"use client";
import type React from "react";
import { motion } from "framer-motion";

interface CardWrapperProps {
  children: React.ReactNode;
  className?: string;
}

export function CardWrapper({ children, className = "" }: CardWrapperProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 1 * 0.1 }}
      className={`bg-[#001866] rounded-lg p-6 border border-white ${className}`}
    >
      {children}
    </motion.div>
  );
}
