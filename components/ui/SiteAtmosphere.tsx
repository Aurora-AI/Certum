"use client";

import { useUISignals } from "@/hooks/useUISignals";
import { useEffect } from "react";

// Absolute White Atmosphere: static white canvas with subtle texture overlays
export function SiteAtmosphere() {
  const { accentColor } = useUISignals();

  useEffect(() => {
    document.documentElement.style.setProperty("--accent-color", accentColor);
  }, [accentColor]);

  return (
    <div className="fixed inset-0 -z-50 pointer-events-none bg-white">
      {/* 1. NOISE (very subtle film grain) */}
      <div
        className="absolute inset-0 opacity-[0.03] mix-blend-darken pointer-events-none"
        style={{ backgroundImage: "url('/assets/noise.svg')" }}
      />

      {/* 2. GRID (mathematical thin strokes) */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      {/* 3. White vignette to focus center */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,white_120%)] pointer-events-none" />
    </div>
  );
}
