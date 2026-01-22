"use client";

import { useScrambleText } from "@/hooks/useScrambleText";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, Mail, MapPin, Phone } from "lucide-react";
import { useEffect, useRef, useState } from "react";

// ═══════════════════════════════════════════════════════════════════════════
// MISSION COMMAND — BLOCO 6
// Dark Contrast Footer - Conversão Final
// Blueprint: docs/CERTUM_MASTER_BLUEPRINT_V2.md
// ═══════════════════════════════════════════════════════════════════════════

interface FooterLink {
  label: string;
  href: string;
}

interface FooterColumn {
  title: string;
  links: FooterLink[];
}

const FOOTER_COLUMNS: FooterColumn[] = [
  {
    title: "PRODUTOS",
    links: [
      { label: "Consórcio", href: "/consorcio" },
      { label: "Seguros", href: "/seguros" },
      { label: "Wealth Advisory", href: "/wealth" },
      { label: "Private Banking", href: "/private" },
    ],
  },
  {
    title: "EMPRESA",
    links: [
      { label: "Sobre a Certum", href: "/sobre" },
      { label: "Carreiras", href: "/carreiras" },
      { label: "Imprensa", href: "/imprensa" },
      { label: "Contato", href: "/contato" },
    ],
  },
  {
    title: "LEGAL",
    links: [
      { label: "Privacidade", href: "/privacidade" },
      { label: "Termos de Uso", href: "/termos" },
      { label: "Compliance", href: "/compliance" },
      { label: "Ouvidoria", href: "/ouvidoria" },
    ],
  },
];

export default function MissionCommand() {
  const sectionRef = useRef<HTMLElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const linksRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  const scrambledTitle = useScrambleText("INITIATE YOUR PROTOCOL", {
    duration: 1.5,
    delay: 0.3,
    speed: 30,
  });

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const section = sectionRef.current;
    const cta = ctaRef.current;
    const links = linksRef.current;
    if (!section || !cta || !links) return;

    const linkItems = links.querySelectorAll("[data-footer-link]");

    // Trigger visibility for scramble effect
    ScrollTrigger.create({
      trigger: section,
      start: "top 80%",
      once: true,
      onEnter: () => setIsVisible(true),
    });

    // CTA animation
    gsap.from(cta, {
      opacity: 0,
      y: 40,
      duration: 0.8,
      ease: "power3.out",
      scrollTrigger: {
        trigger: section,
        start: "top 70%",
        once: true,
      },
    });

    // Links stagger animation
    gsap.from(linkItems, {
      opacity: 0,
      y: 15,
      stagger: 0.05,
      duration: 0.5,
      ease: "power2.out",
      scrollTrigger: {
        trigger: links,
        start: "top 85%",
        once: true,
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="mission-command"
      className="relative bg-white text-black overflow-hidden"
      aria-label="Mission Command - Footer"
    >
      {/* Subtle grid overlay (dark strokes) */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0,0,0,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,0,0,0.03) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />

      {/* CTA Section */}
      <div className="relative border-b border-black/10">
        <div className="max-w-[1800px] mx-auto px-6 md:px-12 py-24 md:py-32">
          <div ref={ctaRef} className="max-w-3xl mx-auto text-center">
            {/* Eyebrow */}
            <span className="font-mono text-[10px] uppercase tracking-[0.4em] text-[#C9A227]">
              Mission Command
            </span>

            {/* Headline with scramble */}
            <h2 className="mt-6 font-serif text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[0.95]">
              {isVisible ? scrambledTitle : "INITIATE YOUR PROTOCOL"}
            </h2>

            {/* Description */}
            <p className="mt-8 text-lg md:text-xl text-black/60 leading-relaxed max-w-xl mx-auto">
              O momento de construir seu legado é agora. Agende sua sessão de
              arquitetura patrimonial com um especialista Certum.
            </p>

            {/* CTAs */}
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                className="group relative px-10 py-5 bg-black text-white 
                         text-sm font-bold uppercase tracking-[0.2em]
                         overflow-hidden transition-all duration-300
                         hover:bg-[#333] hover:scale-105"
              >
                <span className="relative z-10 flex items-center gap-3">
                  Agendar Sessão Estratégica
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </span>
              </button>

              <a
                href="tel:08001234567"
                className="flex items-center gap-3 px-8 py-5 border border-black/10
                         text-sm font-mono uppercase tracking-[0.15em]
                         transition-all duration-300
                         hover:border-black/20 hover:bg-black/5"
              >
                <Phone className="w-4 h-4" />
                0800 123 4567
              </a>
            </div>

            {/* Trust indicator */}
            <p className="mt-8 font-mono text-[10px] uppercase tracking-[0.3em] text-black/30">
              Atendimento exclusivo por convite • Seg-Sex 9h-18h
            </p>
          </div>
        </div>
      </div>

      {/* Footer Links */}
      <div ref={linksRef} className="relative">
        <div className="max-w-[1800px] mx-auto px-6 md:px-12 py-16 md:py-20">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8">
            {/* Brand Column */}
            <div className="md:col-span-4">
              <div className="font-serif text-3xl font-bold tracking-tight">
                CERTUM<span className="text-[#C9A227]">.</span>
              </div>
              <p className="mt-4 text-sm text-black/60 leading-relaxed max-w-xs">
                Wealth Architecture by Rodobens. A engenharia patrimonial para
                quem pensa em gerações.
              </p>

              {/* Contact Info */}
              <div className="mt-8 space-y-3">
                <a
                  href="mailto:private@certum.com.br"
                  className="flex items-center gap-3 text-sm text-black/60 hover:text-[#C9A227] transition-colors"
                  data-footer-link
                >
                  <Mail className="w-4 h-4" />
                  private@certum.com.br
                </a>
                <div
                  className="flex items-center gap-3 text-sm text-white/60"
                  data-footer-link
                >
                  <MapPin className="w-4 h-4" />
                  Av. Brigadeiro Faria Lima, 1234 - SP
                </div>
              </div>
            </div>

            {/* Link Columns */}
            <div className="md:col-span-8 grid grid-cols-2 md:grid-cols-3 gap-8">
              {FOOTER_COLUMNS.map((column) => (
                <div key={column.title}>
                  <h3 className="font-mono text-[10px] uppercase tracking-[0.3em] text-black/30 mb-6">
                    {column.title}
                  </h3>
                  <ul className="space-y-3">
                    {column.links.map((link) => (
                      <li key={link.label} data-footer-link>
                        <a
                          href={link.href}
                          className="text-sm text-black/60 hover:text-[#C9A227] transition-colors"
                        >
                          {link.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/30">
              © 2026 Certum Private. Todos os direitos reservados.
            </p>
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/30">
              CNPJ: 12.345.678/0001-90 | CVM Nº 12345
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
