"use client";

import { KineticHeading } from "@/components/ui/KineticHeadingNew";
import gsap from "gsap";
import { Draggable } from "gsap/Draggable";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef, useState } from "react";

// ═══════════════════════════════════════════════════════════════════════════
// THE VAULT — BLOCO 3
// Horizontal Gallery with Depth (Stacked Carousel)
// Blueprint: docs/CERTUM_MASTER_BLUEPRINT_V2.md
// ═══════════════════════════════════════════════════════════════════════════

interface VaultItem {
  id: number;
  category: string;
  title: string;
  value: string;
  leverage: string;
  image: string;
}

const VAULT_ITEMS: VaultItem[] = [
  {
    id: 1,
    category: "FROTA",
    title: "Scania R 540 (Ativo Logístico)",
    value: "R$ 850k - 1.2M",
    leverage: "100% LTV",
    image: "/assets/vault/fleet.jpg",
  },
  {
    id: 2,
    category: "IMÓVEIS",
    title: "Reserva de Valor Sólida",
    value: "R$ 1M - 10M",
    leverage: "Arbitragem",
    image: "/assets/vault/real-estate.jpg",
  },
  {
    id: 3,
    category: "AGRO",
    title: "Safra Tecnológica",
    value: "R$ 500k - 3M",
    leverage: "Sazonal",
    image: "/assets/vault/agro.jpg",
  },
  {
    id: 4,
    category: "NÁUTICA",
    title: "Marine Lifestyle (Azimut)",
    value: "R$ 1M - 5M",
    leverage: "Tax Free",
    image: "/assets/vault/nautica.jpg",
  },
  {
    id: 5,
    category: "AÉREO",
    title: "Mobilidade Executiva",
    value: "R$ 2M - 15M",
    leverage: "Liquidez",
    image: "/assets/vault/aereo.jpg",
  },
];

const CATEGORIES = ["ALL", "IMÓVEIS", "FROTA", "AGRO", "NÁUTICA", "AÉREO"];

export default function TheVault() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const [activeFilter, setActiveFilter] = useState("ALL");
  const [activeIndex, setActiveIndex] = useState(0);

  const filteredItems =
    activeFilter === "ALL"
      ? VAULT_ITEMS
      : VAULT_ITEMS.filter((item) => item.category === activeFilter);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger, Draggable);

    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    const cards = cardsRef.current.filter(Boolean) as HTMLDivElement[];

    // Initial animation on scroll
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top 70%",
        once: true,
      },
    });

    tl.from(cards, {
      x: 100,
      opacity: 0,
      stagger: 0.15,
      duration: 0.6,
      ease: "power3.out",
    });

    // Update card depth based on position
    const updateDepth = () => {
      const trackRect = track.getBoundingClientRect();
      const centerX = trackRect.left + trackRect.width / 2;

      cards.forEach((card, i) => {
        const cardRect = card.getBoundingClientRect();
        const cardCenterX = cardRect.left + cardRect.width / 2;
        const distance = Math.abs(cardCenterX - centerX);
        const maxDistance = trackRect.width / 2;

        const scale = gsap.utils.mapRange(0, maxDistance, 1, 0.85, distance);
        const opacity = gsap.utils.mapRange(0, maxDistance, 1, 0.6, distance);
        const blur = gsap.utils.mapRange(0, maxDistance, 0, 2, distance);

        gsap.to(card, {
          scale: Math.max(scale, 0.85),
          opacity: Math.max(opacity, 0.6),
          filter: `blur(${Math.min(blur, 2)}px)`,
          duration: 0.3,
          ease: "power2.out",
        });

        // Update active index
        if (distance < 100) {
          setActiveIndex(i);
        }
      });
    };

    // Make track draggable
    const draggable = Draggable.create(track, {
      type: "x",
      inertia: true,
      bounds: {
        minX: -(track.scrollWidth - track.parentElement!.clientWidth + 100),
        maxX: 100,
      },
      onDrag: updateDepth,
      onThrowUpdate: updateDepth,
    });

    // Center track visually (so the group appears centered on large viewports)
    try {
      track.style.margin = "0 auto";
    } catch (e) {
      /* ignore */
    }

    // Enable horizontal scroll with mouse wheel (translate vertical wheel -> horizontal)
    const wheelHandler = (ev: WheelEvent) => {
      // If there's a vertical scroll intent (e.g., when not over our track), let it pass
      // but when over the track container, convert vertical wheel into horizontal movement.
      ev.preventDefault();

      const parent = track.parentElement as HTMLElement;
      if (!parent) return;

      const minX = -(track.scrollWidth - parent.clientWidth + 100);
      const maxX = 100;

      // current transform x
      const currentX = (gsap.getProperty(track, "x") as number) || 0;
      // invert deltaY so wheel down moves carousel right
      const delta = ev.deltaY;
      let nextX = currentX - delta;
      nextX = Math.max(minX, Math.min(maxX, nextX));

      gsap.to(track, {
        x: nextX,
        duration: 0.45,
        ease: "power2.out",
        onUpdate: updateDepth,
      });
    };

    // attach wheel listener on the visible container so it only triggers when hovering the carousel
    track.parentElement?.addEventListener("wheel", wheelHandler, {
      passive: false,
    });

    // Initial depth update
    updateDepth();

    return () => {
      tl.kill();
      draggable[0]?.kill();
      track.parentElement?.removeEventListener(
        "wheel",
        wheelHandler as EventListener,
      );
    };
  }, [filteredItems]);

  return (
    <section
      ref={sectionRef}
      id="the-vault"
      className="relative py-24 md:py-32 bg-transparent overflow-hidden"
      aria-label="The Vault - Inventário de Ativos"
    >
      <div className="max-w-[1800px] mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="max-w-4xl">
          <KineticHeading
            title="THE VAULT"
            subtitle="// INVENTÁRIO DE ATIVOS"
            align="left"
            tone="light"
            size="7xl"
          />
          <p className="mt-6 text-[#8A8A8A] leading-relaxed max-w-xl">
            Explore o universo de ativos alavancáveis. Cada categoria representa
            uma oportunidade de multiplicar seu patrimônio com a engenharia
            financeira Certum.
          </p>
        </div>

        {/* Category Filter */}
        <div className="mt-10 flex flex-wrap gap-3">
          {CATEGORIES.map((category) => (
            <button
              key={category}
              onClick={() => setActiveFilter(category)}
              className={`
                px-5 py-2.5 text-xs font-mono uppercase tracking-[0.2em]
                border transition-all duration-300
                ${
                  activeFilter === category
                    ? "bg-[#1A1A1A] text-white border-[#1A1A1A]"
                    : "bg-transparent text-[#8A8A8A] border-[#E5E5E5] hover:border-[#1A1A1A] hover:text-[#1A1A1A]"
                }
              `}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Drag Indicator */}
        <div className="mt-8 flex items-center gap-3 text-[#8A8A8A]">
          <div className="flex items-center gap-1">
            <span className="text-lg">←</span>
            <span className="font-mono text-[10px] uppercase tracking-[0.2em]">
              Arraste para explorar
            </span>
            <span className="text-lg">→</span>
          </div>
        </div>

        {/* Carousel Container */}
        <div className="mt-8 relative overflow-hidden cursor-grab active:cursor-grabbing">
          <div
            ref={trackRef}
            className="flex gap-6 py-8 px-4"
            style={{ width: "fit-content" }}
          >
            {filteredItems.map((item, index) => (
              <div
                key={item.id}
                ref={(el) => {
                  cardsRef.current[index] = el;
                }}
                className={`
                  relative flex-shrink-0 w-[320px] md:w-[380px]
                  bg-transparent border border-black/5 rounded-sm
                  transition-shadow duration-300
                  hover:shadow-2xl hover:shadow-black/10
                  group
                `}
              >
                {/* Image */}
                <div className="relative h-[240px] overflow-hidden">
                  <div
                    className="absolute inset-0 bg-gradient-to-br from-[#8A8A8A] to-[#4A4A4A] 
                               transition-all duration-500 group-hover:grayscale-0"
                    style={{
                      filter: "grayscale(100%)",
                    }}
                  >
                    {/* Placeholder - substituir por imagem real */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="font-mono text-white/30 text-sm">
                        {item.category}
                      </span>
                    </div>

                    <div className="absolute top-4 left-4 px-3 py-1.5 bg-white/80 backdrop-blur-sm">
                      <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#1A1A1A]">
                        {item.category}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="font-serif text-xl font-bold text-[#1A1A1A]">
                    {item.title}
                  </h3>

                  <div className="mt-4 flex items-baseline justify-between border-t border-[#E5E5E5] pt-4">
                    <div>
                      <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#8A8A8A]">
                        Ticket Mínimo
                      </span>
                      <p className="font-bold text-2xl text-[#1A1A1A]">
                        {item.value}
                      </p>
                    </div>
                    <div className="text-right">
                      <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#8A8A8A]">
                        Leverage
                      </span>
                      <p className="font-bold text-2xl text-[#00C853]">
                        {item.leverage}
                      </p>
                    </div>
                  </div>

                  <button
                    className="mt-6 w-full py-3 border border-black text-black text-xs 
                               font-mono uppercase tracking-[0.2em]
                               transition-all duration-300 hover:bg-black hover:text-white"
                  >
                    Explorar
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Progress Dots */}
        <div className="mt-8 flex justify-center gap-2">
          {filteredItems.map((_, index) => (
            <div
              key={index}
              className={`
                w-2 h-2 rounded-full transition-all duration-300
                ${
                  index === activeIndex
                    ? "bg-[#1A1A1A] scale-125"
                    : "bg-[#E5E5E5]"
                }
              `}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
