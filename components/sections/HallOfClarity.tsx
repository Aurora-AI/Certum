"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useMemo, useRef, useState } from "react";

import { ConnectionLine } from "@/components/ui/ConnectionLine";
import { KineticHeading } from "@/components/ui/KineticHeading";
import { NumberTicker } from "@/components/ui/NumberTicker";
import { PillarCard } from "@/components/ui/PillarCard";

type PillarMetric = {
  value: number;
  suffix: string;
  tail: string;
};

const PILLARS: Array<{
  eyebrow: string;
  title: string;
  subtitle: string;
  metric: PillarMetric;
}> = [
  {
    eyebrow: "// METHOD_01",
    title: "ALAVANCAGEM",
    subtitle: "Custo de Capital Otimizado",
    metric: { value: 32.4, suffix: "%", tail: "economia média" },
  },
  {
    eyebrow: "// METHOD_02",
    title: "ARBITRAGEM",
    subtitle: "Cash Value Brasileiro",
    metric: { value: 17.8, suffix: "Bi", tail: "volume de negócios" },
  },
  {
    eyebrow: "// METHOD_03",
    title: "PROTEÇÃO",
    subtitle: "Estrutura AA+ Fitch",
    metric: { value: 355, suffix: "M", tail: "aumento de capital" },
  },
];

export default function HallOfClarity() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeTickers, setActiveTickers] = useState<
    [boolean, boolean, boolean]
  >([false, false, false]);

  const tickerActives = useMemo(
    () => PILLARS.map((_, idx) => activeTickers[idx] ?? false),
    [activeTickers],
  );

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const section = sectionRef.current;
    if (!section) return;

    const cards = Array.from(
      section.querySelectorAll<HTMLElement>("[data-pillar-card]"),
    );
    const paths = Array.from(
      section.querySelectorAll<SVGPathElement>("[data-conn-path]"),
    );
    const node = section.querySelector<HTMLElement>("[data-genesis-node]");

    gsap.set(cards, { transformOrigin: "50% 100%", scaleY: 0, opacity: 0 });
    if (node) gsap.set(node, { scale: 0.8, opacity: 0 });

    paths.forEach((path) => {
      const length = path.getTotalLength();
      gsap.set(path, { strokeDasharray: length, strokeDashoffset: length });
    });

    const tl = gsap.timeline({
      defaults: { ease: "power3.out" },
      scrollTrigger: {
        trigger: section,
        start: "top 60%",
        once: true,
      },
    });

    tl.to(cards, { scaleY: 1, opacity: 1, duration: 0.9, stagger: 0.2 }, 0);
    tl.call(() => setActiveTickers([true, false, false]), [], 0);
    tl.call(() => setActiveTickers([true, true, false]), [], 0.2);
    tl.call(() => setActiveTickers([true, true, true]), [], 0.4);

    tl.to(
      paths,
      { strokeDashoffset: 0, duration: 0.8, stagger: 0.08, ease: "power2.out" },
      ">-0.15",
    );
    if (node) tl.to(node, { scale: 1, opacity: 1, duration: 0.45 }, ">-0.2");

    return () => {
      tl.kill();
      tl.scrollTrigger?.kill();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative bg-transparent py-24 md:py-28"
      aria-label="Hall of Clarity"
    >
      <div className="max-w-[1800px] mx-auto px-6 md:px-12">
        <div className="max-w-4xl mx-auto">
          <KineticHeading
            title="THE HALL OF CLARITY"
            subtitle="// PILARES ESTRATÉGICOS"
            align="center"
            tone="light"
            size="7xl"
          />
          <p className="mt-7 text-center text-[#8A8A8A] leading-relaxed">
            Consórcio, seguros e advisory tratados como protocolos de engenharia
            patrimonial — rigor técnico, execução elegante e lastro em ativos
            reais.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch">
          {PILLARS.map((pillar, idx) => (
            <PillarCard
              key={pillar.title}
              eyebrow={pillar.eyebrow}
              title={pillar.title}
              subtitle={pillar.subtitle}
              className="min-h-[420px]"
              metric={
                <div className="flex flex-col gap-2">
                  <div className="flex items-baseline gap-3">
                    <span className="font-mono text-[10px] uppercase tracking-[0.35em] text-black/40">
                      R$
                    </span>
                    <NumberTicker
                      value={pillar.metric.value}
                      suffix={pillar.metric.suffix}
                      decimals={1}
                      active={tickerActives[idx]}
                      className="text-4xl md:text-5xl font-bold"
                    />
                  </div>
                  <div className="font-mono text-[10px] uppercase tracking-[0.35em] text-black/45">
                    {pillar.metric.tail}
                  </div>
                </div>
              }
            />
          ))}
        </div>

        <div className="hidden md:block mt-10">
          <ConnectionLine />
        </div>

        <div className="mt-6 md:mt-2 flex items-center justify-center">
          <div
            data-genesis-node
            className="px-8 py-5 bg-white border border-black/5 transition-all duration-500 hover:border-black/10"
          >
            <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-black/40 text-center">
              GENESIS PROTOCOL
            </div>
            <div className="mt-3 font-sans text-xl font-medium text-[#1A1A1A] text-center tracking-tight">
              Conectar. Estruturar. Executar.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
