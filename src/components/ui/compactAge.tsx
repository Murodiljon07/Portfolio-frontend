"use client";

import { motion } from "framer-motion";
import { Calendar, Cake } from "lucide-react";

interface CompactAgeProps {
  age: number;
  birthday: string | Date;
}

export default function CompactAge({ age, birthday }: CompactAgeProps) {
  const formatDate = (date: string | Date) => {
    const d = new Date(date);
    return d.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.55 }}
      className="flex justify-center gap-3 mt-4"
    >
      <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 backdrop-blur-sm border border-white/10">
        <Cake size={12} className="text-pink-400" />
        <span className="text-white/80 text-xs">{age} years</span>
      </div>
      <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 backdrop-blur-sm border border-white/10">
        <Calendar size={12} className="text-blue-400" />
        <span className="text-white/80 text-xs">{formatDate(birthday)}</span>
      </div>
    </motion.div>
  );
}
