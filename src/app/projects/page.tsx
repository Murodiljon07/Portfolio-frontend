"use client";

import profil from "@/api/services/portfolio.service";
import { useEffect, useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  GitBranchPlus,
  ExternalLink,
  AppWindow,
  ChevronLeft,
  ChevronRight,
  Pause,
  Play,
} from "lucide-react";
import Image from "next/image";
import Loader from "@/components/ui/loader";

interface Project {
  _id: string;
  title: string;
  description: string;
  githubUrl?: string;
  liveUrl?: string;
  image?: string;
  technologies: string[];
  createdAt?: string;
}

const demoprojects: Project[] = [
  {
    _id: "1",
    title: "IELTS Platform",
    description:
      "AI powered IELTS prediction platform with real-time scoring and personalized feedback system.",
    githubUrl: "https://github.com/...",
    liveUrl: "https://demo.com",
    image: "",
    technologies: ["React", "Node.js", "AI", "MongoDB"],
  },
  {
    _id: "2",
    title: "E-Commerce Store",
    description:
      "Full-stack e-commerce platform with payment integration and admin dashboard.",
    githubUrl: "https://github.com/...",
    liveUrl: "https://demo.com",
    image: "",
    technologies: ["Next.js", "Stripe", "PostgreSQL", "Tailwind"],
  },
  {
    _id: "3",
    title: "Portfolio 2024",
    description:
      "Modern portfolio website with macOS style design and smooth animations.",
    githubUrl: "https://github.com/...",
    liveUrl: "https://demo.com",
    image: "",
    technologies: ["Next.js", "Framer Motion", "Tailwind", "TypeScript"],
  },
  {
    _id: "4",
    title: "Task Manager",
    description:
      "Collaborative task management tool with real-time updates and team features.",
    githubUrl: "https://github.com/...",
    liveUrl: "https://demo.com",
    image: "",
    technologies: ["Vue.js", "Firebase", "Tailwind"],
  },
  {
    _id: "5",
    title: "Weather App",
    description:
      "Beautiful weather application with 7-day forecast and interactive maps.",
    githubUrl: "https://github.com/...",
    liveUrl: "https://demo.com",
    image: "",
    technologies: ["React", "API", "Chart.js"],
  },
];

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);
  const touchStartX = useRef<number | null>(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const data = await profil.getAdminMe();
        setProjects(demoprojects);
      } catch (error) {
        console.error(error);
        setProjects(demoprojects);
      }
    };
    fetchProjects();
  }, []);

  // Next slide function with smooth transition
  const nextSlide = useCallback(() => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prev) => (prev + 1) % projects.length);
    setTimeout(() => setIsTransitioning(false), 500);
  }, [projects.length, isTransitioning]);

  // Previous slide function with smooth transition
  const prevSlide = useCallback(() => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prev) => (prev - 1 + projects.length) % projects.length);
    setTimeout(() => setIsTransitioning(false), 500);
  }, [projects.length, isTransitioning]);

  // Go to specific slide
  const goToSlide = useCallback(
    (index: number) => {
      if (isTransitioning || index === currentIndex) return;
      setIsTransitioning(true);
      setCurrentIndex(index);
      setTimeout(() => setIsTransitioning(false), 500);
    },
    [currentIndex, isTransitioning],
  );

  // Auto-play functionality
  useEffect(() => {
    if (isAutoPlaying && projects.length > 0 && !isTransitioning) {
      autoPlayRef.current = setInterval(() => {
        nextSlide();
      }, 2000);
    }
    return () => {
      if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    };
  }, [isAutoPlaying, projects.length, nextSlide, isTransitioning]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        prevSlide();
      }
      if (e.key === "ArrowRight") {
        e.preventDefault();
        nextSlide();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [prevSlide, nextSlide]);

  // Touch/swipe support
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX.current - touchEndX;

    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        nextSlide();
      } else {
        prevSlide();
      }
    }
    touchStartX.current = null;
  };

  // Reset auto-play timer on user interaction
  const handleUserInteraction = useCallback(() => {
    if (autoPlayRef.current) {
      clearInterval(autoPlayRef.current);
      if (isAutoPlaying && projects.length > 0) {
        autoPlayRef.current = setInterval(() => {
          nextSlide();
        }, 4000);
      }
    }
  }, [isAutoPlaying, projects.length, nextSlide]);

  const toggleAutoPlay = () => {
    setIsAutoPlaying(!isAutoPlaying);
  };

  if (projects.length === 0) {
    return <Loader fullScreen={true} text="Projects..." />;
  }

  // Get position for each card (-2 to 2)
  const getCardPosition = (index: number) => {
    let position = index - currentIndex;
    if (position > projects.length / 2) position -= projects.length;
    if (position < -projects.length / 2) position += projects.length;
    return position;
  };

  return (
    <section className="h-full flex flex-col px-4 sm:px-6 py-4 sm:py-8 overflow-hidden">
      <div className="max-w-7xl w-full mx-auto flex-1 flex flex-col min-h-0">
        {/* macOS Style Header */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-4 sm:mb-6 flex-shrink-0"
        >
          <div className="flex items-center justify-between mb-3 sm:mb-4">
            <span className="text-[10px] sm:text-xs text-white/40 font-medium">
              Carousel.app
            </span>
            <div className="w-12" />
          </div>

          <div className="text-center">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-white/90 tracking-tight">
              Featured Projects
            </h1>
            <p className="text-white/40 text-xs sm:text-sm mt-0.5 sm:mt-1">
              {projects.length} projects • Keyboard arrows • Swipe
            </p>
          </div>
        </motion.div>

        {/* 3D Carousel */}
        <div
          className="flex-1 flex items-center justify-center relative min-h-0 py-8"
          onMouseEnter={() => setIsAutoPlaying(false)}
          onMouseLeave={() => setIsAutoPlaying(true)}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          onClick={handleUserInteraction}
        >
          {/* Navigation Arrows */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              prevSlide();
              handleUserInteraction();
            }}
            className="absolute left-2 sm:left-4 z-20 p-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white/70 hover:text-white hover:bg-white/20 transition-all z-30"
          >
            <ChevronLeft size={20} />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              nextSlide();
              handleUserInteraction();
            }}
            className="absolute right-2 sm:right-4 z-20 p-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white/70 hover:text-white hover:bg-white/20 transition-all z-30"
          >
            <ChevronRight size={20} />
          </button>

          {/* Play/Pause Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleAutoPlay();
            }}
            className="absolute top-0 right-2 sm:right-4 z-20 p-1.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white/50 hover:text-white/80 transition-all"
          >
            {isAutoPlaying ? <Pause size={12} /> : <Play size={12} />}
          </button>

          {/* Carousel Container */}
          <div className="relative w-full max-w-5xl h-[400px] sm:h-[450px] md:h-[500px] flex items-center justify-center">
            {projects.map((project, idx) => {
              const position = getCardPosition(idx);
              const isCenter = position === 0;

              // Smooth transforms with spring animation
              const translateX = position * 280;
              const scale = isCenter
                ? 1
                : Math.max(0.7, 1 - Math.abs(position) * 0.15);
              const opacity = isCenter
                ? 1
                : Math.max(0.3, 1 - Math.abs(position) * 0.3);
              const blur = isCenter ? 0 : Math.min(8, Math.abs(position) * 4);
              const zIndex = isCenter ? 10 : 5 - Math.abs(position);

              return (
                <motion.div
                  key={project._id}
                  className="absolute cursor-pointer"
                  initial={false}
                  animate={{
                    x: translateX,
                    scale,
                    opacity,
                    filter: `blur(${blur}px)`,
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 35,
                    mass: 1,
                    duration: 0.5,
                  }}
                  style={{
                    zIndex,
                    transformOrigin: "center center",
                  }}
                  onClick={() => {
                    goToSlide(idx);
                    handleUserInteraction();
                  }}
                >
                  {/* Project Card */}
                  <motion.div
                    className={`
                      relative w-[260px] sm:w-[300px] md:w-[340px]
                      bg-white/8 backdrop-blur-xl 
                      border rounded-2xl overflow-hidden
                      ${
                        isCenter
                          ? "border-white/30 shadow-2xl shadow-white/10"
                          : "border-white/10"
                      }
                    `}
                    whileHover={isCenter ? { scale: 1.02 } : {}}
                    transition={{ duration: 0.2 }}
                  >
                    {/* Image Section */}
                    <div className="relative h-36 sm:h-40 md:h-44 bg-gradient-to-br from-white/10 to-white/0 overflow-hidden">
                      {project.image ? (
                        <Image
                          src={project.image}
                          alt={project.title}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <div className="flex items-center justify-center h-full">
                          <div className="text-4xl opacity-30">
                            {project.title.charAt(0)}
                          </div>
                        </div>
                      )}

                      {/* Tech Badge */}
                      <div className="absolute top-2 right-2">
                        <span className="text-[8px] sm:text-[9px] px-1.5 py-0.5 rounded-full bg-black/50 backdrop-blur-sm text-white/80">
                          {project.technologies[0]}
                        </span>
                      </div>
                    </div>

                    {/* Card Body */}
                    <div className="p-3 sm:p-4">
                      <h3 className="text-white font-semibold text-sm sm:text-base">
                        {project.title}
                      </h3>

                      <p className="text-white/60 text-xs sm:text-sm mt-1 line-clamp-2">
                        {project.description}
                      </p>

                      {/* Technologies */}
                      <div className="flex flex-wrap gap-1 mt-2">
                        {project.technologies.slice(0, 3).map((tech) => (
                          <span
                            key={tech}
                            className="text-[7px] sm:text-[8px] px-1.5 py-0.5 rounded-full bg-white/10 text-white/50"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>

                      {/* Links - Only show for center card */}
                      {isCenter && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.1, duration: 0.2 }}
                          className="flex gap-3 mt-3 pt-2 border-t border-white/10"
                        >
                          {project.githubUrl && (
                            <a
                              href={project.githubUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-1 text-white/50 hover:text-white/80 transition text-xs"
                              onClick={(e) => e.stopPropagation()}
                            >
                              <GitBranchPlus size={12} />
                              Code
                            </a>
                          )}
                          {project.liveUrl && (
                            <a
                              href={project.liveUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-1 text-white/50 hover:text-white/80 transition text-xs"
                              onClick={(e) => e.stopPropagation()}
                            >
                              <ExternalLink size={12} />
                              Demo
                            </a>
                          )}
                        </motion.div>
                      )}
                    </div>
                  </motion.div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Dots Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex-shrink-0 flex justify-center gap-2 mt-4 pb-2"
        >
          {projects.map((_, idx) => (
            <button
              key={idx}
              onClick={() => {
                goToSlide(idx);
                handleUserInteraction();
              }}
              className={`transition-all duration-300 rounded-full
                ${
                  currentIndex === idx
                    ? "w-6 h-1.5 bg-white/60"
                    : "w-1.5 h-1.5 bg-white/20 hover:bg-white/40"
                }`}
            />
          ))}
        </motion.div>

        {/* Auto-play Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex-shrink-0 flex justify-center mt-2"
        >
          <div className="text-[8px] text-white/30 flex items-center gap-2">
            <span>{isAutoPlaying ? "▶ Auto-rotating" : "⏸ Paused"}</span>
            <span>•</span>
            <span>← → arrows</span>
            <span>•</span>
            <span>swipe</span>
          </div>
        </motion.div>

        {/* macOS Style Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex-shrink-0 mt-3 pt-2 border-t border-white/5"
        >
          <div className="flex justify-between items-center text-[9px] sm:text-xs text-white/30">
            <div className="flex items-center gap-2 sm:gap-3">
              <span>{projects.length} projects</span>
              <span>•</span>
              <span>3D Carousel</span>
            </div>
            <div className="flex items-center gap-1">
              <AppWindow size={10} />
              <span>Projects Page</span>
            </div>
          </div>
        </motion.div>
      </div>

      <style jsx>{`
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .bg-white\/8 {
          background-color: rgba(255, 255, 255, 0.08);
        }
      `}</style>
    </section>
  );
}
