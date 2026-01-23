import React, { useEffect, useRef } from 'react';

interface Props {
  className?: string;
}

const HeroParticleField: React.FC<Props> = ({ className }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let w = canvas.width = window.innerWidth;
    let h = canvas.height = window.innerHeight;

    const particles: {x: number, y: number, s: number, vx: number, vy: number}[] = [];
    // Density
    const count = Math.min(window.innerWidth / 5, 200);

    for(let i=0; i<count; i++) {
      particles.push({
        x: Math.random() * w,
        y: Math.random() * h,
        s: Math.random() * 1.5 + 0.5,
        vx: (Math.random() - 0.5) * 0.1,
        vy: (Math.random() - 0.5) * 0.1
      });
    }

    const animate = () => {
      ctx.clearRect(0,0,w,h);
      ctx.fillStyle = '#050505'; // Ink color
      
      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        
        if(p.x < 0) p.x = w;
        if(p.x > w) p.x = 0;
        if(p.y < 0) p.y = h;
        if(p.y > h) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.s, 0, Math.PI * 2);
        ctx.fill();
      });
      requestAnimationFrame(animate);
    };
    
    animate();

    const handleResize = () => {
        if(canvas) {
            w = canvas.width = window.innerWidth;
            h = canvas.height = window.innerHeight;
        }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return <canvas ref={canvasRef} className={className} style={{ pointerEvents: 'none' }} />;
};

export default HeroParticleField;