"use client";

import { useEffect, useState } from "react";

interface LoaderProps {
  fullScreen?: boolean;
  text?: string;
}

export default function Loader({
  fullScreen = true,
  text = "Loading",
}: LoaderProps) {
  const [dots, setDots] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prev) => {
        if (prev.length >= 3) return "";
        return prev + ".";
      });
    }, 400);

    return () => clearInterval(interval);
  }, []);

  const content = (
    <div className="flex flex-col items-center justify-center gap-5">
      {/* Gul Container */}
      <div className="relative">
        {/* Outer Glow */}
        <div className="absolute -inset-4 rounded-full bg-white/5 blur-xl" />

        {/* Gul Barglari */}
        <div className="relative h-32 w-32">
          {/* 8 ta gul barglari */}
          {[...Array(8)].map((_, i) => {
            const angle = (i * 360) / 8;
            const radian = (angle * Math.PI) / 180;
            const x = Math.cos(radian) * 35;
            const y = Math.sin(radian) * 35;

            return (
              <div
                key={i}
                className="absolute left-1/2 top-1/2"
                style={{
                  transform: `translate(-50%, -50%) translate(${x}px, ${y}px)`,
                }}
              >
                <div
                  className="h-8 w-8 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 animate-pulse"
                  style={{
                    animationDelay: `${i * 0.1}s`,
                    animationDuration: "1.5s",
                  }}
                />
              </div>
            );
          })}

          {/* 2-qavat barglar (kichikroq) */}
          {[...Array(8)].map((_, i) => {
            const angle = (i * 360) / 8 + 22.5;
            const radian = (angle * Math.PI) / 180;
            const x = Math.cos(radian) * 20;
            const y = Math.sin(radian) * 20;

            return (
              <div
                key={`inner-${i}`}
                className="absolute left-1/2 top-1/2"
                style={{
                  transform: `translate(-50%, -50%) translate(${x}px, ${y}px)`,
                }}
              >
                <div
                  className="h-5 w-5 rounded-full bg-white/20 backdrop-blur-sm border border-white/10 animate-spin"
                  style={{
                    animationDuration: "2s",
                    animationDirection: i % 2 === 0 ? "normal" : "reverse",
                  }}
                />
              </div>
            );
          })}

          {/* Spinning Rings (gul markazi) */}
          <div className="absolute inset-0 rounded-full">
            <div className="absolute inset-0 rounded-full border-2 border-white/20 border-t-white/90 animate-spin" />
          </div>

          <div className="absolute inset-2 rounded-full">
            <div
              className="absolute inset-0 rounded-full border-2 border-white/10 border-b-white/70 animate-spin"
              style={{
                animationDirection: "reverse",
                animationDuration: "0.8s",
              }}
            />
          </div>

          {/* Center Dot (gul markazi) */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="h-3 w-3 rounded-full bg-white/90 shadow-lg animate-pulse" />
          </div>
        </div>
      </div>

      {/* Loading Text */}
      <div className="flex items-center gap-1 font-medium text-white/80">
        <span>{text}</span>
        <span className="min-w-[24px] text-white/90">{dots}</span>
      </div>
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 z-[9999] flex items-center justify-center">
        {/* macOS Window Style */}
        <div className="relative rounded-2xl p-12 shadow-2xl">{content}</div>
      </div>
    );
  }

  return (
    <div className="flex min-h-[200px] items-center justify-center rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 p-8 shadow-lg">
      {content}
    </div>
  );
}
