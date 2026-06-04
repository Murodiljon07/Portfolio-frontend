"use client";

import profil from "@/api/services/portfolio.service";
import { useEffect, useState } from "react";
import {
  MapPin,
  Briefcase,
  Mail,
  GitBranchIcon,
  Library,
  Phone,
  Sparkles,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

import Loader from "@/components/ui/loader";

interface Profile {
  name: string;
  surname: string;
  profession: string;
  about: string;
  currentCity: string;
  adress: string;
  experience: string;
  avatar?: string;
  email?: string;
  media?: Array<{ platform: string; url: string }>;
}

export default function HomePage() {
  const [myProfil, setMyProfil] = useState<Profile | null>(null);

  useEffect(() => {
    const fetchMe = async () => {
      try {
        const data = await profil.getAdminMe();
        setMyProfil(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchMe();
  }, []);

  if (!myProfil) {
    return <Loader fullScreen={true} />;
  }

  return (
    <section className="h-full flex items-center justify-center px-4 sm:px-6 py-8 sm:py-12 overflow-y-auto">
      <div className="max-w-4xl w-full mx-auto text-center">
        {/* Welcome Badge - Responsive */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 rounded-full bg-white/10 backdrop-blur-sm px-3 py-1.5 sm:px-4 sm:py-2 mb-4 sm:mb-6"
        >
          <Sparkles size={12} className="text-yellow-400" />
          <span className="text-[10px] sm:text-xs text-white/80 uppercase tracking-[3px] sm:tracking-[5px]">
            Welcome To My Portfolio
          </span>
        </motion.div>

        {/* Name - Responsive font sizes */}
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-white mb-2"
        >
          {myProfil.name}
        </motion.h1>

        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black mb-4 sm:mb-6"
        >
          <span className="bg-gradient-to-r from-white via-gray-300 to-gray-500 bg-clip-text text-transparent">
            {myProfil.surname}
          </span>
        </motion.h1>

        {/* Profession - Responsive */}
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="text-xl sm:text-2xl md:text-3xl font-semibold text-white/90 mb-4 sm:mb-6"
        >
          {myProfil.profession}
        </motion.h2>

        {/* About - Responsive text */}
        <motion.p
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="text-sm sm:text-base md:text-lg text-white/70 leading-6 sm:leading-7 md:leading-8 max-w-2xl mx-auto px-2 sm:px-0"
        >
          {myProfil.about}
        </motion.p>

        {/* Info Row - Responsive gap and wrap */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="flex justify-center gap-4 sm:gap-6 md:gap-8 mt-6 sm:mt-8 flex-wrap px-2"
        >
          <div className="flex items-center gap-1.5 sm:gap-2 text-white/80 text-xs sm:text-sm">
            <MapPin size={14} className="text-red-500 sm:text-red-600" />
            <span>{myProfil.currentCity}</span>
          </div>

          <div className="flex items-center gap-1.5 sm:gap-2 text-white/80 text-xs sm:text-sm">
            <Briefcase
              size={14}
              className="text-yellow-600 sm:text-yellow-800"
            />
            <span>{myProfil.experience}</span>
          </div>
        </motion.div>

        {/* Buttons - Responsive layout */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="mt-8 sm:mt-10 flex justify-center gap-3 sm:gap-4 flex-wrap px-2"
        >
          <Link
            href="/projects"
            className="px-5 sm:px-6 md:px-8 py-2 sm:py-2.5 md:py-3 rounded-full bg-white text-black font-semibold text-sm sm:text-base hover:scale-105 transition-all duration-300 hover:shadow-xl"
          >
            View Projects
          </Link>

          <Link
            href="/messages"
            className="px-5 sm:px-6 md:px-8 py-2 sm:py-2.5 md:py-3 rounded-full border border-white text-white font-semibold text-sm sm:text-base hover:bg-white hover:text-black transition-all duration-300"
          >
            Contact Me
          </Link>
        </motion.div>

        {/* Social Links - Responsive (if available) */}
        {myProfil.media && myProfil.media.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.5 }}
            className="flex justify-center gap-3 sm:gap-4 mt-8 sm:mt-10"
          >
            {myProfil.media.map((social, i) => {
              const Icon =
                social.platform === "github"
                  ? GitBranchIcon
                  : social.platform === "linkedin"
                    ? Library
                    : social.platform === "email"
                      ? Mail
                      : Phone;
              return (
                <a
                  key={i}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full bg-white/10 p-2 sm:p-2.5 hover:bg-white/20 transition-all hover:scale-110"
                >
                  <Icon size={16} className="text-white sm:text-lg" />
                </a>
              );
            })}
          </motion.div>
        )}
      </div>
    </section>
  );
}
