import React, { useEffect, useId, useRef } from 'react';

interface OrbitalProps {
  activeIndex?: number;
}

const THEMES = [
  {
    outer: 'text-blue-600',
    dotted: 'text-cyan-400',
    inner: 'text-blue-500',
    nodes: 'text-cyan-300',
    tint: 'text-blue-600',
    glow: 'from-blue-600/40 to-cyan-400/40',
  },
  {
    outer: 'text-amber-600',
    dotted: 'text-orange-400',
    inner: 'text-yellow-500',
    nodes: 'text-amber-300',
    tint: 'text-amber-500',
    glow: 'from-amber-600/40 to-orange-400/40',
  },
  {
    outer: 'text-emerald-600',
    dotted: 'text-green-400',
    inner: 'text-emerald-500',
    nodes: 'text-green-300',
    tint: 'text-emerald-600',
    glow: 'from-emerald-600/40 to-green-400/40',
  },
];

const OrbitalIllustration: React.FC<OrbitalProps> = ({ activeIndex = 0 }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const orbitGroupRef = useRef<SVGGElement>(null);
  const coreGroupRef = useRef<SVGGElement>(null);
  const coreImageRef = useRef<SVGImageElement>(null);
  const reactId = useId();

  const safeIndex = Math.min(Math.max(activeIndex, 0), THEMES.length - 1);
  const currentTheme = THEMES[safeIndex];
  const coreClipId = `${reactId}-core-clip`;
  const coreShadowGradientId = `${reactId}-core-shadow`;

  useEffect(() => {
    const gsap = window.gsap;
    if (!gsap) return;

    const tweens: Array<{ kill?: () => void }> = [];

    if (orbitGroupRef.current) {
      tweens.push(
        gsap.to(orbitGroupRef.current, {
          rotation: 360,
          duration: 120,
          repeat: -1,
          ease: 'none',
          transformOrigin: '50% 50%',
        }),
      );
    }

    if (coreGroupRef.current) {
      tweens.push(
        gsap.to(coreGroupRef.current, {
          rotation: -360,
          duration: 240,
          repeat: -1,
          ease: 'none',
          transformOrigin: '50% 50%',
        }),
      );
    }

    if (coreImageRef.current) {
      tweens.push(
        gsap.fromTo(
          coreImageRef.current,
          { scale: 1 },
          {
            scale: 1.05,
            duration: 8,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut',
            transformOrigin: '50% 50%',
          },
        ),
      );
    }

    return () => {
      tweens.forEach((t) => t.kill?.());
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[600px] md:h-[800px] flex items-center justify-center pointer-events-none overflow-visible"
    >
      <div
        className={`absolute w-[400px] h-[400px] md:w-[600px] md:h-[600px] rounded-full blur-[120px] opacity-30 translate-x-[-20%] transition-colors duration-1000 bg-gradient-to-tr ${currentTheme.glow}`}
      />

      <svg
        className="w-[140%] h-[140%] absolute top-[-20%] left-[-20%] md:left-[-10%]"
        viewBox="0 0 800 800"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <clipPath id={coreClipId}>
            <circle cx="400" cy="400" r="180" />
          </clipPath>

          <radialGradient id={coreShadowGradientId} cx="0.5" cy="0.5" r="0.5">
            <stop offset="0%" stopColor="transparent" />
            <stop offset="70%" stopColor="rgba(0,0,0,0.1)" />
            <stop offset="100%" stopColor="rgba(0,0,0,0.8)" />
          </radialGradient>
        </defs>

        <g clipPath={`url(#${coreClipId})`}>
          <g ref={coreGroupRef}>
            <image
              ref={coreImageRef}
              href="/liquid-core.png"
              x="150"
              y="150"
              width="500"
              height="500"
              preserveAspectRatio="xMidYMid slice"
              style={{ filter: 'grayscale(20%) contrast(1.1)' }}
            />
          </g>

          <circle
            cx="400"
            cy="400"
            r="180"
            fill="currentColor"
            opacity="0.9"
            className={`${currentTheme.tint} transition-colors duration-700`}
            style={{ mixBlendMode: 'color' }}
          />
          <circle
            cx="400"
            cy="400"
            r="180"
            fill="currentColor"
            opacity="0.6"
            className={`${currentTheme.tint} transition-colors duration-700`}
            style={{ mixBlendMode: 'overlay' }}
          />
          <circle
            cx="400"
            cy="400"
            r="180"
            fill={`url(#${coreShadowGradientId})`}
            opacity="0.8"
          />
        </g>

        <g ref={orbitGroupRef}>
          <circle
            cx="400"
            cy="400"
            r="350"
            stroke="currentColor"
            strokeWidth="1"
            className={`${currentTheme.outer} transition-colors duration-700`}
          />

          <circle
            cx="400"
            cy="400"
            r="280"
            stroke="currentColor"
            strokeWidth="1"
            strokeDasharray="4 8"
            className={`${currentTheme.dotted} transition-colors duration-700 delay-75`}
          />

          <circle
            cx="400"
            cy="400"
            r="180"
            stroke="currentColor"
            strokeWidth="1.5"
            className={`${currentTheme.inner} transition-colors duration-700 delay-150`}
          />

          <g transform="translate(400, 50)">
            <path
              d="M0 -6 L5 4 L-5 4 Z"
              fill="white"
              stroke="currentColor"
              strokeWidth="1.5"
              className={`${currentTheme.nodes} transition-colors duration-700`}
            />
          </g>

          <g transform="translate(680, 400)">
            <rect
              x="-4"
              y="-4"
              width="8"
              height="8"
              fill="white"
              stroke="currentColor"
              strokeWidth="1.5"
              className={`${currentTheme.nodes} transition-colors duration-700`}
            />
          </g>

          <g transform="translate(220, 400)">
            <circle
              r="4"
              fill="white"
              stroke="currentColor"
              strokeWidth="1.5"
              className={`${currentTheme.nodes} transition-colors duration-700`}
            />
          </g>
        </g>

        <path
          d="M400,400 L800,400"
          stroke="currentColor"
          className="text-ink/5"
          strokeWidth="1"
        />
        <path
          d="M400,0 L400,800"
          stroke="currentColor"
          className="text-ink/5"
          strokeWidth="1"
        />
      </svg>
    </div>
  );
};

export default OrbitalIllustration;
