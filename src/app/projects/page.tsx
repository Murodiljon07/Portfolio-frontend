"use client";

import profil from "@/api/services/portfolio.service";
import { useEffect, useState } from "react";
import { GitBranchPlus, ExternalLink } from "lucide-react";

interface Project {
  _id: string;
  title: string;
  description: string;
  github?: string;
  demo?: string;
  image?: string;
}

const demoprojects = [
  {
    _id: "1",
    title: "IELTS Platform",
    description: "AI powered IELTS prediction platform",
    github: "...",
    demo: "...",
    image: "...",
  },
];

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const data = await profil.getAdminMe();
        setProjects(demoprojects);
      } catch (error) {
        console.error(error);
      }
    };

    fetchProjects();
  }, []);

  return (
    <section className="h-full flex items-center justify-center px-6">
      <div className="max-w-6xl w-full">
        <h1 className="text-6xl font-black text-white text-center mb-12">
          Projects
        </h1>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <div
              key={project._id}
              className="
                backdrop-blur-md
                bg-white/10
                border border-white/10
                rounded-3xl
                overflow-hidden
                hover:scale-105
                transition
              "
            >
              <div className="h-52 bg-white/5">
                {project.image && (
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                )}
              </div>

              <div className="p-6">
                <h2 className="text-2xl font-bold text-white">
                  {project.title}
                </h2>

                <p className="text-white/70 mt-3 line-clamp-3">
                  {project.description}
                </p>

                <div className="flex gap-4 mt-5">
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      className="flex items-center gap-2 text-white"
                    >
                      <GitBranchPlus size={18} />
                      Code
                    </a>
                  )}

                  {project.demo && (
                    <a
                      href={project.demo}
                      target="_blank"
                      className="flex items-center gap-2 text-white"
                    >
                      <ExternalLink size={18} />
                      Demo
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
