"use client";

import profil from "@/api/services/portfolio.service";
import { useEffect, useState } from "react";

export default function HomePage() {
  const [myProfil, setMyProfil] = useState();

  useEffect(() => {
    const fetchMe = async () => {
      try {
        const data = await profil.getAdminMe();
        console.log(data);

        setMyProfil(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchMe();
  }, []);

  if (!myProfil) {
    return (
      <div className="flex justify-center items-center h-full text-5xl text-white font-bold ">
        Can't get Me <br />
        Sorry😔
      </div>
    );
  }

  const { name } = myProfil;

  return (
    <section className="h-full flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-7xl font-bold text-white">{name}</h1>

        <p className="text-xl text-white/80 mt-4">Full Stack Developer</p>
      </div>
    </section>
  );
}
