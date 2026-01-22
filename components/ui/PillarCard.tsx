"use client";

import { cn } from "@/lib/utils";

interface PillarCardProps {
  eyebrow: string;
  title: string;
  subtitle: string;
  metric: React.ReactNode;
  className?: string;
}

export function PillarCard({ eyebrow, title, subtitle, metric, className }: PillarCardProps) {
  return (
    <article
      data-pillar-card
      className={cn(
        "relative overflow-hidden rounded bg-white/65 backdrop-blur-sm border border-black/5 shadow-[0_20px_70px_rgba(0,0,0,0.08)]",
        "px-8 pt-10 pb-8 md:px-10 md:pt-12 md:pb-10",
        className,
      )}
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-700 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at 20% 0%, rgba(0,0,0,0.05) 0%, transparent 60%), radial-gradient(circle at 100% 90%, rgba(201,162,39,0.12) 0%, transparent 55%)",
        }}
      />

      <div className="relative z-10">
        <div className="flex items-center justify-between gap-6">
          <span className="font-mono text-[10px] uppercase tracking-[0.35em] text-[#8A8A8A]">
            {eyebrow}
          </span>
          <span className="font-mono text-[10px] uppercase tracking-[0.35em] text-black/30">
            READY
          </span>
        </div>

        <h3 className="mt-10 font-serif text-3xl md:text-4xl tracking-tight text-[#1A1A1A]">
          {title}
        </h3>
        <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.35em] text-black/45">
          {subtitle}
        </p>

        <div className="mt-10 pt-8 border-t border-black/5">{metric}</div>
      </div>
    </article>
  );
}

