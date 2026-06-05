"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  FaFolder,
  FaGithub,
  FaInstagram,
  FaLinkedinIn,
  FaPhone,
  FaTelegram,
  FaYoutube,
} from "react-icons/fa6";

interface MediaItem {
  platform: string;
  url: string;
  title: string;
}

interface MediaBarProps {
  media: MediaItem[];
}

export default function MediaBar({ media }: MediaBarProps) {
  if (!media || media.length === 0) return null;

  const getIcon = (platform: string) => {
    const p = platform.toLowerCase();
    switch (p) {
      case "youtube":
        return FaYoutube;
      case "github":
        return FaGithub;
      case "linkedin":
        return FaLinkedinIn;
      case "phone":
        return FaPhone;
      case "instagram":
        return FaInstagram;
      case "telegram":
        return FaTelegram;
      default:
        return FaFolder;
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.8,
      },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="flex justify-center gap-3 sm:gap-4 mt-8 sm:mt-10"
    >
      {media.map((social, i) => {
        const Icon = getIcon(social.platform);

        return (
          <motion.div
            key={i}
            whileHover={{ scale: 1.15, y: -5 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative rounded-full flex justify-center items-center gap-2 bg-white/10 p-2 hover:bg-white/20 duration-300 transition-all"
            >
              <Icon size={20} className="text-white" />
              <span className="absolute -bottom-7 left-1/2 -translate-x-1/2 text-amber-50 text-[9px] whitespace-nowrap opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none bg-black/50 px-2 py-0.5 rounded-full">
                {social.title}
              </span>
            </Link>
          </motion.div>
        );
      })}
    </motion.div>
  );
}
