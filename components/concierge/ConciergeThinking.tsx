import { useEffect, useRef } from "react";
import gsap from "gsap";

export function ConciergeThinking() {
  const dotsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const dots = dotsRef.current?.children;
    if (!dots || dots.length === 0) return;

    const tween = gsap.to(dots, {
      y: -8,
      stagger: 0.15,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      duration: 0.4,
    });

    return () => tween.kill();
  }, []);

  return (
    <div className="flex justify-start">
      <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl rounded-bl-sm px-6 py-4">
        <div className="flex items-center gap-2">
          <span className="text-white/40 font-mono text-xs tracking-wider">ELYSIAN PROCESSING</span>
          <div ref={dotsRef} className="flex gap-1">
            <span className="w-2 h-2 bg-[var(--accent-color)] rounded-full" />
            <span className="w-2 h-2 bg-[var(--accent-color)] rounded-full" />
            <span className="w-2 h-2 bg-[var(--accent-color)] rounded-full" />
          </div>
        </div>
      </div>
    </div>
  );
}

