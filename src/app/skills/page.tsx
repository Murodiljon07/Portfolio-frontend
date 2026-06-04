"use client";

import profil from "@/api/services/portfolio.service";
import { useEffect, useState } from "react";

interface Skill {
  name: string;
  level: number;
}

const mocSkills = [
  {
    name: "Node.js",
    level: 90,
  },
  {
    name: "Express.js",
    level: 85,
  },
  {
    name: "MongoDB",
    level: 80,
  },
];

export default function SkillsPage() {
  const [skills, setSkills] = useState<Skill[]>([]);

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const data = await profil.getAdminMe();
        setSkills(mocSkills);
      } catch (error) {
        console.log(error);
      }
    };

    fetchSkills();
  }, []);

  return (
    <section className="h-full flex items-center justify-center px-6">
      <div className="w-full max-w-5xl">
        <h1 className="text-center text-6xl font-black text-white mb-12">
          My Skills
        </h1>

        <div className="grid md:grid-cols-2 gap-6">
          {skills.map((skill) => (
            <div
              key={skill.name}
              className="backdrop-blur-md bg-white/10 border border-white/10 rounded-2xl p-5"
            >
              <div className="flex justify-between mb-3">
                <span className="text-white font-semibold">{skill.name}</span>

                <span className="text-white/70">{skill.level}%</span>
              </div>

              <div className="h-3 bg-white/10 rounded-full overflow-hidden">
                <div
                  className="h-full bg-white rounded-full"
                  style={{
                    width: `${skill.level}%`,
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
