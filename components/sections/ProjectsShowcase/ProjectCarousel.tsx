import { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Brackets } from '@/components/ui/Brackets';
import { ProjectNav } from './ProjectNav';
import type { Project } from './types';

interface ProjectCarouselProps {
  projects: Project[];
}

export function ProjectCarousel({ projects }: ProjectCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLElement>(null);
  const autoPlayRef = useRef<NodeJS.Timeout>();

  // Auto-play functionality
  useEffect(() => {
    const startAutoPlay = () => {
      autoPlayRef.current = setInterval(() => {
        setActiveIndex((prev) => (prev + 1) % projects.length);
      }, 5000);
    };

    startAutoPlay();

    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
      }
    };
  }, [projects.length]);

  // Reset auto-play on manual navigation
  const handleNavigate = (index: number) => {
    setActiveIndex(index);
    if (autoPlayRef.current) {
      clearInterval(autoPlayRef.current);
      autoPlayRef.current = setInterval(() => {
        setActiveIndex((prev) => (prev + 1) % projects.length);
      }, 5000);
    }
  };

  const currentProject = projects[activeIndex];

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex flex-col items-center justify-center py-20 px-6 bg-[#050505] overflow-hidden"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-neutral-900/20 via-[#050505] to-[#050505] pointer-events-none" />

      {/* Project Image */}
      <div className="relative w-full max-w-5xl h-[50vh] md:h-[60vh] mb-16">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeIndex}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0 overflow-hidden rounded-sm"
          >
            <img
              src={currentProject.image}
              alt={currentProject.title}
              className="w-full h-full object-cover"
            />
            {/* Overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent opacity-60" />
          </motion.div>
        </AnimatePresence>

        {/* Category badge */}
        <motion.div
          key={`category-${activeIndex}`}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="absolute top-6 left-6 bg-black/60 backdrop-blur-md border border-white/10 rounded-full px-4 py-2"
        >
          <span className="text-white/70 text-xs font-mono uppercase tracking-wider">
            {currentProject.category}
          </span>
        </motion.div>

        {/* Year badge */}
        <motion.div
          key={`year-${activeIndex}`}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="absolute top-6 right-6 bg-black/60 backdrop-blur-md border border-white/10 rounded-full px-4 py-2"
        >
          <span className="text-white/70 text-xs font-mono">
            {currentProject.year}
          </span>
        </motion.div>
      </div>

      {/* Title with Brackets */}
      <div className="flex items-center gap-4 md:gap-8 mb-8">
        <Brackets side="left" />
        <AnimatePresence mode="wait">
          <motion.h2
            key={activeIndex}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="font-serif text-4xl md:text-6xl lg:text-7xl text-white text-center leading-tight"
          >
            {currentProject.title}
          </motion.h2>
        </AnimatePresence>
        <Brackets side="right" />
      </div>

      {/* Description */}
      <AnimatePresence mode="wait">
        {currentProject.description && (
          <motion.p
            key={`desc-${activeIndex}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-neutral-400 text-sm md:text-base max-w-2xl text-center font-light leading-relaxed"
          >
            {currentProject.description}
          </motion.p>
        )}
      </AnimatePresence>

      {/* Navigation */}
      <ProjectNav
        projects={projects}
        activeIndex={activeIndex}
        onNavigate={handleNavigate}
      />
    </section>
  );
}
