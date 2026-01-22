import { useEffect, useRef } from "react";
import gsap from "gsap";

import { useUISignals } from "@/hooks/useUISignals";

const MOOD_COLORS: Record<
  "void" | "warm" | "trust" | "success",
  { bg: string }
> = {
  void: { bg: "#050505" },
  warm: { bg: "#0f0a05" },
  trust: { bg: "#050a14" },
  success: { bg: "#050f05" },
};

export function SiteAtmosphere() {
  const { backgroundMood, accentColor } = useUISignals();
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const bg = bgRef.current;
    if (!bg) return;

    const target = MOOD_COLORS[backgroundMood] ?? MOOD_COLORS.void;
    const tween = gsap.to(bg, {
      backgroundColor: target.bg,
      duration: 2.5,
      ease: "power2.inOut",
      overwrite: "auto",
    });

    return () => {
      tween.kill();
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
      className="fixed inset-0 -z-50 pointer-events-none"
      style={{ backgroundColor: MOOD_COLORS.void.bg }}
    >
      <div
        className="absolute inset-0 opacity-[0.04] mix-blend-overlay sovereign-grain"
        style={{ backgroundImage: "url('/assets/noise.svg')" }}
      />

      <div
        className="absolute inset-0 opacity-40"
        style={{
          background:
            "radial-gradient(circle at 50% 0%, var(--accent-color-alpha) 0%, transparent 60%)",
          mixBlendMode: "screen",
        }}
      />
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

