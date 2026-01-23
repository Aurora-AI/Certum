"use client";

import gsap from "gsap";
import { useEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";

interface NumberTickerProps {
  value: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
  active?: boolean;
  className?: string;
}

/**
 * NumberTicker V2 — Alinhado com o padrão do HERO
 *
 * Mudanças:
 * - Font: Agora usa font-sans (Inter) como os stats do Hero (text-4xl font-bold)
 * - Removido font-mono dos números grandes (mono é só para labels pequenos)
 * - Mantida animação GSAP
 */
export function NumberTicker({
  value,
  decimals = 1,
  prefix,
  suffix,
  duration = 1.2,
  active = true,
  className,
}: NumberTickerProps) {
  const [display, setDisplay] = useState(0);
  const tweenRef = useRef<gsap.core.Tween | null>(null);
  const startedRef = useRef(false);

  useEffect(() => {
    if (!active || startedRef.current) return;
    startedRef.current = true;

    const target = { n: 0 };
    tweenRef.current = gsap.to(target, {
      n: value,
      duration,
      ease: "power2.out",
      onUpdate: () => setDisplay(target.n),
    });

    return () => {
      tweenRef.current?.kill();
      tweenRef.current = null;
    };
  }, [active, value, duration]);

  const formatted = display.toFixed(decimals);

  return (
    <span
      className={cn(
        // Hero stats pattern: font-sans (Inter), bold, tracking-tight
        "font-sans font-bold tabular-nums tracking-tight text-[#1A1A1A]",
        className,
      )}
    >
      {prefix}
      {formatted}
      {suffix}
    </span>
  );
}
