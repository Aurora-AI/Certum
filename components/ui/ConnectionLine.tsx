"use client";

import { cn } from "@/lib/utils";

interface ConnectionLineProps {
  className?: string;
}

export function ConnectionLine({ className }: ConnectionLineProps) {
  return (
    <svg
      aria-hidden="true"
      className={cn("w-full h-28 md:h-32", className)}
      viewBox="0 0 1000 140"
      fill="none"
      preserveAspectRatio="none"
    >
      <path
        data-conn-path
        d="M 170 10 C 240 12, 320 25, 420 55 S 520 95, 500 115"
        stroke="rgba(0,0,0,0.20)"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        data-conn-path
        d="M 500 10 C 500 30, 500 70, 500 115"
        stroke="rgba(0,0,0,0.20)"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        data-conn-path
        d="M 830 10 C 760 12, 680 25, 580 55 S 480 95, 500 115"
        stroke="rgba(0,0,0,0.20)"
        strokeWidth="2"
        strokeLinecap="round"
      />

      <circle cx="500" cy="115" r="6" fill="rgba(0,0,0,0.35)" />
    </svg>
  );
}

