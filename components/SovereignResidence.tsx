import React, { useCallback, useEffect, useRef } from 'react';

type SovereignResidenceProps = {
  className?: string;
};

const NOIR_FILTER = 'grayscale(100%) contrast(1.12) brightness(0.9) saturate(0.9)';
const COLOR_FILTER = 'grayscale(0%) contrast(1.02) brightness(1) saturate(1.18)';

export default function SovereignResidence({ className }: SovereignResidenceProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const animate = useCallback((to: { filter: string; scale: number; duration: number }) => {
    const video = videoRef.current;
    if (!video) return;

    const reduceMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false;
    if (reduceMotion) {
      video.style.filter = to.filter;
      video.style.transform = `scale(${to.scale})`;
      return;
    }

    const gsap = window.gsap;
    if (!gsap) {
      video.style.transition = 'filter 1200ms cubic-bezier(0.2, 0.8, 0.2, 1), transform 1200ms cubic-bezier(0.2, 0.8, 0.2, 1)';
      video.style.filter = to.filter;
      video.style.transform = `scale(${to.scale})`;
      return;
    }

    gsap.to(video, {
      filter: to.filter,
      scale: to.scale,
      duration: to.duration,
      ease: 'power2.out',
      overwrite: 'auto',
    });
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const gsap = window.gsap;
    if (gsap) {
      gsap.set(video, { filter: NOIR_FILTER, scale: 1, transformOrigin: '50% 50%' });
    } else {
      video.style.filter = NOIR_FILTER;
      video.style.transform = 'scale(1)';
      video.style.transformOrigin = '50% 50%';
    }

    video.play().catch(() => null);
    video.playbackRate = 0.9;

    return () => {
      if (gsap) gsap.killTweensOf(video);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      data-hero-bg
      className={['absolute inset-0 overflow-hidden z-0', className].filter(Boolean).join(' ')}
      onMouseEnter={() => animate({ filter: COLOR_FILTER, scale: 1.02, duration: 1.2 })}
      onMouseLeave={() => animate({ filter: NOIR_FILTER, scale: 1.0, duration: 1.5 })}
    >
      <div
        className="absolute inset-0 z-10 pointer-events-none opacity-[0.18] mix-blend-overlay sovereign-grain"
        style={{ backgroundImage: "url('/assets/noise.svg')" }}
      />

      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover"
        style={{ willChange: 'filter, transform' }}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
      >
        <source src="/assets/Residencia_opt.webm" type="video/webm" />
        <source src="/assets/Residencia_opt.mp4" type="video/mp4" />
      </video>
    </div>
  );
}
