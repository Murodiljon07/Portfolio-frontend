"use client";

import { motion } from "framer-motion";
import { Calendar, Cake, Gift, Sparkles } from "lucide-react";

interface AgeBirthdayProps {
  age: number;
  birthday: string | Date;
  className?: string;
}

export default function AgeBirthday({
  age,
  birthday,
  className = "",
}: AgeBirthdayProps) {
  const formatDate = (date: string | Date) => {
    const d = new Date(date);
    return d.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getZodiacSign = (date: string | Date) => {
    const d = new Date(date);
    const month = d.getMonth() + 1;
    const day = d.getDate();

    if ((month === 1 && day >= 20) || (month === 2 && day <= 18))
      return "♒ Aquarius";
    if ((month === 2 && day >= 19) || (month === 3 && day <= 20))
      return "♓ Pisces";
    if ((month === 3 && day >= 21) || (month === 4 && day <= 19))
      return "♈ Aries";
    if ((month === 4 && day >= 20) || (month === 5 && day <= 20))
      return "♉ Taurus";
    if ((month === 5 && day >= 21) || (month === 6 && day <= 20))
      return "♊ Gemini";
    if ((month === 6 && day >= 21) || (month === 7 && day <= 22))
      return "♋ Cancer";
    if ((month === 7 && day >= 23) || (month === 8 && day <= 22))
      return "♌ Leo";
    if ((month === 8 && day >= 23) || (month === 9 && day <= 22))
      return "♍ Virgo";
    if ((month === 9 && day >= 23) || (month === 10 && day <= 22))
      return "♎ Libra";
    if ((month === 10 && day >= 23) || (month === 11 && day <= 21))
      return "♏ Scorpio";
    if ((month === 11 && day >= 22) || (month === 12 && day <= 21))
      return "♐ Sagittarius";
    return "♑ Capricorn";
  };

  const getSeason = (date: string | Date) => {
    const d = new Date(date);
    const month = d.getMonth();
    if (month >= 2 && month <= 4) return "🌸 Spring";
    if (month >= 5 && month <= 7) return "☀️ Summer";
    if (month >= 8 && month <= 10) return "🍂 Autumn";
    return "❄️ Winter";
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.55 }}
      className={`flex justify-center gap-3 sm:gap-4 mt-4 flex-wrap ${className}`}
    >
      {/* Age Card */}
      <div className="group relative">
        <div className="flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/10 hover:bg-white/15 transition-all duration-300">
          <Cake size={14} className="text-pink-400" />
          <span className="text-white/80 text-xs sm:text-sm">
            <span className="font-semibold text-white">{age}</span> years old
          </span>
        </div>

        {/* Tooltip */}
        <span className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 rounded-md bg-black/80 text-white/70 text-[10px] whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
          Age
        </span>
      </div>

      {/* Birthday Card */}
      <div className="group relative">
        <div className="flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/10 hover:bg-white/15 transition-all duration-300">
          <Calendar size={14} className="text-blue-400" />
          <span className="text-white/80 text-xs sm:text-sm">
            {formatDate(birthday)}
          </span>
        </div>
        <span className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 rounded-md bg-black/80 text-white/70 text-[10px] whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
          Birthday
        </span>
      </div>

      {/* Zodiac Sign Card */}
      <div className="group relative">
        <div className="flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/10 hover:bg-white/15 transition-all duration-300">
          <Sparkles size={14} className="text-purple-400" />
          <span className="text-white/80 text-xs sm:text-sm">
            {getZodiacSign(birthday)}
          </span>
        </div>
        <span className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 rounded-md bg-black/80 text-white/70 text-[10px] whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
          Zodiac Sign
        </span>
      </div>

      {/* Season Card */}
      <div className="group relative">
        <div className="flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/10 hover:bg-white/15 transition-all duration-300">
          <Gift size={14} className="text-green-400" />
          <span className="text-white/80 text-xs sm:text-sm">
            {getSeason(birthday)}
          </span>
        </div>
        <span className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 rounded-md bg-black/80 text-white/70 text-[10px] whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
          Born in
        </span>
      </div>
    </motion.div>
  );
}
