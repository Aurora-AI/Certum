'use client';

import React from 'react';
import { motion, useMotionTemplate, useMotionValue } from 'framer-motion';

// --- DADOS ---
type Product = {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  type: 'video' | 'image';
  src: string;
};

const products: Product[] = [
  {
    id: 1,
    title: 'IMÓVEIS',
    subtitle: 'REAL ESTATE',
    description: 'Engenharia de alavancagem para ativos de alto valor. Propriedades residenciais, comerciais e de investimento.',
    type: 'video',
    src: '/Residencia.mov',
  },
  {
    id: 2,
    title: 'AUTOS',
    subtitle: 'COLLECTIBLES',
    description: 'Acesso a frotas e superesportivos via consórcio. Ativos de coleção com apreciação garantida.',
    type: 'image',
    src: '/assets/noir-car.svg',
  },
  {
    id: 3,
    title: 'SERVIÇOS',
    subtitle: 'FAMILY OFFICE',
    description: 'Estruturação de liquidez e blindagem patrimonial. Proteção hermética contra riscos sistêmicos.',
    type: 'image',
    src: '/assets/vault-mechanism.svg',
  },
];

function SovereignCard({ data }: { data: Product }) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <div
      className="group relative h-[600px] w-full bg-neutral-900 rounded-[2rem] overflow-hidden isolate shadow-2xl ring-1 ring-white/10 cursor-pointer transition-all duration-500 hover:ring-amber-400/50"
      onMouseMove={handleMouseMove}
    >
      {/* 1. MÍDIA (FUNDO) - Estilo P&B Elegante */}
      <div className="absolute inset-0 z-0">
        {data.type === 'video' ? (
          <video
            src={data.src}
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-105 filter grayscale contrast-125 brightness-[0.4] group-hover:grayscale-0 group-hover:brightness-90"
          />
        ) : (
          <img
            src={data.src}
            alt={data.title}
            className="w-full h-full object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-105 filter grayscale contrast-125 brightness-[0.4] group-hover:grayscale-0 group-hover:brightness-90"
          />
        )}

        {/* Gradiente suave para leitura */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-90" />
      </div>

      {/* 2. SPOTLIGHT SUAVE (Não lanterna, apenas brilho) */}
      <motion.div
        className="pointer-events-none absolute -inset-px opacity-0 transition duration-500 group-hover:opacity-100 z-10 mix-blend-soft-light"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              600px circle at ${mouseX}px ${mouseY}px,
              rgba(255, 255, 255, 0.15),
              transparent 80%
            )
          `,
        }}
      />

      {/* 3. CONTEÚDO (Baseado na Ref Stitch) */}
      <div className="relative z-20 h-full flex flex-col justify-end p-10">
        {/* Tag Amarela/Dourada Pequena */}
        <span className="text-amber-400 text-xs font-bold tracking-[0.2em] uppercase mb-3 block opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          {data.subtitle}
        </span>

        {/* Título Serifado (Tipo Vogue/Luxo) */}
        <h3 className="text-5xl md:text-6xl text-white font-serif tracking-tight mb-6">
          {data.title}
        </h3>

        {/* Barra de Progresso/Decorativa */}
        <div className="w-full h-[1px] bg-white/20 mb-6 relative overflow-hidden">
          <div className="absolute top-0 left-0 h-full w-full bg-amber-400 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-700 ease-out" />
        </div>

        {/* Descrição que aparece */}
        <p className="text-neutral-300 text-sm leading-relaxed max-w-xs opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 delay-100">
          {data.description}
        </p>
      </div>
    </div>
  );
}

export default function DarkGallery() {
  return (
    <section className="bg-[#050505] w-full py-24 px-4 md:px-8">
      {/* Container com limites para dar o respiro lateral */}
      <div className="max-w-[1400px] mx-auto">
        {/* Header da Seção */}
        <div className="flex justify-between items-end mb-16 px-4">
          <h2 className="text-white text-xs font-mono tracking-widest uppercase opacity-50">
            ARQUITETURA // DE ATIVOS
          </h2>
          <button className="px-6 py-2 rounded-full border border-white/20 text-white text-xs uppercase tracking-widest hover:bg-white hover:text-black transition-colors">
            Access Portal
          </button>
        </div>

        {/* GRID COM GAP (O Segredo do Luxo) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {products.map((p) => (
            <SovereignCard key={p.id} data={p} />
          ))}
        </div>
      </div>
    </section>
  );
}
