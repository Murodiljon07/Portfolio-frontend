"use client";

import profil from "@/api/services/portfolio.service";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronRight,
  ChevronDown,
  Grid3x3,
  AppWindow,
  Folder,
} from "lucide-react";

interface Skill {
  _id?: string;
  name: string;
  logo: string;
  proficiency: number;
  category: string;
}

// Mock data with categories

export default function SkillsPage() {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(
    new Set(),
  );
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const data = await profil.skills();

        setSkills(data.data);
        const categories = [...new Set(skills.map((s) => s.category))];
        setExpandedCategories(new Set(categories));
      } catch (error) {}
    };

    fetchSkills();
  }, []);

  // Group skills by category
  const groupedSkills = skills.reduce(
    (acc, skill) => {
      if (!acc[skill.category]) {
        acc[skill.category] = [];
      }
      acc[skill.category].push(skill);
      return acc;
    },
    {} as Record<string, Skill[]>,
  );

  const categories = Object.keys(groupedSkills);

  const toggleCategory = (category: string) => {
    const newExpanded = new Set(expandedCategories);
    if (newExpanded.has(category)) {
      newExpanded.delete(category);
    } else {
      newExpanded.add(category);
    }
    setExpandedCategories(newExpanded);
  };

  const getProficiencyColor = (level: number) => {
    if (level >= 85) return "bg-emerald-500/70";
    if (level >= 70) return "bg-blue-500/70";
    if (level >= 50) return "bg-yellow-500/70";
    return "bg-gray-500/70";
  };

  const getProficiencyText = (level: number) => {
    if (level >= 85) return "Expert";
    if (level >= 70) return "Advanced";
    if (level >= 50) return "Intermediate";
    return "Beginner";
  };

  return (
    <section className="h-full flex flex-col px-4 sm:px-6 py-4 sm:py-8 overflow-hidden">
      <div className="max-w-6xl w-full mx-auto flex-1 flex flex-col min-h-0">
        {/* macOS Style Header - Compact */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-4 sm:mb-6 flex-shrink-0"
        >
          {/* Window Title Bar Style */}
          <div className="flex items-center justify-between mb-3 sm:mb-4">
            <span className="text-[10px] sm:text-xs text-white/40 font-medium">
              Skills.app
            </span>
            <div className="w-12" />
          </div>

          {/* Title - Smaller on mobile */}
          <div className="text-center">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-white/90 tracking-tight">
              Technical Skills
            </h1>
            <p className="text-white/40 text-xs sm:text-sm mt-0.5 sm:mt-1">
              {skills.length} technologies • {categories.length} categories
            </p>
          </div>
        </motion.div>

        {/* Category Pills - Scrollable on mobile */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex gap-1.5 sm:gap-2 mb-4 sm:mb-6 overflow-x-auto pb-2 flex-shrink-0 scrollbar-thin"
        >
          <button
            onClick={() => setSelectedCategory(null)}
            className={`px-2.5 sm:px-4 py-1 sm:py-1.5 rounded-full text-xs sm:text-sm font-medium transition-all duration-200 flex-shrink-0 whitespace-nowrap
              ${
                selectedCategory === null
                  ? "bg-white/20 text-white"
                  : "bg-white/5 text-white/60 hover:bg-white/10"
              }`}
          >
            All
          </button>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() =>
                setSelectedCategory(selectedCategory === cat ? null : cat)
              }
              className={`px-2.5 sm:px-4 py-1 sm:py-1.5 rounded-full text-xs sm:text-sm font-medium transition-all duration-200 flex-shrink-0 whitespace-nowrap
                ${
                  selectedCategory === cat
                    ? "bg-white/20 text-white"
                    : "bg-white/5 text-white/60 hover:bg-white/10"
                }`}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* Scrollable Skills Grid */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden pr-1 custom-scrollbar">
          <div className="space-y-3 sm:space-y-4">
            {categories
              .filter((cat) => !selectedCategory || selectedCategory === cat)
              .map((category, catIndex) => {
                const categorySkills = groupedSkills[category];
                const isExpanded = expandedCategories.has(category);
                const hasManySkills = categorySkills.length > 3;

                return (
                  <motion.div
                    key={category}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: catIndex * 0.05 }}
                    className="group"
                  >
                    {/* macOS Folder Style Header - Compact */}
                    <button
                      onClick={() => toggleCategory(category)}
                      className="w-full flex items-center gap-1.5 sm:gap-2 mb-2 sm:mb-3 group/category"
                    >
                      <div className="p-0.5 sm:p-1 rounded-lg bg-white/5 group-hover/category:bg-white/10 transition">
                        {isExpanded ? (
                          <ChevronDown size={14} className="text-white/60" />
                        ) : (
                          <ChevronRight size={14} className="text-white/60" />
                        )}
                      </div>
                      <div className="flex items-center gap-1.5 sm:gap-2">
                        <Folder size={14} className="text-white/50" />
                        <span className="text-white/80 font-medium text-sm sm:text-base">
                          {category}
                        </span>
                        <span className="text-white/30 text-xs">
                          {categorySkills.length}
                        </span>
                      </div>
                      {hasManySkills && !isExpanded && (
                        <span className="text-white/30 text-[10px] sm:text-xs ml-auto">
                          {categorySkills.length} items
                        </span>
                      )}
                    </button>

                    {/* Skills Grid - Smaller Cards */}
                    <AnimatePresence mode="wait">
                      {isExpanded && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.2 }}
                          className="overflow-hidden"
                        >
                          <div className="grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-2 sm:gap-3 pb-3 sm:pb-4">
                            {categorySkills.map((skill, idx) => (
                              <motion.div
                                key={skill.name}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: idx * 0.03 }}
                                whileHover={{ y: -2, scale: 1.02 }}
                                className="group/skill"
                              >
                                {/* Compact Skill Card */}
                                <div className="relative">
                                  <div className="absolute -inset-0.5 bg-white/0 rounded-xl group-hover/skill:bg-white/5 transition duration-300 blur-sm" />

                                  <div className="relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-2 sm:p-3 text-center transition-all duration-200 group-hover/skill:border-white/20">
                                    {/* App Icon - Smaller */}
                                    <div className="text-2xl sm:text-3xl mb-1 sm:mb-1.5">
                                      {skill.logo}
                                    </div>

                                    {/* App Name - Smaller */}
                                    <div className="text-white/80 font-medium text-xs sm:text-sm truncate">
                                      {skill.name}
                                    </div>

                                    {/* Proficiency - Compact */}
                                    <div className="mt-1.5 sm:mt-2 flex items-center justify-center gap-1">
                                      <div className="w-10 sm:w-12 h-0.5 sm:h-1 rounded-full bg-white/10 overflow-hidden">
                                        <div
                                          className={`h-full rounded-full ${getProficiencyColor(skill.proficiency)}`}
                                          style={{
                                            width: `${skill.proficiency}%`,
                                          }}
                                        />
                                      </div>
                                      <span className="text-white/40 text-[8px] sm:text-[10px] font-mono">
                                        {skill.proficiency}%
                                      </span>
                                    </div>

                                    {/* Level Badge - Smaller */}
                                    <div className="mt-1 sm:mt-1.5 hidden sm:block">
                                      <span
                                        className={`text-[7px] sm:text-[9px] px-1 sm:px-1.5 py-0.5 rounded-full ${getProficiencyColor(skill.proficiency)}/20 text-white/50`}
                                      >
                                        {getProficiencyText(skill.proficiency)}
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              </motion.div>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })}
          </div>
        </div>

        {/* macOS Style Footer - Compact */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="flex-shrink-0 mt-4 sm:mt-6 pt-2 sm:pt-3 border-t border-white/5"
        >
          <div className="flex justify-between items-center text-[9px] sm:text-xs text-white/30">
            <div className="flex items-center gap-2 sm:gap-3">
              <span>{skills.length} technologies</span>
              <span>•</span>
              <span>{categories.length} categories</span>
            </div>
            <div className="flex items-center gap-1">
              <AppWindow size={10} />
              <span>Skills Page</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
