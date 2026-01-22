"use client";

import { useAppStore } from "@/store/useAppStore";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";

// DADOS DO MENU (Configuração Tática)
const menuItems = [
  { label: "CONSÓRCIOS", section: "CORE_01", desc: "Alavancagem Pura" },
  { label: "SEGUROS", section: "CORE_02", desc: "Iron Shield" },
  { label: "WEALTH", section: "CORE_03", desc: "Arquitetura de Capital" },
  { label: "INVENTÁRIO", section: "GALLERY", desc: "Showroom de Ativos" },
];

export default function KineticMenu() {
  const { isMenuOpen, toggleMenu, closeMenu, activeSection } = useAppStore();

  const containerRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const linksRef = useRef<(HTMLDivElement | null)[]>([]);
  const toggleRef = useRef<HTMLButtonElement>(null);

  // 1. Animação de Abertura/Fechamento (Timeline)
  useGSAP(
    () => {
      const tl = gsap.timeline({ paused: true });

      // Sequência de Entrada
      tl.to(overlayRef.current, {
        clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)", // Efeito de "Cortina"
        duration: 0.6,
        ease: "power4.inOut",
      }).fromTo(
        linksRef.current,
        {
          y: 100,
          opacity: 0,
          skewY: 10,
        },
        {
          y: 0,
          opacity: 1,
          skewY: 0,
          duration: 0.5,
          stagger: 0.1, // Um por um
          ease: "power3.out",
        },
        "-=0.3",
      ); // Começa um pouco antes da cortina terminar

      // Controle pelo Estado do Zustand
      if (isMenuOpen) {
        tl.play();
        document.body.style.overflow = "hidden"; // Trava o scroll do site
      } else {
        tl.reverse();
        document.body.style.overflow = ""; // Destrava
      }
    },
    { scope: containerRef, dependencies: [isMenuOpen] },
  );

  // 2. Efeito Magnético no Botão Toggle
  useGSAP(() => {
    const btn = toggleRef.current;
    if (!btn) return;

    const xTo = gsap.quickTo(btn, "x", { duration: 0.4, ease: "power3" });
    const yTo = gsap.quickTo(btn, "y", { duration: 0.4, ease: "power3" });

    const mouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { left, top, width, height } = btn.getBoundingClientRect();
      const center = { x: left + width / 2, y: top + height / 2 };
      const distance = { x: clientX - center.x, y: clientY - center.y };

      // Se o mouse estiver perto, atrai o botão (Magnetismo)
      if (Math.abs(distance.x) < 100 && Math.abs(distance.y) < 100) {
        xTo(distance.x * 0.3);
        yTo(distance.y * 0.3);
      } else {
        xTo(0);
        yTo(0);
      }
    };

    window.addEventListener("mousemove", mouseMove);
    return () => window.removeEventListener("mousemove", mouseMove);
  }, []);

  return (
    <div ref={containerRef} className="z-[9999]">
      {/* --- O BOTÃO TOGGLE (FIXED) --- */}
      <button
        ref={toggleRef}
        onClick={toggleMenu}
        className="fixed top-8 right-8 z-[10000] w-16 h-16 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex flex-col items-center justify-center gap-1.5 group hover:bg-white hover:border-white transition-colors duration-300 mix-blend-difference"
      >
        {/* Ícone Hambúrguer que vira X */}
        <span
          className={`w-6 h-[1px] bg-white group-hover:bg-black transition-all duration-300 ${isMenuOpen ? "rotate-45 translate-y-1.5" : ""}`}
        />
        <span
          className={`w-6 h-[1px] bg-white group-hover:bg-black transition-all duration-300 ${isMenuOpen ? "opacity-0" : ""}`}
        />
        <span
          className={`w-6 h-[1px] bg-white group-hover:bg-black transition-all duration-300 ${isMenuOpen ? "-rotate-45 -translate-y-1.5" : ""}`}
        />
      </button>

      {/* --- O OVERLAY (FULLSCREEN HUD) --- */}
      <div
        ref={overlayRef}
        className="fixed inset-0 bg-[#050505] z-[9999] flex items-center justify-center"
        style={{ clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)" }} // Começa fechado
      >
        {/* Background Grid Técnico */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:40px_40px] pointer-events-none" />

        <div className="container mx-auto px-6 relative z-10 grid grid-cols-1 lg:grid-cols-2 h-full py-20">
          {/* Lado Esquerdo: Navegação */}
          <div className="flex flex-col justify-center gap-2">
            <span className="text-cyan-500 font-mono text-xs tracking-[0.4em] mb-8 block">
              // SYSTEM_NAVIGATION
            </span>

            {menuItems.map((item, index) => (
              <div
                key={item.label}
                ref={(el) => {
                  if (el) linksRef.current[index] = el;
                }}
                className="group relative cursor-pointer"
                onClick={() => {
                  closeMenu();

                  // Pequeno delay para permitir que o menu comece a fechar antes de rolar
                  setTimeout(() => {
                    const target = document.getElementById(item.section);
                    if (target) {
                      target.scrollIntoView({
                        behavior: "smooth",
                        block: "start",
                      });
                      // Atualiza o estado global também, para sincronizar
                      useAppStore.getState().setSection(item.section);
                    }
                  }, 300); // 300ms de delay tático
                }}
              >
                {/* Número Técnico */}
                <span className="absolute -left-12 top-4 font-mono text-[10px] text-slate-600 opacity-0 group-hover:opacity-100 transition-opacity">
                  0{index + 1}
                </span>

                {/* Texto Principal */}
                <h2
                  className={`text-5xl md:text-7xl font-serif font-light transition-all duration-500 group-hover:translate-x-4
                  ${activeSection === item.label ? "text-white" : "text-slate-500 hover:text-white"}
                `}
                >
                  {item.label}
                </h2>

                {/* Descrição que aparece no Hover */}
                <div className="h-0 overflow-hidden group-hover:h-8 transition-all duration-300 pl-4 mt-0 group-hover:mt-2">
                  <span className="text-cyan-500 font-mono text-xs tracking-widest uppercase">
                    → {item.desc}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Lado Direito: Info Tática (Só aparece em Desktop) */}
          <div className="hidden lg:flex flex-col justify-end items-end text-right border-l border-white/10 pl-12">
            <div className="mb-12">
              <h3 className="text-white font-mono text-sm uppercase tracking-widest mb-4">
                Escritório Central
              </h3>
              <p className="text-slate-400 font-light text-sm">
                Av. Batel, 1230 - Corporate Tower
                <br />
                Curitiba, Paraná
                <br />
                Brasil
              </p>
            </div>

            <div className="mb-12">
              <h3 className="text-white font-mono text-sm uppercase tracking-widest mb-4">
                Contato Direto
              </h3>
              <p className="text-cyan-400 font-mono text-lg">
                +55 41 99999-9999
              </p>
              <p className="text-slate-400 text-sm">private@certum.com.br</p>
            </div>

            <div className="w-full h-[1px] bg-white/10 my-8" />

            <span className="font-mono text-[10px] text-slate-600 uppercase tracking-[0.2em]">
              Certum Wealth OS v2.0 © 2026
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
