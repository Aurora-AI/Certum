import React, { useEffect, useRef } from 'react';

const Statement: React.FC = () => {
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const gsap = window.gsap;
    const ScrollTrigger = window.ScrollTrigger;

    if (gsap && ScrollTrigger && textRef.current) {
        gsap.fromTo(textRef.current,
            { opacity: 0, y: 50 },
            {
                opacity: 1,
                y: 0,
                duration: 1.2,
                scrollTrigger: {
                    trigger: textRef.current,
                    start: "top 75%",
                }
            }
        )
    }
  }, []);

  return (
    <section className="relative py-40 md:py-60 px-6 overflow-hidden bg-white border-t border-ink/5">
      {/* Decorative corners */}
      <svg className="absolute top-10 left-10 w-24 h-24 text-ink" viewBox="0 0 100 100">
        <path d="M0 40 L0 0 L40 0" fill="none" stroke="currentColor" strokeWidth="1.5" />
      </svg>
      <svg className="absolute bottom-10 right-10 w-24 h-24 text-ink rotate-180" viewBox="0 0 100 100">
        <path d="M0 40 L0 0 L40 0" fill="none" stroke="currentColor" strokeWidth="1.5" />
      </svg>

      <div className="max-w-6xl mx-auto text-center">
        <h2 ref={textRef} className="text-5xl md:text-8xl lg:text-[7rem] font-bold tracking-tighter leading-[0.9] text-ink">
          Audited. <span className="text-muted">Open-source.</span> <br />
          Stress-tested. <br />
          <span className="text-muted">Countless times.</span>
        </h2>
      </div>
    </section>
  );
};

export default Statement;
