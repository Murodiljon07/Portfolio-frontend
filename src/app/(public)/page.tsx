"use client";

import profil from "@/api/services/portfolio.service";
import { useEffect, useState, useRef } from "react";
import { MapPin, Briefcase, Sparkles, ChevronDown } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion, useScroll, useTransform, useInView } from "framer-motion";

import Loader from "@/components/ui/loader";
import Interests from "@/components/ui/interests";
import MediaBar from "@/components/ui/mediaBar";
import CompactAge from "@/components/ui/compactAge";
import AboutSection from "@/components/layout/AboutSection";

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
  avatar?: string;
  projects: [];
  skills: [];
  email?: string;
  cv?: string;
  interests?: string[];
  media?: Array<{ platform: string; url: string; title: string }>;
}

// Seasonal backgrounds
const getSeasonalBackground = () => {
  const month = new Date().getMonth();

  if (month >= 2 && month <= 4) {
    return {
      gradient: "from-emerald-900/40 via-green-900/30 to-teal-900/40",
      orbs: ["from-emerald-500/20", "from-green-500/15", "from-teal-500/20"],
      accent: "text-emerald-400",
      season: "Spring",
      nature: "bg-gradient-to-b from-emerald-900/20 to-green-900/30",
    };
  }
  if (month >= 5 && month <= 7) {
    return {
      gradient: "from-yellow-900/30 via-orange-900/20 to-amber-900/30",
      orbs: ["from-yellow-500/15", "from-orange-500/10", "from-amber-500/15"],
      accent: "text-yellow-400",
      season: "Summer",
      nature: "bg-gradient-to-b from-yellow-900/20 to-orange-900/30",
    };
  }
  if (month >= 8 && month <= 10) {
    return {
      gradient: "from-orange-900/40 via-red-900/30 to-amber-900/40",
      orbs: ["from-orange-500/20", "from-red-500/15", "from-amber-500/20"],
      accent: "text-orange-400",
      season: "Autumn",
      nature: "bg-gradient-to-b from-orange-900/30 to-red-900/40",
    };
  }
  return {
    gradient: "from-blue-900/40 via-cyan-900/30 to-indigo-900/40",
    orbs: ["from-blue-500/20", "from-cyan-500/15", "from-indigo-500/20"],
    accent: "text-blue-400",
    season: "Winter",
    nature: "bg-gradient-to-b from-blue-900/30 to-cyan-900/40",
  };
};

export default function HomePage() {
  const router = useRouter();
  const [myProfil, setMyProfil] = useState<Profile | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const [loading, setLoading] = useState<Boolean>(true);
  const { scrollYProgress } = useScroll();
  const heroOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0.3]);

  const seasonal = getSeasonalBackground();

  useEffect(() => {
    const fetchMe = async () => {
      try {
        const data = await profil.getAdminMe();
        setMyProfil(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchMe();
  }, []);

  if (loading) {
    return <Loader fullScreen={true} />;
  }

  if (!myProfil) {
    return;
  }

  // Floating particles for hero
  const particles = Array.from({ length: 30 }, (_, i) => ({
    id: i,
    size: Math.random() * 4 + 2,
    left: Math.random() * 100,
    duration: Math.random() * 15 + 10,
    delay: Math.random() * 5,
  }));

  return (
    <div ref={containerRef} className="relative overflow-hidden">
      {/* Seasonal Animated Background */}
      <div
        className={`fixed inset-0 bg-gradient-to-br ${seasonal.gradient} -z-20`}
      />

      {/* Floating Orbs */}
      <motion.div
        animate={{ y: [0, -50, 0], x: [0, 30, 0], rotate: [0, 180, 360] }}
        transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
        className={`fixed top-20 left-10 w-72 h-72 rounded-full bg-gradient-to-r ${seasonal.orbs[0]} blur-3xl -z-10`}
      />
      <motion.div
        animate={{ y: [0, 50, 0], x: [0, -30, 0], rotate: [360, 180, 0] }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
        className={`fixed bottom-20 right-10 w-96 h-96 rounded-full bg-gradient-to-r ${seasonal.orbs[1]} blur-3xl -z-10`}
      />
      <motion.div
        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 4,
        }}
        className={`fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full bg-gradient-to-r ${seasonal.orbs[2]} blur-3xl -z-10`}
      />

      {/* Floating Particles for Hero */}
      <div className="fixed inset-0 pointer-events-none -z-10">
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute rounded-full bg-white/20"
            style={{
              width: particle.size,
              height: particle.size,
              left: `${particle.left}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{ y: [0, -150, -300], opacity: [0, 0.6, 0] }}
            transition={{
              duration: particle.duration,
              repeat: Infinity,
              delay: particle.delay,
              ease: "linear",
            }}
          />
        ))}
      </div>

      {/* Grid Pattern Overlay */}
      <div className="fixed inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px] -z-10" />

      {/* Hero Section */}
      <motion.section
        style={{ opacity: heroOpacity }}
        className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 py-8 sm:py-12"
      >
        <div className="max-w-4xl w-full mx-auto text-center">
          {/* Welcome Badge */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 rounded-full bg-white/10 backdrop-blur-sm px-3 py-1.5 sm:px-4 sm:py-2 mb-4 sm:mb-6"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
              <Sparkles size={12} className="text-yellow-400" />
            </motion.div>
            <span className="text-[10px] sm:text-xs text-white/80 uppercase tracking-[3px] sm:tracking-[5px]">
              Welcome To My Portfolio
            </span>
          </motion.div>

          {/* Name */}
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-white mb-2"
          >
            {myProfil.name.split("").map((char, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + i * 0.03 }}
                whileHover={{ scale: 1.1, color: "#fbbf24" }}
                className="inline-block hover:text-yellow-400 transition-colors"
              >
                {char}
              </motion.span>
            ))}
          </motion.h1>

          {/* Surname */}
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black mb-4 sm:mb-6"
          >
            <motion.span
              className="bg-gradient-to-r from-white via-gray-300 to-gray-500 bg-clip-text text-transparent"
              animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              style={{ backgroundSize: "200% 100%" }}
            >
              {myProfil.surname}
            </motion.span>
          </motion.h1>

          {/* Profession */}
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="text-xl sm:text-2xl md:text-3xl font-semibold text-white/90 mb-4 sm:mb-6"
          >
            <motion.span
              animate={{ opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              {myProfil.profession}
            </motion.span>
          </motion.h2>

          {/* About */}
          <motion.p
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="text-sm sm:text-base md:text-lg text-white/70 leading-6 sm:leading-7 md:leading-8 max-w-2xl mx-auto px-2 sm:px-0"
          >
            {myProfil.about}
          </motion.p>

          {/* Age & Birthday */}
          {myProfil.age && myProfil.birthday && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45 }}
            >
              <CompactAge age={myProfil.age} birthday={myProfil.birthday} />
            </motion.div>
          )}

          {/* Info Row */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="flex justify-center gap-4 sm:gap-6 md:gap-8 mt-6 sm:mt-8 flex-wrap px-2"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center gap-1.5 text-white/80 text-xs sm:text-sm"
            >
              <MapPin size={14} className="text-red-500" />
              <span>{myProfil.currentCity}</span>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center gap-1.5 text-white/80 text-xs sm:text-sm"
            >
              <Briefcase size={14} className="text-yellow-600" />
              <span>{myProfil.experience}</span>
            </motion.div>
          </motion.div>

          {/* Interests */}
          {myProfil.interests && myProfil.interests.length > 0 && (
            <Interests interests={myProfil.interests} />
          )}

          {/* Buttons */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.5 }}
            className="mt-8 sm:mt-10 flex justify-center gap-3 sm:gap-4 flex-wrap px-2"
          >
            <motion.div
              whileHover={{ scale: 1.05, y: -3 }}
              whileTap={{ scale: 0.98 }}
            >
              <Link
                href="/projects"
                className="px-5 sm:px-6 md:px-8 py-2 sm:py-2.5 md:py-3 rounded-full bg-white text-black font-semibold text-sm sm:text-base hover:shadow-xl transition-all duration-300 block"
              >
                View Projects
              </Link>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05, y: -3 }}
              whileTap={{ scale: 0.98 }}
            >
              <Link
                href="/messages"
                className="px-5 sm:px-6 md:px-8 py-2 sm:py-2.5 md:py-3 rounded-full border border-white text-white font-semibold text-sm sm:text-base hover:bg-white hover:text-black transition-all duration-300 block"
              >
                Contact Me
              </Link>
            </motion.div>
          </motion.div>

          {/* Media Bar */}
          {myProfil.media && myProfil.media.length > 0 && (
            <MediaBar media={myProfil.media} />
          )}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
          className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="flex flex-col items-center gap-1"
          >
            <span className="text-white/30 text-[10px]">Scroll</span>
            <div className="w-4 h-6 rounded-full border border-white/30 flex justify-center">
              <motion.div
                animate={{ y: [2, 10, 2] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="w-1 h-1.5 rounded-full bg-white/50 mt-1"
              />
            </div>
          </motion.div>
        </motion.div>
      </motion.section>

      {/* Scroll Down Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 cursor-pointer"
        onClick={() => {
          document
            .getElementById("about-section")
            ?.scrollIntoView({ behavior: "smooth" });
        }}
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="flex flex-col items-center gap-1"
        >
          <span className="text-white/30 text-[10px]">Explore more</span>
          <ChevronDown size={16} className="text-white/40" />
        </motion.div>
      </motion.div>

      {/* About Section */}
      <div id="about-section">
        <AboutSection profile={myProfil} />
      </div>
    </div>
  );
}
