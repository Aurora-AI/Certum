"use client";

import { cn } from "@/lib/utils";
import React from "react";

interface PillarCardProps {
  eyebrow: string;
  title: string;
  subtitle: string;
  metric: React.ReactNode;
  className?: string;
}

/**
 * PillarCard V2 — Alinhado com o padrão do HERO
 *
 * Mudanças:
 * - Removido background com opacidade (era bg-white/65)
 * - Removido shadow pesado
 * - Adicionado fundo branco absoluto (#FFFFFF)
 * - Bordas sutis como no Hero (border-black/5)
 * - Título agora usa font-sans (Inter) como o Hero, não font-serif
 * - Subtitle agora usa cor neutra (não cyan)
 */
export function PillarCard({
  eyebrow,
  title,
  subtitle,
  metric,
  className,
}: PillarCardProps) {
  return (
    <article
      data-pillar-card
      className={cn(
        // Background: Branco absoluto, sem glassmorphism
        "relative overflow-hidden bg-white",
        // Borda sutil como no Hero (ink/5)
        "border border-black/5",
        // Hover: elevação sutil
        "transition-all duration-500 hover:border-black/10 hover:shadow-[0_8px_30px_rgba(0,0,0,0.04)]",
        // Padding generoso
        "px-8 pt-10 pb-8 md:px-10 md:pt-12 md:pb-10",
        className,
      )}
    >
      {/* Glow sutil no hover - gold accent mas bem discreto */}
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-700 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at 50% 100%, rgba(201,162,39,0.03) 0%, transparent 50%)",
        }}
      />

      <div className="relative z-10">
        {/* Header: Eyebrow + Status */}
        <div className="flex items-center justify-between gap-6">
          <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-black/40">
            {eyebrow}
          </span>
          <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-black/25">
            READY
          </span>
        </div>

        {/* Title: Agora usa font-sans (Inter) como o Hero headline, não serif */}
        <h3 className="mt-10 font-sans text-3xl md:text-4xl font-bold tracking-tight text-[#1A1A1A]">
          {title}
        </h3>

        {/* Subtitle: Cor neutra, sem cyan */}
        <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.25em] text-black/40">
          {subtitle}
        </p>

        {/* Metric área com linha separadora sutil */}
        <div className="mt-10 pt-8 border-t border-black/5">{metric}</div>
      </div>
    </article>
  );
}
