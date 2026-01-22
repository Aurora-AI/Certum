"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

import { useUISignals } from "@/hooks/useUISignals";

const MOOD_COLORS = {
  void: { bg: "#F2F2F2", pattern: 0.05 },
  warm: { bg: "#F5F0E6", pattern: 0.08 },
  trust: { bg: "#E6EDF5", pattern: 0.05 },
  success: { bg: "#E6F5E6", pattern: 0.05 },
} as const;

export function SiteAtmosphere() {
  const { backgroundMood, accentColor } = useUISignals();
  const bgRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const bg = bgRef.current;
    if (!bg) return;

    const mode = backgroundMood in MOOD_COLORS ? backgroundMood : "void";
    const target = MOOD_COLORS[mode as keyof typeof MOOD_COLORS];

    const bgTween = gsap.to(bg, {
      backgroundColor: target.bg,
      duration: 2.0,
      ease: "power2.inOut",
      overwrite: "auto",
    });

    const gridTween = gsap.to(gridRef.current, {
      opacity: target.pattern,
      duration: 1.5,
      overwrite: "auto",
    });

    return () => {
      bgTween.kill();
      gridTween.kill();
    };
  }, [backgroundMood]);

  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty("--accent-color", accentColor);
    root.style.setProperty("--accent-color-alpha", hexToRgba(accentColor, 0.35));
  }, [accentColor]);

  return (
    <div
      ref={bgRef}
      className="fixed inset-0 -z-50 pointer-events-none transition-colors"
      style={{ backgroundColor: MOOD_COLORS.void.bg }}
    >
      <div
        className="absolute inset-0 opacity-[0.4] mix-blend-multiply pointer-events-none"
        style={{ backgroundImage: "url('/assets/noise.svg')" }}
      />

      <div
        ref={gridRef}
        className="absolute inset-0 opacity-[0.05] pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(#000000 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_50%,rgba(0,0,0,0.05)_100%)] pointer-events-none" />
    </div>
  );
}

function hexToRgba(hex: string, alpha: number) {
  const normalized = hex.trim().replace("#", "");
  if (normalized.length !== 6) return `rgba(201, 162, 39, ${alpha})`;

  const r = Number.parseInt(normalized.slice(0, 2), 16);
  const g = Number.parseInt(normalized.slice(2, 4), 16);
  const b = Number.parseInt(normalized.slice(4, 6), 16);

  if ([r, g, b].some((v) => Number.isNaN(v))) return `rgba(201, 162, 39, ${alpha})`;

  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}
