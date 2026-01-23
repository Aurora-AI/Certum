"use client";

import { KineticHeading } from "@/components/ui/KineticHeadingNew";
import { NumberTicker } from "@/components/ui/NumberTicker";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef, useState } from "react";

// ═══════════════════════════════════════════════════════════════════════════
// SYSTEM PROOF — BLOCO 5
// Data Bento Grid - Dashboard de Performance
// Blueprint: docs/CERTUM_MASTER_BLUEPRINT_V2.md
// ═══════════════════════════════════════════════════════════════════════════

interface DataCardProps {
  label: string;
  value: number;
  suffix?: string;
  prefix?: string;
  decimals?: number;
  trend?: number;
  size?: "small" | "medium" | "large";
  sparkData?: number[];
  active?: boolean;
}

function DataCard({
  label,
  value,
  suffix = "",
  prefix = "",
  decimals = 0,
  trend,
  size = "small",
  sparkData,
  active = false,
}: DataCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  const sizeClasses = {
    small: "col-span-1",
    medium: "col-span-1 md:col-span-1",
    large: "col-span-1 md:col-span-2",
  };

  return (
    <div
      ref={cardRef}
      data-data-card
      className={`
        ${sizeClasses[size]}
        bg-transparent border border-black/5 p-6 md:p-8
        transition-all duration-300
        hover:shadow-xl hover:shadow-black/5 hover:border-[#C9A227]/30
        group
      `}
    >
      {/* Label */}
      <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#8A8A8A]">
        {label}
      </span>

      {/* Value */}
      <div className="mt-3 flex items-baseline gap-2">
        {prefix && (
          <span className="font-mono text-sm text-[#8A8A8A]">{prefix}</span>
        )}
        <NumberTicker
          value={value}
          decimals={decimals}
          suffix={suffix}
          active={active}
          className={`
            font-bold tracking-tight
            ${size === "large" ? "text-5xl md:text-6xl" : "text-3xl md:text-4xl"}
            text-[#1A1A1A] group-hover:text-[#C9A227] transition-colors duration-300
          `}
        />
      </div>

      {/* Trend */}
      {trend !== undefined && (
        <div className="mt-3 flex items-center gap-2">
          <span
            className={`
              font-mono text-sm font-bold
              ${trend >= 0 ? "text-[#00C853]" : "text-red-500"}
            `}
          >
            {trend >= 0 ? "▲" : "▼"} {Math.abs(trend)}%
          </span>
          <span className="font-mono text-[10px] text-[#8A8A8A] uppercase">
            vs. ano anterior
          </span>
        </div>
      )}

      {/* Sparkline (simplified) */}
      {sparkData && (
        <div className="mt-4 h-12 flex items-end gap-1">
          {sparkData.map((val, i) => (
            <div
              key={i}
              className="flex-1 bg-[#E5E5E5] group-hover:bg-[#C9A227]/30 transition-colors duration-300"
              style={{
                height: `${(val / Math.max(...sparkData)) * 100}%`,
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function QuoteCard() {
  return (
    <div
      data-data-card
      className="col-span-1 md:col-span-3 bg-transparent border border-black/5 p-8 md:p-12"
    >
      <blockquote className="relative">
        <span className="absolute -top-4 -left-2 text-6xl text-black/10 font-serif">
          "
        </span>
        <p className="text-xl md:text-2xl text-[#1A1A1A] leading-relaxed font-medium pl-8">
          Desde 1949, mais de R$ 180 bilhões em créditos liberados para
          brasileiros construírem patrimônio. A Certum é a evolução desse legado
          para a nova economia.
        </p>
        <footer className="mt-6 pl-8">
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#8A8A8A]">
            — ECOSSISTEMA RODOBENS
          </span>
        </footer>
      </blockquote>
    </div>
  );
}

// Mock sparkline data
const TVL_SPARK = [45, 52, 48, 61, 55, 67, 72, 68, 85, 78, 92, 100];
const YIELD_SPARK = [12, 14, 13, 15, 14, 16, 17, 16, 18, 17, 19, 18];

export default function SystemProof() {
  const sectionRef = useRef<HTMLElement>(null);
  const [tickersActive, setTickersActive] = useState(false);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const section = sectionRef.current;
    if (!section) return;

    const cards = section.querySelectorAll("[data-data-card]");

    // Initial animation
    gsap.set(cards, { opacity: 0, y: 30 });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top 70%",
        once: true,
        onEnter: () => setTickersActive(true),
      },
    });

    tl.to(cards, {
      opacity: 1,
      y: 0,
      stagger: {
        amount: 0.5,
        from: "start",
      },
      duration: 0.6,
      ease: "power3.out",
    });

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="system-proof"
      className="relative py-24 md:py-32 bg-transparent"
      aria-label="System Proof - Dashboard de Performance"
    >
      {/* Trust atmosphere overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-10"
        style={{
          background:
            "linear-gradient(180deg, transparent 0%, rgba(0, 100, 200, 0.05) 100%)",
        }}
      />

      <div className="relative max-w-[1800px] mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="max-w-4xl mb-16">
          <KineticHeading
            title="SYSTEM PROOF"
            subtitle="// PERFORMANCE DO ECOSSISTEMA"
            align="left"
            tone="light"
            size="7xl"
          />
          <p className="mt-6 text-[#8A8A8A] leading-relaxed max-w-xl">
            Dados em tempo real do ecossistema Certum. Transparência é a
            fundação da confiança.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          {/* Large Card: TVL */}
          <DataCard
            label="Volume de Negócios"
            prefix="R$"
            value={17.8}
            suffix="Bi"
            decimals={1}
            trend={11.0}
            size="large"
            sparkData={TVL_SPARK}
            active={tickersActive}
          />

          {/* Medium Card: Yield */}
          <DataCard
            label="Economia Real"
            value={32.4}
            suffix="%"
            decimals={1}
            trend={4.5}
            size="medium"
            active={tickersActive}
          />

          {/* Small Cards Row */}
          <DataCard
            label="Rating Fitch"
            prefix="AA+"
            value={0}
            suffix="(bra)"
            decimals={0}
            size="small"
            active={tickersActive}
          />

          <DataCard
            label="Market Share"
            value={3.0}
            suffix="%"
            size="small"
            active={tickersActive}
          />

          <DataCard
            label="Ativos Geridos"
            prefix="R$"
            value={15.8}
            suffix="Bi"
            size="small"
            active={tickersActive}
          />

          {/* Quote Card - Full Width */}
          <div
            data-data-card
            className="col-span-1 md:col-span-3 bg-transparent border border-black/5 p-8 md:p-12"
          >
            <blockquote className="relative">
              <span className="absolute -top-4 -left-2 text-6xl text-black/10 font-serif">
                "
              </span>
              <p className="text-xl md:text-2xl text-[#1A1A1A] leading-relaxed font-medium pl-8">
                A única do setor com Rating Público AA+ Fitch. Mais de R$ 17
                Bilhões em negócios gerados em 2024. Isso não é sorte. É solidez
                de balanço e governança corporativa de nível global.
              </p>
              <footer className="mt-6 pl-8">
                <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#8A8A8A]">
                  — RELATÓRIO DE INVESTIDORES 2026
                </span>
              </footer>
            </blockquote>
          </div>
        </div>

        {/* Trust Badges */}
        <div className="mt-16 flex flex-wrap items-center justify-center gap-8 md:gap-12">
          {["FITCH AA+", "B3 LISTED", "BACEN REGULATED", "SUSEP"].map(
            (badge) => (
              <div
                key={badge}
                className="flex items-center gap-2 opacity-40 hover:opacity-100 transition-opacity"
              >
                <div className="w-2 h-2 bg-[#00C853] rounded-full" />
                <span className="font-mono text-xs uppercase tracking-[0.2em] text-[#8A8A8A]">
                  {badge}
                </span>
              </div>
            ),
          )}
        </div>
      </div>
    </section>
  );
}
