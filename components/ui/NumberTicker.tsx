"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

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
    <span className={cn("font-mono tabular-nums tracking-tight text-[#1A1A1A]", className)}>
      {prefix}
      {formatted}
      {suffix}
    </span>
  );
}
