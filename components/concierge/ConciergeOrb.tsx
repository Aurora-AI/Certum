import { useEffect, useRef } from "react";
import gsap from "gsap";

interface ConciergeOrbProps {
  isActive?: boolean;
  size?: number;
}

export function ConciergeOrb({ isActive = true, size = 120 }: ConciergeOrbProps) {
  const orbRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const orb = orbRef.current;
    const glow = glowRef.current;
    if (!orb || !glow) return;

    const breathe = gsap.to(orb, {
      scale: 1.05,
      duration: 2,
      ease: "sine.inOut",
      yoyo: true,
      repeat: -1,
    });

    const glowTween = gsap.to(glow, {
      opacity: 0.6,
      scale: 1.2,
      duration: 1.5,
      ease: "sine.inOut",
      yoyo: true,
      repeat: -1,
    });

    const rotate = gsap.to(orb, {
      rotation: 360,
      duration: 20,
      ease: "none",
      repeat: -1,
    });

    return () => {
      breathe.kill();
      glowTween.kill();
      rotate.kill();
    };
  }, []);

  useEffect(() => {
    const orb = orbRef.current;
    if (!orb) return;

    gsap.to(orb, {
      scale: isActive ? 1 : 0.9,
      opacity: isActive ? 1 : 0.5,
      duration: 0.3,
    });
  }, [isActive]);

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <div
        ref={glowRef}
        className="absolute inset-0 rounded-full opacity-40"
        style={{
          background: "radial-gradient(circle, var(--accent-color) 0%, transparent 70%)",
          filter: "blur(20px)",
          transform: "scale(1.5)",
        }}
      />

      <div
        ref={orbRef}
        className="relative w-full h-full rounded-full overflow-hidden"
        style={{
          background: `
            radial-gradient(ellipse at 30% 30%, var(--accent-color) 0%, transparent 50%),
            radial-gradient(ellipse at 70% 70%, rgba(255,255,255,0.1) 0%, transparent 50%),
            #0A0A0A
          `,
          boxShadow: `
            inset 0 0 30px rgba(0,0,0,0.5),
            0 0 40px var(--accent-color-alpha)
          `,
        }}
      >
        <div
          className="absolute inset-2 rounded-full"
          style={{
            background: "linear-gradient(135deg, rgba(255,255,255,0.1) 0%, transparent 50%)",
          }}
        />
      </div>
    </div>
  );
}

