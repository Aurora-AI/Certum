import React, { useEffect, useRef, useState } from 'react';
import OrbitalIllustration from './OrbitalIllustration';
import { FeatureData } from '../types';
import { Anchor, Shield, Zap, type LucideIcon } from 'lucide-react';

interface FeatureRailProps {
  features: FeatureData[];
}

const IconMap: Record<string, LucideIcon> = {
  kamino: Zap,
  drift: Shield,
  jupiter: Anchor,
};

const FeatureRail: React.FC<FeatureRailProps> = ({ features }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const gsap = window.gsap;
    const ScrollTrigger = window.ScrollTrigger;

    if (!gsap || !ScrollTrigger || !containerRef.current) return;
    gsap.registerPlugin(ScrollTrigger);

    const textSections = containerRef.current.querySelectorAll('.feature-text-block');
    const triggers: Array<{ kill: () => void }> = [];

    textSections.forEach((section, index) => {
      gsap.set(section, { opacity: 0.2 });

      const tween = gsap.to(section, {
        opacity: 1,
        duration: 0.5,
        scrollTrigger: {
          trigger: section,
          start: 'top center+=100',
          end: 'bottom center-=100',
          toggleActions: 'play reverse play reverse',
          scrub: true,
          onEnter: () => setActiveIndex(index),
          onEnterBack: () => setActiveIndex(index),
        },
      });

      const maybeTrigger = (tween as { scrollTrigger?: unknown }).scrollTrigger;
      if (isKillable(maybeTrigger)) triggers.push(maybeTrigger);
    });

    return () => {
      triggers.forEach((t) => t.kill());
    };
  }, []);

  return (
    <section ref={containerRef} className="relative w-full max-w-[1440px] mx-auto px-6">
      <div className="flex flex-col md:flex-row">
        <div className="hidden md:flex w-1/2 h-screen sticky top-0 items-center justify-center overflow-hidden">
          <div className="w-full h-full scale-90 relative">
            <OrbitalIllustration activeIndex={activeIndex} />
            <div className="absolute bottom-20 left-10 text-[9px] font-mono uppercase text-ink/30 tracking-widest">
              System Status: Online // Mode:{' '}
              {activeIndex === 0 ? 'Leverage' : activeIndex === 1 ? 'Shield' : 'Liquidity'}
            </div>
          </div>
        </div>

        <div className="w-full md:w-1/2">
          {features.map((feature, index) => (
            <div
              key={feature.id}
              className="feature-text-block min-h-[80vh] md:h-screen flex flex-col justify-center pl-0 md:pl-20 border-l border-ink/5 md:border-none"
            >
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-8">
                  <span className="font-mono text-xs text-ink/40">0{index + 1}</span>
                  <div className="w-8 h-[1px] bg-ink/20" />
                  <span
                    className={`text-xs font-bold tracking-[0.2em] uppercase transition-colors duration-500 ${
                      index === 0
                        ? 'text-blue-600'
                        : index === 1
                          ? 'text-yellow-600'
                          : 'text-emerald-600'
                    }`}
                  >
                    {feature.eyebrow}
                  </span>
                </div>

                <h3 className="text-3xl md:text-5xl lg:text-6xl font-medium leading-[1.05] text-ink mb-12 tracking-tight">
                  {feature.body}
                </h3>

                {feature.chips && (
                  <div>
                    <p className="text-[9px] uppercase tracking-widest text-muted mb-4 font-mono">
                      Protocol Vectors
                    </p>
                    <div className="flex flex-wrap gap-3">
                      {feature.chips.map((chip) => {
                        const Icon = IconMap[chip.icon.toLowerCase()] || Zap;
                        return (
                          <div
                            key={chip.label}
                            className={`flex items-center gap-2 px-4 py-2 rounded-full border border-ink/10 bg-white text-xs font-bold text-ink transition-colors duration-300 cursor-default ${
                              index === 0
                                ? 'hover:bg-blue-600 hover:text-white hover:border-blue-600'
                                : index === 1
                                  ? 'hover:bg-yellow-600 hover:text-white hover:border-yellow-600'
                                  : 'hover:bg-emerald-600 hover:text-white hover:border-emerald-600'
                            }`}
                          >
                            <Icon size={12} strokeWidth={2.5} />
                            <span>{chip.label}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="block md:hidden absolute top-0 left-0 w-full h-full -z-10 opacity-10 pointer-events-none overflow-hidden">
        <OrbitalIllustration activeIndex={activeIndex} />
      </div>
    </section>
  );
};

function isKillable(value: unknown): value is { kill: () => void } {
  if (typeof value !== "object" || value === null) return false;
  if (!("kill" in value)) return false;
  return typeof (value as { kill?: unknown }).kill === "function";
}

export default FeatureRail;
