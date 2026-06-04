"use client";

import { ReactNode } from "react";
import "./index.css";
import NavBar from "@/components/layout/NavBar";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="overflow-hidden">
        <div className="background" />
        <div className="relative z-10 h-screen">
          <NavBar />

          <main className="h-[calc(100vh-80px)]">{children}</main>
        </div>
      </body>
    </html>
  );
}
