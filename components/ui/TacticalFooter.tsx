"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef, useState } from "react";
import ContactModal from "./ContactModal";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function TacticalFooter() {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const signatureRef = useRef<HTMLDivElement>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Animação de Entrada via ScrollTrigger
  useGSAP(
    () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top center",
          end: "bottom center",
          scrub: 1.2,
          markers: false,
        },
      });

      // Título: Fade in + Scale up
      tl.fromTo(
        titleRef.current,
        {
          opacity: 0,
          scale: 0.8,
          y: 50,
        },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
        },
        0,
      );

      // Subtítulo: Fade in + Slide from bottom
      tl.fromTo(
        subtitleRef.current,
        {
          opacity: 0,
          y: 30,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
        },
        0.2,
      );

      // Botões: Stagger
      tl.fromTo(
        buttonsRef.current?.querySelectorAll("button") || [],
        {
          opacity: 0,
          x: -20,
        },
        {
          opacity: 1,
          x: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: "power2.out",
        },
        0.4,
      );

      // Assinatura: Fade in último
      tl.fromTo(
        signatureRef.current,
        {
          opacity: 0,
        },
        {
          opacity: 0.7,
          duration: 0.8,
          ease: "power2.out",
        },
        0.6,
      );
    },
    { scope: containerRef },
  );

  // Efeito hover nos botões
  const handleButtonHover = (
    e: React.MouseEvent<HTMLButtonElement>,
    isEnter: boolean,
  ) => {
    gsap.to(e.currentTarget, {
      scale: isEnter ? 1.05 : 1,
      duration: 0.3,
      ease: "power2.out",
    });
  };

  return (
    <section
      ref={containerRef}
      className="relative w-full min-h-[70vh] bg-[#050505] text-white flex flex-col items-center justify-center overflow-hidden border-t border-slate-800"
    >
      {/* BACKGROUND: Dados Técnicos Fluindo */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              repeating-linear-gradient(
                90deg,
                transparent,
                transparent 2px,
                rgba(6, 182, 212, 0.03) 2px,
                rgba(6, 182, 212, 0.03) 4px
              )
            `,
            animation: "slide 20s linear infinite",
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              repeating-linear-gradient(
                0deg,
                transparent,
                transparent 2px,
                rgba(6, 182, 212, 0.03) 2px,
                rgba(6, 182, 212, 0.03) 4px
              )
            `,
            animation: "slide-v 15s linear infinite reverse",
          }}
        />
      </div>

      {/* Grid de Fundo Técnico */}
      <div
        className="absolute inset-0 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle, #ffffff 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />

      {/* Conteúdo Principal */}
      <div className="relative z-10 container mx-auto px-6 py-20 flex flex-col items-center justify-center text-center gap-12 h-full">
        {/* Linha Técnica Superior */}
        <div className="w-32 h-[1px] bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />

        {/* Título Principal */}
        <div ref={titleRef} className="max-w-4xl">
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-light tracking-tight mb-4">
            INITIATE PROTOCOL
          </h1>
          <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent mt-8" />
        </div>

        {/* Subtítulo Descritivo */}
        <div ref={subtitleRef} className="max-w-2xl">
          <p className="text-lg md:text-xl text-slate-300 font-light leading-relaxed">
            Comece sua jornada de riqueza blindada hoje mesmo.
            <br />
            Consultoria estratégica, estrutura fiscal otimizada, legado
            protegido.
          </p>
          <p className="text-sm md:text-base text-cyan-500/70 font-mono mt-6 tracking-wide">
            // FALE COM UM ESPECIALISTA CERTUM
          </p>
        </div>

        {/* Botões de Ação */}
        <div ref={buttonsRef} className="flex flex-col md:flex-row gap-6 mt-8">
          {/* Botão WhatsApp */}
          <a
            href="https://wa.me/5541999999999?text=Gostaria%20de%20conhecer%20mais%20sobre%20os%20servi%C3%A7os%20Certum"
            target="_blank"
            rel="noopener noreferrer"
            className="group"
          >
            <button
              onMouseEnter={(e) => handleButtonHover(e, true)}
              onMouseLeave={(e) => handleButtonHover(e, false)}
              className="relative px-8 md:px-12 py-4 md:py-5 bg-white text-black font-mono text-sm md:text-base uppercase tracking-widest font-bold transition-all duration-300 hover:bg-cyan-400 border border-white hover:border-cyan-400"
            >
              <span className="flex items-center gap-3">
                <span className="text-lg">💬</span>
                WhatsApp Direto
              </span>
            </button>
          </a>

          {/* Botão Formulário */}
          <button
            onMouseEnter={(e) => handleButtonHover(e, true)}
            onMouseLeave={(e) => handleButtonHover(e, false)}
            onClick={() => setIsModalOpen(true)}
            className="relative px-8 md:px-12 py-4 md:py-5 bg-transparent text-white font-mono text-sm md:text-base uppercase tracking-widest font-bold border-2 border-white/40 transition-all duration-300 hover:border-white hover:bg-white/5 group"
          >
            <span className="flex items-center gap-3">
              <span className="text-lg">📋</span>
              Agendar Reunião
            </span>

            {/* Cantos Técnicos */}
            <span className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-white/30 group-hover:border-white transition-colors" />
            <span className="absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 border-white/30 group-hover:border-white transition-colors" />
            <span className="absolute bottom-0 left-0 w-2 h-2 border-b-2 border-l-2 border-white/30 group-hover:border-white transition-colors" />
            <span className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-white/30 group-hover:border-white transition-colors" />
          </button>
        </div>

        {/* Linha Técnica Inferior */}
        <div className="w-32 h-[1px] bg-gradient-to-r from-transparent via-cyan-500 to-transparent mt-12" />

        {/* Assinatura Mad Lab Aurora */}
        <div
          ref={signatureRef}
          className="mt-12 pt-12 border-t border-white/10 text-center space-y-4"
        >
          <div className="space-y-2">
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-cyan-500">
              ENGINEERED BY
            </p>
            <h3 className="text-2xl md:text-3xl font-serif font-light text-white">
              Mad Lab Aurora
            </h3>
            <p className="font-light text-slate-400 text-sm">
              Engenheiros de Riqueza | Consultoria Estratégica em Patrimônio
            </p>
          </div>

          <div className="pt-6 border-t border-white/10 mt-6">
            <p className="font-mono text-[9px] text-slate-600 uppercase tracking-[0.2em]">
              Certum Wealth OS v2.0 © 2026 | Curitiba, Brasil
            </p>
            <p className="font-mono text-[8px] text-slate-700 mt-2">
              Powered by GSAP • Zustand • Framer Motion • TypeScript
            </p>
          </div>
        </div>
      </div>

      {/* CSS Animation (Sliding background) */}
      <style>{`
        @keyframes slide {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }

        @keyframes slide-v {
          0% {
            transform: translateY(-100%);
          }
          100% {
            transform: translateY(100%);
          }
        }
      `}</style>

      {/* Modal de Contato */}
      <ContactModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </section>
  );
}
