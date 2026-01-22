import { motion } from 'framer-motion';
import type { Project } from './types';

interface ProjectNavProps {
  projects: Project[];
  activeIndex: number;
  onNavigate: (index: number) => void;
}

export function ProjectNav({ projects, activeIndex, onNavigate }: ProjectNavProps) {
  const currentProject = projects[activeIndex];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.5 }}
      className="fixed bottom-10 left-1/2 -translate-x-1/2 z-50"
    >
      <div className="flex items-center gap-3 bg-black/80 backdrop-blur-md border border-white/10 rounded-full px-6 py-3">
        <button
          onClick={() => onNavigate((activeIndex - 1 + projects.length) % projects.length)}
          className="text-white/60 hover:text-white transition-colors"
          aria-label="Previous project"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M10 12L6 8L10 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </button>

        <div className="flex items-center gap-3 min-w-[200px] justify-center">
          <span className="text-white/40 text-xs font-mono">
            {String(activeIndex + 1).padStart(2, '0')}
          </span>
          <span className="text-white text-sm font-light">
            {currentProject.title}
          </span>
          <span className="text-white/40 text-xs">→</span>
        </div>

        <button
          onClick={() => onNavigate((activeIndex + 1) % projects.length)}
          className="text-white/60 hover:text-white transition-colors"
          aria-label="Next project"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M6 4L10 8L6 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </button>
      </div>

      {/* Progress indicators */}
      <div className="flex justify-center gap-1.5 mt-4">
        {projects.map((_, index) => (
          <button
            key={index}
            onClick={() => onNavigate(index)}
            className="group"
            aria-label={`Go to project ${index + 1}`}
          >
            <div
              className={`h-1 transition-all duration-300 ${
                index === activeIndex
                  ? 'w-8 bg-white'
                  : 'w-1 bg-white/20 group-hover:bg-white/40'
              }`}
            />
          </button>
        ))}
      </div>
    </motion.div>
  );
}
