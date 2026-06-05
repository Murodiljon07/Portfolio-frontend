"use client";

import React, { ReactNode } from "react";
import NavBar from "@/components/layout/NavBar";
import { FaFileInvoice } from "react-icons/fa6";

function layout({ children }: { children: ReactNode }) {
  return (
    <>
      <div className="background" />

      <div className="relative z-10 h-screen">
        <a
          href={
            "https://drive.google.com/file/d/19k-KnqgfkjNFE3OkMIrQ-aGIBv5tK24i/view"
          }
          target="_blank"
          rel="noopener noreferrer"
          className="group fixed top-5 right-10 flex items-center gap-1 overflow-hidden rounded-full bg-white/10 p-2 hover:bg-white/20 transition-all "
        >
          <FaFileInvoice className="text-white text-base sm:text-lg flex-shrink-0 relative z-10" />

          <span className="text-amber-50 text-xs whitespace-nowrap group-hover:max-w-xs  transition-all duration-300 ease-in-out">
            Download CV
          </span>
        </a>
        <NavBar />

        <main className="h-[calc(100vh-80px)]">{children}</main>
      </div>
    </>
  );
}

export default layout;
