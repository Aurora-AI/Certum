import { ArrowDownRight } from "lucide-react";
import React, { useEffect, useRef } from "react";
import { useScrambleText } from "../hooks/useScrambleText";
import HeroParticleField from "./HeroParticleField";
import SovereignResidence from "./SovereignResidence";

const Hero: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const blendRef = useRef<HTMLDivElement>(null);
  const blendBgRef = useRef<HTMLDivElement>(null);
  const blendTextRef = useRef<HTMLDivElement>(null);
  const tipRef = useRef<HTMLSpanElement>(null);

  const scrambledLine1 = useScrambleText("Soberania", {
    duration: 1.5,
    delay: 0.5,
    speed: 40,
  });
  const scrambledLine2 = useScrambleText("Financeira.", {
    duration: 1.5,
    delay: 2.0,
    speed: 40,
  });

  useEffect(() => {
    const gsap = window.gsap;
    if (!gsap) {
      if (blendBgRef.current) blendBgRef.current.style.opacity = "1";
      if (blendTextRef.current) blendTextRef.current.style.opacity = "1";
      if (blendTextRef.current) blendTextRef.current.style.color = "#000000";
      if (tipRef.current) tipRef.current.style.color = "#050505";
      return;
    }

    const reduceMotion =
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false;
    const tl = gsap.timeline({ defaults: { ease: "power2.inOut" } });
    const heroBg = containerRef.current?.querySelector("[data-hero-bg]");

    if (blendBgRef.current) gsap.set(blendBgRef.current, { opacity: 0 });
    if (blendTextRef.current)
      gsap.set(blendTextRef.current, { opacity: 0, color: "#ffffff" });
    if (tipRef.current)
      gsap.set(tipRef.current, { opacity: 0, color: "#ffffff" });

    if (heroBg) {
      tl.fromTo(
        heroBg,
        { scale: 1.08 },
        { scale: 1, duration: reduceMotion ? 0 : 2.2, ease: "expo.out" },
        0,
      );
    }

    tl.to(
      blendTextRef.current,
      {
        opacity: 1,
        duration: reduceMotion ? 0 : 0.8,
        delay: 0.5,
        ease: "power2.out",
      },
      0,
    )
      .to(
        tipRef.current,
        {
          opacity: 1,
          duration: reduceMotion ? 0 : 0.8,
          delay: 0.7,
          ease: "power2.out",
        },
        0,
      )
      .add("order", 1.0)
      .to(
        blendBgRef.current,
        { opacity: 1, duration: reduceMotion ? 0 : 2.5 },
        "order",
      )
      .to(
        blendTextRef.current,
        { color: "#000000", duration: reduceMotion ? 0 : 2.5 },
        "order",
      )
      .to(
        tipRef.current,
        { color: "#050505", duration: reduceMotion ? 0 : 2.5 },
        "order",
      )
      .fromTo(
        contentRef.current,
        { y: "5vh", opacity: 0 },
        { y: 0, opacity: 1, duration: reduceMotion ? 0 : 1, ease: "expo.out" },
        "order+=1.3",
      );

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <section
      ref={containerRef}
      className="group isolate relative w-full h-[100svh] bg-white overflow-hidden flex flex-col justify-center items-center"
    >
      <SovereignResidence />

      <div
        ref={blendRef}
        className="absolute inset-0 z-10 pointer-events-none mix-blend-lighten"
        style={{ mixBlendMode: "lighten" }}
      >
        <div ref={blendBgRef} className="absolute inset-0 bg-white opacity-0" />

        <div className="absolute left-[42%] top-1/2 -translate-x-1/2 -translate-y-1/2">
          <div
            ref={blendTextRef}
            className="font-black leading-[0.9] tracking-[-0.05em] uppercase tabular-nums"
            style={{ fontFamily: "Inter, sans-serif", fontSize: "11vw" }}
          >
            <div>{scrambledLine1}</div>
            <div>{scrambledLine2}</div>
          </div>
        </div>
      </div>

      <HeroParticleField className="absolute inset-0 z-[15] mix-blend-multiply opacity-70" />

      <div className="absolute bottom-10 left-10 z-30 transition-opacity duration-700 group-hover:opacity-0 pointer-events-none">
        <span
          ref={tipRef}
          className="font-mono text-[10px] tracking-[0.25em] uppercase"
        >
          Arquitetura de Capital
        </span>
      </div>

      <div
        ref={contentRef}
        className="relative z-20 h-full w-full max-w-[1800px] mx-auto px-6 md:px-12 grid grid-cols-12 gap-8 pointer-events-none"
      >
        <div className="col-span-12 md:col-span-8 flex flex-col justify-between min-h-screen py-12 md:py-24 pr-0 md:pr-12">
          <div className="flex items-center gap-3 opacity-60 pointer-events-auto mix-blend-multiply">
            <div className="w-2 h-2 bg-ink rounded-full animate-pulse" />
            <span className="font-mono text-xs uppercase tracking-widest text-ink">
              OZZMOSIS PROTOCOL v.1
            </span>
          </div>

          <div className="flex-grow" />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 pointer-events-auto items-end">
            <div className="max-w-md">
              <p className="text-lg md:text-xl text-ink leading-relaxed font-medium">
                Abandone a loteria dos bancos. Utilize a{" "}
                <span className="font-bold">Engenharia de Conquista</span> para
                construir ativos reais com custo de capital otimizado e
                alavancagem inteligente.
              </p>
            </div>
            <div className="flex gap-12 border-l-2 border-ink pl-8 py-2">
              <div>
                <p className="font-mono text-[10px] text-muted uppercase tracking-widest mb-1">
                  CAPITAL SOB GESTÃO
                </p>
                <p className="text-4xl text-ink font-bold tracking-tight">
                  R$ 14.2Bi
                </p>
              </div>
              <div>
                <p className="font-mono text-[10px] text-muted uppercase tracking-widest mb-1">
                  ECONOMIA REAL
                </p>
                <p className="text-4xl text-emerald-600 font-bold tracking-tight">
                  +32.4%
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="col-span-12 md:col-span-4 flex flex-col justify-between min-h-screen py-12 md:py-24 pointer-events-auto pl-0 md:pl-12">
          <div className="flex justify-end opacity-40">
            <ArrowDownRight className="w-8 h-8 text-ink" />
          </div>
          <div className="flex flex-col gap-6 items-start md:items-end pb-2 md:pb-0">
            <button className="group relative w-full md:w-auto px-10 py-6 bg-ink text-white text-xs font-bold uppercase tracking-[0.2em] overflow-hidden transition-all hover:bg-neutral-900">
              <span className="relative z-10 flex items-center justify-center gap-3">
                INICIAR ARQUITETURA
              </span>
              <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out" />
            </button>
            <p className="text-ink/40 font-mono text-[9px] uppercase tracking-widest text-right">
              Acesso Restrito a Estrategistas
            </p>
          </div>
        </div>
      </div>

      <div className="absolute left-1/4 top-0 w-px h-full bg-ink/5 hidden md:block z-0" />
      <div className="absolute right-1/4 top-0 w-px h-full bg-ink/5 hidden md:block z-0" />
    </section>
  );
};

export default Hero;
