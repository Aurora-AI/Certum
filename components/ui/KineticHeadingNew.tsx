"use client";

import { useInView } from "framer-motion";
import { useMemo, useRef } from "react";

import { useScrambleText } from "@/hooks/useScrambleText";
import { cn } from "@/lib/utils";

interface KineticHeadingProps {
  title: string;
  subtitle?: string;
  textureUrl?: string;
  align?: "left" | "center" | "right";
  size?: "4xl" | "5xl" | "7xl";
  tone?: "light" | "dark";
  className?: string;
}

const SIZE_CLASS: Record<NonNullable<KineticHeadingProps["size"]>, string> = {
  "4xl": "text-4xl md:text-5xl",
  "5xl": "text-5xl md:text-6xl",
  "7xl": "text-6xl md:text-8xl",
};

export function KineticHeading({
  title,
  subtitle,
  textureUrl,
  align = "left",
  size = "7xl",
  tone = "dark",
  className,
}: KineticHeadingProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });

  const scrambled = useScrambleText(title, {
    duration: 1.4,
    delay: 0.05,
    speed: 40,
    active: inView,
  });

  const showCursor = useMemo(
    () => inView && scrambled !== title,
    [inView, scrambled, title],
  );

  return (
    <div
      ref={ref}
      className={cn(
        "w-full",
        align === "center"
          ? "text-center"
          : align === "right"
            ? "text-right"
            : "text-left",
        className,
      )}
    >
      {subtitle && (
        <div
          className={cn(
            "mb-4",
            align === "center"
              ? "flex justify-center"
              : align === "right"
                ? "flex justify-end"
                : "flex justify-start",
          )}
        >
          <span
            className={cn(
              "font-mono text-[10px] uppercase tracking-[0.35em]",
              tone === "light" ? "text-[#8A8A8A]" : "text-white/50",
            )}
          >
            {subtitle}
          </span>
        </div>
      )}

      <h2
        className={cn(
          "font-serif font-bold uppercase tracking-[-0.03em] leading-[0.95]",
          textureUrl
            ? "bg-center bg-cover bg-no-repeat text-transparent [background-clip:text] [-webkit-background-clip:text] [-webkit-text-fill-color:transparent]"
            : tone === "light"
              ? "text-[#1A1A1A]"
              : "text-white",
          SIZE_CLASS[size],
        )}
        aria-label={title}
        style={
          textureUrl
            ? { backgroundImage: `url("${textureUrl.replaceAll('"', "%22")}")` }
            : undefined
        }
      >
        <span className="tabular-nums">{scrambled}</span>
        {showCursor && (
          <span
            aria-hidden="true"
            className={cn(
              "inline-block ml-1 animate-pulse",
              tone === "light" ? "text-[#1A1A1A]/60" : "text-white/80",
            )}
          >
            ▍
          </span>
        )}
      </h2>
    </div>
  );
}

export default KineticHeading;
