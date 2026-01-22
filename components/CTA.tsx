import React, { useEffect, useRef } from 'react';

const CTA: React.FC = () => {
  const pathRef1 = useRef<SVGPathElement>(null);
  const pathRef2 = useRef<SVGPathElement>(null);

  useEffect(() => {
    const gsap = window.gsap;
    const ScrollTrigger = window.ScrollTrigger;
    
    if (gsap && ScrollTrigger && pathRef1.current && pathRef2.current) {
        const paths = [pathRef1.current, pathRef2.current];
        
        paths.forEach(path => {
             const length = path.getTotalLength();
             gsap.set(path, { strokeDasharray: length, strokeDashoffset: length });
             
             gsap.to(path, {
                 strokeDashoffset: 0,
                 duration: 1.5,
                 scrollTrigger: {
                     trigger: path,
                     start: "top 80%"
                 }
             });
        });
    }
  }, []);

  return (
    <section className="relative py-32 flex flex-col items-center justify-center overflow-hidden">
        <div className="relative z-10 text-center">
            <h3 className="text-2xl font-medium mb-8">Ready to initiate?</h3>
            <button className="bg-ink text-white text-sm font-semibold tracking-wide px-10 py-4 rounded hover:bg-neutral-800 hover:scale-105 transition-all shadow-xl shadow-black/5">
                INITIATE PROTOCOL
            </button>
        </div>

        {/* Converging Lines */}
        <div className="absolute inset-0 pointer-events-none">
            <svg className="w-full h-full" viewBox="0 0 1440 400" preserveAspectRatio="none">
                {/* Left Line */}
                <path 
                    ref={pathRef1}
                    d="M-100,200 C200,200 400,200 660,200" 
                    fill="none" 
                    stroke="#cccccc" 
                    strokeWidth="1.5" 
                />
                 {/* Right Line */}
                 <path 
                    ref={pathRef2}
                    d="M1540,200 C1240,200 1040,200 780,200" 
                    fill="none" 
                    stroke="#cccccc" 
                    strokeWidth="1.5" 
                />
                
                {/* Nodes on line */}
                <circle cx="200" cy="200" r="3" fill="#050505" className="opacity-20" />
                <circle cx="1240" cy="200" r="3" fill="#050505" className="opacity-20" />
            </svg>
        </div>
    </section>
  );
};

export default CTA;
