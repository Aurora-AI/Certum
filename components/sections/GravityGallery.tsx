import { useAppStore } from "@/store/useAppStore";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

type GalleryColor = "cyan" | "amber" | "emerald";
type GalleryTheme = "light" | "dark";
type GalleryItem =
  | {
      id: string;
      type: "PILLAR";
      theme: GalleryTheme;
      title: string;
      subtitle: string;
      desc: string;
      price: string;
      color?: GalleryColor;
      accent?: string;
    }
  | {
      id: string;
      type: "PRODUCT";
      theme: GalleryTheme;
      title: string;
      subtitle: string;
      desc: string;
      price: string;
      image?: string;
      color?: GalleryColor;
    };

const COLOR_STYLES: Record<
  GalleryColor,
  { glowBg: string; accentText: string }
> = {
  cyan: { glowBg: "bg-cyan-500", accentText: "text-cyan-400" },
  amber: { glowBg: "bg-amber-500", accentText: "text-amber-400" },
  emerald: { glowBg: "bg-emerald-500", accentText: "text-emerald-400" },
};

const galleryItems: GalleryItem[] = [
  {
    id: "CORE_01",
    type: "PILLAR",
    theme: "light",
    title: "CONSÓRCIOS",
    subtitle: "ALAVANCAGEM PURA",
    desc: "O motor de crescimento. Crédito barato para quem sabe fazer conta.",
    accent: "#050505",
    price: "Taxa: ~1.2% a.a.",
  },
  {
    id: "CORE_02",
    type: "PILLAR",
    theme: "light",
    title: "SEGUROS",
    subtitle: "IRON SHIELD",
    desc: "A blindagem do império. Proteção de sucessão e resgate em vida.",
    accent: "#D4AF37",
    price: "Blindagem Global",
  },
  {
    id: "CORE_03",
    type: "PILLAR",
    theme: "light",
    title: "WEALTH",
    subtitle: "ARQUITETURA",
    desc: "Advisory completo. O design inteligente da sua estrutura de capital.",
    accent: "#06b6d4",
    price: "Asset Allocation",
  },
  {
    id: "PROD_01",
    type: "PRODUCT",
    theme: "dark",
    title: "Heavy Metal",
    subtitle: "CAMINHÕES & FROTA",
    desc: "Renovação logística estratégica.",
    price: "Ticket: R$ 400k+",
    image: "/assets/truck-noir.jpeg",
  },
  {
    id: "PROD_02",
    type: "PRODUCT",
    theme: "dark",
    title: "Sovereign Estate",
    subtitle: "IMÓVEIS DE LUXO",
    desc: "Alavancagem patrimonial em SC.",
    price: "Ticket: R$ 800k+",
    image: "/assets/mansion-dark.jpeg",
  },
  {
    id: "PROD_03",
    type: "PRODUCT",
    theme: "dark",
    title: "Agro Power",
    subtitle: "MAQUINÁRIO & SAFRA",
    desc: "Tecnologia de campo com fluxo sazonal.",
    price: "Ticket: R$ 1.5M+",
    image: "/assets/agro-tech.jpeg",
  },
  {
    id: "PROD_04",
    type: "PRODUCT",
    theme: "dark",
    title: "Automotive",
    subtitle: "SUPERCARROS",
    desc: "Acesso inteligente a veículos premium.",
    price: "Ticket: R$ 300k+",
    image: "/assets/car-dark.jpeg",
  },
  {
    id: "PROD_05",
    type: "PRODUCT",
    theme: "dark",
    title: "Marine",
    subtitle: "NÁUTICA",
    desc: "Lifestyle planejado sem descapitalização.",
    price: "Ticket: R$ 500k+",
    image: "/assets/yacht-bw.jpeg",
  },
];

export default function GravityGallery() {
  const setSection = useAppStore((state) => state.setSection);
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<Array<HTMLDivElement | null>>([]);
  const startSpacerRef = useRef<HTMLDivElement>(null);
  const endSpacerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const track = trackRef.current;
      const trigger = triggerRef.current;
      const bg = bgRef.current;
      const startSpacer = startSpacerRef.current;
      const endSpacer = endSpacerRef.current;

      if (!track || !trigger) return;

      const prefersReducedMotion =
        window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ??
        false;
      const scrollFactor = 1.25;

      const getScrollDistance = () =>
        Math.max(0, track.scrollWidth - window.innerWidth);
      const getScrollAmount = () => -getScrollDistance();
      const getCards = () =>
        cardsRef.current.filter(Boolean) as HTMLDivElement[];

      const updateSpacers = () => {
        if (!startSpacer || !endSpacer) return;
        const cards = getCards();
        const first = cards[0];
        const last = cards[cards.length - 1];
        if (!first || !last) return;

        const firstWidth = first.getBoundingClientRect().width;
        const lastWidth = last.getBoundingClientRect().width;
        const startWidth = Math.max(0, window.innerWidth / 2 - firstWidth / 2);
        const endWidth = Math.max(0, window.innerWidth / 2 - lastWidth / 2);
        startSpacer.style.width = `${startWidth}px`;
        endSpacer.style.width = `${endWidth}px`;
      };

      const updateGhostHeight = () => {
        updateSpacers();
        const scrollDistance = getScrollDistance();
        const heightPx = window.innerHeight + scrollDistance * scrollFactor;
        trigger.style.height = `${Math.max(heightPx, window.innerHeight)}px`;
      };

      updateGhostHeight();

      const clamp01 = (value: number) => Math.max(0, Math.min(1, value));
      const updateCards = () => {
        const screenCenter = window.innerWidth / 2;
        const maxDistance = window.innerWidth / 1.5;

        getCards().forEach((card) => {
          const rect = card.getBoundingClientRect();
          const cardCenter = rect.left + rect.width / 2;
          const distance = Math.abs(screenCenter - cardCenter);
          const proximity = clamp01(1 - distance / maxDistance);

          const scale = 0.95 + proximity * 0.1;
          const opacity = 0.3 + proximity * 0.7;
          const blur = (1 - proximity) * 8;
          const isLight = card.dataset.theme === "light";
          const activeBorderColor = isLight
            ? "rgba(0,0,0,0.18)"
            : "rgba(255,255,255,0.25)";
          const idleBorderColor = isLight
            ? "rgba(0,0,0,0.10)"
            : "rgba(255,255,255,0.06)";
          const activeShadow = isLight
            ? "0 0 70px rgba(255,255,255,0.18)"
            : "0 0 60px rgba(0,0,0,0.6)";
          const idleShadow = isLight
            ? "0 0 50px rgba(255,255,255,0.10)"
            : "0 0 50px rgba(0,0,0,0.45)";

          gsap.to(card, {
            scale,
            opacity,
            filter: `blur(${blur}px)`,
            zIndex: Math.round(proximity * 10),
            borderColor: proximity > 0.8 ? activeBorderColor : idleBorderColor,
            boxShadow: proximity > 0.8 ? activeShadow : idleShadow,
            duration: prefersReducedMotion ? 0 : 0.2,
            overwrite: "auto",
          });

          const image = card.querySelector<HTMLImageElement>(".asset-image");
          if (image) {
            gsap.to(image, {
              filter: `grayscale(${1 - proximity}) contrast(${1 + proximity * 0.5}) brightness(${
                0.7 + proximity * 0.5
              })`,
              scale: 1 + proximity * 0.15,
              duration: prefersReducedMotion ? 0 : 0.35,
              overwrite: "auto",
            });
          }

          const glow = card.querySelector<HTMLElement>("[data-glow]");
          if (glow) {
            gsap.to(glow, {
              opacity: proximity > 0.8 ? 0.2 : 0,
              duration: prefersReducedMotion ? 0 : 0.35,
              overwrite: "auto",
            });
          }
        });
      };

      const scrollTriggerConfig = () => ({
        trigger: trigger,
        start: "top top",
        end: "bottom bottom",
        scrub: prefersReducedMotion ? false : 1,
        invalidateOnRefresh: true,
        onRefreshInit: updateGhostHeight,
        onRefresh: updateCards,
        onUpdate: updateCards,
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          ...scrollTriggerConfig(),
        },
      });

      if (bg) {
        tl.to(
          bg,
          {
            x: () => getScrollAmount() * 0.15,
          },
          0,
        );
      }

      tl.to(
        track,
        {
          x: getScrollAmount,
        },
        0,
      );

      // Sistema Nervoso: Avisa quando a Gallery está visível
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top center",
        end: "bottom center",
        onEnter: () => setSection("GALLERY"),
        onEnterBack: () => setSection("GALLERY"),
      });

      const initialCards = getCards();
      gsap.set(initialCards, { transformOrigin: "center center", opacity: 1 });
      initialCards.forEach((card) => {
        const image = card.querySelector<HTMLImageElement>(".asset-image");
        if (image) {
          gsap.set(image, {
            filter: "grayscale(1) contrast(1.2) brightness(0.7)",
            scale: 1,
            transformOrigin: "center center",
          });
        }
      });
      updateCards();

      let rafId = 0;
      const scheduleRefresh = () => {
        if (rafId) cancelAnimationFrame(rafId);
        rafId = requestAnimationFrame(() => {
          updateGhostHeight();
          ScrollTrigger.refresh();
        });
      };

      const ro = new ResizeObserver(() => scheduleRefresh());
      ro.observe(track);
      window.addEventListener("resize", scheduleRefresh, { passive: true });

      return () => {
        window.removeEventListener("resize", scheduleRefresh);
        ro.disconnect();
        if (rafId) cancelAnimationFrame(rafId);
        tl.kill();
      };
    },
    { scope: triggerRef },
  );

  return (
    <div ref={triggerRef} className="relative h-[400vh] bg-[#050505]">
      <div
        ref={containerRef}
        className="sticky top-0 h-screen w-full overflow-hidden flex items-center relative"
      >
        <div className="absolute inset-0 bg-[#050505]" />
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:40px_40px] pointer-events-none" />

        <div
          ref={bgRef}
          className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-slate-900/15 via-[#050505] to-[#050505] pointer-events-none will-change-transform"
        />

        <div className="absolute top-8 left-8 z-20 mix-blend-difference">
          <span className="font-mono text-[10px] uppercase tracking-[0.4em] text-white">
            // Wealth_Showroom_v3
          </span>
        </div>

        <div
          ref={trackRef}
          className="flex items-center gap-[4vw] w-max h-[70vh] will-change-transform"
          style={{ transform: "translateX(0px)" }}
        >
          <div ref={startSpacerRef} className="shrink-0" />
          {galleryItems.map((item, index) => {
            const isLight = item.theme === "light";
            const fallbackColor =
              index % 3 === 0 ? "cyan" : index % 3 === 1 ? "amber" : "emerald";
            const color = (item.color ?? fallbackColor) as GalleryColor;
            const styles = COLOR_STYLES[color];

            return (
              <div
                key={item.id}
                ref={(el) => {
                  cardsRef.current[index] = el;
                }}
                data-theme={item.theme}
                className={[
                  "relative flex-shrink-0 flex flex-col justify-between p-8 md:p-12",
                  "rounded-sm border overflow-hidden",
                  isLight
                    ? "bg-white text-black shadow-[0_0_40px_rgba(255,255,255,0.12)]"
                    : "bg-[#0A0A0A] text-white backdrop-blur-md border-white/10 shadow-none",
                  "origin-center will-change-transform",
                  item.type === "PILLAR"
                    ? "w-[40vw] md:w-[30vw] h-[60vh]"
                    : "w-[70vw] md:w-[45vw] h-[60vh]",
                  "opacity-100",
                ].join(" ")}
                style={{ opacity: 1 }}
              >
                {!isLight ? (
                  <div
                    data-glow
                    className={[
                      "absolute inset-0 pointer-events-none blur-[80px] opacity-0 transition-opacity",
                      styles.glowBg,
                    ].join(" ")}
                  />
                ) : null}

                <div className="relative z-10 h-full flex flex-col justify-between">
                  <div
                    className={[
                      "flex justify-between items-center border-b pb-4",
                      isLight ? "border-black/10" : "border-white/10",
                    ].join(" ")}
                  >
                    <span
                      className={[
                        "font-mono text-[10px] tracking-widest uppercase",
                        isLight ? "text-neutral-500" : styles.accentText,
                      ].join(" ")}
                    >
                      0{index + 1} / {item.subtitle}
                    </span>
                    {item.type === "PRODUCT" && (
                      <span className={["text-[10px] opacity-50"].join(" ")}>
                        Asset Class
                      </span>
                    )}
                    {item.type === "PILLAR" ? (
                      <span
                        aria-hidden="true"
                        className="inline-flex h-2 w-2 rounded-full"
                        style={{ backgroundColor: item.accent ?? "#050505" }}
                      />
                    ) : null}
                  </div>

                  <div className="my-auto">
                    <h2
                      className={[
                        "font-serif leading-none mb-4",
                        item.type === "PILLAR"
                          ? "text-5xl md:text-6xl tracking-tight"
                          : "text-4xl md:text-5xl",
                      ].join(" ")}
                    >
                      {item.title}
                    </h2>
                    <p
                      className={[
                        "font-light text-sm md:text-base leading-relaxed max-w-sm",
                        isLight ? "text-neutral-600" : "text-slate-400",
                      ].join(" ")}
                    >
                      {item.desc}
                    </p>
                  </div>

                  <div
                    className={[
                      "border-t pt-6 flex justify-between items-end",
                      isLight ? "border-black/10" : "border-white/10",
                    ].join(" ")}
                  >
                    <div>
                      <span
                        className={[
                          "block text-[9px] uppercase tracking-wider mb-1",
                          isLight ? "text-neutral-500" : "text-slate-500",
                        ].join(" ")}
                      >
                        {item.type === "PILLAR" ? "Potencial" : "Estimativa"}
                      </span>
                      <span
                        className={[
                          "font-mono text-lg",
                          isLight ? "text-black" : "text-white",
                        ].join(" ")}
                      >
                        {item.price}
                      </span>
                    </div>

                    {item.type === "PILLAR" ? (
                      <div className="flex gap-2">
                        <div
                          className={[
                            "w-2 h-2 rounded-full animate-pulse",
                            isLight ? "bg-black" : "bg-white",
                          ].join(" ")}
                        />
                        <span
                          className={[
                            "text-[9px] uppercase tracking-widest opacity-60",
                          ].join(" ")}
                        >
                          Núcleo Estratégico
                        </span>
                      </div>
                    ) : null}

                    <button
                      className={[
                        "group flex items-center gap-2 text-xs uppercase tracking-widest font-bold transition-colors",
                        isLight ? "hover:text-cyan-600" : "hover:text-cyan-400",
                      ].join(" ")}
                    >
                      {isLight ? "Acessar" : "Explorar"}
                      <span className="transform group-hover:translate-x-1 transition-transform">
                        →
                      </span>
                    </button>
                  </div>
                </div>

                {item.type === "PRODUCT" && (
                  <div className="absolute inset-0 z-0 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-slate-900/40 via-black/60 to-black/80" />
                    {item.image ? (
                      <img
                        src={item.image}
                        alt={item.title}
                        loading="lazy"
                        decoding="async"
                        className="asset-image absolute inset-0 w-full h-full object-cover will-change-transform"
                        onError={(e) => {
                          e.currentTarget.style.display = "none";
                        }}
                        draggable={false}
                      />
                    ) : null}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent pointer-events-none" />
                  </div>
                )}
              </div>
            );
          })}
          <div ref={endSpacerRef} className="shrink-0" />
        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50 mix-blend-difference pointer-events-none">
          <div className="w-[1px] h-12 bg-gradient-to-b from-transparent via-white to-transparent animate-bounce" />
          <span className="text-[8px] font-mono tracking-widest uppercase">
            Drag / Scroll
          </span>
        </div>
      </div>
    </div>
  );
}
