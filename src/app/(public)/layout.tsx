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
          href="https://drive.google.com/file/d/19k-KnqgfkjNFE3OkMIrQ-aGIBv5tK24i/view"
          target="_blank"
          rel="noopener noreferrer"
          className={`
            fixed top-5 right-5 sm:top-6 sm:right-6 z-[100] 
            flex items-center gap-2 
            rounded-full px-3 py-2 sm:px-4 sm:py-2.5
            transition-all duration-300
            
                "bg-white/10 backdrop-blur-sm border border-white/10 hover:bg-white/20"
        
            hover:scale-105 active:scale-95
            group
          `}
        >
          <FaFileInvoice className="text-white text-sm sm:text-base flex-shrink-0 relative z-10" />
          <span className="text-white/90 text-xs sm:text-sm font-medium whitespace-nowrap hidden sm:inline">
            Download CV
          </span>
          <span className="text-white/80 text-[10px] sm:hidden whitespace-nowrap">
            CV
          </span>
        </a>
        <NavBar />

        <main className="h-[calc(100vh-80px)]">{children}</main>
      </div>
    </>
  );
}

export default layout;
