"use client";

import { KineticHeading } from "@/components/ui/KineticHeadingNew";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef, useState } from "react";

// ═══════════════════════════════════════════════════════════════════════════
// THE GENESIS PROTOCOL — BLOCO 4
// Pinned Timeline with Horizontal Reveal
// Blueprint: docs/CERTUM_MASTER_BLUEPRINT_V2.md
// ═══════════════════════════════════════════════════════════════════════════

interface Phase {
  number: string;
  title: string;
  duration: string;
  description: string;
  details: string[];
}

const PHASES: Phase[] = [
  {
    number: "01",
    title: "ANÁLISE",
    duration: "72 horas",
    description:
      "Mapeamos seu patrimônio atual, seus objetivos e seu apetite por risco.",
    details: [
      "Diagnóstico patrimonial completo",
      "Análise de fluxo de caixa",
      "Mapeamento de oportunidades",
      "Definição de metas de alavancagem",
    ],
  },
  {
    number: "02",
    title: "ESTRATÉGIA",
    duration: "7 dias",
    description:
      "Desenhamos a arquitetura de alavancagem ideal com simulações de Monte Carlo.",
    details: [
      "Modelagem de cenários",
      "Simulações estatísticas",
      "Estruturação do portfólio",
      "Plano de execução detalhado",
    ],
  },
  {
    number: "03",
    title: "EXECUÇÃO",
    duration: "30 dias",
    description:
      "Ativamos as cartas, os seguros e a blindagem patrimonial em paralelo.",
    details: [
      "Abertura de cartas de consórcio",
      "Contratação de seguros",
      "Implementação de proteção patrimonial",
      "Monitoramento contínuo",
    ],
  },
];

export default function GenesisProtocol() {
  const sectionRef = useRef<HTMLElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const [activePhase, setActivePhase] = useState(0);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const section = sectionRef.current;
    const timeline = timelineRef.current;
    const progress = progressRef.current;
    if (!section || !timeline || !progress) return;

    const phases = timeline.querySelectorAll("[data-phase]");
    const checkpoints = timeline.querySelectorAll("[data-checkpoint]");

    // Main pinned timeline
    const mainTl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: "+=300%",
        pin: true,
        scrub: 1,
        onUpdate: (self) => {
          const newPhase = Math.min(
            Math.floor(self.progress * PHASES.length),
            PHASES.length - 1,
          );
          setActivePhase(newPhase);
        },
      },
    });

    // Progress bar animation
    mainTl.to(progress, {
      scaleY: 1,
      ease: "none",
    });

    // Phase transitions
    phases.forEach((phase, index) => {
      const phaseProgress = index / PHASES.length;
      const nextProgress = (index + 1) / PHASES.length;

      // Activate phase
      mainTl.to(
        phase,
        {
          opacity: 1,
          x: 0,
          duration: 0.1,
        },
        phaseProgress,
      );

      // Activate checkpoint
      if (checkpoints[index]) {
        mainTl.to(
          checkpoints[index],
          {
            scale: 1.3,
            backgroundColor: "#C9A227",
            duration: 0.05,
          },
          phaseProgress,
        );

        mainTl.to(
          checkpoints[index],
          {
            scale: 1,
            duration: 0.05,
          },
          phaseProgress + 0.05,
        );
      }

      // Deactivate phase (except last)
      if (index < PHASES.length - 1) {
        mainTl.to(
          phase,
          {
            opacity: 0.3,
            duration: 0.1,
          },
          nextProgress - 0.05,
        );
      }
    });

    return () => {
      mainTl.kill();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="genesis-protocol"
      className="relative min-h-screen bg-transparent"
      aria-label="Genesis Protocol - Metodologia"
    >
      <div className="relative max-w-[1800px] mx-auto px-6 md:px-12 py-24 md:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-start">
          {/* Left: Header (sticky on desktop) */}
          <div className="lg:col-span-5 lg:sticky lg:top-32">
            <KineticHeading
              title="GENESIS PROTOCOL"
              subtitle="// METODOLOGIA"
              align="left"
              tone="light"
              size="6xl"
            />

            <p className="mt-6 text-[#8A8A8A] leading-relaxed">
              Três fases de precisão cirúrgica transformam seu patrimônio em uma
              máquina de alavancagem soberana. Sem atalhos, sem fricção
              bancária.
            </p>

            {/* Phase indicator */}
            <div className="mt-12 hidden lg:block">
              <div className="flex items-center gap-4">
                {PHASES.map((phase, index) => (
                  <div
                    key={phase.number}
                    className={`
                      flex items-center justify-center w-12 h-12 
                      font-mono text-lg font-bold rounded-full
                      transition-all duration-500
                      ${
                        index === activePhase
                          ? "bg-[#C9A227] text-white scale-110"
                          : index < activePhase
                            ? "bg-[#1A1A1A] text-white"
                            : "bg-[#E5E5E5] text-[#8A8A8A]"
                      }
                    `}
                  >
                    {phase.number}
                  </div>
                ))}
              </div>
              <p className="mt-4 font-mono text-sm text-[#8A8A8A] uppercase tracking-[0.2em]">
                Fase {PHASES[activePhase]?.title || "01"}
              </p>
            </div>
          </div>

          {/* Right: Timeline */}
          <div ref={timelineRef} className="lg:col-span-7 relative">
            {/* Progress Line */}
            <div className="absolute left-6 top-0 bottom-0 w-px bg-[#E5E5E5] hidden md:block">
              <div
                ref={progressRef}
                className="absolute top-0 left-0 w-full bg-[#C9A227] origin-top"
                style={{ transform: "scaleY(0)", height: "100%" }}
              />
            </div>

            {/* Phases */}
            <div className="space-y-16 md:space-y-24 md:pl-16">
              {PHASES.map((phase, index) => (
                <div
                  key={phase.number}
                  data-phase
                  className={`
                    relative transition-all duration-500
                    ${
                      index === activePhase
                        ? "opacity-100"
                        : "opacity-30 translate-x-4"
                    }
                  `}
                >
                  {/* Checkpoint */}
                  <div
                    data-checkpoint
                    className={`
                      absolute -left-16 top-0 w-4 h-4 rounded-full
                      border-2 transition-all duration-300 hidden md:block
                      ${
                        index <= activePhase
                          ? "bg-[#C9A227] border-[#C9A227]"
                          : "bg-white border-[#E5E5E5]"
                      }
                    `}
                    style={{ transform: "translateX(-50%)" }}
                  />

                  {/* Phase Content */}
                  <div className="bg-transparent border border-black/5 p-8 md:p-10">
                    {/* Header */}
                    <div className="flex items-start justify-between gap-6">
                      <div>
                        <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#8A8A8A]">
                          Fase
                        </span>
                        <div className="flex items-baseline gap-4 mt-1">
                          <span
                            className="font-serif text-6xl md:text-7xl font-bold"
                            style={{
                              color:
                                index === activePhase ? "#C9A227" : "#1A1A1A",
                            }}
                          >
                            {phase.number}
                          </span>
                          <span className="font-mono text-lg md:text-xl uppercase tracking-[0.15em] text-[#1A1A1A]">
                            {phase.title}
                          </span>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#8A8A8A]">
                          Duração
                        </span>
                        <p className="font-bold text-xl text-[#1A1A1A] mt-1">
                          {phase.duration}
                        </p>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="mt-8 text-lg text-[#1A1A1A] leading-relaxed font-medium">
                      "{phase.description}"
                    </p>

                    {/* Details */}
                    <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
                      {phase.details.map((detail, i) => (
                        <div key={i} className="flex items-center gap-3">
                          <div className="w-1.5 h-1.5 bg-[#C9A227] rounded-full flex-shrink-0" />
                          <span className="font-mono text-sm text-[#8A8A8A]">
                            {detail}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
