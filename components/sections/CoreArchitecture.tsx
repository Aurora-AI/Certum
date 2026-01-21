"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const features = [
  {
    id: "01",
    title: "ANÁLISE ESTRUTURAL",
    desc: "Desconstrução total do cenário patrimonial. Não olhamos apenas para o ativo, mas para a eficiência tributária e sucessória que o envolve.",
    tech: "SYSTEM_SCAN_V1",
  },
  {
    id: "02",
    title: "ALAVANCAGEM SINTÉTICA",
    desc: "Uso estratégico de cartas contempladas e lances embutidos para criar liquidez imediata com custo de capital inferior ao CDI.",
    tech: "LEVERAGE_PROTOCOL",
  },
  {
    id: "03",
    title: "BLINDAGEM DE LEGADO",
    desc: "Arquitetura de seguros e holdings para garantir que a transferência de riqueza seja imune a travas jurídicas ou erosão fiscal.",
    tech: "IRON_SHIELD_DAEMON",
  },
];

export default function CoreArchitecture() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.9, 1], [0, 1, 1, 0]);

  return (
    <section
      ref={containerRef}
      className="relative min-h-[120vh] w-full bg-[#020408] text-slate-200 py-32 overflow-hidden border-t border-slate-900"
    >
      {/* BACKGROUND GRID (Depth Layer 0) */}
      <div
        className="absolute inset-0 z-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(6, 182, 212, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(6, 182, 212, 0.1) 1px, transparent 1px)",
          backgroundSize: "100px 100px",
        }}
      ></div>

      <div className="container mx-auto px-6 relative z-10">
        {/* HEADER TÉCNICO */}
        <div className="mb-24 border-l-2 border-cyan-500 pl-6">
          <motion.span
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="block text-cyan-500 font-mono text-xs tracking-[0.3em] mb-2"
          >
            // SYSTEM ARCHITECTURE
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-light tracking-tight text-white"
          >
            O Protocolo{" "}
            <span className="font-bold text-slate-500">Genesis</span>
          </motion.h2>
        </div>

        {/* CARDS EM CASCATA (Depth Layer 1, 2, 3) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((item, index) => (
            <motion.div
              key={item.id}
              style={{ y: index === 1 ? y1 : index === 2 ? y2 : 0 }} // Efeito Parallax Diferencial
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2, duration: 0.8 }}
              className="relative group"
            >
              {/* Card "Glass" Blueprint */}
              <div className="h-full bg-[#05070a]/80 backdrop-blur-sm border border-slate-800 p-8 relative overflow-hidden transition-all duration-500 hover:border-cyan-500/50 hover:shadow-[0_0_30px_rgba(6,182,212,0.1)]">
                {/* Linhas Técnicas Decorativas */}
                <div className="absolute top-0 right-0 p-4 opacity-50">
                  <span className="font-mono text-[10px] text-cyan-800 border border-cyan-900 px-2 py-1 rounded">
                    {item.tech}
                  </span>
                </div>

                <span className="text-6xl font-mono font-bold text-slate-800/50 absolute bottom-4 right-4 select-none group-hover:text-cyan-900/20 transition-colors">
                  {item.id}
                </span>

                <div className="relative z-10">
                  <div className="w-10 h-10 border border-cyan-500/30 rounded-full flex items-center justify-center mb-6 text-cyan-400 font-mono text-xs">
                    {item.id}
                  </div>

                  <h3 className="text-xl font-bold text-white mb-4 tracking-wide group-hover:text-cyan-400 transition-colors">
                    {item.title}
                  </h3>

                  <p className="text-slate-400 text-sm leading-relaxed font-light">
                    {item.desc}
                  </p>
                </div>

                {/* Scanline Effect no Hover */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-500/5 to-transparent -translate-y-full group-hover:translate-y-full transition-transform duration-1000 ease-in-out pointer-events-none" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* METRICS HUD (Depth Layer Back) */}
        <motion.div
          style={{ opacity }}
          className="mt-32 border-t border-slate-800 pt-8 flex justify-between items-end opacity-50"
        >
          <div className="font-mono text-[10px] text-slate-600">
            SYS.STATUS: ONLINE
            <br />
            UPTIME: 99.99%
            <br />
            ENCRYPTION: SHA-256
          </div>
          <div className="text-right font-mono text-[10px] text-slate-600">
            ID: CERTUM-V1
            <br />
            REGION: SOUTH-BR
          </div>
        </motion.div>
      </div>
    </section>
  );
}
