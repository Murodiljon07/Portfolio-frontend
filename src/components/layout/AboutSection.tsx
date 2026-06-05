"use client";

import { useRef } from "react";
import { MapPin } from "lucide-react";

import Image from "next/image";
import { motion, useScroll, useTransform, useInView } from "framer-motion";

import {
  Mail,
  Phone,
  Calendar,
  Award,
  SwatchBookIcon,
  Coffee,
  Heart,
  Download,
  User,
  Code,
  BookOpen,
} from "lucide-react";

interface Profile {
  name: string;
  surname: string;
  profession: string;
  about: string;
  currentCity: string;
  adress: string;
  experience: string;
  age: number;
  birthday: string;
  projects: [];
  skills: [];
  avatar?: string;
  email?: string;
  cv?: string;
  interests?: string[];
  media?: Array<{ platform: string; url: string; title: string }>;
}

// About Section Component
function AboutSection({ profile }: { profile: Profile }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.2 });

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);

  const stats = [
    {
      icon: Award,
      label: "Experience",
      value: profile.experience,
      color: "from-purple-500 to-pink-500",
    },
    {
      icon: Code,
      label: "Projects",
      value: profile.projects,
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: Coffee,
      label: "Coffee",
      value: "∞",
      color: "from-amber-500 to-orange-500",
    },
    {
      icon: SwatchBookIcon,
      label: "Skills",
      value: profile.skills,
      color: "from-green-500 to-emerald-500",
    },
  ];

  return (
    <motion.section
      ref={ref}
      style={{ opacity }}
      className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 py-20 sm:py-24 overflow-hidden"
    >
      {/* Nature Background Layers */}
      <div className="absolute inset-0 -z-10">
        {/* Sky layer */}
        <div className="absolute inset-0 bg-gradient-to-b from-sky-900/20 via-transparent to-transparent" />

        {/* Grass layer */}
        <motion.div
          style={{ y }}
          className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-emerald-900/40 to-transparent"
        />

        {/* Floating leaves */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-emerald-500/20 text-2xl"
            style={{
              left: `${Math.random() * 100}%`,
              bottom: `${Math.random() * 30}%`,
            }}
            animate={{
              y: [0, -30, 0],
              x: [0, 10, -10, 0],
              rotate: [0, 15, -15, 0],
            }}
            transition={{
              duration: 5 + Math.random() * 5,
              repeat: Infinity,
              delay: i * 0.5,
            }}
          >
            🍃
          </motion.div>
        ))}
      </div>

      <div className="max-w-6xl w-full mx-auto relative z-10">
        {/* Section Title with Nature Animation */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 3, repeat: Infinity }}
            className="inline-flex items-center gap-2 rounded-full bg-white/10 backdrop-blur-sm px-4 py-2 mb-4"
          >
            <User size={14} className="text-white/70" />
            <span className="text-xs text-white/60 uppercase tracking-wider">
              About Me
            </span>
          </motion.div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white">
            Get to know{" "}
            <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
              me better
            </span>
          </h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.2 }}
            className="text-white/40 text-sm mt-3 max-w-md mx-auto"
          >
            Here's everything you need to know about me
          </motion.p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Left Column - Avatar & Info with Float Animation */}
          <motion.div
            initial={{ opacity: 0, x: -80 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, type: "spring", stiffness: 100 }}
            className="space-y-6"
          >
            {/* Avatar Card with Hover Effects */}
            <motion.div whileHover={{ y: -10 }} className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500/30 to-teal-500/30 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition duration-500" />
              <div className="relative bg-white/10 backdrop-blur-sm border border-white/10 rounded-3xl p-6 text-center">
                {/* Avatar with Pulse */}
                <div className="relative inline-block">
                  <motion.div
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 3, repeat: Infinity }}
                    className="absolute inset-0 rounded-full bg-gradient-to-r from-emerald-500/30 to-teal-500/30 blur-xl"
                  />
                  <div className="relative w-32 h-32 sm:w-40 sm:h-40 rounded-full overflow-hidden border-2 border-white/20 mx-auto">
                    {profile.avatar ? (
                      <Image
                        src={profile.avatar}
                        alt={profile.name}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-emerald-600 to-teal-800 flex items-center justify-center">
                        <User size={48} className="text-white/50" />
                      </div>
                    )}
                  </div>
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="absolute bottom-2 right-2 sm:bottom-3 sm:right-3 w-4 h-4 rounded-full bg-green-500 border-2 border-white"
                  />
                </div>

                {/* Name & Title */}
                <h3 className="text-xl sm:text-2xl font-semibold text-white mt-4">
                  {profile.name} {profile.surname}
                </h3>
                <p className="text-emerald-400 text-sm">{profile.profession}</p>

                {/* Location & Email */}
                <div className="mt-4 space-y-2 text-sm">
                  <div className="flex items-center justify-center gap-2 text-white/70">
                    <MapPin size={14} className="text-red-400" />
                    <span>{profile.currentCity}</span>
                  </div>

                  <div className="flex items-center justify-center gap-2 text-white/70">
                    <Mail size={14} className="text-blue-400" />
                    murodiljonabdumutalovtg1@gmail.com
                  </div>
                </div>

                {/* CV Button */}
                {profile.cv && (
                  <motion.a
                    href={profile.cv}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.98 }}
                    className="inline-flex items-center gap-2 mt-5 px-5 py-2 rounded-full bg-gradient-to-r from-emerald-600 to-teal-600 text-white text-sm hover:shadow-lg transition-all duration-300"
                  >
                    <Download size={14} />
                    Download CV
                  </motion.a>
                )}
              </div>
            </motion.div>

            {/* Contact Info Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 }}
              className="bg-white/10 backdrop-blur-sm border border-white/10 rounded-2xl p-5"
            >
              <h4 className="text-white font-medium mb-3 flex items-center gap-2">
                <Phone size={14} className="text-emerald-400" />
                Contact Information
              </h4>
              <div className="space-y-2 text-sm">
                <motion.div
                  whileHover={{ x: 5 }}
                  className="flex justify-between py-2 border-b border-white/5"
                >
                  <span className="text-white/50">Phone</span>
                  <span className="text-white/80">+998 99 362 25 75</span>
                </motion.div>
                <motion.div
                  whileHover={{ x: 5 }}
                  className="flex justify-between py-2 border-b border-white/5"
                >
                  <span className="text-white/50">Email</span>
                  <span className="text-white/80">
                    murodiljonabdumutalovtg1@gmail.com
                  </span>
                </motion.div>
                <motion.div
                  whileHover={{ x: 5 }}
                  className="flex justify-between py-2 border-b border-white/5"
                >
                  <span className="text-white/50">Location</span>
                  <span className="text-white/80">{profile.currentCity}</span>
                </motion.div>
                <motion.div
                  whileHover={{ x: 5 }}
                  className="flex justify-between py-2 border-b border-white/5"
                >
                  <span className="text-white/50">Birthday</span>
                  <span className="text-white/80">
                    {new Date(profile.birthday).toLocaleDateString()}
                  </span>
                </motion.div>
                <motion.div
                  whileHover={{ x: 5 }}
                  className="flex justify-between py-2"
                >
                  <span className="text-white/50">Age</span>
                  <span className="text-white/80">{profile.age} years</span>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Column - Bio & Stats with Stagger Animation */}
          <motion.div
            initial={{ opacity: 0, x: 80 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, type: "spring", stiffness: 100 }}
            className="space-y-6"
          >
            {/* Bio Card */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="bg-white/10 backdrop-blur-sm border border-white/10 rounded-2xl p-6"
            >
              <h4 className="text-white font-medium mb-3 flex items-center gap-2">
                <BookOpen size={14} className="text-emerald-400" />
                Biography
              </h4>
              <p className="text-white/70 text-sm leading-relaxed">
                {profile.about}
              </p>
              <motion.div
                initial={{ width: 0 }}
                animate={isInView ? { width: "100%" } : {}}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="mt-4 h-px bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent"
              />
              <div className="mt-4 flex items-center gap-2 text-white/50 text-xs">
                <Code size={12} />
                <span>Passionate about building great digital experiences</span>
              </div>
            </motion.div>

            {/* Stats Grid with Bounce Animation */}
            <div className="grid grid-cols-2 gap-3">
              {stats.map((stat, idx) => {
                const Icon = stat.icon;
                return (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, scale: 0.8, y: 20 }}
                    animate={isInView ? { opacity: 1, scale: 1, y: 0 } : {}}
                    transition={{ delay: 0.3 + idx * 0.1, type: "spring" }}
                    whileHover={{ scale: 1.05, y: -5 }}
                    className="bg-white/10 backdrop-blur-sm border border-white/10 rounded-2xl p-4 text-center"
                  >
                    <div
                      className={`inline-flex p-2 rounded-full bg-gradient-to-r ${stat.color} bg-opacity-20 mb-2`}
                    >
                      <Icon size={18} className="text-white" />
                    </div>
                    <div className="text-xl font-bold text-white">
                      {stat.value.length <= 0 ? "0" : stat.value}
                    </div>
                    <div className="text-white/40 text-xs">{stat.label}</div>
                  </motion.div>
                );
              })}
            </div>

            {/* Interests Section with Floating Tags */}
            {profile.interests && profile.interests.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.5 }}
                className="bg-white/10 backdrop-blur-sm border border-white/10 rounded-2xl p-5"
              >
                <h4 className="text-white font-medium mb-3 flex items-center gap-2">
                  <Heart size={14} className="text-rose-400" />
                  Interests & Hobbies
                </h4>
                <div className="flex flex-wrap gap-2">
                  {profile.interests.map((interest, idx) => (
                    <motion.span
                      key={idx}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={isInView ? { opacity: 1, scale: 1 } : {}}
                      transition={{ delay: 0.6 + idx * 0.05, type: "spring" }}
                      whileHover={{ scale: 1.1, y: -2 }}
                      className="px-3 py-1.5 rounded-full bg-gradient-to-r from-emerald-500/20 to-teal-500/20 border border-emerald-500/30 text-emerald-300 text-xs"
                    >
                      {interest}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}

export default AboutSection;
