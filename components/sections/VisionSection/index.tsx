import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ProgressLine } from '@/components/ui/ProgressLine';
import { ValuePill } from './ValuePill';
import { VALUES, VISION_TEXT } from '../ProjectsShowcase/mock-data';

export function VisionSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start']
  });

  // Parallax effect for background image
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background Image with Parallax */}
      <motion.div
        style={{ y }}
        className="absolute inset-0 z-0"
      >
        <img
          src="https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?w=1920&q=80"
          alt="Vision background"
          className="w-full h-[120%] object-cover"
        />
        {/* Dark overlay for readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black/80" />
      </motion.div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 py-32">
        <div className="grid md:grid-cols-12 gap-12 items-center">
          {/* Left Side - Indicator & Label */}
          <div className="md:col-span-2">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="flex flex-col gap-4"
            >
              <span className="text-white/40 text-6xl font-serif">03</span>
              <ProgressLine progress={1} />
              <span className="text-white/60 text-sm font-mono uppercase tracking-[0.3em] -rotate-90 origin-left mt-8">
                Vision
              </span>
            </motion.div>
          </div>

          {/* Center - Values/Headlines */}
          <div className="md:col-span-6">
            {VALUES.map((value, index) => (
              <ValuePill
                key={value.id}
                number={value.id}
                title={value.title}
                highlight={value.highlight}
                index={index}
              />
            ))}
          </div>

          {/* Right Side - Description */}
          <div className="md:col-span-4">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="space-y-6"
            >
              <p className="text-neutral-300 text-sm md:text-base leading-relaxed font-light">
                {VISION_TEXT}
              </p>

              <button className="group flex items-center gap-2 text-white hover:text-neutral-300 transition-colors text-sm font-light">
                <span>Learn More</span>
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </button>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#050505] to-transparent pointer-events-none" />
    </section>
  );
}
