import React, { useEffect, useRef } from "react";
import gsap from "gsap";

import { useUISignals } from "@/hooks/useUISignals";

const MOOD_COLORS = {
  void: {
    primary: "#0A0A0A",
    secondary: "#0A0A0A",
    accent: "#C9A227",
    accentAlpha: "rgba(201, 162, 39, 0.3)",
  },
  warm: {
    primary: "#0A0A0A",
    secondary: "#1A1508",
    accent: "#C9A227",
    accentAlpha: "rgba(201, 162, 39, 0.4)",
  },
  trust: {
    primary: "#0A0A0A",
    secondary: "#08101A",
    accent: "#4A9CC9",
    accentAlpha: "rgba(74, 156, 201, 0.3)",
  },
  success: {
    primary: "#0A0A0A",
    secondary: "#081A10",
    accent: "#27C96B",
    accentAlpha: "rgba(39, 201, 107, 0.3)",
  },
} as const;

interface SiteAtmosphereProps {
  children: React.ReactNode;
}

export function SiteAtmosphere({ children }: SiteAtmosphereProps) {
  const { backgroundMood, accentColor } = useUISignals();
  const containerRef = useRef<HTMLDivElement>(null);
  const previousMoodRef = useRef(backgroundMood);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const colors = MOOD_COLORS[backgroundMood] ?? MOOD_COLORS.void;

    if (previousMoodRef.current === backgroundMood) {
      gsap.set(container, {
        "--bg-primary": colors.primary,
        "--bg-secondary": colors.secondary,
        "--accent-color": colors.accent,
        "--accent-color-alpha": colors.accentAlpha,
        "--transition-glow": 0,
      } as Record<string, string | number>);
      return;
    }

    const tl = gsap.timeline();

    tl.to(
      container,
      {
        "--bg-primary": colors.primary,
        "--bg-secondary": colors.secondary,
        duration: 2,
        ease: "power2.inOut",
      } as Record<string, string | number>,
      0,
    );

    tl.to(
      container,
      {
        "--accent-color": colors.accent,
        "--accent-color-alpha": colors.accentAlpha,
        duration: 1.8,
        ease: "power2.inOut",
      } as Record<string, string | number>,
      0.2,
    );

    tl.to(
      container,
      {
        "--transition-glow": 0.15,
        duration: 0.5,
        ease: "power2.in",
      } as Record<string, string | number>,
      0,
    );

    tl.to(
      container,
      {
        "--transition-glow": 0,
        duration: 1.5,
        ease: "power2.out",
      } as Record<string, string | number>,
      0.5,
    );

    previousMoodRef.current = backgroundMood;

    return () => {
      tl.kill();
      gsap.set(container, {
        "--transition-glow": 0,
      } as Record<string, string | number>);
    };
  }, [backgroundMood]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || !accentColor) return;

    const tween = gsap.to(container, {
      "--accent-color": accentColor,
      duration: 1.5,
      ease: "power2.inOut",
    } as Record<string, string | number>);

    return () => tween.kill();
  }, [accentColor]);

  return (
    <div
      ref={containerRef}
      className="site-atmosphere"
      style={
        {
          ["--bg-primary" as const]: MOOD_COLORS.void.primary,
          ["--bg-secondary" as const]: MOOD_COLORS.void.secondary,
          ["--accent-color" as const]: MOOD_COLORS.void.accent,
          ["--accent-color-alpha" as const]: MOOD_COLORS.void.accentAlpha,
          ["--transition-glow" as const]: 0,
        } as React.CSSProperties
      }
    >
      <div
        className="fixed inset-0 -z-10 transition-none"
        style={{
          background: `
            radial-gradient(
              ellipse 80% 50% at 50% -20%,
              var(--accent-color-alpha),
              transparent
            ),
            linear-gradient(
              to bottom,
              var(--bg-primary),
              var(--bg-secondary)
            )
          `,
        }}
      />

      <div
        className="fixed inset-0 -z-5 pointer-events-none transition-none"
        style={{
          background: "radial-gradient(circle at 50% 50%, var(--accent-color-alpha), transparent 70%)",
          opacity: "var(--transition-glow)",
        }}
      />

      {children}
    </div>
  );
}
