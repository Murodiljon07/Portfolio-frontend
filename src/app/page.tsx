"use client";

import profil from "@/api/services/portfolio.service";
import { useEffect, useState } from "react";
import { MapPin, Briefcase } from "lucide-react";
import Link from "next/link";

import Loader from "@/components/ui/loader";

interface Profile {
  name: string;
  surname: string;
  profession: string;
  about: string;
  currentCity: string;
  adress: string;
  experience: string;
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
    <section className="h-full flex items-center justify-center px-6">
      <div className="max-w-4xl text-center">
        <span className="text-white/70 uppercase tracking-[5px]">
          Welcome To My Portfolio
        </span>

        <h1 className="mt-4 text-6xl md:text-8xl font-black text-white">
          {myProfil.name} <br />
          <span className="text-7xl md:text-8xl font-black bg-gradient-to-r from-white via-gray-300 to-gray-500 bg-clip-text text-transparent">
            {myProfil.surname}
          </span>
        </h1>

        <h2 className="mt-6 text-2xl md:text-3xl font-semibold text-white/90">
          {myProfil.profession}
        </h2>

        <p className="mt-6 text-lg text-white/70 leading-8 max-w-2xl mx-auto">
          {myProfil.about}
        </p>

        <div className="flex justify-center gap-8 mt-8 flex-wrap">
          <div className="flex items-center gap-2 text-white/80">
            <MapPin size={18} />
            {myProfil.currentCity}
          </div>

          <div className="flex items-center gap-2 text-white/80">
            <Briefcase size={18} />
            {myProfil.experience}
          </div>
        </div>

        <div className="mt-10 flex justify-center gap-4">
          <Link
            href={"/projects"}
            className="px-8 py-3 rounded-full bg-white text-black font-semibold hover:scale-105 transition"
          >
            View Projects
          </Link>

          <Link
            href={"/messages"}
            className="px-8 py-3 rounded-full border border-white text-white hover:bg-white hover:text-black transition"
          >
            Contact Me
          </Link>
        </div>
      </div>
    </section>
  );
}
