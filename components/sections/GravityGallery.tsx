"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";

// Registra plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const galleryItems = [
  // --- PILARES (BRANCOS) ---
  {
    id: "CORE_01",
    type: "PILLAR",
    theme: "light",
    title: "CONSÓRCIOS",
    subtitle: "ALAVANCAGEM PURA",
    desc: "O motor de crescimento. Crédito barato para quem sabe fazer conta.",
    price: "Taxa: ~1.2% a.a.",
  },
  {
    id: "CORE_02",
    type: "PILLAR",
    theme: "light",
    title: "SEGUROS",
    subtitle: "IRON SHIELD",
    desc: "A blindagem do império. Proteção de sucessão e resgate em vida.",
    price: "Blindagem Global",
  },
  {
    id: "CORE_03",
    type: "PILLAR",
    theme: "light",
    title: "WEALTH",
    subtitle: "ARQUITETURA",
    desc: "Advisory completo. O design inteligente da sua estrutura de capital.",
    price: "Asset Allocation",
  },
  // --- PRODUTOS (DARK) ---
  {
    id: "PROD_01",
    type: "PRODUCT",
    theme: "dark",
    title: "Heavy Metal",
    subtitle: "CAMINHÕES & FROTA",
    desc: "Renovação logística estratégica.",
    price: "Ticket: R$ 400k+",
    image: "/images/truck-noir.jpg",
  },
  {
    id: "PROD_02",
    type: "PRODUCT",
    theme: "dark",
    title: "Sovereign Estate",
    subtitle: "IMÓVEIS DE LUXO",
    desc: "Alavancagem patrimonial em SC.",
    price: "Ticket: R$ 800k+",
    image: "/images/mansion-dark.jpg",
  },
  {
    id: "PROD_03",
    type: "PRODUCT",
    theme: "dark",
    title: "Agro Power",
    subtitle: "MAQUINÁRIO & SAFRA",
    desc: "Tecnologia de campo com fluxo sazonal.",
    price: "Ticket: R$ 1.5M+",
    image: "/images/agro-tech.jpg",
  },
  {
    id: "PROD_04",
    type: "PRODUCT",
    theme: "dark",
    title: "Automotive",
    subtitle: "SUPERCARROS",
    desc: "Acesso inteligente a veículos premium.",
    price: "Ticket: R$ 300k+",
    image: "/images/car-dark.jpg",
  },
  {
    id: "PROD_05",
    type: "PRODUCT",
    theme: "dark",
    title: "Marine",
    subtitle: "NÁUTICA",
    desc: "Lifestyle planejado sem descapitalização.",
    price: "Ticket: R$ 500k+",
    image: "/images/yacht-bw.jpg",
  },
];

export default function GravityGallery() {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useGSAP(
    () => {
      const track = trackRef.current;
      const container = containerRef.current;
      if (!track || !container) return;

      // Garante que o container tenha altura para scrollar
      const getScrollAmount = () => {
        return -(track.scrollWidth - window.innerWidth);
      };

      const tween = gsap.to(track, {
        x: getScrollAmount,
        ease: "none",
        scrollTrigger: {
          trigger: container,
          pin: true,
          scrub: 1,
          end: "+=3000", // Distância do scroll vertical
          invalidateOnRefresh: true,
        },
      });

      return () => {
        tween.kill();
      };
    },
    { scope: containerRef },
  );

  return (
    // CONTAINER PRINCIPAL (Background Preto)
    <div
      ref={containerRef}
      className="relative h-screen bg-[#050505] overflow-hidden flex items-center z-10"
    >
      {/* BACKGROUND GRID (Para provar que a seção existe) */}
      <div
        className="absolute inset-0 opacity-20 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(#333 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      {/* TRACK (TRILHO DE CARDS) */}
      {/* Importante: z-20 para ficar acima do fundo */}
      <div
        ref={trackRef}
        className="flex items-center gap-8 px-12 w-max h-[70vh] relative z-20 will-change-transform"
      >
        {/* HEADER DA GALERIA (Intro) */}
        <div className="w-[30vw] min-w-[300px] flex flex-col justify-center pr-12 border-r border-white/10 text-white">
          <h2 className="text-6xl font-serif mb-4">Inventory</h2>
          <p className="text-slate-400 max-w-xs">
            Navegue pelo ecossistema de ativos disponíveis para alavancagem.
          </p>
          <span className="text-xs text-cyan-500 mt-4 font-mono">
            SCROLL PARA EXPLORAR →
          </span>
        </div>

        {galleryItems.map((item, index) => {
          // Lógica Simplificada: Se for LIGHT, fundo branco. Se for DARK, fundo preto.
          const isLight = item.theme === "light";

          return (
            <div
              key={item.id}
              className={`
                relative shrink-0 flex flex-col justify-between p-10
                h-full border transition-all duration-300
                ${
                  isLight
                    ? "bg-white border-white text-black w-[400px]"
                    : "bg-[#0A0A0A] border-white/20 text-white w-[600px]"
                }
              `}
            >
              {/* CONTEÚDO DO CARD */}
              <div className="relative z-10 flex flex-col h-full justify-between">
                {/* TOPO */}
                <div className="flex justify-between items-center border-b pb-4 border-current opacity-60">
                  <span className="font-mono text-xs tracking-widest uppercase">
                    0{index + 1} / {item.subtitle}
                  </span>
                </div>

                {/* MEIO */}
                <div className="my-auto">
                  <h3 className="font-serif text-5xl mb-4 leading-none">
                    {item.title}
                  </h3>
                  <p className={`text-sm opacity-80 leading-relaxed max-w-xs`}>
                    {item.desc}
                  </p>
                </div>

                {/* RODAPÉ */}
                <div className="border-t pt-6 flex justify-between items-end border-current opacity-80">
                  <div>
                    <span className="block text-[10px] uppercase tracking-wider mb-1 opacity-60">
                      Valor Estimado
                    </span>
                    <span className="font-mono text-xl">{item.price}</span>
                  </div>
                  <button className="px-4 py-2 border border-current rounded-full text-[10px] uppercase font-bold hover:opacity-50 transition-opacity">
                    Acessar
                  </button>
                </div>
              </div>

              {/* IMAGEM (Apenas produtos, usando <img> nativo para evitar erros) */}
              {item.type === "PRODUCT" && (
                <div className="absolute inset-0 z-0">
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent z-10" />
                  <img
                    src={item.image}
                    alt={item.title}
                    className="absolute inset-0 w-full h-full object-cover opacity-50 grayscale hover:grayscale-0 transition-all duration-700"
                  />
                </div>
              )}
            </div>
          );
        })}

        {/* ESPAÇO FINAL */}
        <div className="w-[20vw]" />
      </div>
    </div>
  );
}
