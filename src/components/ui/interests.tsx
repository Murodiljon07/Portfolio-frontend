"use client";

import { motion } from "framer-motion";
import {
  Heart,
  Music,
  Book,
  Gamepad2,
  Coffee,
  Camera,
  Plane,
  Code,
  Mic,
  Palette,
  Brain,
} from "lucide-react";

interface InterestsProps {
  interests: string[];
  className?: string;
}

const interestIcons: Record<string, any> = {
  music: Music,
  reading: Book,
  gaming: Gamepad2,
  coffee: Coffee,
  photography: Camera,
  travel: Plane,
  coding: Code,
  singing: Mic,
  art: Palette,
  default: Heart,
  ai: Brain,
};

export default function Interests({
  interests,
  className = "",
}: InterestsProps) {
  if (!interests || interests.length === 0) return null;

  const getIcon = (interest: string) => {
    const key = interest.toLowerCase();
    for (const [k, icon] of Object.entries(interestIcons)) {
      if (key.includes(k)) return icon;
    }
    return interestIcons.default;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6 }}
      className={`flex justify-center flex-wrap gap-2 mt-4 ${className}`}
    >
      {interests.map((interest, idx) => {
        const Icon = getIcon(interest);
        return (
          <motion.div
            key={idx}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6 + idx * 0.05 }}
            whileHover={{ scale: 1.05 }}
            className="group relative"
          >
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-300">
              <Icon size={12} className="text-white/60" />
              <span className="text-white/70 text-xs sm:text-sm">
                {interest}
              </span>
            </div>
          </motion.div>
        );
      })}
    </motion.div>
  );
}
