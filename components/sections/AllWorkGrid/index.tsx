import { motion } from 'framer-motion';
import { Counter } from '@/components/ui/Counter';
import { WorkItem } from './WorkItem';
import { PROJECTS } from '../ProjectsShowcase/mock-data';

// Masonry-style positions (asymmetric grid)
const GRID_POSITIONS = [
  { top: '5%', left: '5%', width: '22%', height: '40%' },
  { top: '15%', left: '30%', width: '18%', height: '35%' },
  { top: '8%', left: '52%', width: '20%', height: '45%' },
  { top: '5%', right: '2%', width: '22%', height: '38%' },
  { top: '55%', left: '8%', width: '25%', height: '35%' },
  { top: '60%', left: '38%', width: '20%', height: '32%' },
];

export function AllWorkGrid() {
  return (
    <section className="relative min-h-screen bg-[#050505] py-32 px-6 overflow-hidden">
      {/* Background grid pattern */}
      <div className="absolute inset-0 opacity-5 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:40px_40px] pointer-events-none" />

      {/* Title */}
      <div className="relative flex items-center justify-center gap-3 mb-20">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-white text-5xl md:text-7xl font-serif"
        >
          All Work
        </motion.h2>
        <Counter count={PROJECTS.length} className="text-white/40" />
      </div>

      {/* Masonry Grid */}
      <div className="relative w-full max-w-7xl mx-auto" style={{ height: '120vh' }}>
        {PROJECTS.slice(0, 6).map((project, index) => (
          <WorkItem
            key={project.id}
            project={project}
            position={GRID_POSITIONS[index]}
            index={index}
          />
        ))}
      </div>

      {/* Bottom CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="flex justify-center mt-20"
      >
        <button className="group flex items-center gap-3 bg-white/5 hover:bg-white/10 backdrop-blur-md border border-white/10 rounded-full px-8 py-4 transition-all duration-500">
          <span className="text-white text-sm font-light">View All Projects</span>
          <span className="text-white/60 group-hover:text-white group-hover:translate-x-1 transition-all duration-300">
            →
          </span>
        </button>
      </motion.div>
    </section>
  );
}
