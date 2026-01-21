"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { neuralNodes } from "./data"; // Mantemos os mesmos dados

// Configuração Geométrica
const CENTER_X = 400;
const CENTER_Y = 300;
const RADIUS_CAT = 200; // Raio um pouco maior para "respiro" técnico
const RADIUS_STRAT = 340;

export default function NeuralTree() {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [activeStrategy, setActiveStrategy] = useState<string | null>(null);

  const coreNode = neuralNodes.find((n) => n.type === "core")!;
  const categories = neuralNodes.filter((n) => n.type === "category");

  const activeStrategies = activeCategory
    ? neuralNodes.filter((n) => n.parentId === activeCategory)
    : [];

  const getPosition = (
    index: number,
    total: number,
    radius: number,
    offsetAngle = 0,
  ) => {
    const angle = (index / total) * 2 * Math.PI - Math.PI / 2 + offsetAngle;
    return {
      x: CENTER_X + Math.cos(angle) * radius,
      y: CENTER_Y + Math.sin(angle) * radius,
    };
  };

  const details = activeStrategy
    ? neuralNodes.find((n) => n.id === activeStrategy)
    : activeCategory
      ? neuralNodes.find((n) => n.id === activeCategory)
      : coreNode;

  return (
    <section className="w-full min-h-screen bg-[#020408] text-slate-200 overflow-hidden relative flex flex-col lg:flex-row selection:bg-cyan-900 selection:text-white">
      {/* --- GRID DE ENGENHARIA (BACKGROUND) --- */}
      <div
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          backgroundImage:
            "radial-gradient(circle, #334155 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      ></div>

      {/* --- ÁREA DO BLUEPRINT (ESQUERDA) --- */}
      <div className="relative flex-1 h-[600px] lg:h-auto flex items-center justify-center cursor-crosshair">
        <svg viewBox="0 0 800 600" className="w-full h-full max-w-[1000px]">
          {/* Círculos de Referência Técnica (Fundo) */}
          <circle
            cx={CENTER_X}
            cy={CENTER_Y}
            r={RADIUS_CAT}
            stroke="#1e293b"
            strokeWidth="1"
            fill="none"
            strokeDasharray="4 4"
          />
          <circle
            cx={CENTER_X}
            cy={CENTER_Y}
            r={RADIUS_STRAT}
            stroke="#1e293b"
            strokeWidth="1"
            fill="none"
            opacity="0.5"
          />

          {/* Linhas Core -> Categorias */}
          {categories.map((cat, i) => {
            const pos = getPosition(i, categories.length, RADIUS_CAT);
            const isActive = activeCategory === cat.id;

            return (
              <g key={`link-${cat.id}`}>
                <motion.line
                  x1={CENTER_X}
                  y1={CENTER_Y}
                  x2={pos.x}
                  y2={pos.y}
                  stroke={isActive ? "#06b6d4" : "#334155"} // Cyan-500 ou Slate-700
                  strokeWidth={isActive ? 2 : 1}
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.8, delay: i * 0.1 }}
                />
                {/* Marcador de Junção */}
                {isActive && (
                  <circle
                    cx={(CENTER_X + pos.x) / 2}
                    cy={(CENTER_Y + pos.y) / 2}
                    r="2"
                    fill="#06b6d4"
                  />
                )}
              </g>
            );
          })}

          {/* Linhas Categoria -> Estratégias */}
          <AnimatePresence>
            {activeCategory &&
              activeStrategies.map((strat, i) => {
                const parentIndex = categories.findIndex(
                  (c) => c.id === activeCategory,
                );
                const parentPos = getPosition(
                  parentIndex,
                  categories.length,
                  RADIUS_CAT,
                );

                const angleSpread = 0.6;
                const startAngle =
                  (parentIndex / categories.length) * 2 * Math.PI - Math.PI / 2;
                const myAngle =
                  startAngle -
                  angleSpread / 2 +
                  (i / (activeStrategies.length - 1 || 1)) * angleSpread;

                const stratX = CENTER_X + Math.cos(myAngle) * RADIUS_STRAT;
                const stratY = CENTER_Y + Math.sin(myAngle) * RADIUS_STRAT;

                return (
                  <motion.g
                    key={`strat-group-${strat.id}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <motion.path
                      d={`M ${parentPos.x} ${parentPos.y} L ${stratX} ${stratY}`}
                      stroke={
                        activeStrategy === strat.id ? "#06b6d4" : "#475569"
                      }
                      strokeWidth={1}
                      fill="none"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                    />

                    {/* Nó da Estratégia (Botão Técnico) */}
                    <foreignObject
                      x={stratX - 70}
                      y={stratY - 15}
                      width={140}
                      height={30}
                    >
                      <button
                        onClick={() => setActiveStrategy(strat.id)}
                        className={`w-full h-full flex items-center justify-center text-[9px] font-mono border transition-all duration-300 uppercase tracking-wider
                        ${
                          activeStrategy === strat.id
                            ? "bg-cyan-950/50 border-cyan-500 text-cyan-300"
                            : "bg-[#020408] border-slate-700 text-slate-500 hover:border-slate-400 hover:text-slate-300"
                        }`}
                      >
                        {activeStrategy === strat.id && (
                          <span className="mr-2 text-cyan-500">►</span>
                        )}
                        {strat.label}
                      </button>
                    </foreignObject>
                  </motion.g>
                );
              })}
          </AnimatePresence>

          {/* Nós das Categorias (Círculos Blueprint) */}
          {categories.map((cat, i) => {
            const pos = getPosition(i, categories.length, RADIUS_CAT);
            const isActive = activeCategory === cat.id;

            return (
              <foreignObject
                key={cat.id}
                x={pos.x - 40}
                y={pos.y - 40}
                width={80}
                height={80}
              >
                <motion.button
                  onClick={() => {
                    setActiveCategory(cat.id);
                    setActiveStrategy(null);
                  }}
                  whileHover={{ scale: 1.1 }}
                  className={`w-20 h-20 rounded-full flex flex-col items-center justify-center border backdrop-blur-sm transition-all duration-500 relative group
                    ${
                      isActive
                        ? "bg-cyan-950/30 border-cyan-500 shadow-[0_0_20px_rgba(6,182,212,0.2)]"
                        : "bg-[#020408]/80 border-slate-700 text-slate-500 hover:border-white/40"
                    }`}
                >
                  {/* Miras Técnicas ao redor do botão */}
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1 w-[1px] h-2 bg-current opacity-50"></div>
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1 w-[1px] h-2 bg-current opacity-50"></div>

                  <span
                    className={`text-[9px] font-mono font-bold tracking-widest uppercase ${isActive ? "text-cyan-400" : "text-slate-400"}`}
                  >
                    {cat.label.split(" ")[0]}
                  </span>
                  <span className="text-[8px] opacity-60 font-mono">
                    {cat.label.split(" ")[1]}
                  </span>
                </motion.button>
              </foreignObject>
            );
          })}

          {/* Nó Central (SYSTEM CORE) */}
          <foreignObject
            x={CENTER_X - 50}
            y={CENTER_Y - 50}
            width={100}
            height={100}
          >
            <motion.div
              className="w-full h-full rounded-full border border-slate-600 bg-[#020408] flex items-center justify-center relative cursor-pointer z-10"
              onClick={() => {
                setActiveCategory(null);
                setActiveStrategy(null);
              }}
              whileHover={{ scale: 1.05 }}
            >
              <div className="absolute inset-0 border border-cyan-500/20 rounded-full animate-[spin_10s_linear_infinite]" />
              <div className="text-center">
                <span className="block text-[8px] text-slate-500 font-mono mb-1">
                  SYS.ROOT
                </span>
                <span className="text-xs font-bold text-white tracking-widest font-mono">
                  CERTUM
                </span>
              </div>
            </motion.div>
          </foreignObject>
        </svg>
      </div>

      {/* --- PAINEL DE DADOS (DIREITA) --- */}
      <motion.div
        className="lg:w-[450px] bg-[#020408] border-l border-slate-800 p-12 flex flex-col justify-center relative z-20"
        key={details?.id}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
      >
        {/* Header Técnico */}
        <div className="flex justify-between items-center mb-6 border-b border-slate-800 pb-4">
          <span className="font-mono text-[10px] text-cyan-500 tracking-[0.2em] uppercase">
            // {details?.type} NODE
          </span>
          <span className="font-mono text-[10px] text-slate-600">
            ID: {details?.id.toUpperCase()}
          </span>
        </div>

        <h2 className="text-3xl md:text-4xl font-light text-white mb-6 tracking-tight">
          {details?.label}
        </h2>

        <p className="text-slate-400 text-sm leading-relaxed font-light border-l-2 border-cyan-900 pl-4 mb-8">
          {details?.description}
        </p>

        {/* Grid de KPIs */}
        {details?.stats && (
          <div className="grid grid-cols-2 gap-4 mb-10">
            {details.stats.map((stat, i) => (
              <div
                key={i}
                className="bg-slate-900/30 p-4 border border-slate-800 hover:border-slate-600 transition-colors"
              >
                <span className="block text-[9px] text-slate-500 tracking-widest uppercase mb-2">
                  {stat.label}
                </span>
                <span className="block text-lg text-cyan-400 font-mono">
                  {stat.value}
                </span>
              </div>
            ))}
          </div>
        )}

        <button className="group relative w-full py-4 bg-transparent border border-slate-700 text-xs uppercase tracking-[0.2em] text-slate-300 hover:bg-cyan-950/20 hover:border-cyan-500 hover:text-cyan-400 transition-all">
          <span className="absolute left-0 top-0 h-1 w-1 border-t border-l border-current opacity-50 group-hover:opacity-100" />
          <span className="absolute right-0 top-0 h-1 w-1 border-t border-r border-current opacity-50 group-hover:opacity-100" />
          <span className="absolute bottom-0 left-0 h-1 w-1 border-b border-l border-current opacity-50 group-hover:opacity-100" />
          <span className="absolute right-0 bottom-0 h-1 w-1 border-b border-r border-current opacity-50 group-hover:opacity-100" />
          Initiate Protocol
        </button>
      </motion.div>
    </section>
  );
}
